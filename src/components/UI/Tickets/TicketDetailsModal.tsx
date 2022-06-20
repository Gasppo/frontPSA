import { Typography } from '@mui/material'
import React, { useState } from 'react'
import { defaultTicketData } from '../../dev/dummyData'
import { Ticket, TicketAuthor, TicketDetails, TicketProduct } from '../../types/ticketTypes'
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

    return (
        <CenteredModal isLoading={false} onClose={onClose} show={show} onSubmit={() => { console.log('hi') }} label="Detalles del Ticket" hideButtons itemPosition='items-start' >
            <div className='flex flex-row w-[90%]'>
                <div className='w-2/3 flex flex-col mb-10 border-r-slate-400 border-r-2 mr-4'>
                    <div className='mb-4'>
                        <Typography variant='h6'>Titulo</Typography>
                        <span>{currTicket?.title}</span>
                    </div>
                    <div className='mb-4'>
                        <Typography variant='h6'>Cliente</Typography>
                        <span>{cliente?.razonSocial}</span>
                    </div>
                    <div className='mb-4'>
                        <Typography variant='h6'>Producto (Version)</Typography>
                        <span>{producto?.name}</span>
                    </div>
                    <div className='mb-4'>
                        <Typography variant='h6'>Estado del Ticket</Typography>
                        <span>{currTicket?.status}</span>
                    </div>
                    <div className='mb-4'>
                        <Typography variant='h6'>Ultima Modificacion</Typography>
                        <span>{updateDate}</span>
                    </div>
                    <div className='mb-4'>
                        <Typography variant='h6'>Fecha de creacion</Typography>
                        <span>{createDate}</span>
                    </div>
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
