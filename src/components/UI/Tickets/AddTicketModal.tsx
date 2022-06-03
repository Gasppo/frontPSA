import { Modal, TextField, Typography } from '@mui/material'
import { useState } from 'react'

interface AddTicketModalProps {
    onClose: () => void
    onSubmit: () => void
    show: boolean
}

const AddTicketModal = (props: AddTicketModalProps) => {
    const { onSubmit, onClose, show } = props

    const [input, setInput] = useState({
        title: "",
        description: "",
        status: "OPEN",
        priority: 2,
        authorId: 1,
        internal: true
    })

    const handleChangeText = (e: any) => {
        setInput(({ ...input, [e.target.name]: e.target.value }))
    };

    const handleChangeInt = (e: any) => {
        setInput(({ ...input, [e.target.name]: Number(e.target.value) }))
    };

    const generateTicketUsingAPI = async () => {
        const response = await fetch('http://localhost:4000/tickets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        })
        return response
    }

    const handleSubmit = async () => {
        const response = await generateTicketUsingAPI()
        if (response.status === 200) {
            onSubmit()
        }
    }

    return (
        <Modal onClose={onClose} open={show} >
            <div className='absolute bg-gray-200  text-slate-800 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vh] rounded-xl shadow-lg'>
                <Typography variant='h5' className={'m-10'}>Agregar Ticket</Typography>
                <div className='ml-10 flex flex-col items-center'>
                    <div className='flex mb-6 flex-row'>
                        <TextField id="outlined-basic" name="title" className='mr-8 w-80' label="Titulo" InputLabelProps={{ shrink: true}} variant="outlined" onChange={handleChangeText} />
                        <TextField id="outlined-basic" name="priority" className='mr-8 w-80' label="Prioridad" type="number" InputLabelProps={{ shrink: true }} variant="outlined" onChange={handleChangeInt} />
                    </div>
                    <div className='flex mb-6 flex-row'>
                        <TextField id="outlined-basic" name="productId" className='mr-8 w-80' label="Producto" InputLabelProps={{ shrink: true }} variant="outlined" />
                        <TextField id="outlined-basic" name="productVersion" className='mr-8 w-80' label="Version" InputLabelProps={{ shrink: true }} variant="outlined" />
                    </div>
                    <TextField id="outlined-basic" className='mb-6 w-[42rem] mr-8' name='description' label="Descripcion" multiline rows={2} InputLabelProps={{ shrink: true }} variant="outlined" onChange={handleChangeText} />

                    <div className="flex flex-row" >
                        <div className="text-center mr-8 mb-6 w-52 border-2 border-slate-400  rounded-xl shadow-lg font-bold text-slate-800 hover:border-teal-600 hover:border-1 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={onClose} >
                            <div className="m-4" > Cancelar</div>
                        </div>
                        <div className="w-56" ></div>
                        <div className="text-center mr-8 mb-6 w-52  border-2 border-slate-400  rounded-xl shadow-lg font-bold text-slate-800 hover:border-teal-600 hover:border-1 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={handleSubmit}>
                            <div className="m-4" > Generar Ticket</div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal >
    )
}

export default AddTicketModal
