import { Tab, Tabs } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingIndicator from '../../components/Loading/LoadingIndicator'
import PageTitle from '../../components/UI/Dashboard/PageTitle'
import PageLinker from '../../components/UI/Inputs/PageLinker'
import TicketDetails from '../../components/UI/Tickets/Modals/TicketDetails'
import TicketTasks from '../../components/UI/Tickets/Task/Table/TicketTasks'
import { useServiceData } from '../../hooks/useServiceData'


interface TicketDetailsPageProps {

}

const TicketDetailsPage = (props: TicketDetailsPageProps) => {

    const { ticketId } = useParams()
    const { clients, products, resources, tickets, loading } = useServiceData()
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    const currentTicket = tickets?.find(el => el.id === Number(ticketId)) || undefined
    const asignee = resources?.find(el => el.legajo === currentTicket?.asigneeId) || { Apellido: 'asignar', Nombre: 'Sin', legajo: 0 }
    const producto = products?.find(el => el.id === currentTicket?.productId) || { id: 0, name: 'Sin producto' }
    const cliente = clients?.find(el => el.id === currentTicket?.authorId) || { CUIT: '0', id: 0, razonSocial: 'Sin asignar' }

    const links = [
        { label: "Inicio", href: "/" },
        { label: "Soporte", href: "/soporte" },
        { label: "Tickets", href: "/soporte/tickets" },
    ]


    return (<>
        <PageTitle label={`Ticket #${ticketId}`}>
            <PageLinker links={links} />
        </PageTitle>
        <LoadingIndicator show={loading} className={`flex flex-col items-center`} >
            {!loading && (
                <>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', marginBottom: 6 }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Detalles" />
                            <Tab label="Tareas" />
                        </Tabs>
                    </Box>
                    {value === 0 && <TicketDetails asignee={asignee} cliente={cliente} producto={producto} ticket={currentTicket} />}
                    {value === 1 && <TicketTasks ticket={currentTicket} />}
                </>
            )}
        </LoadingIndicator>
    </>

    )
}

export default TicketDetailsPage
