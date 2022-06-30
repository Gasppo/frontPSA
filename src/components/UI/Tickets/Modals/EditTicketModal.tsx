import { useCallback, useEffect, useMemo, useState } from 'react'
import useIsDirty from '../../../../hooks/useIsDirty'
import { getClientLicenses, getProductVersions, updateTicket } from '../../../api/ticketSupport'
import { defaultTicketData, prioridades } from '../../../dev/dummyData'
import { ticketSupportURI } from '../../../dev/URIs'
import { Client } from '../../../types/clientTypes'
import { TicketLicense, TicketProduct, TicketProductVersion } from '../../../types/ticketTypes'
import SelectBox from '../../Inputs/SelectBox'
import ValidatingInput from '../../Inputs/ValidatingInput'
import CenteredModal from '../../Modal/CenteredModal'

interface EditTicketModalProps {
    onClose: () => void
    onSubmit: () => void
    show: boolean,
    currentId: number | null
    clients: Client[]
    products: TicketProduct[]
}



const EditTicketModal = (props: EditTicketModalProps) => {
    const { onSubmit, onClose, show, currentId, clients, products } = props

    const ticketURL = useMemo(() => `${ticketSupportURI}/tickets/${currentId || 0}`, [currentId])

    const [dirty, setDirty] = useState(false)
    const [originalData, setOriginalData] = useState({})
    const [runValidations, setRunValidations] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [input, setInput] = useState(defaultTicketData)
    const [clientLicenses, setClientLicenses] = useState<TicketLicense[]>([])
    const [versions, setVersions] = useState<TicketProductVersion[]>([])

    const invalidFields = (!input?.title || !input?.authorId || !input.productLicenseId)
    const disabled = (runValidations && invalidFields) || !dirty

    const enabledProducts = useMemo(() => clientLicenses.filter(el => el.state === "Activa").map(el => el.productId), [clientLicenses])
    const filteredProducts = useMemo(() => products.filter(el => enabledProducts.includes(el.id)), [enabledProducts, products])
    const filteredVersions = useMemo(() => clientLicenses
        .filter(el => el.productId === input?.productId && el.state === 'Activa')
        .map(el => ({ id: el.id, productVersion: versions.find(ver => ver.id === el.versionId)?.name || 'N/A' })) || []
        , [input, clientLicenses, versions])

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

    const updateTicketUsingAPI = async () => {
        return updateTicket({ ...input }, ticketURL)
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

    const gatherStartingData = useCallback(() => {
        fetch(ticketURL)
            .then(res => res.json())
            .then(res => {
                setInput(res?.ticket || null);
                setOriginalData(res?.ticket || null);
                setIsLoading(false)
            })
    }, [ticketURL])

    const checkVersionForProduct = () => {
        const currProductId = input.productId
        const currentLicense = input.productLicenseId

        if (clientLicenses.find(el => el.id === currentLicense)?.productId === currProductId) {
            setInput(prev => ({ ...prev, productLicenseId: 0}))
        }
    }



    useEffect(() => {
        gatherLicenses(input?.authorId)
    }, [input?.authorId])

    useEffect(() => {
        if (input?.productId) gatherProductVersions(input?.productId)
    }, [input?.productId])

    useEffect(() => {
        if (input?.productId) gatherProductVersions(input?.productId)
    }, [input?.productId])

    useEffect(() => {
        if (show) {
            setRunValidations(false)
            setIsLoading(true)
            gatherStartingData()
        }
    }, [gatherStartingData, show])

    useIsDirty(input, originalData, setDirty)

    const statuses = [
        { id: "Abierto" },
        { id: "Cerrado" },
        { id: "En analisis" },
        { id: "Rechazado" },
    ]


    const isEmpty = (value: any) => !value ? "Este campo no puede estar vacio" : ""
    const validations = runValidations ? [isEmpty] : []
    const noAuthorSelected = (!input?.authorId && input?.authorId === 0)
    const noProductSelected = input?.productId <= 0
    const disableClientInput = noAuthorSelected || enabledProducts.length === 0
    const disabledVersionInput = noAuthorSelected || noProductSelected || enabledProducts.length === 0
    const productDisabledText = `${!noAuthorSelected && enabledProducts.length === 0 ? 'El cliente no tiene licencias activas' : 'Primero ingrese un cliente...'}`
    const versionDisabledText = `${!noAuthorSelected && enabledProducts.length === 0 ? 'El cliente no tiene licencias activas' : 'Primero ingrese un producto...'}`

    return (
        <CenteredModal isLoading={isLoading} onClose={onClose} show={show} onSubmit={handleSubmit} label="Actualizar Ticket" addbuttonLabel="Actualizar" disableSubmit={disabled}>
            <div className='flex mb-6  flex-row'>
                <SelectBox required validations={validations} name="authorId" className='mr-8 w-80' label="Nombre de Cliente" onChange={handleChangeInt} disabled valueKey="id" value={input?.authorId} options={clients} text="razonSocial" />
                <SelectBox required validations={validations} name="status" className='mr-8 w-80' label="Estado del Ticket" onChange={handleChangeText} valueKey="id" value={input?.status} options={statuses} text="id" />
            </div>
            <div className='flex mb-6 flex-row'>
                <ValidatingInput disabled required validations={validations} name="title" className='mr-8 w-80' label="Titulo" value={input?.title} onChange={handleChangeText} />
                <SelectBox required validations={validations} name="priority" className='mr-8 w-80' disabled={input?.authorId === 0} label="Prioridad" onChange={handleChangeInt} valueKey="id" value={input?.priority} options={prioridades} text="valor" />
            </div>
            <div className='flex mb-6 flex-row'>
                <SelectBox disabledText={productDisabledText} required validations={validations} name="productId" className='mr-8 w-80' disabled={disableClientInput} label="Producto" onChange={handleProductChange} valueKey="id" value={input?.productId} options={filteredProducts} text="name" />
                <SelectBox disabledText={versionDisabledText} required validations={validations} name="productLicenseId" className='mr-8 w-80' disabled={disabledVersionInput} label="Version" onChange={handleChangeInt} valueKey="id" value={input?.productLicenseId} options={filteredVersions} text="productVersion" />
            </div>
            <ValidatingInput required validations={validations} className='mb-6 w-[42rem] mr-8' name='description' label="Descripcion" value={input?.description} multiline rows={2} onChange={handleChangeText} />
        </CenteredModal>
    )
}

export default EditTicketModal
