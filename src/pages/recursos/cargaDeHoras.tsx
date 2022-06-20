import { useState, useEffect } from 'react'
import { MultiSelect } from "react-multi-select-component";
import {  TextField } from '@mui/material';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { proyectsAPI } from "../../components/dev/URIs"
import { SelectProyect, Proyect, Task } from '../../components/types/resourcesTypes'
import TasksTableRow from '../../components/UI/Horas/TasksTableRow'
//import DatePicker from "react-datepicker"


interface CargaDeHorasProps {

}




const CargaDeHoras= (props: CargaDeHorasProps,) => {

    const [selected, setSelected] = useState<SelectProyect[]>([]);
    const [proyectos, setProyectos] = useState<SelectProyect[]>([]);
    const [tasks, setTasks] =useState<Task[]>([]);

    useEffect(() => {

    });

      
return(    
    <>
   
        
        <div className="flex flex-row" >
            <Link to={'/recursos/horasSemanales/carga/'} >
                <Button>Volver atras</Button>
            </Link>
            </div>

        <div>


 
            <TextField disabled type='date'inputProps={{max: new Date().toISOString().slice(0, 10)}} defaultValue='2022-06-16'></TextField>

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
                        {tasks.map((row:Task)=><TasksTableRow row={row} key={row._id}/>)}
                        </TableBody>
                    </Table>
            </TableContainer>
        </div>

        <div className="self-end mr-10 border-2 text-center  rounded-xl shadow-lg text-slate-800 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer">
                    <Link to={'/recursos/horasSemanales'}>
                    <div className="m-4"> Guardar</div>
                    </Link>
            </div>
    
        
        </>
        
    ) 
}

export default CargaDeHoras