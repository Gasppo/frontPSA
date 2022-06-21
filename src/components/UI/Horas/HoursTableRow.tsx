import { TableCell, TableRow } from '@mui/material';
import { Hours } from '../../types/resourcesTypes';
interface HoursTableRowProps {
    row: Hours
}

const HoursTableRow = (props: HoursTableRowProps) => {
    const { row } = props

    return (
        <TableRow hover key={row._id}>
            <TableCell align="left">2</TableCell>
            <TableCell align="left">Implementacion SAP</TableCell>
            <TableCell align="left">{row.task.code}</TableCell>
            <TableCell align="left">{row.task.name}</TableCell>
            <TableCell align="left">{row.task.description}</TableCell>
            <TableCell align="left">{row.duration}</TableCell>
        
        </TableRow>
    )
}

export default HoursTableRow