import { Modal, Typography } from '@mui/material';

interface ConfirmModalProps {
    onClose: () => void
    show: boolean
    txt: string
}

const ErrorModal = (props: ConfirmModalProps) => {
    const { onClose, show, txt} = props;
   

    return (
        <Modal onClose={onClose} open={show} >
            <div className='absolute bg-gray-200  text-slate-800 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50vh] h-[27vh] rounded-xl shadow-lg'>
                <Typography variant='h5' className={'m-10'}>{txt}</Typography>
                <div className="flex flex-row" >
                    <div className="w-40" ></div> 
                    <div className="text-center mr-8 mb-10 w-52  border-2 border-slate-400  rounded-xl shadow-lg font-bold text-slate-800 hover:border-teal-600 hover:border-1 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={onClose}>
                        <div className="m-4" > Entendido</div>
                    </div>
                </div>

                </div>
        </Modal >
    )
}

export default ErrorModal

