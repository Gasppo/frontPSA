import { TableCell, TableRow } from '@mui/material';
import { Hours } from '../../types/resourcesTypes';
interface HoursTableRowProps {
    row: any
}

const HoursTableRow = (props: HoursTableRowProps) => {
    const { row } = props

    return (
        <TableRow hover key={row._id}>
            <TableCell align="left">{row.task.projectCode}</TableCell>
            <TableCell align="left">{row.task.code}</TableCell>
            <TableCell align="left">{row.task.name}</TableCell>
            <TableCell align="left">{row.task.description}</TableCell>
            <TableCell align="left">{row.duration}</TableCell>
        
        </TableRow>
    )
}

export default HoursTableRow