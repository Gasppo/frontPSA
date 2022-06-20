import { useEffect, useMemo, useState } from 'react'
import { Modal, TextField, Typography, MenuItem, InputAdornment } from '@mui/material';
import{Client} from '../../components/types/clientTypes'
import AccountCircle from '@mui/icons-material/AccountCircle';
import ValidatingInput from '../../components/UI/Inputs/ValidatingInput';
import SelectBox from '../../components/UI/Inputs/SelectBox'
import CenteredModal from '../../components/UI/Modal/CenteredModal'
import { VoicemailRounded } from '@mui/icons-material';

interface AddTicketModalProps {
    onSubmit: () => void
    onClose: () => void
    show: boolean
}

const AddProjectModal = (props: AddTicketModalProps) => {
    const partsCurrentDate = (new Date().toLocaleDateString('es-AR')).split("/");
    var currentDate: string;
    if(partsCurrentDate[1].length==1){
        currentDate = partsCurrentDate[0] + "/0" + partsCurrentDate[1] + "/" + partsCurrentDate[2];
    }else{
        currentDate= partsCurrentDate[0] + "/" + partsCurrentDate[1] + "/" + partsCurrentDate[2];
    }
    

    const [type, setType] = useState('Desarrollo');
    const { onSubmit, onClose, show } = props
    const [showProductModal, setProductModal] = useState(false);
    const [runValidations, setRunValidations] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [newProject, setNewProject] = useState({
        name: "",
       // id: 0, //realizar un generador de id
        creationDate: currentDate,
        updatedDate: currentDate,
        startDate: "dd/mm/yyyy",
        endDate: "dd/mm/yyyy",
        type: type,
        state: "No Iniciado",
        client: 0,
        productId: 0,
        description: " ",
    })

    const invalidFields = (!newProject?.name || !newProject?.startDate || !newProject?.endDate || !newProject?.client || !newProject?.type || !newProject?.state)
    const disabled = runValidations && invalidFields

    const types = [{ value: 'Desarrollo', label: 'Desarrollo', }, {value: 'Soporte', label: 'Soporte'} ];

    const handleChangeText = (e: any) => {
        setNewProject(({ ...newProject, [e.target.name]: e.target.value }))
    };

    const isADevelopProjectAndHasNOTAProductAssign = (newProject.type == "Desarrollo") && newProject.productId == 0;

    const handleChangeInt = (e: any) => {
        setNewProject(({ ...newProject, [e.target.name]: Number(e.target.value) }))
    };


    /*const handleAuthorChange = (e: any) => {
        const cliente = externalResource.find(el => el.id === e.target.value)
        setAuthor({ id: cliente?.id || 0, CUIT: cliente?.CUIT || "", "razon social": cliente?.['razon social'] || "" })
    }*/

    const handleSubmit = async () => {
        if (invalidFields) {
            setRunValidations(true)
            return
        }
       else if(isADevelopProjectAndHasNOTAProductAssign){
            setProductModal(true);
        }else{
            setIsLoading(true);
            const partsS = newProject.startDate.split('-');
            newProject.startDate = partsS[2] + "/" + partsS[1] + "/" + partsS[0];
            const partsE = newProject.endDate.split('-');
            newProject.endDate = partsE[2] + "/" + partsE[1] + "/" + partsE[0];
            generateProjectUsingAPI();
            setIsLoading(false);
            onSubmit();
        }
    
    };

    const handleSubmitProductModal = async () =>{
        setProductModal(false);
    }

    const onCloseProductoModal =async () => {
        setProductModal(false);
    }

    const handleTypeSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        setType(event.target.value);
        setNewProject(({ ...newProject, [event.target.name]: event.target.value }))
    };

    const onCloseCreateProjectModal = () =>{
        /*setClientValidation(true);
        setFormValidation(false);
        setNameValidation(true);
        setTypeValidation(true);
        setEndDateValidation(true);
        setStartDateValidation(true);*/
        onClose();
    };

    useEffect(() => {
        setRunValidations(false)
    }, []);


    const generateProjectUsingAPI = async () => {
        console.log(newProject);
        const response = await fetch('http://localhost:2000/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(newProject)
        })
        return response
    }

    const isEmpty = (value: any) => !value ? "Este campo no puede estar vacio" : ""
    const validations = runValidations ? [isEmpty] : []

    return (
        <CenteredModal isLoading={isLoading} onClose={onClose} show={show} onSubmit={handleSubmit} label="Crear Ticket" addbuttonLabel="Crear" disableSubmit={disabled}>

            <Modal onClose={onCloseProductoModal} open={showProductModal}>
                <div className='absolute bg-gray-200  text-slate-800 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70vh] h-[55vh] rounded-xl shadow-lg'>
                    <Typography variant='h5' className={'m-10'}>Ingrese el poducto correspondiente al proyecto de desarrollo</Typography>
                    <div className='flex mb-6 flex-row ml-[6vh]'>  
                        <TextField required id="outlined-basic" name="productId" className='mr-8 w-80' label="Seleccione el producto asociado al proyecto" InputLabelProps={{ shrink: true}} variant="outlined" onChange={handleChangeText} /> 
                    </div>
                    <div className='flex mb-6 flex-row ml-[6vh]'>  </div>
                    <div className="flex flex-row ml-[6vh]" >
                        <div className="text-center mr-8 mb-6 w-52 border-2 border-slate-400  rounded-xl shadow-lg font-bold text-slate-800 hover:border-teal-600 hover:border-1 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={onCloseProductoModal} >
                            <div className="m-4" > Cancelar</div>
                        </div>
                        <div className="w-10" ></div>
                        <div className="text-center mr-8 mb-6 w-52  border-2 border-slate-400  rounded-xl shadow-lg font-bold text-slate-800 hover:border-teal-600 hover:border-1 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={handleSubmitProductModal}>
                            <div className="m-4" > Siguiente</div>
                    </div>
                </div>

                </div>
            </Modal>

            <div className='flex mb-6  flex-row'>
                <SelectBox required name="authorId" validations={validations} className='mr-8 w-[42rem]' label="Nombre de Cliente" onChange={handleChangeText} valueKey="id" value={''} options={[]} text="razon social" />
            </div>
            <div className='flex mb-6 flex-row'>
                <ValidatingInput required validations={validations} name="title" className='mr-8 w-80' label="Titulo" value={newProject?.name} onChange={handleChangeText} />
                <SelectBox required validations={validations} name="priority" className='mr-8 w-80' label="Prioridad" onChange={handleChangeInt} valueKey="id" value={''} options={[]} text="valor" />
            </div>
            <div className='flex mb-6 flex-row' >
                <SelectBox disabledText='Primero ingrese un cliente...' required validations={validations} name="productId" className='mr-8 w-80' disabled={newProject?.productId <= 0} label="Producto" onChange={handleChangeInt} valueKey="id" value={newProject?.productId} options={[]} text="name" />
                <SelectBox disabledText='Primero ingrese un producto...'  required validations={validations} name="productLicenseId" className='mr-8 w-80' disabled={newProject?.productId <= 0} label="Version" onChange={handleChangeInt} valueKey="id" value={''} options={[]} text="productVersion" />
            </div>
            <ValidatingInput className='mb-6 w-[42rem] mr-8' name='description' label="Descripcion" multiline rows={2} value={newProject?.description} onChange={handleChangeText} />
        </CenteredModal>
    )
}

export default AddProjectModal
