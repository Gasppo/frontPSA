import { useEffect, useMemo, useState } from 'react'
import { addClientToSystem, createTicket, getClientInSystem } from '../../api/ticketSupport'
import { defaultTicketData, externalResource, prioridades, product, productLicense, productVersion } from '../../dev/dummyData'
import SelectBox from '../Inputs/SelectBox'
import { MultiSelect } from "react-multi-select-component";
import ValidatingInput from '../Inputs/ValidatingInput'
import CenteredModal from '../Modal/CenteredModal'
import { Select, TextField } from '@mui/material';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
//import DatePicker from "react-datepicker"



interface AddTicketModalProps {
    onClose: () => void
    onSubmit: () => void
    show: boolean
}


const AddHourModal = (props: AddTicketModalProps) => {
    const { onSubmit, onClose, show } = props
    const emptyAuthor = useMemo(() => ({ id: 0, CUIT: "", "razon social": "" }), [])
    

    
    //TODO - Delete when product license API avaialble
    const productos = product
    const userProducts = productLicense.map(lic => ({
        ...lic,
        productName: product.find(prod => prod.id === lic.productId)?.name || 'N/A',
        productVersion: productVersion.find(ver => ver.id === lic.versionId)?.name || 'N/A'
    }))
    

    const [runValidations, setRunValidations] = useState(false)
    const [author, setAuthor] = useState(emptyAuthor)
    const [isLoading, setIsLoading] = useState(false)
    const [input, setInput] = useState(defaultTicketData)
    const [selected, setSelected] = useState([]);


    const invalidFields = (!input?.title || !author?.id || !input.productLicenseId)
    const disabled = runValidations && invalidFields


    const handleSubmit = async () => {
        if (invalidFields) {
            setRunValidations(true)
            return
        }

        setIsLoading(true)
        const response = await generateTicketUsingAPI()
        setIsLoading(false)
        if (response.status === 200) onSubmit()
    }

    useEffect(() => {
        if (show) return
        setRunValidations(false)
        setInput(defaultTicketData)
        setAuthor(emptyAuthor)
    }, [emptyAuthor, show]);




    const generateTicketUsingAPI = async () => {
        const inSystemId = await getClientInSystem(author?.CUIT)
        if (!inSystemId) {
            const createResponse = await addClientToSystem(author?.['razon social'], author?.CUIT)
            const createJSON = await createResponse.json()
            if (createResponse.status > 300) return createJSON
            return createTicket({ ...input, authorId: createJSON.ticketAuthor.id })
        }
        return createTicket({ ...input, authorId: inSystemId })
    }

    const isEmpty = (value: any) => !value ? "Este campo no puede estar vacio" : ""
    const validations = runValidations ? [isEmpty] : []
    
  
    return (
        
        <CenteredModal isLoading={isLoading} onClose={onClose} show={show} onSubmit={handleSubmit} label="¿Esta seguro que desea cargar las horas?" addbuttonLabel="Cargar Horas" disableSubmit={disabled}>
        </CenteredModal>
    
    ) 
}

export default AddHourModal
