import { Button, Paper, Table, TableBody, TableContainer, TableFooter, TablePagination, TableRow, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ticketSupportURI } from '../../components/dev/URIs'
import LoadingIndicator from '../../components/Loading/LoadingIndicator'
import { Ticket } from '../../components/types/ticketTypes'
import PageTitle from '../../components/UI/Dashboard/PageTitle'
import AddTicketModal from '../../components/UI/Tickets/AddTicketModal'
import EditTicketModal from '../../components/UI/Tickets/EditTicketModal'
import EnhancedTableHead from '../../components/UI/Tickets/EnhancedTableHead'
import TicketTableRow from '../../components/UI/Tickets/TicketTableRow'

type Order = 'asc' | 'desc';
interface Data {
    id: number;
    title: string;
    razonSocial: string;
    productName: string;
    createdAt: string;
    status: string;
    updatedAt: string
}

interface TicketsProps {

}
interface HeadCell {
    id: keyof Data;
    label: string;
    numeric?: boolean;
}

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


const Tickets = (props: TicketsProps) => {

    const [loadedTickets, setLoadedTickets] = useState<Ticket[]>([])
    const [isLoading, setLoading] = useState<boolean>(false)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [currentId, setCurrentID] = useState<number | null>(null)
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Data>('razonSocial');
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [page, setPage] = useState(0)

    const handleAddOpen = () => {
        setShowAddModal(true)
    }

    const handleEditOpen = (id: number) => {
        setCurrentID(id)
        setShowEditModal(true)
    }

    const handleClose = () => {
        setShowAddModal(false)
        setShowEditModal(false)
    }

    const handleSubmit = () => {
        gatherTickets()
        setShowAddModal(false)
        setShowEditModal(false)
    }

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


    const gatherTickets = useCallback(() => {
        setLoading(true)
        fetch(`${ticketSupportURI}/tickets/full`)
            .then(res => res.json())
            .then(res => {
                setLoadedTickets(res.tickets)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }, [])

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

    useEffect(() => {
        gatherTickets()
    }, [gatherTickets]);

    return (
        <>
            <PageTitle label='Soporte'>
                <div className="flex flex-row" >
                    <Link to={'/'}>
                        <Button>Inicio</Button>
                    </Link>
                    <Button disabled>{'>'}</Button>
                    <Link to={'/soporte'}>
                        <Button>Soporte</Button>
                    </Link>
                </div>
            </PageTitle>
            <Typography variant='h5' className={'mb-10'}>Tickets</Typography>
            <LoadingIndicator show={isLoading} className={`flex flex-col items-start  transition-all duration-200`} >
                <div className="self-end mr-10 border-2 text-center  rounded-xl shadow-lg text-slate-800 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={handleAddOpen}>
                    <div className="m-4" > Crear Ticket</div>
                </div>
                <AddTicketModal onSubmit={handleSubmit} onClose={handleClose} show={showAddModal} />
                <EditTicketModal onSubmit={handleSubmit} onClose={handleClose} show={showEditModal} currentId={currentId} />
                <TableContainer component={Paper} className="mt-10"  >
                    <Table>
                        <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} headers={tableHeaders} />
                        <TableBody>
                            {loadedTickets &&
                                loadedTickets
                                    .sort(sortFunction)
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(row => <TicketTableRow refresh={gatherTickets} row={row} key={row.id} onEdit={handleEditOpen} />)}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={8}
                                    count={loadedTickets.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </LoadingIndicator>
        </>
    )
}

export default Tickets
