import { useEffect, useState, useCallback } from 'react'
import {  TextField } from '@mui/material';
import useIsDirty from '../../../hooks/useIsDirty'
import {updateLicence } from '../../api/productAndVersionSupport'
import SelectBox from '../Inputs/SelectBox'
import CenteredModal from '../Modal/CenteredModal'
import {productAndVersionsURI} from '../../dev/URIs'

interface AddLicenceModalProps {
    onClose: () => void
    onSubmit: () => void
    show: boolean
    currentId: number | null
}
const versionStates = [
    {state: 'Activa'},
    {state: 'Expirada'},
    {state: 'Cancelada'}
]

const EditLicenceModal = (props: AddLicenceModalProps) => {
    const { onSubmit, onClose, show, currentId} = props

    const defaultLicenceData = {
        licenceId:0,
        productName: "",
        versionName: "",
        clientName: "",
        expirationDate: new Date().toISOString().slice(0, 10),
        state: "Activa"
    }

    const [dirty, setDirty] = useState(false)
    const [originalData, setOriginalData] = useState({})
    const [runValidations, setRunValidations] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [input, setInput] = useState(defaultLicenceData)
    const invalidFields = (!input?.state)
    const disabled =  !dirty

    const handleChangeText = (e: any) => {
        setInput(({ ...input, [e.target.name]: e.target.value }))
        setDirty(true)
    };

    const handleSubmit = async () => {
        if (invalidFields) {
            setRunValidations(true)
            return
        }
        setIsLoading(true)
        console.log('input '+ input)
        const response = await updateLicence(input)
        setIsLoading(false)
        if (response.status === 200) onSubmit()
    }

    useEffect(() => {
        if (show) {
            setRunValidations(false)
            setIsLoading(true)
            fetch(`${productAndVersionsURI}/populatedLicence/${currentId}`)
                .then(res => res.json())
                .then(res => {
                console.log('Seteo input')
                setInput({ licenceId: res.licences[0].id,productName:res.licences[0].productName,versionName:res.licences[0].versionName, clientName:res.licences[0].clientName,expirationDate:res.licences[0].expirationDate,state:res.licences[0].state })
                setOriginalData({licenceId: res.licences[0].id,productName:res.licences[0].productName,versionName:res.licences[0].versionName, clientName:res.licences[0].clientName,expirationDate:res.licences[0].expirationDate,state:res.licences[0].state});
            })
            setIsLoading(false)
        }
    }, [show])

    useIsDirty(input, originalData, setDirty)

    const isEmpty = (value: any) => !value ? "Este campo no puede estar vacio" : ""
    const validations = runValidations ? [isEmpty] : []

    return (
        <CenteredModal isLoading={isLoading} onClose={onClose} show={show} onSubmit={handleSubmit} label="Actualizar Licencia" addbuttonLabel="Actualizar" disableSubmit={disabled}>
            <div className='flex mb-6 flex-row'>
                <SelectBox  disabledText={input?.clientName || ""} name="clientId" validations={validations} className='mr-8 w-[42rem]' disabled={true} label="Seleccione un Cliente" onChange={handleChangeText} valueKey="id" value={input.clientName} options={[]} text="razonSocial" />
            </div>
            <div className='flex mb-6 flex-row'>
                <SelectBox disabledText={input?.productName || ""} name="productId" validations={validations} className='mr-8 w-[42rem]' disabled={true} label="Seleccione un Producto" onChange={handleChangeText} valueKey="id" value={input.productName} options={[]} text="name" />
            </div>
            <div className='flex mb-6  flex-row'>
                <SelectBox disabledText={input?.versionName || ""} validations={validations} name="versionId" className='mr-8 w-[42rem]' disabled={true} label="Seleccione una Version" onChange={handleChangeText} valueKey="id" value={input.versionName} options={[]} text="name" />
            </div>
            <div className='flex mb-6  flex-row'>
                <SelectBox name="state" validations={validations} className='mr-8 w-80' label="Estado" onChange={handleChangeText} valueKey="state" value={input.state} options={versionStates} text="state" />
                <TextField type='date' className='mr-8 w-80' inputProps={{min: new Date().toISOString().slice(0, 10)}} value={new Date(input?.expirationDate).toISOString().slice(0, 10)} label='Fecha de Expiración' onChange={handleChangeText} name='expirationDate' disabled={true}></TextField>
            </div>
        </CenteredModal>
    )
}

export default EditLicenceModal
