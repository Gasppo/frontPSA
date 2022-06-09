import { Modal, Typography } from '@mui/material'
import React from 'react'
import LoadingIndicator from '../../Loading/LoadingIndicator'

interface CenteredModalProps {
    children: React.ReactNode,
    onClose: () => void
    onSubmit: () => void
    show: boolean,
    isLoading: boolean,
    addbuttonLabel?: string
    label: string
}



const CenteredModal = (props: CenteredModalProps) => {
    const { children, onClose, onSubmit, show, isLoading, addbuttonLabel, label } = props

    return (
        <Modal onClose={onClose} open={show} >
            <div className='absolute bg-gray-200  text-slate-800 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vh] rounded-xl shadow-lg'>
                <LoadingIndicator show={isLoading}>
                    <Typography variant='h5' className={'m-10'}>{label}</Typography>
                    <div className='ml-10 flex flex-col items-center'>
                        {children}
                        <div className="flex flex-row" >
                            <div className="text-center mr-8 mb-6 w-52 border-2 border-slate-400  rounded-xl shadow-lg font-bold text-slate-800 hover:border-teal-600 hover:border-1 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={onClose} >
                                <div className="m-4" > Cancelar</div>
                            </div>
                            <div className="w-56" ></div>
                            <div className="text-center mr-8 mb-6 w-52  border-2 border-slate-400  rounded-xl shadow-lg font-bold text-slate-800 hover:border-teal-600 hover:border-1 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={onSubmit}>
                                <div className="m-4" >{ addbuttonLabel || 'Aceptar'}</div>
                            </div>
                        </div>
                    </div>
                </LoadingIndicator>
            </div>
        </Modal >
    )
}

export default CenteredModal
