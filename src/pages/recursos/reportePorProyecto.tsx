import { useState, useEffect } from 'react'
import { MultiSelect } from "react-multi-select-component";
import Select, { SingleValue } from 'react-select'
import { TextField } from '@mui/material';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { proyectsAPI } from "../../components/dev/URIs"
import { SelectProyect, Proyect, Task } from '../../components/types/resourcesTypes'
import TasksTableRow from '../../components/UI/Horas/TasksTableRow'
import LoadHoursTableRow from '../../components/UI/Horas/LoadHoursTableRow';
import ProyectReportTableRow from '../../components/UI/Reports/proyectReportTableRow';
import { SettingsSystemDaydreamSharp } from '@mui/icons-material';
//import AddHourModal from '../../components/UI/Horas/AddHourModal';
//import DatePicker from "react-datepicker"


interface ReportePorProyectoProps {

}

const ReportePorProyecto = (props: ReportePorProyectoProps,) => {
    const [selected, setSelected] = useState<any>(0);
    const [proyectos, setProyectos] = useState<SelectProyect[]>([]);
    const [tareas, setTareas] = useState<Task[]>([]);

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
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })
    }
  
    const fetchHours = () => {
  
        fetch('https://modulo-recursos-psa.herokuapp.com/reports/project/223')
        .then(res => res.json())
        .then(res => {
            console.log(res)
            console.log(res.tasks)
            //let horasId = res.filter((element:Hours) => {return element.hourAssignee==4})
            //let horasAgrupadasPorTask:{[id: string]:Hours[]} = {}
            let tareasDeProyecto: Task[] = []
            res.tasks.forEach((item:Task) => {
                let tareaAMostrar: Task ={
                    _id: item._id,
                    priority:item.priority,
                    name: item.name,
                    description: item.description,
                    effort:item.effort,
                    resource:item.resource,
                    code:item.code,
                    _v: item._v,
                    proyectCode: item.proyectCode,
                    proyectName: item.proyectName,
                    totalHours:item.totalHours,
                }
                tareasDeProyecto.push(tareaAMostrar)
            });
            console.log(tareasDeProyecto)
            setTareas(tareasDeProyecto)
        })
        .catch(err => {
            console.log(JSON.stringify(err))
        })

    }



    useEffect(() => {
        fetchEmployees();
        fetchHours();

    }, [selected]);

    return (
        <>
            <div className="flex flex-row" >
                <Link to={'/recursos/'} >
                    <Button>Volver al inicio</Button>
                </Link>
            </div>

            <Select options={proyectos} onChange={(value) => setSelected(value)} />

            <TableContainer component={Paper} className="mt-10"  >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Codigo de Proyecto</TableCell>
                                <TableCell align="left">Proyecto</TableCell>
                                <TableCell align="left">Codigo de Tarea</TableCell>
                                <TableCell align="left">Tarea</TableCell>
                                <TableCell align="left">Descripcion</TableCell>
                                <TableCell align="left">Cantidad de Horas</TableCell>
                            </TableRow>
                        </TableHead>
                       {<TableBody>
                            {tareas.map((row:Task)=><ProyectReportTableRow row={row} key={row._id}/>)}
                        </TableBody>}
                    </Table>
                </TableContainer>

        </>

    )
}

export default ReportePorProyecto