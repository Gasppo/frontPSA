import { useEffect, useMemo, useState } from 'react'
import { addClientToSystem, createTicket, getClientInSystem, getClientLicenses, getProductVersions } from '../../api/ticketSupport'
import { defaultTicketData, prioridades } from '../../dev/dummyData'
import { Resource, TicketLicense, TicketProduct, TicketProductVersion } from '../../types/ticketTypes'
import SelectBox from '../Inputs/SelectBox'
import ValidatingInput from '../Inputs/ValidatingInput'
import CenteredModal from '../Modal/CenteredModal'

interface AddTicketModalProps {
    onClose: () => void
    onSubmit: () => void
    show: boolean
    resources: Resource[]
    products: TicketProduct[]
}

const AddTicketModal = (props: AddTicketModalProps) => {
    const { onSubmit, onClose, show, resources, products } = props
    const emptyAuthor = useMemo(() => ({ id: 0, CUIT: "", razonSocial: "" }), [])

    const [runValidations, setRunValidations] = useState(false)
    const [author, setAuthor] = useState(emptyAuthor)
    const [isLoading, setIsLoading] = useState(false)
    const [input, setInput] = useState(defaultTicketData)
    const [clientLicenses, setClientLicenses] = useState<TicketLicense[]>([])
    const [versions, setVersions] = useState<TicketProductVersion[]>([])

    const invalidFields = (!input?.title || !author?.id || !input.productLicenseId)
    const disabled = runValidations && invalidFields

    const enabledProducts = useMemo(() => clientLicenses.map(el => el.productId), [clientLicenses])
    const filteredProducts = useMemo(() => products.filter(el => enabledProducts.includes(el.id)), [enabledProducts, products])
    const filteredVersions = useMemo(() => clientLicenses.filter(el => el.productId === input?.productId).map(el => ({ id: el.id, productVersion: versions.find(ver => ver.id === el.versionId)?.name || 'N/A' })), [input, clientLicenses, versions]) || []

    const handleChangeText = (e: any) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
    };


    const handleChangeInt = (e: any) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
    };


    const handleAuthorChange = (e: any) => {
        const cliente = resources.find(el => el.id === e.target.value)
        setAuthor({ id: cliente?.id || 0, CUIT: cliente?.CUIT || "", razonSocial: cliente?.razonSocial || "" })
    }

    const handleProductChange = (e: any) => {
        handleChangeInt(e)
        gatherProductVersions(e.target.value)
    }

    const handleSubmit = async () => {
        if (invalidFields) {
            setRunValidations(true)
            return
        }

        setIsLoading(true)
        const response = await generateTicketUsingAPI()
        setIsLoading(false)
        if (response.status === 200) onSubmit()
    }

    const gatherLicenses = async (clientId: number) => {
        setIsLoading(true)
        const licenses = await getClientLicenses(clientId)
        setClientLicenses(licenses)
        setIsLoading(false)

    }

    const gatherProductVersions = async (productId: number) => {
        setIsLoading(true)
        const vers = await getProductVersions(productId)
        setVersions(vers)
        setIsLoading(false)

    }

    useEffect(() => {
        setRunValidations(false)
        setInput(defaultTicketData)
        setAuthor(emptyAuthor)
    }, [emptyAuthor, show]);

    useEffect(() => {
        gatherLicenses(author.id)
    }, [author.id])

    const generateTicketUsingAPI = async () => {
        const inSystemId = await getClientInSystem(author?.CUIT)
        if (!inSystemId) {
            const createResponse = await addClientToSystem(author?.razonSocial, author?.CUIT)
            const createJSON = await createResponse.json()
            if (createResponse.status > 300) return createJSON
            return createTicket({ ...input, authorId: createJSON.ticketAuthor.id })
        }
        return createTicket({ ...input, authorId: inSystemId })
    }

    const isEmpty = (value: any) => !value ? "Este campo no puede estar vacio" : ""
    const validations = runValidations ? [isEmpty] : []

    return (
        <CenteredModal isLoading={isLoading} onClose={onClose} show={show} onSubmit={handleSubmit} label="Crear Ticket" addbuttonLabel="Crear" disableSubmit={disabled}>
            <div className='flex mb-6  flex-row'>
                <SelectBox required name="authorId" validations={validations} className='mr-8 w-[42rem]' label="Nombre de Cliente" onChange={handleAuthorChange} valueKey="id" value={author.id} options={resources} text="razonSocial" />
            </div>
            <div className='flex mb-6 flex-row'>
                <ValidatingInput required validations={validations} name="title" className='mr-8 w-80' label="Titulo" value={input?.title} onChange={handleChangeText} />
                <SelectBox required validations={validations} name="priority" className='mr-8 w-80' label="Prioridad" onChange={handleChangeInt} valueKey="id" value={input?.priority} options={prioridades} text="valor" />
            </div>
            <div className='flex mb-6 flex-row' >
                <SelectBox disabledText='Primero ingrese un cliente...' required validations={validations} name="productId" className='mr-8 w-80' disabled={author.id === 0} label="Producto" onChange={handleProductChange} valueKey="id" value={input?.productId} options={filteredProducts} text="name" />
                <SelectBox disabledText='Primero ingrese un producto...' required validations={validations} name="productLicenseId" className='mr-8 w-80' disabled={author.id === 0 || input?.productId <= 0} label="Version" onChange={handleChangeInt} valueKey="id" value={input?.productLicenseId} options={filteredVersions} text="productVersion" />
            </div>
            <ValidatingInput className='mb-6 w-[42rem] mr-8' name='description' label="Descripcion" multiline rows={2} value={input?.description} onChange={handleChangeText} />
        </CenteredModal>
    )
}

export default AddTicketModal
