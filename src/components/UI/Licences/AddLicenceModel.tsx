import { useEffect, useState } from 'react'
import {  TextField } from '@mui/material';
import {createLicence } from '../../api/productAndVersionSupport'
import SelectBox from '../Inputs/SelectBox'
import CenteredModal from '../Modal/CenteredModal'
import {productAndVersionsURI} from '../../dev/URIs'
import { Version } from '../../../components/types/productTypes'
import ValidatingDateInput from '../../../components/UI/Inputs/validatinDateInput'

interface AddLicenceModalProps {
    onClose: () => void
    onSubmit: () => void
    show: boolean
    clients: any[]
    products: any[]
}
const versionStates = [
    {state: 'Active'},
    {state: 'Deprecated'},
    {state: 'On hold'}
]

const AddLicenceModal = (props: AddLicenceModalProps) => {
    const { onSubmit, onClose, show, clients, products} = props

    const defaultDate = new Date(new Date)
    defaultDate.setDate(defaultDate.getDate() + 1)

    const defaultLicenceData = {
        licenceId:0,
        productId: 0,
        versionId: 0,
        clientId: 0,
        expirationDate: defaultDate.toISOString().slice(0, 10),
        state: "Active"
    }

    const emptyAuthor = {
        id: 0, 
        CUIT: "", 
        razonSocial: ""
    }

    const emptyProduct = {
        id: 0, 
        name: ""
    }

    const emptyVersion = {
        id: 0, 
        name: "",
        state: "Active"
    }

    const [runValidations, setRunValidations] = useState(false)
    const [invalidDate, setInvalidDate] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [input, setInput] = useState(defaultLicenceData)
    const [author, setAuthor] = useState(emptyAuthor)
    const [product, setProduct] = useState(emptyProduct)
    const [version, setVersion] = useState(emptyVersion)
    const [loadedVersions, setLoadedVersions] = useState<Version[]>([])
    const invalidFields = (!input?.productId || !input?.versionId || !input?.clientId || !input?.expirationDate ||  !input?.state)
    const disabled = runValidations && invalidFields

    const handleChangeText = (e: any) => {
        setInput(({ ...input, [e.target.name]: e.target.value }))
    };

    const handleChangeInt = (e: any) => {
        setInput(({ ...input, [e.target.name]: Number(e.target.value) }))
        console.log(e.target.name)
        console.log(e.target.value)
    };

    const handleClientChange = (e: any) => {
        const cliente = clients.find(el => el.id === e.target.value)
        handleChangeInt(e)
        setAuthor({ id: cliente?.id || 0, CUIT: cliente?.CUIT || "", razonSocial: cliente?.['razonSocial'] || "" })
    }

    const handleProductChange = (e: any) => {
        const producto = products.find(el => el.id === e.target.value)
        handleChangeInt(e)
        setProduct({ id: producto?.id || 0, name: producto?.name || ""})
    }

    const handleVersionChange = (e: any) => {
        const version = loadedVersions.find(el => el.id === e.target.value)
        handleChangeInt(e)
        setVersion({ id: version?.id || 0, name: version?.name || "", state: version?.state || ""})
    }

    const handleSubmit = async () => {
        if (!invalidFields && validateDate()) {
            setIsLoading(true)
            const randomLicenceId = Math.floor(Math.random() * 300) + 1
            console.log('licenceId: '+randomLicenceId)
            setInput({ ...input, ['licenceId']: randomLicenceId})
            const response = await createLicence({ ...input, ['licenceId']: randomLicenceId})
            setIsLoading(false)
            if (response.status >= 200 && response.status < 300) onSubmit()
        }
        if(invalidFields) setRunValidations(true)
        //if(!validateDate()) setInvalidDate(true)
        return
        
    }

    const gatherVersions = async () => {
        fetch(`${productAndVersionsURI}/versions/${product.id}`)
            .then(res => res.json())
            .then(res => {
                setLoadedVersions(res.versions)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        if (show) return
        setRunValidations(false)
        setInput(defaultLicenceData)
        setAuthor(emptyAuthor)
        setProduct(emptyProduct)
        setVersion(emptyVersion)
        setInvalidDate(false)
    }, [show]);

    useEffect(() => {
        validateDate() ? setInvalidDate(false) : setInvalidDate(true) 
    }, [input.expirationDate])

    const validateDate = () => {
        const date = new Date(input.expirationDate)
        const minDate = new Date()
        /*const maxDate = new Date(minDate)
        maxDate.setDate(maxDate.getDate() + 1460)
        console.log('validando')*/
        return (date > minDate)
    }

    useEffect(() => {
        gatherVersions()
    }, [product]);

    const isEmpty = (value: any) => !value ? "Este campo no puede estar vacio" : ""
    const isInvalidDate = (value: any) => !value ? "La fecha debe ser posterior al día de hoy" : ""
    const validations = runValidations ? [isEmpty] : []
    const dateValidations = invalidDate ? [isInvalidDate] : []

    return (
        <CenteredModal isLoading={isLoading} onClose={onClose} show={show} onSubmit={handleSubmit} label="Crear Licencia" addbuttonLabel="Crear" disableSubmit={disabled}>
            <div className='flex mb-6 flex-row'>
                <SelectBox required name="clientId" validations={validations} className='mr-8 w-[42rem]' label="Seleccione un Cliente" onChange={handleClientChange} valueKey="id" value={author.id} options={clients} text="razonSocial" />
            </div>
            <div className='flex mb-6 flex-row'>
                <SelectBox required name="productId" validations={validations} className='mr-8 w-[42rem]' label="Seleccione un Producto" onChange={handleProductChange} valueKey="id" value={product.id} options={products} text="name" />
            </div>
            <div className='flex mb-6  flex-row'>
                <SelectBox disabledText='Primero ingrese un producto...'  required validations={validations} name="versionId" className='mr-8 w-[42rem]' disabled={input?.productId <= 0} label="Seleccione una Version" onChange={handleVersionChange} valueKey="id" value={version?.id} options={loadedVersions} text="name" />
            </div>
            <div className='flex mb-6  flex-row'>
                <SelectBox name="state" validations={validations} className='mr-8 w-80' label="Estado" onChange={handleChangeText} valueKey="state" value={input.state} options={versionStates} text="state" />
                <ValidatingDateInput required  validations={dateValidations} className='mr-8 w-80' inputProps={{min: defaultDate.toISOString().slice(0, 10)}} defaultValue={defaultDate.toISOString().slice(0, 10)} label='Fecha de Expiración' onChange={handleChangeText} name='expirationDate'></ValidatingDateInput>
            </div>
        </CenteredModal>
    )
}

export default AddLicenceModal
