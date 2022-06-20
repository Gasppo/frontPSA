import { useState, useEffect } from 'react'
import { MultiSelect } from "react-multi-select-component";
import {  TextField } from '@mui/material';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { proyectsAPI } from "../../components/dev/URIs"
import { SelectProyect, Proyect, Task } from '../../components/types/resourcesTypes'
import TasksTableRow from '../../components/UI/Horas/TasksTableRow'
//import DatePicker from "react-datepicker"


interface AddHorasProps {

}




const AddHoras= (props: AddHorasProps) => {

    const [selected, setSelected] = useState<SelectProyect[]>([]);
    const [proyectos, setProyectos] = useState<SelectProyect[]>([]);
    const [tasks, setTasks] =useState<Task[]>([]);



    const fetchProyects = () => {
        fetch('https://modulo-proyectos-psa-2022.herokuapp.com/projects')
        .then(res => res.json())
        .then(res => {
            let projs: SelectProyect[] = [];
            res.forEach((item:any) => {
                let proj = {
                    label: item.name,
                    value: item.code
                }
                if(true)
                    projs.push(proj)
            })
            setProyectos(projs)
        })
        .catch(err => {
            console.log(JSON.stringify(err))
        })
    }

    const fetchTasks = () => { 
        fetch('https://modulo-proyectos-psa-2022.herokuapp.com/projects')
        .then(res => res.json())
        .then(res => {
            setTasks([])
            let proyectsId:any[] = []
            selected.forEach(item => proyectsId.push(item.value))
            let selectedProyects = res.filter((item:Proyect) => proyectsId.includes(item.code))
            let tasks:Task[] = []
            selectedProyects.forEach((element:Proyect) => {
                element.tasks.forEach((item:Task) => {
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

    }

    useEffect(() => {
        fetchProyects();
        fetchTasks();

    }, [selected]);

      
return(    
    <>
   
        
        <div className="flex flex-row" >
            <Link to={'/recursos/horasSemanales'} >
                <Button>Volver al inicio</Button>
            </Link>
            </div>

        <div>


 
            <TextField type='date'inputProps={{max: new Date().toISOString().slice(0, 10)}} defaultValue='2022-06-16'></TextField>


            <MultiSelect options={proyectos} value={selected} onChange={setSelected} labelledBy="Select" />

            <TableContainer component={Paper} className="mt-10"  >
                    <Table>
                        <TableHead>
                            <TableRow>
                            <TableCell align="left">Codigo de Proyecto</TableCell>
                                <TableCell align="left">Proyecto</TableCell>
                                <TableCell align="left">Codigo de Tarea</TableCell>
                                <TableCell align="left">Tarea</TableCell>
                                <TableCell align="left">Descripcion</TableCell>
                                <TableCell align='left'>Seleccionar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {tasks.map((row:Task)=><TasksTableRow row={row} key={row._id}/>)}
                        </TableBody>
                    </Table>
            </TableContainer>
        </div>

        <div className="self-end mr-10 border-2 text-center  rounded-xl shadow-lg text-slate-800 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer">
                    <Link to={'/recursos/horasSemanales/carga/seleccion'}>
                    <div className="m-4"> Siguiente</div>
                    </Link>
            </div>
    
        
        </>
        
    ) 
}

export default AddHoras