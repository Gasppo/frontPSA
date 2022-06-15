import { TextField } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { addClientToSystem, getClientInSystem, updateTicket } from '../../api/ticketSupport'
import { externalResource, prioridades, product, productLicense, productVersion } from '../../dev/dummyData'
import SelectBox from '../Inputs/SelectBox'
import ValidatingInput from '../Inputs/ValidatingInput'
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
    const productos = product
    const userProducts = productLicense.map(lic => ({
        ...lic,
        productName: product.find(prod => prod.id === lic.productId)?.name || 'N/A',
        productId: product.find(prod => prod.id === lic.productId)?.id || 0,
        productVersion: productVersion.find(ver => ver.id === lic.versionId)?.name || 'N/A'
    }))

    const [dirty, setDirty] = useState(false)
    const [originalData, setOriginalData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [author, setAuthor] = useState(emptyAuthor)
    const [input, setInput] = useState({
        title: "",
        description: "",
        status: "OPEN",
        priority: 2,
        authorId: 0,
        internal: true,
        productId: 0,
        productLicenseId: 0
    })


    const handleChangeText = (e: any) => {
        setInput(({ ...input, [e.target.name]: e.target.value }))
        setDirty(true)
    };

    const handleChangeInt = (e: any) => {
        setInput(({ ...input, [e.target.name]: Number(e.target.value) }))
        setDirty(true)
    };

    const handleAuthorChange = (e: any) => {
        const cliente = externalResource.find(el => el.id === e.target.value)
        setAuthor({
            id: cliente?.id || 0,
            CUIT: cliente?.CUIT || "",
            "razon social": cliente?.['razon social'] || ""
        })
        setDirty(true)
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
        if (show) {
            setIsLoading(true)
            fetch(ticketURL)
                .then(res => res.json())
                .then(res => {
                    console.log(res?.ticket)
                    setInput(res?.ticket || null);
                    setOriginalData(res?.ticket || null);
                    setIsLoading(false)
                })
        }
    }, [ticketURL, show])


    useEffect( () => {
        setDirty( JSON.stringify(input) !== JSON.stringify(originalData))
    } , [input, originalData])


    useEffect(() => {
        if (input?.authorId === 1 || !input?.authorId) return
        getAuthorInfo(input?.authorId)
    }, [getAuthorInfo, input?.authorId]);

    const disabled = !input?.title || !input?.description || !author?.id || !input?.description || !input.productLicenseId || !dirty

    const statuses = [
        { id: "OPEN" },
        { id: "CLOSED" },
        { id: "IN REVIEW" },
        { id: "REJECTED" },
    ]


    const validateNotEmpty = (value: any) => value === "" ? "Este campo no puede estar vacio" : ""
    const validations = [validateNotEmpty]


    return (
        <CenteredModal isLoading={isLoading} onClose={onClose} show={show} onSubmit={handleSubmit} label="Actualizar Ticket" addbuttonLabel="Actualizar" disableSubmit={disabled}>
            <div className='flex mb-6  flex-row'>
                <SelectBox name="authorId" className='mr-8 w-80' label="Nombre de Cliente" onChange={handleAuthorChange} disabled={false} valueKey="id" value={author.id} options={externalResource} text="razon social" />
                <SelectBox name="status" className='mr-8 w-80' label="Estado del Ticket" onChange={handleChangeText} valueKey="id" value={input?.status} options={statuses} text="id" />
            </div>
            <div className='flex mb-6 flex-row'>
                <ValidatingInput validations={validations} name="title" className='mr-8 w-80' label="Titulo" value={input?.title} onChange={handleChangeText} />
                <SelectBox name="priority" className='mr-8 w-80' disabled={input?.authorId === 0} label="Prioridad" onChange={handleChangeInt} valueKey="id" value={input?.priority} options={prioridades} text="valor" />
            </div>
            <div className='flex mb-6 flex-row'>
                <SelectBox name="productId" className='mr-8 w-80' disabled={author.id === 0} label="Producto" onChange={handleChangeInt} valueKey="id" value={input?.productId} options={productos} text="name" />
                <SelectBox name="productLicenseId" className='mr-8 w-80' disabled={author.id === 0 || input?.productId <= 0} label="Version" onChange={handleChangeInt} valueKey="id" value={input?.productLicenseId} options={userProducts.filter(el => el.productId === input?.productId) || []} text="productVersion" />
            </div>
            <TextField id="outlined-basic" className='mb-6 w-[42rem] mr-8' name='description' label="Descripcion" value={input?.description} multiline rows={2} InputLabelProps={{ shrink: true }} variant="outlined" onChange={handleChangeText} />
        </CenteredModal>
    )
}

export default EditTicketModal
