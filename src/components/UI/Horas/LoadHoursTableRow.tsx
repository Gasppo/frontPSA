import { TableCell, TableRow } from '@mui/material'
import { Proyect, Task } from '../../types/resourcesTypes'
interface LoadHoursTableRowProps {
    row: Task,
}

const LoadHoursTableRow = (props: LoadHoursTableRowProps) => {
    const { row } = props

    return (
        <TableRow hover key={row._id}>
            <TableCell align="left">{row.proyectCode}</TableCell>
            <TableCell align="left">{row.proyectName}</TableCell>
            <TableCell align="left">{row.code}</TableCell>
            <TableCell align="left">{row.name}</TableCell>
            <TableCell align="left">{row.description}</TableCell>
            <TableCell align="left">
                <div className="flex flex-row" >
                    <input className="width-20" defaultValue={0}></input>
                </div>
            </TableCell>
        
        </TableRow>
    )
}

export default LoadHoursTableRow