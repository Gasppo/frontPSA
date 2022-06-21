import { useState, useEffect } from 'react'
import { MultiSelect } from "react-multi-select-component";
import Select, { SingleValue } from 'react-select'
import { TextField } from '@mui/material';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { proyectsAPI } from "../../components/dev/URIs"
import { SelectProyect, Proyect } from '../../components/types/resourcesTypes'
import TasksTableRow from '../../components/UI/Horas/TasksTableRow'
import LoadHoursTableRow from '../../components/UI/Horas/LoadHoursTableRow';
//import AddHourModal from '../../components/UI/Horas/AddHourModal';
//import DatePicker from "react-datepicker"


interface ReportePorProyectoProps {

}

const ReportePorProyecto = (props: ReportePorProyectoProps,) => {
    const [selected, setSelected] = useState<any>(0);
    const [proyectos, setProyectos] = useState<SelectProyect[]>([]);

    const fetchEmployees = () => {
        
        fetch('https://modulo-proyectos-psa-2022.herokuapp.com/projects')
            .then(res => res.json())
            .then(res => {
                console.log(res)
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

    useEffect(() => {
        fetchEmployees();

    }, [selected]);

    return (
        <>
            <div className="flex flex-row" >
                <Link to={'/recursos/'} >
                    <Button>Volver al inicio</Button>
                </Link>
            </div>

            <Select options={proyectos} onChange={(value) => setSelected(value)} />

        </>

    )
}

export default ReportePorProyecto