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
    const [total, setTotal] = useState(1)

    const { state }: any = useLocation()

    const handleAddOpen = () => {
        if (total<=8){
            setShowAddModal(true)
        }else{
                alert("La cantidad total de horas del dia no puede superar las 8 horas")
        }
        
    }
    const handleSubmit = () => {
        if (total<=8){
        sendHoursToAPI();
        alert("Las horas han sido cargadas con exito")
        window.location.href="/recursos/horasSemanales"

        }else{
            alert("La cantidad total de horas del dia no puede superar las 8 horas")
        }

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

    useEffect(() => {
        let tasks:{[id: number]:string} = {}
        state.items.forEach((item:Task)=>{
            tasks[item.code] = "0.5"
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
                startingDate: state.date,
                taskCode: key
            }
            information.push(body)
        })

        for (const data of information){
            const request = await fetch("https://modulo-recursos-psa.herokuapp.com/hours", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json; charset=UTF-8'} })
            .catch(err => {
                alert("Se ha producido un error y sus horas no han sido cargadas")
            });
        }
    }


    const onChange = (event:React.KeyboardEvent<HTMLInputElement>, task:Task) => {
        let tasksCopy = tasks
        tasksCopy[task.code] = event.currentTarget.value
        let suma = 0
        Object.keys(tasksCopy).forEach((key:string)=>{
            suma += (parseFloat(tasksCopy[key]))
            setTotal(suma)
        })

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
                
            {/* <div className="self-end mr-10 border-2 text-center  rounded-xl shadow-lg text-slate-800 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer">

            </div> */}







 
    
            

        <Typography variant='h5' className={'mb-10'}></Typography>
        <LoadingIndicator show={isLoading} className={`flex flex-col items-start  transition-all duration-200`} >
            <div className="flex justify-between w-full" >
                <div  >
                <TextField disabled type='date' inputProps={{ max: new Date().toISOString().slice(0, 10) }} defaultValue={state.date}></TextField>
                </div>
                <div className="mr-10 border-2 text-center  rounded-xl shadow-lg text-slate-800 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer">
                    <Button onClick={handleAddOpen}>
                        <div className="m-4"> Guardar</div>
                    </Button>
                </div>
            </div>
            <CenteredModal isLoading={isLoading} onClose={handleClose} show={showAddModal} onSubmit={handleSubmit} label="¿Esta seguro que desea cargar las horas?" addbuttonLabel="Cargar Horas" >
                
                </CenteredModal>
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