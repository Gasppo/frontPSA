import { useEffect, useMemo, useState } from 'react'
import { addClientToSystem, createTicket, getClientInSystem } from '../../api/ticketSupport'
import SelectBox from '../Inputs/SelectBox'
import CenteredModal from '../Modal/CenteredModal'

interface AddProductModalProps {
    onClose: () => void
    onSubmit: () => void
    show: boolean
}
const defaultProductData = {
    id:0,
    nombre: ""
  }

const AddProductModal = (props: AddProductModalProps) => {
    const { onSubmit, onClose, show } = props
    
    const [isLoading, setIsLoading] = useState(false)
    const [input, setInput] = useState(defaultProductData)


    const handleSubmit = async () => {
        
    }

    const handleNameChange = (e: any) => {

    }

    useEffect(() => {
        if (show) return
        setInput(defaultProductData)
    }, [show]);



    return (
        <CenteredModal isLoading={isLoading} onClose={onClose} show={show} onSubmit={handleSubmit} label="Crear Producto" addbuttonLabel="Crear" disableSubmit={false}>
            <div className='flex mb-6  flex-row'>
            </div>
        </CenteredModal>
    )
}

export default AddProductModal
