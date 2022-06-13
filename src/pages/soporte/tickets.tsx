import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LoadingIndicator from '../../components/Loading/LoadingIndicator'
import { Ticket } from '../../components/types/ticketTypes'
import PageTitle from '../../components/UI/Dashboard/PageTitle'
import AddTicketModal from '../../components/UI/Tickets/AddTicketModal'
import EditTicketModal from '../../components/UI/Tickets/EditTicketModal'
import TicketTableRow from '../../components/UI/Tickets/TicketTableRow'


const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface TicketsProps {

}

const Tickets = (props: TicketsProps) => {
    const [loadedTickets, setLoadedTickets] = useState<Ticket[]>([])
    const [isLoading, setLoading] = useState<boolean>(false)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [currentId, setCurrentID] = useState<number | null>(null)

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


    const gatherTickets = () => {
        setLoading(true)
        fetch(`${process.env.REACT_APP_SUPPORT_API || 'http://localhost:4000'}/tickets/full`)
            .then(res => res.json())
            .then(res => {
                setLoadedTickets(res.tickets)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }

    useEffect(() => {
        gatherTickets()
    }, []);

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
            <Typography variant='h5' className={'mb-10'}>Mis Tickets</Typography>
            <LoadingIndicator show={isLoading} className={`flex flex-col items-start  transition-all duration-200`} >

                <div className="self-end mr-10 border-2 text-center  rounded-xl shadow-lg text-slate-800 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={handleAddOpen}>
                    <div className="m-4" > Agregar Ticket</div>
                </div>

                <AddTicketModal onSubmit={handleSubmit} onClose={handleClose} show={showAddModal} />
                <EditTicketModal onSubmit={handleSubmit} onClose={handleClose} show={showEditModal} currentId={currentId} />
                <TableContainer component={Paper} className="mt-10"  >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Codigo de identificacion</TableCell>
                                <TableCell align="left">Titulo</TableCell>
                                <TableCell align="left">Creado por</TableCell>
                                <TableCell align="left">Recurso asignado</TableCell>
                                <TableCell align="left">Fecha de creacion</TableCell>
                                <TableCell align="left">Ultima Modificacion</TableCell>
                                <TableCell align="left">Estado</TableCell>
                                <TableCell align="right">Accciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loadedTickets && loadedTickets.map(row => <TicketTableRow refresh={gatherTickets} row={row} key={row.id} onEdit={handleEditOpen} />)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </LoadingIndicator>
        </>
    )
}

export default Tickets
