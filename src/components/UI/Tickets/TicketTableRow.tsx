import EditIcon from '@mui/icons-material/Edit';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { TableCell, TableRow } from '@mui/material';
import { product } from '../../dev/dummyData';
import { Ticket } from '../../types/ticketTypes';
interface TicketTableRowProps {
    row: Ticket,
    refresh: () => void
    onEdit: (id: number) => void
}

const TicketTableRow = (props: TicketTableRowProps) => {
    const { row, onEdit } = props

    const productName = product.find(el => el.id === row.productId)?.name

    const handleEdit = () => {
        onEdit(row.id)
    }

    const handleAsignTask = () => {
        console.log('TODO')
    }

    return (
        <TableRow hover key={row.id}>
            <TableCell align="left">{row.id}</TableCell>
            <TableCell align="left">{row.title}</TableCell>
            <TableCell align="left">{row.author?.razonSocial || 'N/A'}</TableCell>
            <TableCell align="left">{productName || 'N/A'}</TableCell>
            <TableCell align="left">{new Date(row.createdAt).toLocaleDateString('es-AR')}</TableCell>
            <TableCell align="left">{new Date(row.updatedAt).toLocaleDateString('es-AR')}</TableCell>
            <TableCell align="left">{row.status}</TableCell>
            <TableCell align="right">
                <div className="flex flex-row justify-end" >
                    <div className='hover:text-teal-600 text-slate-600 cursor-pointer' onClick={handleEdit}>
                        <EditIcon />
                    </div>
                    <div className='hover:text-teal-600 text-slate-600 cursor-pointer' onClick={handleAsignTask}>
                        <PersonAddAlt1Icon />
                    </div>
                </div>
            </TableCell>
        </TableRow>
    )
}

export default TicketTableRow
