import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoadingIndicator from '../../components/Loading/LoadingIndicator';
import { Task } from '../../components/types/resourcesTypes';
import LoadHoursTableRow from '../../components/UI/Horas/LoadHoursTableRow';
import CenteredModal from '../../components/UI/Modal/CenteredModal';
//import AddHourModal from '../../components/UI/Horas/AddHourModal';
//import DatePicker from "react-datepicker"


interface CargaDeHorasProps {

}




const CargaDeHoras = (props: CargaDeHorasProps,) => {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [tasks, setTasks] = useState<{[id: string]:string}>({});
    const [showAddModal, setShowAddModal] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(9)
    const [page, setPage] = useState(0)

    const { state }: any = useLocation()

    const handleAddOpen = () => {
        setShowAddModal(true)
    }
    const handleSubmit = () => {
        
        console.log('Mando a la api')
        sendHoursToAPI();
        console.log('NO LLEGO')
        return(<Link to={'/'}></Link>)

        

    }

    const handleClose = () => {
        setShowAddModal(false);
    }

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    /*const fetchTasks = () => {
        fetch('https://modulo-proyectos-psa-2022.herokuapp.com/projects')
            .then(res => res.json())
            .then(res => {
                setTasks([])
                let tasks: Task[] = []
                res.forEach((element: Proyect) => {
                    element.tasks.forEach((item: Task) => {
                        let proyectTask = {
                            ...item,
                            proyectName: element.name,
                            proyectCode: element.code,
                        }
                        tasks.push(proyectTask)
                    });
                    setTasks(tasks)
                });


            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })

    }*/

    useEffect(() => {
        let tasks:{[id: number]:string} = {}
        state.items.forEach((item:Task)=>{
            tasks[item.code] = "0"
        })
        setTasks(tasks)
        console.log(state)
    }, [state]);

    const sendHoursToAPI = async () =>{
        let information:any = []
        Object.keys(tasks).forEach((key:string)=>{
            let body = {
                duration:tasks[key],
                hourAssignee: 2,
                startingDate: "2022-06-16",
                taskCode: key
            }
            information.push(body)
        })

        for (const data of information){
            const request = await fetch("https://modulo-recursos-psa.herokuapp.com/hours", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json; charset=UTF-8'} });
        }
    }


    const onChange = (event:React.KeyboardEvent<HTMLInputElement>, task:Task) => {
        let tasksCopy = tasks
        tasksCopy[task.code] = event.currentTarget.value
        
        setTasks(tasksCopy);
    }

    console.log(state.date)
    return (
        <>


            <div className="flex flex-row" >
                <Link to={'/recursos/horasSemanales/carga/'} >
                    <Button>Volver atras</Button>
                </Link>
            </div>
                
            <div className="self-end mr-10 border-2 text-center  rounded-xl shadow-lg text-slate-800 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer">
                <Button onClick={handleAddOpen}>
                    <div className="m-4"> Guardar</div>
                </Button>
            </div>
            <CenteredModal isLoading={isLoading} onClose={handleClose} show={showAddModal} onSubmit={handleSubmit} label="¿Esta seguro que desea cargar las horas?" addbuttonLabel="Cargar Horas" >
                
            </CenteredModal>
    
            <TextField disabled type='date' inputProps={{ max: new Date().toISOString().slice(0, 10) }} defaultValue={state.date}></TextField>

        <Typography variant='h5' className={'mb-10'}></Typography>
        <LoadingIndicator show={isLoading} className={`flex flex-col items-start  transition-all duration-200`} >
                <TableContainer component={Paper} className="mt-10"  >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Codigo de Proyecto</TableCell>
                                <TableCell align="left">Proyecto</TableCell>
                                <TableCell align="left">Codigo de Tarea</TableCell>
                                <TableCell align="left">Tarea</TableCell>
                                <TableCell align="left">Descripcion</TableCell>
                                <TableCell align='left'>Horas a cargar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {state?.items &&  (state?.items
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row: Task) => <LoadHoursTableRow row={row} key={row._id} onChange={onChange}/>) || []
                                )}
                        </TableBody>
                        <TableFooter>
                          <TableRow>
                              <TablePagination
                                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                  colSpan={8}
                                  count={state.length}
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

export default CargaDeHoras