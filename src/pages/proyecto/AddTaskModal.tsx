import { useEffect, useMemo, useState } from 'react'
import { Modal, TextField, Typography, MenuItem, InputAdornment } from '@mui/material';
import{Client} from '../../components/types/clientTypes'
import AccountCircle from '@mui/icons-material/AccountCircle';
import ValidatingInput from '../../components/UI/Inputs/ValidatingInput';
import ValidatingInputDates from '../../components/UI/Inputs/ValidatingInputDates';
import SelectBox from '../../components/UI/Inputs/SelectBox'
import CenteredModal from '../../components/UI/Modal/CenteredModal'
import { VoicemailRounded } from '@mui/icons-material';
import { isPrivateIdentifier } from 'typescript';

interface AddTicketModalProps {
    onSubmit: () => void
    onClose: () => void
    show: boolean
    toProject: number
}

const AddTaskModal = (props: AddTicketModalProps) => {
    const partsCurrentDate = (new Date().toLocaleDateString('es-AR')).split("/");
    var currentDate: string;
    if(partsCurrentDate[1].length==1){
        currentDate = partsCurrentDate[0] + "/0" + partsCurrentDate[1] + "/" + partsCurrentDate[2];
    }else{
        currentDate= partsCurrentDate[0] + "/" + partsCurrentDate[1] + "/" + partsCurrentDate[2];
    }
    

    const [prioridad, setPrioridad] = useState('Desarrollo');
    const { onSubmit, onClose, show, toProject } = props;
    const [runValidations, setRunValidations] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [newTask, setNewTask] = useState({
        project_code: props.toProject,
        name: "",
        priority: 1,
        effort: 0,
        resource: 0,
        description: "",
    })

    const invalidFields = (!newTask?.name || newTask.resource==0 );
    const prioridades = [{ id: 1, valor: "Baja" }, { id: 2, valor: "Media" }, { id: 3, valor: "Alta" }, { id: 4, valor: "Critica" }];

    const handleChangeText = (e: any) => {
        setNewTask(({ ...newTask, [e.target.name]: e.target.value }))
    };


    const handleChangeInt = (e: any) => {
        setNewTask(({ ...newTask, [e.target.name]: Number(e.target.value) }))
    };


    const handleSubmit = async () => {
        if (invalidFields) {
            setRunValidations(true);
            return
        }
        setIsLoading(true);
        generateTaskUsingAPI();
        setIsLoading(false);
        onSubmit();
    
    };

    const handlePrioridadSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrioridad(event.target.value);
        setNewTask(({ ...newTask, [event.target.name]: event.target.value }))
    };

    const onCloseCreateProjectModal = () =>{
        setPrioridad('');
        setNewTask(({ ...newTask, name: "", effort: 0, resource: 0, description: "",}));   
        onClose();
    };

    useEffect(() => {
        setRunValidations(false)
    }, []);


    const generateTaskUsingAPI = async () => {
        //nose si funciona
        console.log(newTask);
        const response = await fetch('http://localhost:2000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(newTask)
        })
        return response
    }

    const isEmpty = (value: any) => !value ? "Este campo no puede estar vacio" : ""
    const validations = runValidations ? [isEmpty] : []

    const isEmptyResource = (value: any) => !value ? "Debe seleccionar un recurso para la tarea" : ""
    const validationsResources = runValidations ? [isEmptyResource] : []

    return (
        <Modal onClose={onClose} open={show} >
            <div className='absolute bg-gray-200  text-slate-800 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100vh] h-[75vh] rounded-xl shadow-lg'>

                <Typography variant='h5' style={{marginTop: 70}} className={'m-10'}>Ingrese los datos para crear la tarea</Typography>
                <div className='ml-10 flex flex-col items-center'>

                <div className='flex mb-6  flex-row' style={{marginTop: 10}}>
                    <ValidatingInput required validations={validations} name="name" className='mr-8 w-80' label="Nombre de la tarea" value={newTask?.name} onChange={handleChangeText} />
                    <SelectBox required validations={validations} name="priority" className='mr-8 w-80' label="Seleccione la prioridad" onChange={handlePrioridadSelection} valueKey="id" value={prioridad} options={prioridades} text="valor" />
                </div>
                <div className='flex mb-6 flex-row'>
                    

                    <ValidatingInput required validations={validations} name="effort" className='mr-8 w-80' label="Esfuerzo Estimado" value={newTask?.name} onChange={handleChangeInt} />
                </div>
                <div className='flex mb-6 flex-row' ></div>
                <TextField id="outlined-basic" className='mb-6 w-[42rem] mr-8' name='description' label="Descripcion" multiline rows={3} InputLabelProps={{ shrink: true }} variant="outlined" onChange={handleChangeText} />
                <div className="flex flex-row" >
                    <div className="text-center mr-8 mb-6 w-52 border-2 border-slate-400  rounded-xl shadow-lg font-bold text-slate-800 hover:border-teal-600 hover:border-1 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={onCloseCreateProjectModal} >
                        <div className="m-4" > Cancelar</div>
                    </div>
                    <div className="w-56" ></div>
                    <div className="text-center mr-8 mb-6 w-52  border-2 border-slate-400  rounded-xl shadow-lg font-bold text-slate-800 hover:border-teal-600 hover:border-1 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={handleSubmit}>
                        <div className="m-4" > Crear Tarea </div>
                    </div>
                </div>
            </div>
        </div>
    </Modal>
    )
}

export default AddTaskModal
