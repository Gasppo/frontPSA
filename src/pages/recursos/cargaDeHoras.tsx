import { useState, useEffect } from 'react'
import { MultiSelect } from "react-multi-select-component";
import { TextField } from '@mui/material';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { proyectsAPI } from "../../components/dev/URIs"
import { SelectProyect, Proyect, Task } from '../../components/types/resourcesTypes'
import TasksTableRow from '../../components/UI/Horas/TasksTableRow'
import LoadHoursTableRow from '../../components/UI/Horas/LoadHoursTableRow';
import AddHourModal from '../../components/UI/Horas/AddHourModal';
//import AddHourModal from '../../components/UI/Horas/AddHourModal';
//import DatePicker from "react-datepicker"


interface CargaDeHorasProps {

}




const CargaDeHoras = (props: CargaDeHorasProps,) => {

    const [tasks, setTasks] = useState<{[id: string]:string}>({});
    const [showAddModal, setShowAddModal] = useState(false)

    const { state }: any = useLocation()

    const handleAddOpen = () => {
        setShowAddModal(true)
    }
    const handleSubmit = () => {
        /* cargar las horas */
        alert("Las horas han sido cargadas")
    }

    const handleClose = () => {
        setShowAddModal(false);
    }



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
        console.log(tasks)
    }


    return (
        <>


            <div className="flex flex-row" >
                <Link to={'/recursos/horasSemanales/carga/'} >
                    <Button>Volver atras</Button>
                </Link>
            </div>

            <div>



                <TextField disabled type='date' inputProps={{ max: new Date().toISOString().slice(0, 10) }} defaultValue='2022-06-16'></TextField>

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
                            {state?.items.map((row: Task) => <LoadHoursTableRow row={row} key={row._id} onChange={onChange}/>) || []}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <div className="self-end mr-10 border-2 text-center  rounded-xl shadow-lg text-slate-800 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer">
                <Button onClick={sendHoursToAPI}>
                    <div className="m-4"> Guardar</div>
                </Button>
            </div>
            <AddHourModal onSubmit={handleSubmit} onClose={handleClose} show={showAddModal}></AddHourModal>

        </>

    )
}

export default CargaDeHoras