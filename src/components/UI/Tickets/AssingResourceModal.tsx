import { TextField } from '@mui/material'
import { useState } from 'react'
import CenteredModal from '../Modal/CenteredModal'

interface AssingResourceModalProps {
    onClose: () => void
    onSubmit: () => void
    show: boolean
}

const AssingResourceModal = (props: AssingResourceModalProps) => {
    const { onSubmit, onClose, show } = props

    const [isLoading, setIsLoading] = useState(false)

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
        const response = await fetch(`${process.env.REACT_APP_SUPPORT_API || 'http://localhost:4000'}/tickets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        })
        return response
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        const response = await generateTicketUsingAPI()
        setIsLoading(false)
        if (response.status === 200) {
            onSubmit()
        }
    }

    return (
        <CenteredModal label='Asignar Recurso' isLoading={isLoading} onClose={onClose} show={show} onSubmit={handleSubmit} addbuttonLabel="Asignar">
            <div className='flex mb-6 flex-row'>
                <TextField id="outlined-basic" name="title" className='mr-8 w-80' label="Titulo" InputLabelProps={{ shrink: true }} variant="outlined" onChange={handleChangeText} />
                <TextField id="outlined-basic" name="priority" className='mr-8 w-80' label="Prioridad" type="number" InputLabelProps={{ shrink: true }} variant="outlined" onChange={handleChangeInt} />
            </div>
        </CenteredModal>
    )
}

export default AssingResourceModal
