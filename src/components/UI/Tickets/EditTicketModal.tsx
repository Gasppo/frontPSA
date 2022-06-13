import { TextField } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { addClientToSystem, getClientInSystem, updateTicket } from '../../api/ticketSupport'
import { externalResource, prioridades } from '../../dev/dummyData'
import SelectBox from '../Inputs/SelectBox'
import CenteredModal from '../Modal/CenteredModal'

interface EditTicketModalProps {
    onClose: () => void
    onSubmit: () => void
    show: boolean,
    currentId: number | null
}



const EditTicketModal = (props: EditTicketModalProps) => {
    const { onSubmit, onClose, show, currentId } = props

    const emptyAuthor = useMemo(() => ({ id: 0, CUIT: "", "razon social": "" }), [])
    const currentURI = process.env.REACT_APP_SUPPORT_API || 'http://localhost:4000'
    const ticketURL = useMemo(() => `${currentURI}/tickets/${currentId || 0}`, [currentId, currentURI])

    const [isLoading, setIsLoading] = useState(false)
    const [author, setAuthor] = useState(emptyAuthor)
    const [input, setInput] = useState({
        title: "",
        description: "",
        status: "OPEN",
        priority: 2,
        authorId: 0,
        internal: true
    })


    const handleChangeText = (e: any) => {
        setInput(({ ...input, [e.target.name]: e.target.value }))
    };

    const handleChangeInt = (e: any) => {
        setInput(({ ...input, [e.target.name]: Number(e.target.value) }))
    };

    const handleAuthorChange = (e: any) => {
        const cliente = externalResource.find(el => el.id === e.target.value)
        setAuthor({
            id: cliente?.id || 0,
            CUIT: cliente?.CUIT || "",
            "razon social": cliente?.['razon social'] || ""
        })
    }

    const updateTicketUsingAPI = async () => {
        const inSystem = await getClientInSystem(author?.CUIT)
        if (!inSystem) {
            const createResponse = await addClientToSystem(author?.['razon social'], author?.CUIT)
            const createJSON = await createResponse.json()
            if (createResponse.status > 300) return createJSON
            return updateTicket({ ...input, authorId: createJSON.ticketAuthor.id }, ticketURL)
        }
        return updateTicket({ ...input, authorId: inSystem }, ticketURL)

    }

    const handleSubmit = async () => {
        setIsLoading(true)
        const response = await updateTicketUsingAPI()
        setIsLoading(false)
        if (response.status === 200) {
            onSubmit()
        }
    }

    const getAuthorInfo = useCallback(
        async (authorId: number) => {
            const response = await fetch(`${currentURI}/ticketAuthors/${authorId}`)
            const authorInfo = await response.json()
            setAuthor(externalResource.find(el => el.CUIT === authorInfo.ticketAuthor.CUIT) || emptyAuthor)
        },
        [emptyAuthor, currentURI],
    )

    useEffect(() => {
        setIsLoading(true)
        fetch(ticketURL)
            .then(res => res.json())
            .then(res => {
                setInput(res?.ticket || null);
                setIsLoading(false)
            })
    }, [ticketURL])


    useEffect(() => {
        if (input?.authorId === 1 || !input?.authorId) return
        getAuthorInfo(input?.authorId)
    }, [getAuthorInfo, input?.authorId]);

    const disabled = !input?.title || !input?.description || !author?.id || !input?.description


    return (
        <CenteredModal isLoading={isLoading} onClose={onClose} show={show} onSubmit={handleSubmit} label="Actualizar Ticket" addbuttonLabel="Actualizar" disableSubmit={disabled}>
            <div className='flex mb-6  flex-row'>
                <SelectBox name="authorId" className='mr-8 w-[42rem]' label="Nombre de Cliente" onChange={handleAuthorChange} valueKey="id" value={author.id} options={externalResource} text="razon social" />
            </div>
            <div className='flex mb-6 flex-row'>
                <TextField id="outlined-basic" name="title" className='mr-8 w-80' label="Titulo" value={input?.title} InputLabelProps={{ shrink: true }} variant="outlined" onChange={handleChangeText} disabled />
                <SelectBox name="priority" className='mr-8 w-80' disabled={input?.authorId === 0} label="Prioridad" onChange={handleChangeInt} valueKey="id" value={input?.priority} options={prioridades} text="valor" />
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
