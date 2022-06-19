import { useEffect, useMemo, useState } from 'react'
import {updateVersion } from '../../api/productAndVersionSupport'
import SelectBox from '../Inputs/SelectBox'
import ValidatingInput from '../Inputs/ValidatingInput'
import CenteredModal from '../Modal/CenteredModal'
import {productAndVersionsURI} from '../../dev/URIs'

interface AddVersionModalProps {
    onClose: () => void
    onSubmit: () => void
    show: boolean
    currentId: number | null
}
const versionStates = [
    {state: 'Active'},
    {state: 'Deprecated'},
    {state: 'On hold'}
]

const EditVersionModal = (props: AddVersionModalProps) => {
    const { onSubmit, onClose, show, currentId } = props

    const defaultVersionData = {
        versionId: currentId,
        versionName: "",
        state: "Active"
    }
    
    const [dirty, setDirty] = useState(false)
    const [originalData, setOriginalData] = useState({})
    const [runValidations, setRunValidations] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [input, setInput] = useState(defaultVersionData)
    const invalidFields = (!input?.versionName || !input?.state)
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
        const response = await updateVersion(input)
        setIsLoading(false)
        if (response.status === 200) onSubmit()
    }

    useEffect(() => {
        if (show) {
            setRunValidations(false)
            setIsLoading(true)
            fetch(`${productAndVersionsURI}/version/${currentId}`)
                .then(res => res.json())
                .then(res => {
                    setInput({ ...input, ['versionId']:res.version[0].id,['versionName']: res.version[0].name,  ['state']: res.version[0].state})
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
        <CenteredModal isLoading={isLoading} onClose={onClose} show={show} onSubmit={handleSubmit} label="Actualizar Version" addbuttonLabel="Actualizar" disableSubmit={disabled}>
            <div className='flex mb-6 flex-row'>
                <ValidatingInput required validations={validations} name="versionName" className='mr-8 w-[42rem]' label="Nombre de Versión" value={input?.versionName} onChange={handleChangeText} />
            </div>
            <div className='flex mb-6  flex-row'>
                <SelectBox required name="state" validations={validations} className='mr-8 w-[42rem]' label="Estado" onChange={handleChangeText} valueKey="state" value={input.state} options={versionStates} text="state" />
            </div>
        </CenteredModal>
    )
}

export default EditVersionModal
