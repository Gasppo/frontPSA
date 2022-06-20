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
    {state: 'Active'},
    {state: 'Deprecated'},
    {state: 'On hold'}
]

const AddVersionModal = (props: AddVersionModalProps) => {
    const { onSubmit, onClose, show, product } = props

    const defaultVersionData = {
        versionId:0,
        versionName: "",
        state: "Active",
        productId: product
    }

    const [runValidations, setRunValidations] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [input, setInput] = useState(defaultVersionData)
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
        const randomId = Math.floor(Math.random() * 300) + 1
        console.log(randomId)
        setInput({ ...input, ['versionId']: randomId })
        const response = await createVersion({ ...input, ['versionId']: randomId })
        setIsLoading(false)
        if (response.status >= 200 && response.status < 300) onSubmit()
    }

    useEffect(() => {
        if (show) return
        setRunValidations(false)
        setInput(defaultVersionData)
    }, [show]);

    const isEmpty = (value: any) => !value ? "Este campo no puede estar vacio" : ""
    const validations = runValidations ? [isEmpty] : []

    return (
        <CenteredModal isLoading={isLoading} onClose={onClose} show={show} onSubmit={handleSubmit} label="Crear Version" addbuttonLabel="Crear" disableSubmit={disabled}>
            <div className='flex mb-6 flex-row'>
                <ValidatingInput required validations={validations} name="versionName" className='mr-8 w-[42rem]' label="Nombre de Versión" value={input?.versionName} onChange={handleChangeText} />
            </div>
            <div className='flex mb-6  flex-row'>
                <SelectBox required name="state" validations={validations} className='mr-8 w-[42rem]' label="Estado" onChange={handleChangeText} valueKey="state" value={input.state} options={versionStates} text="state" />
            </div>
        </CenteredModal>
    )
}

export default AddVersionModal
