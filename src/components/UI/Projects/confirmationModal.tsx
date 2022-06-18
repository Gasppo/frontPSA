import { Modal, TextField, Typography, MenuItem, InputAdornment } from '@mui/material';
import { useEffect, useState } from 'react';


interface ConfirmModalProps {
    onClose: () => void
    onSubmit: () => void
    show: boolean
    txt: string
}

const ConfirmModal = (props: ConfirmModalProps) => {
    const { onSubmit, onClose, show, txt} = props;
    const [isLoading, setLoading] = useState<boolean>(false)
   

    return (
        <Modal onClose={onClose} open={show} >
            <div className='absolute bg-gray-200  text-slate-800 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50vh] h-[27vh] rounded-xl shadow-lg'>
                <Typography variant='h5' className={'m-10'}>{txt}</Typography>
                <div className="flex flex-row" >
                    <div className="text-center ml-8 mb-10 w-52 border-2 border-slate-400  rounded-xl shadow-lg font-bold text-slate-800 hover:border-teal-600 hover:border-1 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={onClose} >
                        <div className="m-4" > Cancelar</div>
                    </div>
                    <div className="w-40" ></div> 
                    <div className="text-center mr-8 mb-10 w-52  border-2 border-slate-400  rounded-xl shadow-lg font-bold text-slate-800 hover:border-teal-600 hover:border-1 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={onSubmit}>
                        <div className="m-4" > Confirmar</div>
                    </div>
                </div>

                </div>
        </Modal >
    )
}

export default ConfirmModal

