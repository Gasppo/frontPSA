import { useEffect, useState } from 'react'
import {  TextField } from '@mui/material';
import {createLicence } from '../../api/productAndVersionSupport'
import SelectBox from '../Inputs/SelectBox'
import CenteredModal from '../Modal/CenteredModal'
import {productAndVersionsURI} from '../../dev/URIs'
import { Version } from '../../../components/types/productTypes'
import { SelectResource, LicenseType } from '../../types/resourcesTypes';
import { LunchDiningSharp } from '@mui/icons-material';

interface AddResourceLicenceModalProps {
    onClose: () => void
    onSubmit: () => void
    show: boolean
    clients: any[]
    products: any[]
}

const AddResourceLicenceModal = (props: AddResourceLicenceModalProps)=>{
    const { onSubmit, onClose, show, clients, products} = props

    const defaultLicenceData = {
        licenceId:0,
        productId: 0,
        versionId: 0,
        clientId: 0,
        expirationDate: "",
        state: "Active"
    }

    const emptyAuthor = {
        id: 0, 
        CUIT: "", 
        razonSocial: ""
    }

    const emptyProduct = {
        id: 0, 
        name: ""
    }

    const emptyVersion = {
        id: 0, 
        name: "",
        state: "Active"
    }

    const tipos_de_licencia=[{label: "Maternidad"}, {label: "Salud"}, {label: "Vacaciones"}]

    const [runValidations, setRunValidations] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [input, setInput] = useState(defaultLicenceData)
    const [empleados, setEmpleados] = useState<SelectResource[]>([])
    const [version, setVersion] = useState(emptyVersion)
    const invalidFields = (!input?.productId || !input?.versionId || !input?.clientId || !input?.expirationDate ||  !input?.state)
    const disabled = runValidations && invalidFields

    const fetchEmployees = () => {
        fetch('https://modulo-recursos-psa.herokuapp.com/employees')
            .then(res => res.json())
            .then(res => {
                console.log(res)
                let resources: SelectResource[] = [];
                res.forEach((item: any) => {
                    let proj = {
                        label: item.Apellido + "," + item.Nombre,
                        value: item.legajo
                    }
                    if (true)
                        resources.push(proj)
                })
                setEmpleados(resources)
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })
    }

    useEffect(() => {
        fetchEmployees();

    }, [empleados]);



    return (
        <CenteredModal isLoading={isLoading} onClose={onClose} show={show} label="Crear Licencia" addbuttonLabel="Crear" disableSubmit={disabled} onSubmit={function (): void { console.log('Function not implemented.');} }>
            <div className='flex mb-6 flex-row'>
            <SelectBox required name="clientId" className='mr-8 w-[42rem]' label="Seleccione un Empledo" valueKey="legajo" options={empleados} text="label" value={undefined} onChange={function (e: any): void {
                    console.log('Function not implemented.');
                } } />
            </div>
            <div className='flex mb-6 flex-row'>
            <SelectBox required name="productId" className='mr-8 w-[42rem]' label="Seleccione un Tipo de Licencia" valueKey="label" options={tipos_de_licencia} text="label" value={undefined} onChange={function (e: any): void {
                    console.log('Function not implemented.');
                } } />
            </div>
            <div className='flex mb-6  flex-row'>
            <TextField type='date' className='mr-8 w-80' inputProps={{min: new Date().toISOString().slice(0, 10)}} defaultValue={new Date().toISOString().slice(0, 10)} label='Fecha de Expiración' name='expirationDate'></TextField>
            <TextField type='number' className='mr-8 w-80' defaultValue={0} label='Dias de duracion' name='expirationDate'></TextField>
            </div>
        </CenteredModal>
    )

}
export default AddResourceLicenceModal