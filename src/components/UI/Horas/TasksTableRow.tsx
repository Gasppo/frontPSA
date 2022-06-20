import { TableCell, TableRow } from '@mui/material'
import React from 'react'
import { Hours } from '../../types/resourcesTypes'
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import EditIcon from '@mui/icons-material/Edit';
import { Proyect, Task } from '../../types/resourcesTypes'
interface TasksTableRowProps {
    row: Task,
}

const TasksTableRow = (props: TasksTableRowProps) => {
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
                    <input type="checkbox"></input>
                </div>
            </TableCell>
        
        </TableRow>
    )
}

export default TasksTableRow