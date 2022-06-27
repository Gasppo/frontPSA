import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import LoadingIndicator from '../../components/Loading/LoadingIndicator';
import { ProjectReport, Proyect, SelectProyect } from '../../components/types/resourcesTypes';
import ProyectReportTableRow from '../../components/UI/Reports/proyectReportTableRow';
import { ExportToCsv } from 'export-to-csv';
import PageTitle from '../../components/UI/Dashboard/PageTitle';

//import AddHourModal from '../../components/UI/Horas/AddHourModal';
//import DatePicker from "react-datepicker"

interface ReportePorProyectoProps {

}

const ReportePorProyecto = (props: ReportePorProyectoProps,) => {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [selected, setSelected] = useState<any>(0);
    const [proyectos, setProyectos] = useState<SelectProyect[]>([]);
    const [tareas, setTareas] = useState<ProjectReport[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState(9);
    const [page, setPage] = useState(0);
    const [total_hours, setTotalHours] = useState(0);
    const [csv_data, setCSVData] = useState<any[]>();
    const [disableReport, setDisableReport] = useState<boolean>(true)

    const fetchEmployees = () => {
        
        fetch('https://modulo-proyectos-psa-2022.herokuapp.com/projects')
            .then(res => res.json())
            .then(res => {
                let resources: SelectProyect[] = [];
                res.forEach((item: Proyect) => {
                    let proj = {
                        label: item.name,
                        value: item.code
                    }
                    if (true)
                        resources.push(proj)
                })
                setProyectos(resources)
                console.log(proyectos)
                setLoading(false);
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })
    }
  
    const fetchProjects = () => {
        
        fetch("https://modulo-recursos-psa.herokuapp.com/reports/project/"+ selected.value)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            console.log(res.tasks)
            //let horasId = res.filter((element:Hours) => {return element.hourAssignee==4})
            //let horasAgrupadasPorTask:{[id: string]:Hours[]} = {}
            let tareasDeProyecto: ProjectReport[] = []
            let csvData: any[]= [] 
            res.tasks.forEach((item:ProjectReport) => {
                
                let tareaAMostrar: ProjectReport ={
                    _id: item._id,
                    name: item.name,
                    description: item.description,
                    resource: item.resource,
                    code: item.code,
                    hours_worked: typeof item.hours_worked == "undefined" ? 0 : item.hours_worked,
                    deviation: item.effort - item.hours_worked,
                    effort: 0
                }

                csvData.push({
                    code: item.code,
                    name: item.name,
                    description: item.description,
                    duration: item.hours_worked,
                    deviation: item.effort - item.hours_worked,
                })

                tareasDeProyecto.push(tareaAMostrar)
            });
            console.log(tareasDeProyecto)
            setTareas(tareasDeProyecto)
            setCSVData(csvData)
            setDisableReport(false);
            setLoading(false);
            setTotalHours(res.total_hours_worked);
        })
        .catch(err => {
            console.log(JSON.stringify(err))
        })

    }
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
  

    useEffect(()=>{
        fetchEmployees();
    },[])

    useEffect(() => {
        setLoading(true);
        fetchProjects();
    }, [selected]);

    return (
        <>
            <PageTitle label='Reporte por persona'>
            <div className="flex flex-row" >
                <Link to={'/recursos/'} >
                    <Button>Reporte por proyecto</Button>
                </Link>
            </div>
            </PageTitle>

            <div className="self-end mr-10 border-2 text-center  rounded-xl shadow-lg text-slate-800 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer">
                    <div >
                        
                    </div>
            </div>

            <Select options={proyectos} onChange={(value) => setSelected(value)} />    
            <Typography variant='h5' className={'mb-10'}></Typography>
            <LoadingIndicator show={isLoading} className={`flex flex-col items-start  transition-all duration-200`} >

            <TableContainer component={Paper} className="mt-10"  >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Codigo de Tarea</TableCell>
                                <TableCell align="left">Tarea</TableCell>
                                <TableCell align="left">Descripcion</TableCell>
                                <TableCell align="left">Cantidad de Horas</TableCell>
                                <TableCell align="left">Desviacion de esfuerzo</TableCell>
                            </TableRow>
                        </TableHead>
                       <TableBody>
                       {tareas &&
                              tareas
                                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                  .map((row:ProjectReport) => <ProyectReportTableRow row={row} key={row._id} />)}
               
                        </TableBody>
                        <TableFooter>
                          <TableRow>
                              <TablePagination
                                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                  colSpan={8}
                                  count={tareas.length}
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

                <div>Total de horas trabajas: {total_hours}</div>

                <Button disabled={disableReport} onClick={()=>{
                    const options = { 
                        fieldSeparator: ',',
                        quoteStrings: '"',
                        decimalSeparator: '.',
                        filename: "reporte_de_proyecto_"+ selected.value,
                        showLabels: true, 
                        showTitle: true,
                        title: 'Reporte del proyecto con codigo '+ selected.value,
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

export default ReportePorProyecto