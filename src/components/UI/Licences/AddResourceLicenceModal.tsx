import { useEffect, useState } from 'react'
import {  TextField } from '@mui/material';
import SelectBox from '../Inputs/SelectBox'
import CenteredModal from '../Modal/CenteredModal'
import { SelectResource, LicenseType } from '../../types/resourcesTypes';
import { LunchDiningSharp } from '@mui/icons-material';
import ValidatingInput from '../Inputs/ValidatingInput';

interface AddResourceLicenceModalProps {
    onClose: () => void
    onSubmit: () => void
    show: boolean
}

const AddResourceLicenceModal = (props: AddResourceLicenceModalProps)=>{
    const { onSubmit, onClose, show} = props

    const defaultDate = new Date(new Date)
    defaultDate.setDate(defaultDate.getDate() + 1)

    const defaultLicenceData = {
        licensedPersonCode:0,
        licenseType:"Maternidad",
        startingDate: defaultDate.toISOString().slice(0, 10),
        durationDays:0,
    }

    const emptyEmployee = {
        value: 0, 
        label: ""
    }
    const emptyLicense = {
        value:0,
        label: ""
    }


    const tipos_de_licencia=[{value:1,label: "Maternidad"}, {value:2, label: "Salud"}, {value:3,label: "Vacaciones"}]

    const [runValidations, setRunValidations] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [input, setInput] = useState(defaultLicenceData)
    const [empleados, setEmpleados] = useState<SelectResource[]>([])
    const [employee, setEmpleado]= useState(emptyEmployee)
    const[tipoDeLicencia,setTipoDeLicencia]= useState(emptyLicense)
    const [invalidDurationDays, setInvalidDurationDays] = useState(false)
    const invalidFields = (!input?.licensedPersonCode || !input?.licenseType || !input?.startingDate ||  !input?.durationDays)
    const disabled = runValidations && invalidFields
    const isEmpty = (value: any) => !value ? "Este campo no puede estar vacio" : ""
    const validations = runValidations ? [isEmpty] : []
    const isInvalidDurationDays = (value: any) => !(value >= 5 && value <= 10) ? "Debe tener un mínimo de 5 (cinco) caracteres y un máximo de 10 (diez) y solo puede contener letras, números, espacios y puntos" : ""
    const durationDaysValidations = invalidDurationDays ? [isInvalidDurationDays] : []


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

    const handleSubmit = async () => {
        if (!invalidFields && validateDurationDays()) {
            setIsLoading(true)
            setInput({ ...input})
            const response = await createLicence({ ...input})
            setIsLoading(false)
            if (response.status >= 200 && response.status < 300) onSubmit()
        }
        if(invalidFields) setRunValidations(true)
        if(!validateDurationDays()) setInvalidDurationDays(true)
        return
        
    }

    const createLicence = async (body: any) => {
        return await fetch(`https://modulo-recursos-psa.herokuapp.com/licenses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    }


    useEffect(() => {
        if (show) return
        setRunValidations(false)
        setInput(defaultLicenceData)
        setEmpleado(emptyEmployee)
        setTipoDeLicencia(emptyLicense)
        setInvalidDurationDays(false)
    }, [show]);


    useEffect(() => {
        fetchEmployees();

    }, []);

    const validateDurationDays = () => {
        return input.durationDays >= 5 && input.durationDays <= 10
    }

    const handleChangeText = (e: any) => {
        setInput(({ ...input, [e.target.name]: e.target.value }))
    };

    const handleChangeTextLabel = (e: any) => {

        if(e.target.value == 1){
            setInput(({ ...input, [e.target.name]: "Maternidad" }))
        }
        if(e.target.value == 2){
            setInput(({ ...input, [e.target.name]: "Salud" }))
        }
        if(e.target.value == 3){
            setInput(({ ...input, [e.target.name]: "Vacaciones" }))
        }
       
    };

    const handleChangeInt = (e: any) => {
        setInput(({ ...input, [e.target.name]: Number(e.target.value) }))
    };

    const handleSeleccionDeEmpleado = (e:any) =>{
        const empleado = empleados.find(el => el.value === e.target.value)
        handleChangeInt(e)
        setEmpleado({ value: empleado?.value || 0, label: empleado?.label || ""})
    }

    const handleLicenseTypeChange =(e:any) =>{
        console.log(e)
        const licencia = tipos_de_licencia.find(el => el.value === e.target.value)
        handleChangeTextLabel(e)
        setTipoDeLicencia({value:licencia?.value ||0, label:licencia?.label || ""})
  
    }


    return (
        <CenteredModal isLoading={isLoading} onClose={onClose} show={show} label="Crear Licencia" addbuttonLabel="Crear" onSubmit={handleSubmit } disableSubmit={disabled}>
            <div className='flex mb-6 flex-row'>
            <SelectBox required validations={validations} name="licensedPersonCode" className='mr-8 w-[42rem]' label="Seleccione un Empleado" valueKey="value" options={empleados} text="label" value={employee.value} onChange={handleSeleccionDeEmpleado} />
            </div>
            <div className='flex mb-6 flex-row'>
            <SelectBox required validations={validations} name="licenseType" className='mr-8 w-[42rem]' label="Seleccione un Tipo de Licencia" valueKey="value" options={tipos_de_licencia} text="label" value={tipoDeLicencia.value} onChange={handleLicenseTypeChange} />
            </div>
            <div className='flex mb-6  flex-row'>
            <TextField type='date' className='mr-8 w-80' inputProps={{min: new Date().toISOString().slice(0, 10)}} defaultValue={new Date().toISOString().slice(0, 10)} label='Fecha de Expiración' name='startingDate' onChange={handleChangeText}></TextField>
            <ValidatingInput required validations={durationDaysValidations} name="durationDays" className='mr-8 w-80' label="Dias de duracion" value={input?.durationDays} onChange={handleChangeInt} />
            </div>
        </CenteredModal>
    )

}

export default AddResourceLicenceModal
