import { useEffect, useMemo, useState } from 'react'
import {updateProduct } from '../../api/productAndVersionSupport'
import ValidatingInput from '../Inputs/ValidatingInput'
import CenteredModal from '../Modal/CenteredModal'
import useIsDirty from '../../../hooks/useIsDirty'
import {productAndVersionsURI} from '../../dev/URIs'

interface AddVersionModalProps {
    onClose: () => void
    onSubmit: () => void
    show: boolean
    currentId: number | null
}

const EditVersionModal = (props: AddVersionModalProps) => {
    const { onSubmit, onClose, show, currentId } = props

    const defaultProductData = {
        id: currentId,
        productName: "",
    }
    
    const [dirty, setDirty] = useState(false)
    const [originalData, setOriginalData] = useState({})
    const [invalidProduct, setInvalidProduct] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [input, setInput] = useState(defaultProductData)
    const disabled = !dirty

    const validateProduct = () => {
        const regex = RegExp('^[a-zA-Z0-9. ]{5,20}$')
        return regex.test(input.productName)
    }

    const handleChangeText = (e: any) => {
        setInput(({ ...input, [e.target.name]: e.target.value }))
        setDirty(true)
    };

    const handleSubmit = async () => {
        if (validateProduct()) {
            setIsLoading(true)
            console.log('input '+ input)
            const response = await updateProduct(input)
            setIsLoading(false)
            if (response.status === 200) onSubmit()
        }
        if(!validateProduct()) setInvalidProduct(true)
        return
    }

    useEffect(() => {
        if (show) {
            setIsLoading(true)
            fetch(`${productAndVersionsURI}/product/${currentId}`)
                .then(res => res.json())
                .then(res => {
                    setInput({ ...input, ['id']:res.product[0].id,['productName']:res.product[0].name})
                    console.log(input)
                    setOriginalData({ ...input, ['id']:res.product[0].id,['productName']:res.product[0].name});
                    setIsLoading(false)
                })
                setInvalidProduct(false)
        }
    }, [show])

    useIsDirty(input, originalData, setDirty)

    const isInvalidProduct = (value: any) => invalidProduct ? "Debe tener un mínimo de 5 (cinco) caracteres y un máximo de 20 (veinte) y solo puede contener letras, números y espacios" : ""
    const productValidations = invalidProduct ? [isInvalidProduct] : []

    return (
        <CenteredModal isLoading={isLoading} onClose={onClose} show={show} onSubmit={handleSubmit} label="Actualizar Producto" addbuttonLabel="Actualizar" disableSubmit={disabled}>
            <div className='flex mb-6 flex-row'>
                <ValidatingInput required validations={productValidations} name="productName" className='mr-8 w-[42rem]' label="Nombre de Producto" value={input?.productName} onChange={handleChangeText} />
            </div>
        </CenteredModal>
    )
}

export default EditVersionModal
