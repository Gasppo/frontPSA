import { useEffect, useMemo, useState } from 'react'
import {updateProduct } from '../../api/productAndVersionSupport'
import ValidatingInput from '../Inputs/ValidatingInput'
import CenteredModal from '../Modal/CenteredModal'
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
    const [runValidations, setRunValidations] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [input, setInput] = useState(defaultProductData)
    const invalidFields = (!input?.productName)
    const disabled = (runValidations && invalidFields) || !dirty

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
        const response = await updateProduct(input)
        setIsLoading(false)
        if (response.status === 200) onSubmit()
    }

    useEffect(() => {
        if (show) {
            setRunValidations(false)
            setIsLoading(true)
            fetch(`${productAndVersionsURI}/product/${currentId}`)
                .then(res => res.json())
                .then(res => {
                    setInput({ ...input, ['id']:res.product[0].id,['productName']:res.product[0].name})
                    console.log(input)
                    setOriginalData(input || null);
                    setIsLoading(false)
                })
        }
    }, [show])

    useEffect(() => {
        setDirty(JSON.stringify(input) !== JSON.stringify(originalData))
    }, [input, originalData])

    const isEmpty = (value: any) => !value ? "Este campo no puede estar vacio" : ""
    const validations = runValidations ? [isEmpty] : []

    return (
        <CenteredModal isLoading={isLoading} onClose={onClose} show={show} onSubmit={handleSubmit} label="Actualizar Producto" addbuttonLabel="Actualizar" disableSubmit={disabled}>
            <div className='flex mb-6 flex-row'>
                <ValidatingInput required validations={validations} name="productName" className='mr-8 w-[42rem]' label="Nombre de Producto" value={input?.productName} onChange={handleChangeText} />
            </div>
        </CenteredModal>
    )
}

export default EditVersionModal
