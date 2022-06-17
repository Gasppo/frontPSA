import { TableCell, TableRow } from '@mui/material';
import {Client } from '../../types/clientTypes'

interface ClientTableRowProps {
    row: Client,
    refresh: () => void
    onEdit: (id: number) => void
}

const ClientTableRow = (props: ClientTableRowProps) => {
    const { row } = props

    return (
        <TableRow hover key={row.id}>
            <TableCell align="left">{row.id}</TableCell>
            <TableCell align="left">{row.razonSocial}</TableCell>
            <TableCell align="left">{row.CUIT}</TableCell>
        </TableRow>
    )
}

export default ClientTableRow
