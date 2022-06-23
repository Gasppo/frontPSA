import { TableCell, TableRow } from '@mui/material';
import { Project } from '../../../../types/projectTypes';
import { Resource } from '../../../../types/resourceType';

type Task = {
    _id: string;
    priority: number;
    name: string;
    description: string;
    effort: number;
    resource: number;
    projectCode?: number;
    code: number;
    __v: number;
}


interface TaskTableRowProps {
    row: Task,
    resources: Resource[]
    proyectos: Project[]
}

const TaskTableRow = (props: TaskTableRowProps) => {
    const { row, resources, proyectos } = props

    const resource = resources.find(el => el.legajo === row.resource) || { legajo: 0, Nombre: 'N/A', Apellido: 'N/A' }
    const resourceName = `${resource.Apellido} ${resource.Nombre}`

    const proyecto = proyectos.find( el => el.code === row.projectCode)?.name || 'N/A'


    return (
        <TableRow hover key={row.code} >
            <TableCell align="left" >{row.code}</TableCell>
            <TableCell align="left" >{row.name}</TableCell>
            <TableCell align="left" >{resourceName}</TableCell>
            <TableCell align="left" >{proyecto}</TableCell>
        </TableRow>
    )
}

export default TaskTableRow
