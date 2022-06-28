import EditIcon from '@mui/icons-material/Edit';
import { TableCell, TableRow, Button } from '@mui/material';
import { Product } from '../../types/productTypes';
import { Link } from 'react-router-dom'

interface ProductTableRowProps {
    row: Product,
    refresh: () => void
    onEdit: (id: number) => void
}

const ProductTableRow = (props: ProductTableRowProps) => {
    const { row, onEdit } = props

    const handleEdit = () => {
        onEdit(row.id)
    }

    return (
        <TableRow hover key={row.id}>
            <TableCell align="left">{row.id}</TableCell>
            <TableCell align="left">{row.name}</TableCell>
            <TableCell align="left"><Link to="/soporte/productsAndVersions/version" state={{productId:row.id, productName: row.name}}><Button>Ver Versiones</Button></Link></TableCell>
        </TableRow>
    )
}

export default ProductTableRow
