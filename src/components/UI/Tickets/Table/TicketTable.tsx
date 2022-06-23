import { Paper, Table, TableBody, TableContainer, TableFooter } from '@mui/material'
import { useState } from 'react'
import { Data, HeadCell, Order, Ticket, TicketProduct } from '../../../types/ticketTypes'
import EnhancedTicketTableHead from './EnhancedTicketTableHead'
import TicketTableRow from './TicketTableRow'
import DefaultTableFooter from '../../Table/DefaultTableFooter'


const tableHeaders = [
    { id: "id", label: "Codigo de identificacion", numeric: false },
    { id: "title", label: "Titulo", numeric: false },
    { id: "razonSocial", label: "Cliente", numeric: false },
    { id: "productName", label: "Producto", numeric: false },
    { id: "createdAt", label: "Fecha de creacion", numeric: false },
    { id: "updatedAt", label: "Ultima Modificacion", numeric: false },
    { id: "status", label: "Estado", numeric: false },
] as HeadCell[]

const headerTicket = [
    { headerId: "id", ticketId: "id" },
    { headerId: "title", ticketId: "title" },
    { headerId: "razonSocial", ticketId: "authorId" },
    { headerId: "productName", ticketId: "productId" },
    { headerId: "createdAt", ticketId: "createdAt" },
    { headerId: "updatedAt", ticketId: "updatedAt" },
    { headerId: "status", ticketId: "status" },
]


interface TicketTableProps {
    loadedTickets: Ticket[],
    resources: {
        id: number;
        CUIT: string;
        razonSocial: string;
    }[],
    products: TicketProduct[]
    onRefresh: () => void
    onTicketEdit: (id: number) => void
    onTicketView: (id: number) => void
}


const TicketTable = (props: TicketTableProps) => {

    const { loadedTickets, resources, products, onRefresh, onTicketEdit, onTicketView } = props

    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Data>('razonSocial');
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [page, setPage] = useState(0)

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data,) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const sortFunction = (a: any, b: any) => {
        const currKey = headerTicket.find(el => el.headerId === orderBy)?.ticketId || "title"
        if (order === 'asc') {
            if (a?.[currKey] < b?.[currKey]) return 1
            if (a?.[currKey] > b?.[currKey]) return -1
            return 0
        }
        if (a?.[currKey] < b?.[currKey]) return -1
        if (a?.[currKey] > b?.[currKey]) return 1
        return 0
    }


    return (
        <TableContainer component={Paper} className="mt-10"  >
            <Table>
                <EnhancedTicketTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} headers={tableHeaders} />
                <TableBody>
                    {loadedTickets &&
                        loadedTickets
                            .sort(sortFunction)
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(row => (
                                <TicketTableRow
                                    product={products.find(el => el.id === row.productId)}
                                    client={resources.find(el => el.id === row.authorId)}
                                    refresh={onRefresh}
                                    row={row}
                                    key={row.id}
                                    onEdit={onTicketEdit}
                                    onView={onTicketView}
                                />
                            ))}
                </TableBody>
                <TableFooter>
                    <DefaultTableFooter colSpan={8} count={loadedTickets.length || 0} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} page={page} rowsPerPage={rowsPerPage} />
                </TableFooter>
            </Table>
        </TableContainer>
    )
}

export default TicketTable
