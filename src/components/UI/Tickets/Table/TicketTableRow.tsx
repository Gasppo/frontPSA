import EditIcon from '@mui/icons-material/Edit';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { TableCell, TableRow } from '@mui/material';
import { Ticket } from '../../../types/ticketTypes';

interface TicketTableRowProps {
    row: Ticket & {
        productName: string;
        razonSocial: string;
        asigneeName: string;
    }
    refresh: () => void
    onEdit: (id: number) => void
    onView: (id: number) => void
    onAssign: (id: number) => void
}

const TicketTableRow = (props: TicketTableRowProps) => {
    const { row, onEdit, onView, onAssign } = props

    const handleEdit = () => {
        onEdit(row.id)
    }

    const handleAsignSupport = () => {
        onAssign(row.id)
    }

    const handleOpenDetails = () => {
        onView(row.id)
    }

    return (
        <TableRow hover key={row.id} >
            <TableCell align="left" onClick={handleOpenDetails} className="cursor-pointer" >{row.id}</TableCell>
            <TableCell align="left" onClick={handleOpenDetails} className="cursor-pointer">{row.title}</TableCell>
            <TableCell align="left" onClick={handleOpenDetails} className="cursor-pointer">{row.razonSocial || 'N/A'}</TableCell>
            <TableCell align="left" onClick={handleOpenDetails} className="cursor-pointer">{row.productName || 'N/A'}</TableCell>
            <TableCell align="left" onClick={handleOpenDetails} className="cursor-pointer">{row.asigneeName || 'Sin asignar'}</TableCell>
            <TableCell align="left" onClick={handleOpenDetails} className="cursor-pointer">{new Date(row.createdAt).toLocaleDateString('es-AR')}</TableCell>
            <TableCell align="left" onClick={handleOpenDetails} className="cursor-pointer">{new Date(row.updatedAt).toLocaleDateString('es-AR')}</TableCell>
            <TableCell align="left" onClick={handleOpenDetails} className="cursor-pointer">{row.status}</TableCell>
            <TableCell align="right">
                <div className="flex flex-row justify-end">
                    <div className='hover:text-teal-600 text-slate-600 cursor-pointer' onClick={handleAsignSupport}>
                        <PersonAddAlt1Icon />
                    </div>
                    <div className='hover:text-teal-600 text-slate-600 cursor-pointer' onClick={handleEdit}>
                        <EditIcon />
                    </div>
                </div>
            </TableCell>
        </TableRow>
    )
}

export default TicketTableRow
