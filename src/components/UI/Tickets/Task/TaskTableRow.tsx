import { TableCell, TableRow } from '@mui/material';

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
}

const TaskTableRow = (props: TaskTableRowProps) => {
    const { row } = props


    return (
        <TableRow hover key={row.code} >
            <TableCell align="left" >{row.code}</TableCell>
            <TableCell align="left" >{row.name}</TableCell>
            <TableCell align="left" >{row.resource}</TableCell>
        </TableRow>
    )
}

export default TaskTableRow
