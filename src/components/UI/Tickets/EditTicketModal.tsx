import { useCallback, useEffect, useMemo, useState } from 'react'
import { addClientToSystem, getClientInSystem, getClientLicenses, getProductVersions, updateTicket } from '../../api/ticketSupport'
import { defaultTicketData, prioridades } from '../../dev/dummyData'
import { ticketSupportURI } from '../../dev/URIs'
import { Resource, TicketLicense, TicketProduct, TicketProductVersion } from '../../types/ticketTypes'
import SelectBox from '../Inputs/SelectBox'
import ValidatingInput from '../Inputs/ValidatingInput'
import CenteredModal from '../Modal/CenteredModal'

interface EditTicketModalProps {
    onClose: () => void
    onSubmit: () => void
    show: boolean,
    currentId: number | null
    resources: Resource[]
    products: TicketProduct[]
}



const EditTicketModal = (props: EditTicketModalProps) => {
    const { onSubmit, onClose, show, currentId, resources, products } = props

    const emptyAuthor = useMemo(() => ({ id: 0, CUIT: "", razonSocial: "" }), [])
    const ticketURL = useMemo(() => `${ticketSupportURI}/tickets/${currentId || 0}`, [currentId])

    const [dirty, setDirty] = useState(false)
    const [originalData, setOriginalData] = useState({})
    const [runValidations, setRunValidations] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [author, setAuthor] = useState(emptyAuthor)
    const [input, setInput] = useState(defaultTicketData)
    const [clientLicenses, setClientLicenses] = useState<TicketLicense[]>([])
    const [versions, setVersions] = useState<TicketProductVersion[]>([])

    const invalidFields = (!input?.title || !author?.id || !input.productLicenseId)
    const disabled = (runValidations && invalidFields) || !dirty

    const enabledProducts = useMemo(() => clientLicenses.map(el => el.productId), [clientLicenses])
    const filteredProducts = useMemo(() => products.filter(el => enabledProducts.includes(el.id)), [enabledProducts, products])
    const filteredVersions = useMemo(() => clientLicenses.filter(el => el.productId === input?.productId).map(el => ({ id: el.id, productVersion: versions.find(ver => ver.id === el.versionId)?.name || 'N/A' })), [input, clientLicenses, versions]) || []

    const handleChangeText = (e: any) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
        setDirty(true)
    };

    const handleChangeInt = (e: any) => {
        setInput(prev => ({ ...prev, [e.target.name]: Number(e.target.value) }))
        setDirty(true)
    };

    const handleProductChange = (e: any) => {
        setInput(prev => ({ ...prev, [e.target.name]: Number(e.target.value) }))
        checkVersionForProduct()
        gatherProductVersions(e.target.value)
        setDirty(true)
    }

    const handleAuthorChange = (e: any) => {
        const cliente = resources.find(el => el.id === e.target.value)
        setAuthor({ id: cliente?.id || 0, CUIT: cliente?.CUIT || "", razonSocial: cliente?.razonSocial || "" })
        setDirty(true)
    }

    const updateTicketUsingAPI = async () => {
        const inSystem = await getClientInSystem(author?.CUIT)
        if (!inSystem) {
            const createResponse = await addClientToSystem(author?.razonSocial, author?.CUIT)
            const createJSON = await createResponse.json()
            if (createResponse.status > 300) return createJSON
            return updateTicket({ ...input, authorId: createJSON.ticketAuthor.id }, ticketURL)
        }
        return updateTicket({ ...input, authorId: inSystem }, ticketURL)

    }

    const handleSubmit = async () => {
        if (invalidFields) {
            setRunValidations(true)
            return
        }
        setIsLoading(true)
        const response = await updateTicketUsingAPI()
        setIsLoading(false)
        if (response.status === 200) {
            onSubmit()
        }
    }

    const getAuthorInfo = useCallback(
        async (authorId: number) => {
            const response = await fetch(`${ticketSupportURI}/ticketAuthors/${authorId}`)
            const authorInfo = await response.json()
            setAuthor(resources.find(el => el.CUIT === authorInfo.ticketAuthor.CUIT) || emptyAuthor)
        },
        [emptyAuthor, resources],
    )

    const gatherProductVersions = async (productId: number) => {
        setIsLoading(true)
        const vers = await getProductVersions(productId)
        setVersions(vers)
        setIsLoading(false)

    }

    const gatherLicenses = async (clientId: number) => {
        setIsLoading(true)
        const licenses = await getClientLicenses(clientId)
        setClientLicenses(licenses)
        setIsLoading(false)

    }

    const checkVersionForProduct = () => {
        const currProductId = input.productId
        const currentLicense = input.productLicenseId

        if (clientLicenses.find(el => el.id === currentLicense)?.productId === currProductId) {
            setInput(prev => ({ ...prev, productLicenseId: 0 }))
        }
    }

    useEffect(() => {
        gatherLicenses(author.id)
    }, [author.id])

    useEffect(() => {
       if(input?.productId) gatherProductVersions(input?.productId)
    }, [input?.productId])

    useEffect(() => {
        if (show) {
            setRunValidations(false)
            setIsLoading(true)
            fetch(ticketURL)
                .then(res => res.json())
                .then(res => {
                    setInput(res?.ticket || null);
                    setOriginalData(res?.ticket || null);
                    setIsLoading(false)
                })
        }
    }, [ticketURL, show])


    useEffect(() => {
        if (input?.authorId === 1 || !input?.authorId) return
        getAuthorInfo(input?.authorId)
    }, [getAuthorInfo, input?.authorId, show]);


    useEffect(() => {
        setDirty(JSON.stringify(input) !== JSON.stringify(originalData))
    }, [input, originalData])




    const statuses = [
        { id: "OPEN" },
        { id: "CLOSED" },
        { id: "IN REVIEW" },
        { id: "REJECTED" },
    ]


    const isEmpty = (value: any) => !value ? "Este campo no puede estar vacio" : ""
    const validations = runValidations ? [isEmpty] : []


    return (
        <CenteredModal isLoading={isLoading} onClose={onClose} show={show} onSubmit={handleSubmit} label="Actualizar Ticket" addbuttonLabel="Actualizar" disableSubmit={disabled}>
            <div className='flex mb-6  flex-row'>
                <SelectBox required validations={validations} name="authorId" className='mr-8 w-80' label="Nombre de Cliente" onChange={handleAuthorChange} disabled={false} valueKey="id" value={author.id} options={resources} text="razonSocial" />
                <SelectBox required validations={validations} name="status" className='mr-8 w-80' label="Estado del Ticket" onChange={handleChangeText} valueKey="id" value={input?.status} options={statuses} text="id" />
            </div>
            <div className='flex mb-6 flex-row'>
                <ValidatingInput required validations={validations} name="title" className='mr-8 w-80' label="Titulo" value={input?.title} onChange={handleChangeText} />
                <SelectBox required validations={validations} name="priority" className='mr-8 w-80' disabled={input?.authorId === 0} label="Prioridad" onChange={handleChangeInt} valueKey="id" value={input?.priority} options={prioridades} text="valor" />
            </div>
            <div className='flex mb-6 flex-row'>
                <SelectBox disabledText='Primero ingrese un cliente...' required validations={validations} name="productId" className='mr-8 w-80' disabled={author.id === 0} label="Producto" onChange={handleProductChange} valueKey="id" value={input?.productId} options={filteredProducts} text="name" />
                <SelectBox disabledText='Primero ingrese un producto...' required validations={validations} name="productLicenseId" className='mr-8 w-80' disabled={author.id === 0 || input?.productId <= 0} label="Version" onChange={handleChangeInt} valueKey="id" value={input?.productLicenseId} options={filteredVersions} text="productVersion" />
            </div>
            <ValidatingInput className='mb-6 w-[42rem] mr-8' name='description' label="Descripcion" value={input?.description} multiline rows={2} onChange={() => { console.log(input) }} />
        </CenteredModal>
    )
}

export default EditTicketModal
