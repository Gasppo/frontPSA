import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LoadingIndicator from '../../components/Loading/LoadingIndicator'
import { Ticket } from '../../components/types/ticketTypes'
import PageTitle from '../../components/UI/Dashboard/PageTitle'
import AddTicketModal from '../../components/UI/Tickets/AddTicketModal'
import TicketTableRow from '../../components/UI/Tickets/TicketTableRow'


const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface TicketsProps {

}

const Tickets = (props: TicketsProps) => {
    const [loadedTickets, setLoadedTickets] = useState<Ticket[]>([])
    const [isLoading, setLoading] = useState<boolean>(false)
    const [showModal, setShowModal] = useState(false)


    const handleModalOpen = () => {
        setShowModal(true)
    }

    const handleModalClose = () => {
        setShowModal(false)
    }

    const handleSubmit = () => {
        gatherTickets()
        setShowModal(false)
    }

    const gatherTickets = () => {
        setLoading(true)
        fetch('http://localhost:4000/tickets/full')
            .then(res => res.json())
            .then(res => {
                setLoadedTickets(res.tickets)

            })
            .catch(err => console.log(err))
        sleep(3000).then(res => setLoading(false))
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
            <LoadingIndicator show={isLoading} className={`flex flex-col items-start  transition-all duration-200`} >
                <Typography variant='h5' className={'mb-10'}>Mis Tickets</Typography>
                {!isLoading && (<>
                    <div className="self-end mr-10 border-2 text-center  rounded-xl shadow-lg text-slate-800 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={handleModalOpen}>
                        <div className="m-4" > Agregar Ticket</div>
                    </div>

                    <AddTicketModal onSubmit={handleSubmit} onClose={handleModalClose} show={showModal} />
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
                                {loadedTickets && loadedTickets.map(row => <TicketTableRow refresh={gatherTickets} row={row} key={row.id} />)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
                )}
            </LoadingIndicator>
        </>
    )
}

export default Tickets
