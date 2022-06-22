import { useEffect, useMemo, useState } from 'react'
import { Modal, TextField, Typography, MenuItem, InputAdornment, TextFieldProps } from '@mui/material';
import{Client} from '../../components/types/clientTypes'
import AccountCircle from '@mui/icons-material/AccountCircle';
import ValidatingInput from '../../components/UI/Inputs/ValidatingInput';
import ValidatingInputDates from '../../components/UI/Inputs/ValidatingInputDates';
import SelectBox from '../../components/UI/Inputs/SelectBox'
import CenteredModal from '../../components/UI/Modal/CenteredModal'
import { VoicemailRounded } from '@mui/icons-material';
import { isPrivateIdentifier } from 'typescript';
import {Task} from '../../components/types/taskType'
import{Resource} from '../../components/types/resourceType';
import Autocomplete from '@mui/material/Autocomplete';

interface EditTaskModalProps {
    onSubmit: () => void
    onClose: () => void
    show: boolean
    currentTask: Task
    projectResources: number[]
}

const EditTaskModal = (props: EditTaskModalProps) => {
    const { onSubmit, onClose, show, currentTask, projectResources} = props;
    const [isLoading, setIsLoading] = useState(false);
    const [priorityValue, setPriorityValue] = useState("Baja");
    const [resources, setLoadedResources] = useState<Resource []>([]);
    const determinePrioriryValue = () => {
        if(props.currentTask.priority == 1 ){
            setPriorityValue(state => ('Baja'));
        }else if (props.currentTask.priority == 2){
            setPriorityValue(state => ('Media'));
        }else if (props.currentTask.priority == 3){
            setPriorityValue(state => ('Alta'));
        }else if (props.currentTask.priority == 4){
            setPriorityValue(state => ('Critica'));
        }
    }
    const [newTask, setNewTask] = useState({
        code: props.currentTask.code,
        name: props.currentTask.name,
        priority: props.currentTask.priority,
        effort: props.currentTask.effort,
        resource: props.currentTask.resource,
        description: props.currentTask.description,
    })
    
    const [runValidations, setRunValidations] = useState(false)

    const getResources = () => {
        //setLoading(true)
        fetch('https://modulo-recursos-psa.herokuapp.com/employees',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                return response.json()})
            .then((myJson) => {
                //console.log(myJson);
                setLoadedResources(Object.values(JSON.parse(JSON.stringify(myJson))));
                //setOptions( resources.map( resource => {resource.legajo }));
            })
            .catch(err => console.log(err))
            //sleep(3000).then(res => setLoading(false));
    };
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
        }
        setIsLoading(true);
        updateTaskUsingAPI();
        setIsLoading(false);
        onSubmit();
    
    };

    const handlePrioridadSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event);
        console.log(event.target.value);
        setPriorityValue(event.target.value);
        setNewTask(({ ...newTask, [event.target.name]: event.target.value }))
    };

    const onCloseCreateProjectModal = () =>{
        setNewTask(({ ...newTask, name: "", effort: 0, resource: 0, description: "",}));   
        onClose();
    };

    useEffect(() => {
        setRunValidations(false)
    }, []);


    useEffect(() => {
        getResources();
        determinePrioriryValue();
    }, []);

    const isEmpty = (value: any) => !value ? "Este campo no puede estar vacio" : ""
    const validations = runValidations ? [isEmpty] : []

    const isEmptyResource = (value: any) => !value ? "Debe seleccionar un recurso para la tarea" : ""
    const validationsResources = runValidations ? [isEmptyResource] : []


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

    const updateTaskUsingAPI = async () => {
        const response = await fetch(`http://localhost:2000/tasks/${newTask.code}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(newTask)
        })
        return response
    }

    return (
        <Modal onClose={onClose} open={show} >
            <div className='absolute bg-gray-200  text-slate-800 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100vh] h-[75vh] rounded-xl shadow-lg'>

                <Typography variant='h5' style={{marginTop: 70}} className={'m-10'}>Modificar Tarea</Typography>
                <div className='ml-10 flex flex-col items-center'>

                <div className='flex mb-6  flex-row' style={{marginTop: 10}}>
                    <ValidatingInput required validations={validations} name="name" className='mr-8 w-80' label="Nombre de la tarea" value={newTask.name} onChange={handleChangeText} />
                    <SelectBox required validations={validations} name="priority" className='mr-8 w-80' label="Seleccione la prioridad" onChange={handlePrioridadSelection} valueKey="id" value={newTask?.priority} options={prioridades} text="valor" />
                </div>
                <div className='flex mb-6 flex-row'>
                    <Autocomplete
                            disablePortal
                            className='mr-8 w-80'
                            id="combo-box-demo"
                            options={resources.filter(resource => props.projectResources.includes(resource.legajo))}
                            getOptionLabel={(option: { Nombre: any; }) => (option.Nombre) ? option.Nombre : ""}
                            sx={{ width: 300 }}
                            renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField {...params} name= 'resource' label="Recurso" variant="outlined" color='primary' required/>}
                            onChange={(event: any, newValue: any) => {
                                setNewTask(({ ...newTask, resource: newValue.legajo }))
                            }}
                    />
                    <ValidatingInput required validations={validations} name="effort" className='mr-8 w-80' label="Esfuerzo Estimado" value={newTask?.effort} onChange={handleChangeInt} />
                </div>
                <div className='flex mb-6 flex-row' ></div>
                <TextField id="outlined-basic" className='mb-6 w-[42rem] mr-8' name='description' label="Descripcion" value={newTask?.description} multiline rows={3} InputLabelProps={{ shrink: true }} variant="outlined" onChange={handleChangeText} />
                <div className="flex flex-row" >
                    <div className="text-center mr-8 mb-6 w-52 border-2 border-slate-400  rounded-xl shadow-lg font-bold text-slate-800 hover:border-teal-600 hover:border-1 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={onCloseCreateProjectModal} >
                        <div className="m-4" > Cancelar</div>
                    </div>
                    <div className="w-56" ></div>
                    <div className="text-center mr-8 mb-6 w-52  border-2 border-slate-400  rounded-xl shadow-lg font-bold text-slate-800 hover:border-teal-600 hover:border-1 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={handleSubmit}>
                        <div className="m-4" > Guardar Cambios </div>
                    </div>
                </div>
            </div>
        </div>
    </Modal>
    )
}

export default EditTaskModal
