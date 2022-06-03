import { TableCell, TableRow } from '@mui/material'
import React from 'react'
import { Ticket } from '../../types/ticketTypes'
import DeleteIcon from '@mui/icons-material/Delete';
interface TicketTableRowProps {
    row: Ticket,
    refresh: () => void
}

const TicketTableRow = (props: TicketTableRowProps) => {
    const { row, refresh } = props

    const deleteItems = () => {
        fetch(`http://localhost:4000/tickets/${row.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( res => refresh() )
        .catch(err => console.log(err))
    }

    return (
        <TableRow hover key={row.id}>
            <TableCell align="left">{row.id}</TableCell>
            <TableCell align="left">{row.title}</TableCell>
            <TableCell align="left">{row.author?.firstName || 'N/A'} {row.author?.lastName || 'N/A'}</TableCell>
            <TableCell align="left">{'Sin asignar'}</TableCell>
            <TableCell align="left">{new Date(row.createdAt).toLocaleDateString('es-AR')}</TableCell>
            <TableCell align="left">{new Date(row.updatedAt).toLocaleDateString('es-AR')}</TableCell>
            <TableCell align="left">{row.status}</TableCell>
            <TableCell align="right">
                <div className='hover:text-teal-600 text-slate-600 cursor-pointer' onClick={deleteItems}>
                    <DeleteIcon />
                </div>
            </TableCell>
        </TableRow>
    )
}

export default TicketTableRow
