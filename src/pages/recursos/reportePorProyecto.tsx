import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import LoadingIndicator from '../../components/Loading/LoadingIndicator';
import { ProjectReport, Proyect, SelectProyect } from '../../components/types/resourcesTypes';
import ProyectReportTableRow from '../../components/UI/Reports/proyectReportTableRow';
//import AddHourModal from '../../components/UI/Horas/AddHourModal';
//import DatePicker from "react-datepicker"


interface ReportePorProyectoProps {

}

const ReportePorProyecto = (props: ReportePorProyectoProps,) => {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [selected, setSelected] = useState<any>(0);
    const [proyectos, setProyectos] = useState<SelectProyect[]>([]);
    const [tareas, setTareas] = useState<ProjectReport[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState(9)
    const [page, setPage] = useState(0)

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
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })
    }
  
    const fetchHours = () => {
        
        fetch("https://modulo-recursos-psa.herokuapp.com/reports/project/"+ selected.value)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            console.log(res.tasks)
            //let horasId = res.filter((element:Hours) => {return element.hourAssignee==4})
            //let horasAgrupadasPorTask:{[id: string]:Hours[]} = {}
            let tareasDeProyecto: ProjectReport[] = []
            res.tasks.forEach((item:ProjectReport) => {
                
                let tareaAMostrar: ProjectReport ={
                    _id: item._id,
                    name: item.name,
                    description: item.description,
                    resource:item.resource,
                    code:item.code,
                    hours_worked:typeof item.hours_worked == "undefined" ? 0: item.hours_worked ,
                }
                tareasDeProyecto.push(tareaAMostrar)
            });
            console.log(tareasDeProyecto)
            setTareas(tareasDeProyecto)
            setLoading(false)
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
        setLoading(false);
        fetchHours();
    }, [selected]);


    return (
        <>
            <div className="flex flex-row" >
                <Link to={'/recursos/'} >
                    <Button>Volver al inicio</Button>
                </Link>
                
            </div>
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
                </LoadingIndicator>

        </>

    )
}

export default ReportePorProyecto