import { TableCell, TableRow } from '@mui/material'
import React, { useState } from 'react'
import { Hours } from '../../types/resourcesTypes'
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import EditIcon from '@mui/icons-material/Edit';
import { Proyect, Task } from '../../types/resourcesTypes'
interface TasksTableRowProps {
    row: Task,
    onSelect: (item: any) => void,
    onRemove: (itemId: number) => void
}

const TasksTableRow = (props: TasksTableRowProps) => {
    const [selected, setSelected] = useState<boolean>(false)
    const { row, onSelect, onRemove } = props

    const handleChange = (e: any) => {
        setSelected(prev => !prev)
        !selected ? onSelect(row) : onRemove(row.code)
    }

    return (
        <TableRow hover key={row._id}>
            <TableCell align="left">{row.proyectCode}</TableCell>
            <TableCell align="left">{row.proyectName}</TableCell>
            <TableCell align="left">{row.code}</TableCell>
            <TableCell align="left">{row.name}</TableCell>
            <TableCell align="left">{row.description}</TableCell>
            <TableCell align="left">
                <div className="flex flex-row" >
                    <input type="checkbox" checked={selected} onChange={handleChange}></input>
                </div>
            </TableCell>

        </TableRow>
    )
}

export default TasksTableRow