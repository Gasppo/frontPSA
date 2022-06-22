import EditIcon from '@mui/icons-material/Edit';
import { TableCell, TableRow } from '@mui/material';
import { Ticket, TicketProduct } from '../../../types/ticketTypes';

interface TicketTableRowProps {
    row: Ticket,
    refresh: () => void
    onEdit: (id: number) => void,
    product?: TicketProduct
    client?: {
        id: number;
        CUIT: string;
        razonSocial: string;
    }
    onView: (id: number) => void
}

const TicketTableRow = (props: TicketTableRowProps) => {
    const { row, onEdit, onView, product, client } = props

    const handleEdit = () => {
        onEdit(row.id)
    }

    // const handleAsignTask = () => {
    //     console.log('TODO')
    // }

    const handleOpenDetails = () => {
        onView(row.id)
    }

    return (
        <TableRow hover key={row.id} >
            <TableCell align="left" onClick={handleOpenDetails} className="cursor-pointer" >{row.id}</TableCell>
            <TableCell align="left" onClick={handleOpenDetails} className="cursor-pointer">{row.title}</TableCell>
            <TableCell align="left" onClick={handleOpenDetails} className="cursor-pointer">{client?.razonSocial || 'N/A'}</TableCell>
            <TableCell align="left" onClick={handleOpenDetails} className="cursor-pointer">{product?.name || 'N/A'}</TableCell>
            <TableCell align="left" onClick={handleOpenDetails} className="cursor-pointer">{new Date(row.createdAt).toLocaleDateString('es-AR')}</TableCell>
            <TableCell align="left" onClick={handleOpenDetails} className="cursor-pointer">{new Date(row.updatedAt).toLocaleDateString('es-AR')}</TableCell>
            <TableCell align="left" onClick={handleOpenDetails} className="cursor-pointer">{row.status}</TableCell>
            <TableCell align="right">
                <div className="flex flex-row justify-end">
                    <div className='hover:text-teal-600 text-slate-600 cursor-pointer' onClick={handleEdit}>
                        <EditIcon />
                    </div>
                    {/* <div className='hover:text-teal-600 text-slate-600 cursor-pointer' onClick={handleAsignTask}>
                        <PersonAddAlt1Icon />
                    </div> */}
                </div>
            </TableCell>
        </TableRow>
    )
}

export default TicketTableRow
