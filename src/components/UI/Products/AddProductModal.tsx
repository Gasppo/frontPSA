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
    {state: 'Activa'},
    {state: 'Deprecada'}
]

const AddProductModal = (props: AddVersionModalProps) => {
    const { onSubmit, onClose, show} = props

    const defaultProductData = {
        id:0,
        productName: "",
        versionId:0,
        versionName: "",
        state: "Activa"
    }

    const validateVersion = () => {
        const regex = RegExp('^[a-zA-Z0-9. ..]{3,10}$')
        return regex.test(input.versionName)
    }

    const validateProduct = () => {
        const regex = RegExp('^[a-zA-Z0-9. ]{5,20}$')
        return regex.test(input.productName)
    }

    const [invalidProduct, setInvalidProduct] = useState(false)
    const [invalidVersion, setInvalidVersion] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [input, setInput] = useState(defaultProductData)

    const handleChangeText = (e: any) => {
        setInput(({ ...input, [e.target.name]: e.target.value }))
    };

    const handleSubmit = async () => {
        if (validateProduct() && validateVersion()) {
            setIsLoading(true)
            const randomVersionId = Math.floor(Math.random() * 300) + 1
            const randomProductId = Math.floor(Math.random() * 300) + 1
            console.log('versionId: '+randomVersionId + ', productId: '+randomProductId)
            setIsLoading(false)
            setInput({ ...input, ['id']: randomProductId, ['versionId']: randomVersionId})
            const response = await createProduct({ ...input, ['id']: randomProductId, ['versionId']: randomVersionId})
            setIsLoading(false)
            if (response.status >= 200 && response.status < 300) onSubmit()
        }
        if(!validateProduct()) setInvalidProduct(true)
        if(!validateVersion()) setInvalidVersion(true)
        return
    }

    useEffect(() => {
        if (show) return
        setInput(defaultProductData)
        setInvalidProduct(false)
        setInvalidVersion(false)
    }, [show]);

    const isInvalidProduct = (value: any) => invalidProduct ? "Debe tener un mínimo de 5 (cinco) caracteres y un máximo de 20 (veinte) y solo puede contener letras, números y espacios" : ""
    const productValidations = invalidProduct ? [isInvalidProduct] : []
    const isInvalidVersion = (value: any) => invalidVersion ? "Debe tener un mínimo de 3 (tres) caracteres y un máximo de 10 (diez) y solo puede contener letras, números, espacios y puntos" : ""
    const versionValidations = invalidVersion ? [isInvalidVersion] : []

    return (
        <CenteredModal isLoading={isLoading} onClose={onClose} show={show} onSubmit={handleSubmit} label="Crear Producto" addbuttonLabel="Crear" disableSubmit={false}>
            <div className='flex mb-6 flex-row'>
                <ValidatingInput required validations={productValidations} name="productName" className='mr-8 w-[42rem]' label="Nombre de Producto" value={input?.productName} onChange={handleChangeText} />
            </div>
            <div className='flex mb-6 flex-row'>
                <ValidatingInput required validations={versionValidations} name="versionName" className='mr-8 w-[42rem]' label="Nombre de Versión" value={input?.versionName} onChange={handleChangeText} />
            </div>
            <div className='flex mb-6  flex-row'>
                <SelectBox name="state" validations={[]} className='mr-8 w-[42rem]' label="Estado de Versión" onChange={handleChangeText} valueKey="state" value={input.state} options={versionStates} text="state"/>
            </div>
        </CenteredModal>
    )
}

export default AddProductModal
