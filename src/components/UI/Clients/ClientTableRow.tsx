import { TableCell, TableRow } from '@mui/material';
import {Client } from '../../types/clientTypes'

interface ClientTableRowProps {
    row: Client,
    refresh: () => void
}

const ClientTableRow = (props: ClientTableRowProps) => {
    const { row } = props

    return (
        <TableRow hover key={row.id}>
            <TableCell align="left">{row.id}</TableCell>
            <TableCell align="left">{row.razon_social}</TableCell>
            <TableCell align="left">{row.cuit}</TableCell>
        </TableRow>
    )
}

export default ClientTableRow
