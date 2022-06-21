import { useState, useEffect } from 'react'
import { MultiSelect } from "react-multi-select-component";
import Select, { SingleValue } from 'react-select'
import { TextField } from '@mui/material';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { proyectsAPI } from "../../components/dev/URIs"
import { SelectResource, Resource } from '../../components/types/resourcesTypes'
import TasksTableRow from '../../components/UI/Horas/TasksTableRow'
import LoadHoursTableRow from '../../components/UI/Horas/LoadHoursTableRow';
//import AddHourModal from '../../components/UI/Horas/AddHourModal';
//import DatePicker from "react-datepicker"


interface ReportePorPersonaProps {

}


const ReportePorPersona = (props: ReportePorPersonaProps,) => {
    const [selected, setSelected] = useState<any>(0);
    const [recursos, setRecursos] = useState<SelectResource[]>([]);
    const [horas_trabajas, setHorasTrabajadas] = useState<any>(0);

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

            <Select options={recursos} onChange={(value) => setSelected(value)} />

        </>

    )
}

export default ReportePorPersona