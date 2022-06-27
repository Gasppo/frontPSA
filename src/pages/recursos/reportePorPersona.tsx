import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import LoadingIndicator from '../../components/Loading/LoadingIndicator';
import { Hours, ProjectReport, Proyect, SelectResource } from '../../components/types/resourcesTypes';
import HoursTableRow from '../../components/UI/Horas/HoursTableRow';
import { ExportToCsv } from 'export-to-csv';
import ProyectReportTableRow from '../../components/UI/Reports/proyectReportTableRow';
//import AddHourModal from '../../components/UI/Horas/AddHourModal';
//import DatePicker from "react-datepicker"


interface ReportePorPersonaProps {

}


const ReportePorPersona = (props: ReportePorPersonaProps,) => {
    const [selected, setSelected] = useState<any>(0);
    const [recursos, setRecursos] = useState<SelectResource[]>([]);
    const [horas_trabajas, setHorasTrabajadas] = useState<any>(0);
    const [rowsPerPage, setRowsPerPage] = useState(9);
    const [isLoading, setLoading] = useState<boolean>(false)
    const [page, setPage] = useState(0);
    const [proyects, setProyects] = useState<Proyect[]>([])
    const [horas, setHoras] = useState<Hours[]>([])
    const [totalHours, setTotalHours] = useState(0)
    const [csv_data, setCSVData] = useState<any[]>();


    const fetchEmployees = () => {
        fetch('https://modulo-recursos-psa.herokuapp.com/employees')
            .then(res => res.json())
            .then(res => {
                console.log(res)
                let resources: SelectResource[] = [];
                res.forEach((item: any) => {
                    let proj = {
                        label: item.Apellido + "," + item.Nombre,
                        value: item.legajo
                    }
                    if (true)
                        resources.push(proj)
                })
                setRecursos(resources)
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })

    }

    const getProyectID = (id:number) => {
        return proyects.find((item) => item.code === id)
    }

    const fetchProyects = () => {
        fetch('https://modulo-proyectos-psa-2022.herokuapp.com/projects/')
        .then(res => res.json())
        .then(res => {
            setProyects(res)
            console.log(proyects)
        })
    }

    const fetchHours = () => {

        let body = JSON.stringify({
            hourAssignee: selected.value
        })

        fetch('https://modulo-recursos-psa.herokuapp.com/hours/employeeHistorial',{
            method:'POST',
            body:body,
            headers: {"Content-Type":"application/json"},
        })
        .then(res => res.json())
        .then(res => {

            console.log(res)

            //let horasId = res.filter((element:Hours) => {return element.hourAssignee==4})
            let horasAgrupadasPorTask:{[id: string]:any[]} = {}
            
            res.forEach((item:any) => {
                let hora = {
                    ...item,
                    proyectName: typeof getProyectID(item.code)?.name === "undefined" ? "null" : getProyectID(item.code)?.name
                }
               if(!Object.keys(horasAgrupadasPorTask).includes(item.task.code.toString())){
                    horasAgrupadasPorTask[item.task.code]=[item] 
                }else{
                    horasAgrupadasPorTask[item.task.code].push(item)
                }
                
            });

            let horas: Hours[]= [] 
            let csvData: any[]= [] 

            Object.keys(horasAgrupadasPorTask).forEach((key:string) =>{
                let horaInicial:Hours = {
                    _id: horasAgrupadasPorTask[key][0]._id,
                    hourAssignee:horasAgrupadasPorTask[key][0].hourAssignee,
                    created: horasAgrupadasPorTask[key][0].created,
                    _v: horasAgrupadasPorTask[key][0]._v,
                    task: horasAgrupadasPorTask[key][0].task,
                    startingDate: horasAgrupadasPorTask[key][0].startingDate,
                    duration: 0,
                }

                horasAgrupadasPorTask[key].forEach((item:Hours)=>{
                    horaInicial.duration += item.duration
                })

                horas.push(horaInicial)

                csvData.push({
                    proyectCode: horasAgrupadasPorTask[key][0].task.projectCode,
                    code: horasAgrupadasPorTask[key][0].task.code,
                    name: horasAgrupadasPorTask[key][0].task.name,
                    description: horasAgrupadasPorTask[key][0].task.description,
                    duration: horasAgrupadasPorTask[key][0].duration,
                })

            })

            console.log(horas)
            setCSVData(csvData);
            setHoras(horas);
            setLoading(false)


        })
        .catch(err => {
            console.log("Error")
        })
        

    }
    const fetchTotalTimeWorked = () => {
        fetch("https://modulo-recursos-psa.herokuapp.com/reports/person/"+selected.value)
        .then(res => res.json())
        .then(res => {
            setTotalHours(typeof res.total_hours_worked == "undefined" ? 0 :res.total_hours_worked )
            console.log(res)

        })
    }

    useEffect(() => {
        if(recursos.length == 0){
            fetchEmployees();
        }
        else{
        fetchProyects()
        setLoading(true)
        fetchHours();
        fetchTotalTimeWorked()
        }
    }, [selected]);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <div className="flex flex-row" >
                <Link to={'/recursos/'} >
                    <Button>Volver al inicio</Button>
                </Link>
            </div>
            <Select options={recursos} onChange={(value) => setSelected(value)} />

            <LoadingIndicator show={isLoading} className={`flex flex-col items-start  transition-all duration-200`} >

            <TableContainer component={Paper} className="mt-10"  >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Codigo de Proyecto</TableCell>
                                <TableCell align="left">Codigo de Tarea</TableCell>
                                <TableCell align="left">Tarea</TableCell>
                                <TableCell align="left">Descripcion</TableCell>
                                <TableCell align="left">Cantidad de Horas</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {horas &&
                                    horas
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row:Hours)=><HoursTableRow row={row} key={row._id}/>)}
                        </TableBody>
                        <TableFooter>
                          <TableRow>
                              <TablePagination
                                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                  colSpan={8}
                                  count={horas.length}
                                  rowsPerPage={rowsPerPage}
                                  page={page}
                                  SelectProps={{
                                      inputProps: {
                                          'aria-label': 'rows per page',
                                      },
                                      native: true,
                                  }}
                                  onPageChange={handleChangePage}
                                  onRowsPerPageChange={handleChangeRowsPerPage}
                              />
                          </TableRow>
                      </TableFooter>
                    </Table>

                </TableContainer>
                
                <div>{"TOTAL: " + totalHours}</div>

                <Button onClick={()=>{
                    const options = { 
                        fieldSeparator: ',',
                        quoteStrings: '"',
                        decimalSeparator: '.',
                        showLabels: true, 
                        showTitle: true,
                        title: 'Reporte del empleado con legajo '+ selected.value,
                        useTextFile: false,
                        useBom: true,
                        useKeysAsHeaders: true,
                    };
                    
                    const csvExporter = new ExportToCsv(options);
                    
                    csvExporter.generateCsv(csv_data);
                }}>Exportar reporte</Button>

                </LoadingIndicator>
        </>

    )
}

export default ReportePorPersona