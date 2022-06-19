import { useEffect, useState } from 'react'
import {createProduct } from '../../api/productAndVersionSupport'
import SelectBox from '../Inputs/SelectBox'
import ValidatingInput from '../Inputs/ValidatingInput'
import CenteredModal from '../Modal/CenteredModal'

interface AddVersionModalProps {
    onClose: () => void
    onSubmit: () => void
    show: boolean
}
const versionStates = [
    {state: 'Active'},
    {state: 'Deprecated'},
    {state: 'On hold'}
]

const AddProductModal = (props: AddVersionModalProps) => {
    const { onSubmit, onClose, show} = props

    const defaultProductData = {
        id:0,
        productName: "",
        versionId:0,
        versionName: "",
        state: "Active"
    }

    const [runValidations, setRunValidations] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [input, setInput] = useState(defaultProductData)
    const invalidFields = (!input?.versionName || !input?.state)
    const disabled = runValidations && invalidFields

    const handleChangeText = (e: any) => {
        setInput(({ ...input, [e.target.name]: e.target.value }))
    };

    const handleSubmit = async () => {
        if (invalidFields) {
            setRunValidations(true)
            return
        }
        setIsLoading(true)
        const randomVersionId = Math.floor(Math.random() * 300) + 1
        const randomProductId = Math.floor(Math.random() * 300) + 1
        console.log('versionId: '+randomVersionId + ', productId: '+randomProductId)
        setIsLoading(false)
        setInput({ ...input, ['id']: randomProductId, ['versionId']: randomVersionId})
        const response = await createProduct({ ...input, ['id']: randomProductId, ['versionId']: randomVersionId})
        setIsLoading(false)
        if (response.status === 200) onSubmit()
    }

    useEffect(() => {
        if (show) return
        setRunValidations(false)
        setInput(defaultProductData)
    }, [show]);

    const isEmpty = (value: any) => !value ? "Este campo no puede estar vacio" : ""
    const validations = runValidations ? [isEmpty] : []

    return (
        <CenteredModal isLoading={isLoading} onClose={onClose} show={show} onSubmit={handleSubmit} label="Crear Producto" addbuttonLabel="Crear" disableSubmit={disabled}>
            <div className='flex mb-6 flex-row'>
                <ValidatingInput required validations={validations} name="productName" className='mr-8 w-[42rem]' label="Nombre de Producto" value={input?.productName} onChange={handleChangeText} />
            </div>
            <div className='flex mb-6 flex-row'>
                <ValidatingInput required validations={validations} name="versionName" className='mr-8 w-[42rem]' label="Nombre de Versión" value={input?.versionName} onChange={handleChangeText} />
            </div>
            <div className='flex mb-6  flex-row'>
                <SelectBox required name="state" validations={validations} className='mr-8 w-[42rem]' label="Estado" onChange={handleChangeText} valueKey="state" value={input.state} options={versionStates} text="state" />
            </div>
        </CenteredModal>
    )
}

export default AddProductModal
