import { useEffect, useState } from 'react'
import {  TextField } from '@mui/material';
import {createLicence } from '../../api/productAndVersionSupport'
import SelectBox from '../Inputs/SelectBox'
import CenteredModal from '../Modal/CenteredModal'
import {productAndVersionsURI} from '../../dev/URIs'
import { Version } from '../../../components/types/productTypes'

interface AddResourceLicenceModalProps {
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

const AddResourceLicenceModal = (props: AddResourceLicenceModalProps)=>{
    const { onSubmit, onClose, show, clients, products} = props

    const defaultLicenceData = {
        licenceId:0,
        productId: 0,
        versionId: 0,
        clientId: 0,
        expirationDate: "",
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
        
    }

    const handleProductChange = (e: any) => {

    }

    const handleVersionChange = (e: any) => {
        const version = loadedVersions.find(el => el.id === e.target.value)
        handleChangeInt(e)
        setVersion({ id: version?.id || 0, name: version?.name || "", state: version?.state || ""})
    }

    const handleSubmit = async () => {
        if (invalidFields) {
            setRunValidations(true)
            return
        }
        setIsLoading(true)
        const randomLicenceId = Math.floor(Math.random() * 300) + 1
        console.log('licenceId: '+randomLicenceId)
        setIsLoading(false)
        setInput({ ...input, ['licenceId']: randomLicenceId})
        console.log({ ...input, ['licenceId']: randomLicenceId})
        const response = await createLicence({ ...input, ['licenceId']: randomLicenceId})
        setIsLoading(false)
        if (response.status === 200) onSubmit()
    }

    return (
        <CenteredModal isLoading={isLoading} onClose={onClose} show={show} onSubmit={handleSubmit} label="Crear Licencia" addbuttonLabel="Crear" disableSubmit={disabled}>
            <div className='flex mb-6 flex-row'>
            <SelectBox required name="clientId"  className='mr-8 w-[42rem]' label="Seleccione un Cliente" onChange={handleClientChange} valueKey="id" value={author.id} options={clients} text="razonSocial" />
            </div>
            <div className='flex mb-6 flex-row'>
            <SelectBox required name="productId"  className='mr-8 w-[42rem]' label="Seleccione un Producto" onChange={handleProductChange} valueKey="id" value={product.id} options={products} text="name" />
            </div>
            <div className='flex mb-6  flex-row'>
                <SelectBox disabledText='Primero ingrese un producto...'  required  name="versionId" className='mr-8 w-[42rem]' disabled={input?.productId <= 0} label="Seleccione una Version" onChange={handleVersionChange} valueKey="id" value={version?.id} options={loadedVersions} text="name" />
            </div>
            <div className='flex mb-6  flex-row'>
                <SelectBox required name="state" className='mr-8 w-80' label="Estado" onChange={handleChangeText} valueKey="state" value={input.state} options={versionStates} text="state" />
                <TextField type='date' className='mr-8 w-80' inputProps={{min: new Date().toISOString().slice(0, 10)}} defaultValue={new Date().toISOString().slice(0, 10)} label='Fecha de Expiración' onChange={handleChangeText} name='expirationDate'></TextField>
            </div>
        </CenteredModal>
    )



}
export default AddResourceLicenceModal