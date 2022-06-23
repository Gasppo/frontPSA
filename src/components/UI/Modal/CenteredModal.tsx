import { IconButton, Modal, Typography } from '@mui/material'
import React from 'react'
import LoadingIndicator from '../../Loading/LoadingIndicator'
import ModalButton from './ModalButton'
import CloseIcon from '@mui/icons-material/Close';

interface CenteredModalProps {
    children: React.ReactNode,
    onClose: () => void
    onSubmit: () => void
    show: boolean,
    isLoading: boolean,
    addbuttonLabel?: string
    label: string
    disableSubmit?: boolean
    hideButtons?: boolean
    itemPosition?: string
    minHeight?: string
    width?: string
    closeButton?: boolean
}



const CenteredModal = (props: CenteredModalProps) => {
    const { children, onClose, onSubmit, show, isLoading, addbuttonLabel, label, disableSubmit, hideButtons, itemPosition, minHeight, width, closeButton } = props

    return (
        <Modal onClose={onClose} open={show} >
            <div className={`absolute ${width ? width : 'md:w-[95vh] w-[80vh]'} bg-gray-200  text-slate-800 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl shadow-lg ${minHeight ? minHeight : ''}`}>
                <LoadingIndicator show={isLoading}>
                    <div className='flex justify-between'>
                        <Typography variant='h5' className={'m-10'}>{label}</Typography>
                        {closeButton && <div className="m-10" >
                            <IconButton onClick={onClose}>
                                <CloseIcon color='secondary' />
                            </IconButton>
                        </div>}
                    </div>
                    <div className={`ml-10 flex flex-col ${itemPosition ? itemPosition : 'items-center'}`}>
                        {children}
                        {!hideButtons && <div className="flex justify-between w-9/12" >
                            <ModalButton onSubmit={onClose} label={'Cancelar'} />
                            <ModalButton onSubmit={onSubmit} label={addbuttonLabel || 'Aceptar'} disabled={disableSubmit} />
                        </div>}
                    </div>
                </LoadingIndicator>
            </div>
        </Modal >
    )
}

export default CenteredModal
