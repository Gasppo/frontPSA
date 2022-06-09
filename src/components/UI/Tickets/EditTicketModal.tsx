import { TextField } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import CenteredModal from '../Modal/CenteredModal'

interface EditTicketModalProps {
    onClose: () => void
    onSubmit: () => void
    show: boolean,
    currentId: number | null
}



const EditTicketModal = (props: EditTicketModalProps) => {
    const { onSubmit, onClose, show, currentId } = props

    const [isLoading, setIsLoading] = useState(false)

    const [input, setInput] = useState({
        title: "",
        description: "",
        status: "OPEN",
        priority: 2,
        authorId: 1,
        internal: true
    })

    const ticketURL = useMemo(() => `${process.env.REACT_APP_SUPPORT_API || 'http://localhost:4000'}/tickets/${currentId || 0}`, [currentId])

    const handleChangeText = (e: any) => {
        setInput(({ ...input, [e.target.name]: e.target.value }))
    };

    const handleChangeInt = (e: any) => {
        setInput(({ ...input, [e.target.name]: Number(e.target.value) }))
    };

    const updateTicketUsingAPI = async () => {
        const response = await fetch(ticketURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        })
        return response
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        const response = await updateTicketUsingAPI()
        setIsLoading(false)
        if (response.status === 200) {
            onSubmit()
        }
    }

    useEffect(() => {
        setIsLoading(true)
        fetch(ticketURL)
            .then(res => res.json())
            .then(res => {
                setInput(res?.ticket || null);
                setIsLoading(false)
            })

    }, [ticketURL])

    return (
        <CenteredModal isLoading={isLoading} onClose={onClose} show={show} onSubmit={handleSubmit} label="Actualizar Ticket"  addbuttonLabel="Actualizar">
            <div className='flex mb-6 flex-row'>
                <TextField id="outlined-basic" name="title" className='mr-8 w-80' label="Titulo" value={input?.title} InputLabelProps={{ shrink: true }} variant="outlined" onChange={handleChangeText} />
                <TextField id="outlined-basic" name="priority" className='mr-8 w-80' label="Prioridad" type="number" value={input?.priority} InputLabelProps={{ shrink: true }} variant="outlined" onChange={handleChangeInt} />
            </div>
            <div className='flex mb-6 flex-row'>
                <TextField id="outlined-basic" name="productId" className='mr-8 w-80' label="Producto" InputLabelProps={{ shrink: true }} variant="outlined" />
                <TextField id="outlined-basic" name="productVersion" className='mr-8 w-80' label="Version" InputLabelProps={{ shrink: true }} variant="outlined" />
            </div>
            <TextField id="outlined-basic" className='mb-6 w-[42rem] mr-8' name='description' label="Descripcion" value={input?.description} multiline rows={2} InputLabelProps={{ shrink: true }} variant="outlined" onChange={handleChangeText} />
        </CenteredModal>
    )
}

export default EditTicketModal
