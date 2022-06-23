import { Modal, TextField, Typography, MenuItem, InputAdornment } from '@mui/material';
import { useEffect, useState } from 'react'
import{Client} from '../../../components/types/clientTypes'
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Project } from '../../types/projectTypes'
import ConfirmModal from './confirmationModal'  

interface EditProjectModalProps {
    onClose: () => void
    onRefresh: () => void,
    show: boolean
    row: Project,
}

const EditProjectModal = (props: EditProjectModalProps) => {
    const partsCurrentDate = (new Date().toLocaleDateString('es-AR')).split("/");
    var currentDate: string | number;
    if(partsCurrentDate[1].length==1){
        currentDate = partsCurrentDate[0] + "/0" + partsCurrentDate[1] + "/" + partsCurrentDate[2];
    }else{
        currentDate= partsCurrentDate[0] + "/" + partsCurrentDate[1] + "/" + partsCurrentDate[2];
    }

    const [dayS, monthS, yearS] = props.row.startDate.split('/');
    const startDate = yearS +'-'+monthS+'-'+dayS;

    const [dayE, monthE, yearE] = props.row.endDate.split('/');
    const endDate = yearE +'-'+monthE+'-'+dayE;
    const [showCofirmationModal, setShowConfirmationModal] = useState(false);
    const { onClose, show ,onRefresh} = props;
    const [showProductModal, setShowProductModal] = useState(false);
    const [isFormValid, setFormValidation] = useState(false);
    const [isNameValid, setNameValidation] = useState(true);
    const [isStartDateValid, setStartDateValidation] = useState(true);
    const [isClientValid, setClientValidation] = useState(true);

    const [isProjectStateValid, setProjectStateValidation] = useState(true);
    const [isEndDateValid, setEndDateValidation] = useState(true);
    const [isLoading, setLoading] = useState<boolean>(false)
    const [loadedClients, setLoadedClients] = useState<Client[]>([])
    const date = new Date();
    const month = date.getMonth()+1
    const [newProject, setNewProject] = useState({
        name: props.row.name,
        updatedDate: currentDate,
        state: props.row.state,
        description: props.row.description,
        startDate: props.row.startDate,
        endDate: props.row.endDate
    });
    const [projectState, setProjectState] = useState(props.row.state);

    const states = [{value: 'No Iniciado', label: 'No Iniciado'}, { value: 'Iniciado', label: 'Iniciado', }, {value: 'Finalizado', label: 'Finalizado'},{value: 'Cancelado', label: 'Cancelado'} ];

    const handleChangeText = (e: any) => {
        setNewProject(({ ...newProject, [e.target.name]: e.target.value }))
    };

    const handleChangeDate = (e: any) => {
        const parts = e.target.value.split('-');
        setNewProject(({ ...newProject, [e.target.name]: parts[2] + "/" + parts[1] + "/" + parts[0] }))
    }


    const updateProjectUsingAPI = async () => {
        const response = await fetch(`http://localhost:2000/projects/${props.row.code}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(newProject)
        })
        return response
    }


    const validateProjectName = () =>{
        if (newProject.name != "" && newProject.name.length<=20)
            setNameValidation(true);
        else
            setNameValidation(false);
    }

    const submit = () => {
        updateProjectUsingAPI();
        props.onRefresh();
        //props.onSubmit();
        onClose();

    }

    const validateProjectStartDate = () =>{
        if(newProject.startDate >= currentDate){
            setStartDateValidation(true);
        }
        else
            setStartDateValidation(false)
    }

    const validateProjectState = () =>{
        if (newProject.state != "")
            setProjectStateValidation(true);
        else 
            setProjectStateValidation(false);
    }
    
    const validateProjectEndDate = () =>{
        //if(regexddmmyyyy.test(newProject.endDate)){
        if(newProject.endDate!="dd/mm/yyyy" && newProject.endDate >= currentDate && newProject.endDate > newProject.startDate){
            setEndDateValidation(true)
        }
        else
            setEndDateValidation(false)
    }

    const validateProjectValues = () =>{
        validateProjectName();
        validateProjectState();
        validateProjectStartDate();

        if (isNameValid && isProjectStateValid && isStartDateValid && isEndDateValid){
            setFormValidation(true);
            console.log("entro");
        }
 
    }

    const handleSubmit = async () => {
        //Falta hacer la validacion, si la hago aca no lleg a cargarse a tiempo
        //validateProjectValues();
        /*if(isFormValid){
            console.log("valid");
            submit();
        }*/
        submit();
    };

    const handleProjectStateSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProjectState(event.target.value);
        setNewProject(({ ...newProject, [event.target.name]: event.target.value }))
    };

    const onCloseCreateProjectModal = () =>{
        setClientValidation(true);
        setFormValidation(false);
        setNameValidation(true);
        setProjectStateValidation(true);
        onClose();
    };

    const handleDeleteConfirmation = () =>{
        handleSubmit();
        setShowConfirmationModal(false);
    };

    const handleNotConfirmation = () =>{
        setShowConfirmationModal(false);
    };

    const openConfirmationModal = () =>{
        setShowConfirmationModal(true);
    }

    return (
        <Modal onClose={onClose} open={show} >
            <div className='absolute bg-gray-200  text-slate-800 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120vh] h-[85vh] rounded-xl shadow-lg'>
            <ConfirmModal onSubmit={handleDeleteConfirmation} onClose={handleNotConfirmation} show={showCofirmationModal} txt="Guardar cambios en el proyecto"/>
                <Typography variant='h5' className={'m-10'}>Modifique el proyecto</Typography>
                <div className='ml-10 flex flex-col items-center'>
                    <div className='flex mb-6 flex-row'>
                        <TextField  id="outlined-basic" defaultValue= {props.row.name} name="name" className='mr-8 w-80' style={{backgroundColor: isNameValid ? 'transparent' : '#F3909C'}} label="Nombre del Proyecto" InputLabelProps={{ shrink: true}} variant="outlined" onChange={handleChangeText} />
                        <TextField  type="date" name="startDate" defaultValue = {startDate} className='mr-8 w-80' style={{backgroundColor: isStartDateValid ? 'transparent' : '#F3909C'}}  label="Fecha de inicio" InputLabelProps={{ shrink: true}} variant="outlined" onChange={handleChangeDate} 
                        />
                    </div>
                    <div className='flex mb-6 flex-row'>
                        <TextField select  name="state" value={projectState} id="outlined-basic" className='mr-8 w-80' style={{backgroundColor: isProjectStateValid ? 'transparent' : '#F3909C'}} label="Estado del proyecto" variant="outlined" onChange={handleProjectStateSelection}>
                            {states.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField  type="date" name="endDate" defaultValue= {endDate} className='mr-8 w-80' style={{backgroundColor: isEndDateValid ? 'transparent' : '#F3909C'}} label="Fecha de finalizacion" InputLabelProps={{ shrink: true}} variant="outlined" onChange={handleChangeDate} 
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                </InputAdornment>),}}
                        />
                    </div>
                    <TextField id="outlined-basic" className='mb-6 w-[42rem] mr-8' defaultValue={props.row.description} name='description' label="Descripcion" multiline rows={3} InputLabelProps={{ shrink: true }} variant="outlined" onChange={handleChangeText} />
                    <div className='flex mb-6 flex-row'></div>
                    <div className='flex mb-6 flex-row'>  </div>
                    <div className="flex flex-row" >
                        <div className="text-center mr-8 mb-6 w-52 border-2 border-slate-400  rounded-xl shadow-lg font-bold text-slate-800 hover:border-teal-600 hover:border-1 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={onCloseCreateProjectModal} >
                            <div className="m-4" > Cancelar</div>
                        </div>
                        <div className="w-56" ></div>
                        <div className="text-center mr-8 mb-6 w-52  border-2 border-slate-400  rounded-xl shadow-lg font-bold text-slate-800 hover:border-teal-600 hover:border-1 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={openConfirmationModal}>
                            <div className="m-4" > Editar </div>
                        </div>
                    </div>

                </div>

            </div>
        </Modal >
    )
}

export default EditProjectModal

