import { TableCell, TableRow } from '@mui/material'
import React from 'react'
import { Hours } from '../../types/resourcesTypes'
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import EditIcon from '@mui/icons-material/Edit';
interface HoursTableRowProps {
    row: Hours,
    refresh: () => void
    onEdit: (id: number) => void
}

const HoursTableRow = (props: HoursTableRowProps) => {
    const { row, refresh, onEdit } = props

    const deleteItems = () => {
        fetch(`${process.env.REACT_APP_SUPPORT_API || 'http://localhost:4000'}/tickets/${row.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => refresh())
            .catch(err => console.log(err))
    }

    return (
        <TableRow hover key={row.id}>
            <TableCell align="left">{row.idProyecto}</TableCell>
            <TableCell align="left">{row.prouecto}</TableCell>
            <TableCell align="left">{row.idTarea}</TableCell>
            <TableCell align="left">{row.tarea}</TableCell>
            <TableCell align="left">{row.descripcion}</TableCell>
            <TableCell align="left">{row.cantidadHoras}</TableCell>
        
        </TableRow>
    )
}

export default HoursTableRow