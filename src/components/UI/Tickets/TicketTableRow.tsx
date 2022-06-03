import { TableCell, TableRow } from '@mui/material'
import React from 'react'
import { Ticket } from '../../types/ticketTypes'

interface TicketTableRowProps {
    row: Ticket
}

const TicketTableRow = (props: TicketTableRowProps) => {
    const {row} = props
    
    return (
        <TableRow hover key={row.id} className="cursor-pointer">
            <TableCell align="left">{row.id}</TableCell>
            <TableCell align="left">{row.title}</TableCell>
            <TableCell align="left">{row.author?.firstName || 'N/A'} {row.author?.lastName || 'N/A'}</TableCell>
            <TableCell align="left">{'Sin asignar'}</TableCell>
            <TableCell align="left">{new Date(row.createdAt).toLocaleDateString('es-AR')}</TableCell>
            <TableCell align="left">{new Date(row.updatedAt).toLocaleDateString('es-AR')}</TableCell>
            <TableCell align="left">{row.status}</TableCell>
        </TableRow>
    )
}

export default TicketTableRow
