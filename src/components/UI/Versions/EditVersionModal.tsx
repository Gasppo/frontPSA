import { useEffect, useMemo, useState } from 'react'
import {updateVersion } from '../../api/productAndVersionSupport'
import SelectBox from '../Inputs/SelectBox'
import ValidatingInput from '../Inputs/ValidatingInput'
import CenteredModal from '../Modal/CenteredModal'
import {productAndVersionsURI} from '../../dev/URIs'
import useIsDirty from '../../../hooks/useIsDirty'

interface AddVersionModalProps {
    onClose: () => void
    onSubmit: () => void
    show: boolean
    currentId: number | null
}
const versionStates = [
    {state: 'Activa'},
    {state: 'Deprecada'}
]

const EditVersionModal = (props: AddVersionModalProps) => {
    const { onSubmit, onClose, show, currentId } = props

    const defaultVersionData = {
        versionId: currentId,
        versionName: "",
        state: "Activa"
    }
    
    const [dirty, setDirty] = useState(false)
    const [originalData, setOriginalData] = useState({})
    const [invalidVersion, setInvalidVersion] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [input, setInput] = useState(defaultVersionData)
    const disabled = !dirty

    const handleChangeText = (e: any) => {
        setInput(({ ...input, [e.target.name]: e.target.value }))
        setDirty(true)
    };

    const validateVersion = () => {
        const regex = RegExp('^[a-zA-Z0-9. ..]{3,10}$')
        return regex.test(input.versionName)
    }

    const handleSubmit = async () => {
        if (validateVersion()) {
            setIsLoading(true)
            console.log('input '+ input)
            const response = await updateVersion(input)
            setIsLoading(false)
            if (response.status === 200) onSubmit()
        }
        if(!validateVersion()) setInvalidVersion(true)
        return
    }

    useEffect(() => {
        if (show) {
            setIsLoading(true)
            fetch(`${productAndVersionsURI}/version/${currentId}`)
                .then(res => res.json())
                .then(res => {
                    setInput({ ...input, ['versionId']:res.version[0].id,['versionName']: res.version[0].name,  ['state']: res.version[0].state})
                    console.log(input)
                    setOriginalData({ ...input, ['versionId']:res.version[0].id,['versionName']: res.version[0].name,  ['state']: res.version[0].state});
                    setIsLoading(false)
                })
                setInvalidVersion(false)
        }
    }, [show])

    useIsDirty(input, originalData, setDirty)

    const isInvalidVersion = (value: any) => invalidVersion ? "Debe tener un mínimo de 3 (tres) caracteres y un máximo de 10 (diez) y solo puede contener letras, números, espacios y puntos" : ""
    const versionValidations = invalidVersion ? [isInvalidVersion] : []

    return (
        <CenteredModal isLoading={isLoading} onClose={onClose} show={show} onSubmit={handleSubmit} label="Actualizar Version" addbuttonLabel="Actualizar" disableSubmit={disabled}>
            <div className='flex mb-6 flex-row'>
                <ValidatingInput required validations={versionValidations} name="versionName" className='mr-8 w-[42rem]' label="Nombre de Versión" value={input?.versionName} onChange={handleChangeText} />
            </div>
            <div className='flex mb-6  flex-row'>
                <SelectBox name="state" validations={[]} className='mr-8 w-[42rem]' label="Estado" onChange={handleChangeText} valueKey="state" value={input.state} options={versionStates} text="state" />
            </div>
        </CenteredModal>
    )
}

export default EditVersionModal
