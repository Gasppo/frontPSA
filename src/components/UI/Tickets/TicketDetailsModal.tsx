import { Typography } from '@mui/material'
import { Ticket, TicketProduct } from '../../types/ticketTypes'
import TitleAndSpan from '../Inputs/TitleAndSpan'
import CenteredModal from '../Modal/CenteredModal'

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
}

const TicketDetailsModal = (props: TicketDetailsModalProps) => {
    const { show, onClose, currTicket, products, resources } = props


    const producto = products.find(el => el.id === currTicket?.productId)
    const cliente = resources.find(el => el.id === currTicket?.authorId)
    const updateDate = new Date(currTicket?.updatedAt ? currTicket.updatedAt : '')?.toLocaleString('es-AR')
    const createDate = new Date(currTicket?.createdAt ? currTicket.createdAt : '')?.toLocaleString('es-AR')

    const fields = [
        { title: "Titulo", info: currTicket?.title || 'N/A' },
        { title: "Cliente", info: cliente?.razonSocial || 'N/A' },
        { title: "Producto", info: producto?.name || 'N/A' },
        { title: "Estado", info: currTicket?.status || 'N/A' },
        { title: "Fecha de creacion", info: createDate },
        { title: "Ultima modificacion", info: updateDate },
    ]


    return (
        <CenteredModal isLoading={false} onClose={onClose} show={show} onSubmit={() => { console.log('hi') }} label="Detalles del Ticket" hideButtons itemPosition='items-start' >
            <div className='flex flex-row w-[90%]'>
                <div className='w-2/3 flex flex-col mb-10 border-r-slate-400 border-r-2 mr-4'>
                    {fields.map(el => <TitleAndSpan {...el} />)}
                </div>
                <div className='w-1/3'>
                    <div className="mb-10" >
                        <Typography variant='h5'>Seguimiento</Typography>
                        <div className='flex flex-col'>
                            <span>{`[${createDate}] - Ticket Creado`}</span>
                        </div>
                    </div>
                </div>
            </div>
        </CenteredModal >
    )
}

export default TicketDetailsModal
