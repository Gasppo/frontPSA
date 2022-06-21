import { useEffect, useMemo, useState } from 'react'
import {createVersion } from '../../api/productAndVersionSupport'
import SelectBox from '../Inputs/SelectBox'
import ValidatingInput from '../Inputs/ValidatingInput'
import CenteredModal from '../Modal/CenteredModal'

interface AddVersionModalProps {
    onClose: () => void
    onSubmit: () => void
    show: boolean
    product: number
}
const versionStates = [
    {state: 'ACTIVE'},
    {state: 'DEPRECATED'}
]

const AddVersionModal = (props: AddVersionModalProps) => {
    const { onSubmit, onClose, show, product } = props

    const defaultVersionData = {
        versionId:0,
        versionName: "",
        state: "ACTIVE",
        productId: product
    }

    const [invalidVersion, setInvalidVersion] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [input, setInput] = useState(defaultVersionData)

    const validateVersion = () => {
        const regex = RegExp('^[a-zA-Z0-9. ..]{5,10}$')
        return regex.test(input.versionName)
    }

    const handleChangeText = (e: any) => {
        setInput(({ ...input, [e.target.name]: e.target.value }))
    };

    const handleSubmit = async () => {
        if (validateVersion()) {
            setIsLoading(true)
            const randomId = Math.floor(Math.random() * 300) + 1
            console.log(randomId)
            setInput({ ...input, ['versionId']: randomId })
            const response = await createVersion({ ...input, ['versionId']: randomId })
            setIsLoading(false)
            if (response.status >= 200 && response.status < 300) onSubmit()
        }
        if(!validateVersion()) setInvalidVersion(true)
        return
    }

    useEffect(() => {
        if (show) return
        setInvalidVersion(false)
        setInput(defaultVersionData)
    }, [show]);

    const isInvalidVersion = (value: any) => invalidVersion ? "Debe tener un mínimo de 5 (cinco) caracteres y un máximo de 10 (diez) y solo puede contener letras, números, espacios y puntos" : ""
    const versionValidations = invalidVersion ? [isInvalidVersion] : []

    return (
        <CenteredModal isLoading={isLoading} onClose={onClose} show={show} onSubmit={handleSubmit} label="Crear Version" addbuttonLabel="Crear" disableSubmit={false}>
            <div className='flex mb-6 flex-row'>
                <ValidatingInput required validations={versionValidations} name="versionName" className='mr-8 w-[42rem]' label="Nombre de Versión" value={input?.versionName} onChange={handleChangeText} />
            </div>
            <div className='flex mb-6  flex-row'>
                <SelectBox name="state" validations={[]} className='mr-8 w-[42rem]' label="Estado" onChange={handleChangeText} valueKey="state" value={input.state} options={versionStates} text="state" />
            </div>
        </CenteredModal>
    )
}

export default AddVersionModal
