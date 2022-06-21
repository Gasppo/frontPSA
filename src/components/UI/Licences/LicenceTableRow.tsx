import EditIcon from '@mui/icons-material/Edit';
import { TableCell, TableRow } from '@mui/material';
import { Licence } from '../../types/productTypes';

interface TicketTableRowProps {
    row: Licence,
    refresh: () => void
    onEdit: (id: number) => void
}

const TicketTableRow = (props: TicketTableRowProps) => {
    const { row, onEdit } = props

    const handleEdit = () => {
        onEdit(row.id)
    }

    const date = new Date(row.expirationDate)
    date.setDate(date.getDate() + 1)

    return (
        <TableRow hover key={row.id}>
            <TableCell align="left">{row.id}</TableCell>
            <TableCell align="left">{row.productName}</TableCell>
            <TableCell align="left">{row.versionName}</TableCell>
            <TableCell align="left">{row.clientName}</TableCell>
            <TableCell align="left">{date.toLocaleDateString('es-AR') }</TableCell>
            <TableCell align="left">{row.state}</TableCell>
            <TableCell align="right">
                <div className="flex flex-row justify-end" >
                    <div className='hover:text-teal-600 text-slate-600 cursor-pointer' onClick={handleEdit}>
                        <EditIcon />
                    </div>
                </div>
            </TableCell>
        </TableRow>
    )
}

export default TicketTableRow
