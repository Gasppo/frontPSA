import { Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingIndicator from '../../components/Loading/LoadingIndicator'
import PageTitle from '../../components/UI/Dashboard/PageTitle'
import PageLinker from '../../components/UI/Inputs/PageLinker'
import AddTicketModal from '../../components/UI/Tickets/Modals/AddTicketModal'
import AssignSupportModal from '../../components/UI/Tickets/Modals/AssignSupportModal'
import CreateTicketButton from '../../components/UI/Tickets/Modals/CreateTicketButton'
import EditTicketModal from '../../components/UI/Tickets/Modals/EditTicketModal'
import TicketDetailsModal from '../../components/UI/Tickets/Modals/TicketDetailsModal'
import TicketTable from '../../components/UI/Tickets/Table/TicketTable'
import { useServiceData } from '../../hooks/useServiceData'

interface TicketsProps {

}


const Tickets = (props: TicketsProps) => {
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showAsignModal, setShowAsignModal] = useState(false)
    const [currentId, setCurrentID] = useState<number>(0)
    const [showCurrTicket, setShowCurrTicket] = useState<boolean>(false)


    const { clients, products, resources, loading, tickets: loadedTickets, refreshData } = useServiceData()

    const navigate = useNavigate()

    const handleAddOpen = () => {
        setShowAddModal(true)
    }

    const handleEditOpen = (id: number) => {
        setCurrentID(id)
        setShowEditModal(true)
    }

    const handleAsignOpen = (id: number) => {
        setCurrentID(id)
        setShowAsignModal(true)
    }

    const handleTicketOpen = (id: number) => {
        navigate(`/soporte/tickets/${id}`)
    }

    const handleClose = () => {
        setShowAddModal(false)
        setShowEditModal(false)
        setShowAsignModal(false)
        setShowCurrTicket(false)

    }

    const handleSubmit = () => {
        refreshData()
        setShowAddModal(false)
        setShowAsignModal(false)
        setShowEditModal(false)
    }


    const links = [
        { label: "Inicio", href: "/" },
        { label: "Soporte", href: "/soporte" },
    ]

    return (
        <>
            <PageTitle label='Soporte'>
                <PageLinker links={links} />
            </PageTitle>
            <Typography variant='h5' className={'mb-10'}>Tickets</Typography>
            <LoadingIndicator show={loading} className={`flex flex-col items-start  transition-all duration-200`} >
                <CreateTicketButton onClick={handleAddOpen} />
                <AddTicketModal onSubmit={handleSubmit} onClose={handleClose} show={showAddModal} clients={clients} products={products} />
                <EditTicketModal onSubmit={handleSubmit} onClose={handleClose} show={showEditModal} currentId={currentId} clients={clients} products={products} />
                <AssignSupportModal onSubmit={handleSubmit} resources={resources} show={showAsignModal} onClose={handleClose} currentId={currentId} />
                {showCurrTicket && <TicketDetailsModal currTicket={loadedTickets.find(ticket => ticket.id === currentId)} onClose={handleClose} show={showCurrTicket} resources={resources} clients={clients} products={products} />}
                <TicketTable onTicketAssign={handleAsignOpen} loadedTickets={loadedTickets} onTicketEdit={handleEditOpen} onTicketView={handleTicketOpen} products={products} clients={clients} resources={resources} />
            </LoadingIndicator>
        </>
    )
}

export default Tickets
