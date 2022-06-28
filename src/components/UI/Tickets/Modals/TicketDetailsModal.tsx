import { Box, Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import { Ticket, TicketProduct } from '../../../types/ticketTypes'
import CenteredModal from '../../Modal/CenteredModal'
import TicketTasks from '../Task/Table/TicketTasks'
import TicketDetails from './TicketDetails'

interface TicketDetailsModalProps {
    onClose: () => void
    show: boolean
    currTicket?: Ticket
    products: TicketProduct[]
    resources: {
        id: number;
        CUIT: string;
        razonSocial: string;
    }[]
    viewMode?: boolean
}

const TicketDetailsModal = (props: TicketDetailsModalProps) => {
    const { show, onClose, currTicket, products, resources, viewMode } = props
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const producto = products.find(el => el.id === currTicket?.productId)
    const cliente = resources.find(el => el.id === currTicket?.authorId)

    return (
        <CenteredModal closeButton isLoading={false} onClose={onClose} show={show} onSubmit={() => { console.log('hi') }} label={`Ticket #${currTicket?.id}`} hideButtons itemPosition='items-start' minHeight='min-h-[70vh]'>
            {!viewMode && <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '95%', marginBottom: 6 }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Detalles" />
                    <Tab label="Tareas" />
                </Tabs>
            </Box>}
            {(value === 0 || viewMode) && <TicketDetails cliente={cliente} producto={producto} ticket={currTicket} />}
            {value === 1 && <TicketTasks ticket={currTicket} />}
        </CenteredModal >
    )
}

export default TicketDetailsModal
