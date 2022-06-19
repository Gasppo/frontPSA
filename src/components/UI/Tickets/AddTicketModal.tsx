import { useEffect, useMemo, useState } from 'react'
import { addClientToSystem, createTicket, getClientInSystem } from '../../api/ticketSupport'
import { defaultTicketData, prioridades, product, productLicense, productVersion } from '../../dev/dummyData'
import { Resource } from '../../types/ticketTypes'
import SelectBox from '../Inputs/SelectBox'
import ValidatingInput from '../Inputs/ValidatingInput'
import CenteredModal from '../Modal/CenteredModal'

interface AddTicketModalProps {
    onClose: () => void
    onSubmit: () => void
    show: boolean
    resources: Resource[]
}

const AddTicketModal = (props: AddTicketModalProps) => {
    const { onSubmit, onClose, show, resources } = props
    const emptyAuthor = useMemo(() => ({ id: 0, CUIT: "", razonSocial: "" }), [])

    //TODO - Delete when product license API avaialble
    const productos = product
    const userProducts = productLicense.map(lic => ({
        ...lic,
        productName: product.find(prod => prod.id === lic.productId)?.name || 'N/A',
        productVersion: productVersion.find(ver => ver.id === lic.versionId)?.name || 'N/A'
    }))


    const [runValidations, setRunValidations] = useState(false)
    const [author, setAuthor] = useState(emptyAuthor)
    const [isLoading, setIsLoading] = useState(false)
    const [input, setInput] = useState(defaultTicketData)

    const invalidFields = (!input?.title || !author?.id || !input.productLicenseId)
    const disabled = runValidations && invalidFields

    const handleChangeText = (e: any) => {
        setInput(({ ...input, [e.target.name]: e.target.value }))
    };


    const handleChangeInt = (e: any) => {
        setInput(({ ...input, [e.target.name]: Number(e.target.value) }))
    };


    const handleAuthorChange = (e: any) => {
        const cliente = resources.find(el => el.id === e.target.value)
        setAuthor({ id: cliente?.id || 0, CUIT: cliente?.CUIT || "", razonSocial: cliente?.razonSocial || "" })
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

    useEffect(() => {
        setRunValidations(false)
        setInput(defaultTicketData)
        setAuthor(emptyAuthor)
    }, [emptyAuthor, show]);


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
                <SelectBox disabledText='Primero ingrese un cliente...' required validations={validations} name="productId" className='mr-8 w-80' disabled={author.id === 0} label="Producto" onChange={handleChangeInt} valueKey="id" value={input?.productId} options={productos} text="name" />
                <SelectBox disabledText='Primero ingrese un producto...' required validations={validations} name="productLicenseId" className='mr-8 w-80' disabled={author.id === 0 || input?.productId <= 0} label="Version" onChange={handleChangeInt} valueKey="id" value={input?.productLicenseId} options={userProducts.filter(el => el.productId === input?.productId) || []} text="productVersion" />
            </div>
            <ValidatingInput className='mb-6 w-[42rem] mr-8' name='description' label="Descripcion" multiline rows={2} value={input?.description} onChange={handleChangeText} />
        </CenteredModal>
    )
}

export default AddTicketModal
