import { Typography } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getExternalResources, getInternalResources, getProducts } from '../../components/api/ticketSupport'
import { ticketSupportURI } from '../../components/dev/URIs'
import LoadingIndicator from '../../components/Loading/LoadingIndicator'
import { Ticket, TicketProduct } from '../../components/types/ticketTypes'
import PageTitle from '../../components/UI/Dashboard/PageTitle'
import AddTicketModal from '../../components/UI/Tickets/Modals/AddTicketModal'
import CreateTicketButton from '../../components/UI/Tickets/Modals/CreateTicketButton'
import EditTicketModal from '../../components/UI/Tickets/Modals/EditTicketModal'
import TicketDetailsModal from '../../components/UI/Tickets/Modals/TicketDetailsModal'
import PageLinker from '../../components/UI/Inputs/PageLinker'
import TicketTable from '../../components/UI/Tickets/Table/TicketTable'
import AssignSupportModal from '../../components/UI/Tickets/Modals/AssignSupportModal'
import { Resource } from '../../components/types/resourcesTypes'

interface TicketsProps {

}


const Tickets = (props: TicketsProps) => {
    const emptyAuthor = useMemo(() => ({ id: 0, CUIT: "", razonSocial: "" }), [])

    const [loadedTickets, setLoadedTickets] = useState<Ticket[]>([])
    const [isLoading, setLoading] = useState<boolean>(false)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showAsignModal, setShowAsignModal] = useState(false)
    const [currentId, setCurrentID] = useState<number>(0)
    const [clients, setClients] = useState([emptyAuthor])
    const [resources, setResources] = useState<Resource[]>([])
    const [products, setProducts] = useState<TicketProduct[]>([{ id: 0, name: "" }])
    const [showCurrTicket, setShowCurrTicket] = useState<boolean>(false)


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
        setCurrentID(id)
        setShowCurrTicket(true)
    }

    const handleClose = () => {
        setShowAddModal(false)
        setShowEditModal(false)
        setShowAsignModal(false)
        setShowCurrTicket(false)

    }

    const handleSubmit = () => {
        gatherTickets()
        setShowAddModal(false)
        setShowAsignModal(false)
        setShowEditModal(false)
    }


    const gatherClients = async () => {
        const extResources = await getExternalResources()
        setClients(extResources?.clients || [])
    }

    const gatherResoruces = async () => {
        const internalResources = await getInternalResources()
        setResources(internalResources || [])
    }

    const gatherProducts = async () => {
        const prods = await getProducts()
        setProducts(prods || [])
    }


    const gatherTickets = useCallback(() => {
        fetch(`${ticketSupportURI}/tickets`)
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

    useEffect(() => {
        setLoading(true)
        gatherClients()
        gatherProducts()
        gatherTickets()
        gatherResoruces()
    }, [gatherTickets]);

    const links = [
        { label: "Inicio", href: "/" },
        { label: "Soporte", href: "/soporte" },
    ]

    useEffect(() => {
        console.log(resources)
    }, [resources]);

    return (
        <>
            <PageTitle label='Soporte'>
                <PageLinker links={links} />
            </PageTitle>
            <Typography variant='h5' className={'mb-10'}>Tickets</Typography>
            <LoadingIndicator show={isLoading} className={`flex flex-col items-start  transition-all duration-200`} >
                <CreateTicketButton onClick={handleAddOpen} />
                <AddTicketModal onSubmit={handleSubmit} onClose={handleClose} show={showAddModal} clients={clients} products={products} />
                <EditTicketModal onSubmit={handleSubmit} onClose={handleClose} show={showEditModal} currentId={currentId} clients={clients} products={products} />
                <AssignSupportModal onSubmit={handleSubmit} resources={resources} show={showAsignModal} onClose={handleClose} currentId={currentId} />
                {showCurrTicket && <TicketDetailsModal currTicket={loadedTickets.find(ticket => ticket.id === currentId)} onClose={handleClose} show={showCurrTicket} resources={resources} clients={clients} products={products} />}
                <TicketTable onTicketAssign={handleAsignOpen} loadedTickets={loadedTickets} onRefresh={gatherProducts} onTicketEdit={handleEditOpen} onTicketView={handleTicketOpen} products={products} clients={clients} resources={resources} />
            </LoadingIndicator>
        </>
    )
}

export default Tickets
