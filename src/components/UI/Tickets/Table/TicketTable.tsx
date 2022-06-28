import { Paper, Table, TableBody, TableContainer, TableFooter } from '@mui/material'
import { useState } from 'react'
import { Resource } from '../../../types/resourcesTypes'
import { Data, HeadCell, Order, Ticket, TicketProduct } from '../../../types/ticketTypes'
import DefaultTableFooter from '../../Table/DefaultTableFooter'
import Filter from '../../Table/Filter'
import EnhancedTicketTableHead from './EnhancedTicketTableHead'
import TicketTableRow from './TicketTableRow'

const tableHeaders = [
    { id: "id", label: "Codigo de identificacion", numeric: false },
    { id: "title", label: "Titulo", numeric: false },
    { id: "razonSocial", label: "Cliente", numeric: false },
    { id: "productName", label: "Producto", numeric: false },
    { id: "asigneeName", label: "Soporte Asignado", numeric: false },
    { id: "createdAt", label: "Fecha de creacion", numeric: false },
    { id: "updatedAt", label: "Ultima Modificacion", numeric: false },
    { id: "status", label: "Estado", numeric: false },
] as HeadCell[]

const headerTicket = [
    { headerId: "id", ticketId: "id" },
    { headerId: "title", ticketId: "title" },
    { headerId: "razonSocial", ticketId: "authorId" },
    { headerId: "productName", ticketId: "productId" },
    { headerId: "asigneeName", ticketId: "asigneeId" },
    { headerId: "createdAt", ticketId: "createdAt" },
    { headerId: "updatedAt", ticketId: "updatedAt" },
    { headerId: "status", ticketId: "status" },
]


interface TicketTableProps {
    loadedTickets: Ticket[],
    clients: {
        id: number;
        CUIT: string;
        razonSocial: string;
    }[],
    resources: Resource[]
    products: TicketProduct[]
    onTicketEdit: (id: number) => void
    onTicketView: (id: number) => void
    onTicketAssign: (id: number) => void
}


const TicketTable = (props: TicketTableProps) => {

    const { loadedTickets, clients, products, onTicketEdit, onTicketView, onTicketAssign, resources } = props

    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Data>('updatedAt');
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [page, setPage] = useState(0)
    const [filterKey, setFilterKey] = useState<string>('id')
    const [filterValue, setFilterValue] = useState('')

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

    const handleFilterKeyChange = (key: string) => {
        setFilterKey(key)
    }

    const handleFilterValueChange = (value: string) => {
        setFilterValue(value)
    }

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

    const findAsigneeName = (row: Ticket) => {
        const asignee = row.asigneeId ? resources.find(el => el.legajo === row.asigneeId) : undefined
        return (asignee?.Nombre && asignee?.Apellido) ? `${asignee?.Nombre} ${asignee?.Apellido}` : `Sin asignar`
    }

    const fullTickets = loadedTickets
        .map(row => ({
            ...row,
            productName: products.find(el => el.id === row.productId)?.name || 'N/A',
            razonSocial: clients.find(el => el.id === row.authorId)?.razonSocial || 'N/A',
            asigneeName: findAsigneeName(row),
        }))
        .filter((row: any) => filterKey in row ? row[filterKey]?.toString()?.toLowerCase()?.includes(filterValue?.toLowerCase()) : false)

    return (
        <TableContainer component={Paper} className="mt-10"  >
            <Filter data={fullTickets || []} currentKey={filterKey} value={filterValue} onKeyChange={handleFilterKeyChange} onValueChange={handleFilterValueChange} filterOptions={tableHeaders} filterKey="id" filterText='label' />
            <Table>
                <EnhancedTicketTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} headers={tableHeaders} />
                <TableBody>
                    {fullTickets &&
                        fullTickets
                            .sort(sortFunction)

                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(row => (
                                <TicketTableRow
                                    row={row}
                                    key={row.id}
                                    onEdit={onTicketEdit}
                                    onView={onTicketView}
                                    onAssign={onTicketAssign}
                                />
                            ))}
                </TableBody>
                <TableFooter>
                    <DefaultTableFooter colSpan={9} count={fullTickets.length || 0} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} page={page} rowsPerPage={rowsPerPage} />
                </TableFooter>
            </Table>
        </TableContainer>
    )
}

export default TicketTable
