import { Typography } from '@mui/material'
import React from 'react'
import { Ticket, TicketProduct } from '../../../types/ticketTypes'
import TitleAndSpan from '../../Inputs/TitleAndSpan'

interface TicketDetailsProps {
    ticket: Ticket | undefined,
    producto: TicketProduct | undefined,
    cliente: {
        id: number;
        CUIT: string;
        razonSocial: string;
    } | undefined

}

const TicketDetails = (props: TicketDetailsProps) => {

    const { cliente, producto, ticket } = props

    const updateDate = new Date(ticket?.updatedAt ? ticket.updatedAt : '')?.toLocaleString('es-AR')
    const createDate = new Date(ticket?.createdAt ? ticket.createdAt : '')?.toLocaleString('es-AR')

    const fields = [
        { title: "Titulo", info: ticket?.title || 'N/A' },
        { title: "Descripcion", info: ticket?.description || 'N/A' },
        { title: "Cliente", info: cliente?.razonSocial || 'N/A' },
        { title: "Producto", info: producto?.name || 'N/A' },
        { title: "Estado", info: ticket?.status || 'N/A' },
        { title: "Fecha de creacion", info: createDate },
        { title: "Ultima modificacion", info: updateDate },
    ]

    return (
        <div className='flex flex-row w-[90%]'>
            <div className='w-2/3 flex flex-col mb-10 border-r-slate-400 border-r-2 mr-4'>
                {fields.map(el => <TitleAndSpan {...el} />)}
            </div>
            <div className='w-1/3'>
                <div className="mb-10" >
                    <Typography variant='h5'>Seguimiento</Typography>
                    <div className='flex flex-col text-sm'>
                        <span>{`[${createDate}] - Ticket Creado`}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TicketDetails
