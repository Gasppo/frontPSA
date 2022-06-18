import EditIcon from '@mui/icons-material/Edit';
import { TableCell, TableRow, Button } from '@mui/material';
import { Version } from '../../types/productTypes';

interface VersionTableRowProps {
    row: Version,
    refresh: () => void
    onEdit: (id: number) => void
}

const VersionTableRow = (props: VersionTableRowProps) => {
    const { row, onEdit } = props

    const handleEdit = () => {
        onEdit(row.id)
    }

    return (
        <TableRow hover key={row.id}>
            <TableCell align="left">{row.id}</TableCell>
            <TableCell align="left">{row.name}</TableCell>
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

export default VersionTableRow
