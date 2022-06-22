import { Modal, Typography } from '@mui/material'
import React from 'react'
import LoadingIndicator from '../../Loading/LoadingIndicator'
import ModalButton from './ModalButton'

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
}



const CenteredModal = (props: CenteredModalProps) => {
    const { children, onClose, onSubmit, show, isLoading, addbuttonLabel, label, disableSubmit, hideButtons, itemPosition, minHeight } = props

    return (
        <Modal onClose={onClose} open={show} >
            <div className={`absolute md:w-[95vh] bg-gray-200  text-slate-800 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vh] rounded-xl shadow-lg ${minHeight ? minHeight : ''}`}>
                <LoadingIndicator show={isLoading}>
                    <Typography variant='h5' className={'m-10'}>{label}</Typography>
                    <div className={`ml-10 flex flex-col ${itemPosition ? itemPosition : 'items-center'}`}>
                        {children}
                        {!hideButtons && <div className="flex flex-row" >
                            <ModalButton onSubmit={onClose} label={'Cancelar'} />
                            <div className="w-56" ></div>
                            <ModalButton onSubmit={onSubmit} label={addbuttonLabel || 'Aceptar'} disabled={disableSubmit} />
                        </div>}
                    </div>
                </LoadingIndicator>
            </div>
        </Modal >
    )
}

export default CenteredModal
