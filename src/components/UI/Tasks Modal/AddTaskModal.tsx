import { useEffect, useState } from 'react'
import { Modal, TextField, Typography, TextFieldProps} from '@mui/material';
import ValidatingInput from '../Inputs/ValidatingInput';
import SelectBox from '../Inputs/SelectBox'
import {Project} from '../../types/projectTypes'
import{Resource} from '../../types/resourceType';
import {Task} from '../../types/taskType';
import Autocomplete from '@mui/material/Autocomplete';

interface AddTicketModalProps {
    onSubmit: () => void
    onClose: () => void
    show: boolean
    toProject: Project
    projectResources: number[]
}

const AddTaskModal = (props: AddTicketModalProps) => {
    const { onSubmit, onClose, show, toProject, projectResources } = props;
    const [flag, setFlag] = useState(true);
    const [projectTasks, setProjectTasks] = useState<Task[]>([])
    const [resources, setLoadedResources] = useState<Resource []>([]);
    const [newTask, setNewTask] = useState({
        projectCode: toProject.code,
        name: " ",
        priority: 1,
        effort: 0,
        resource: 1,
        description: " ",
        effortUnit: "horas/hombre",
        realEffort: 0,
    })
    const [runValidations, setRunValidations] = useState(false)

    const invalidFields = (!newTask?.name || newTask.resource==0 );
    const prioridades = [{ id: 1, valor: "Baja" }, { id: 2, valor: "Media" }, { id: 3, valor: "Alta" }, { id: 4, valor: "Critica" }];
    const efforts = [{ id: 1, valor: "horas/hombre" }, { id: 2, valor: "dias/hombre" }, { id: 3, valor: "semanas/hombre" }, { id: 4, valor: "storyPoints" }];

    const generateTaskUsingAPI = async () => {
        const response = await fetch('https://modulo-proyectos-psa-2022.herokuapp.com/tasks', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask)
        })
        console.log(response)
        window.location.reload();
        return response;
    }
    
    const getTasksByProject = async () => {
        fetch(`https://modulo-proyectos-psa-2022.herokuapp.com/tasks/${toProject.code}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            return response.json()})
        .then((myJson) => {
            setProjectTasks(JSON.parse(JSON.stringify(myJson)));
        })
        .catch(err => console.log(err))
    }

    const updateProject = async () => {
        console.log("project tasks");
        console.log(projectTasks);
        const response = await fetch(`https://modulo-proyectos-psa-2022.herokuapp.com/projects/${toProject.code}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({tasks : projectTasks})
        })
        return response
    }

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
        generateTaskUsingAPI();
        getTasksByProject();
        updateProject();
        onSubmit();
    
    };

    const handlePrioridadSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(({ ...newTask, [event.target.name]: event.target.value }))
    };

    const handleUnidadSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(({ ...newTask, [event.target.name]: event.target.value }))
    };

    const getResources = () => {
        fetch('https://modulo-recursos-psa.herokuapp.com/employees',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                return response.json()})
            .then((myJson) => {
                setLoadedResources(Object.values(JSON.parse(JSON.stringify(myJson))));

            })
            .catch(err => console.log(err))
    };

    const onCloseCreateProjectModal = () =>{
        setNewTask(({ ...newTask, name: "", effort: 0, resource: 0, description: "",}));   
        onClose();
    };

    useEffect(() => {
        setRunValidations(false)
    }, []);

    useEffect(() => {
        if (flag) {
            getResources();
            getTasksByProject();
            setFlag(false)
        }
    }, []);


    const isEmpty = (value: any) => !value ? "Este campo no puede estar vacio" : ""
    const validations = runValidations ? [isEmpty] : []

    return (
        <Modal onClose={onClose} open={show} >
            <div className='absolute bg-gray-200  text-slate-800 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100vh] h-[75vh] rounded-xl shadow-lg'>

                <Typography variant='h5' style={{marginTop: 70}} className={'m-10'}>Ingrese los datos para crear la tarea</Typography>
                <div className='ml-10 flex flex-col items-center'>

                <div className='mb-6 w-[42rem] mr-8' style={{marginTop: 10}}>
                    <ValidatingInput required validations={validations} name="name" className='mr-8 w-80' label="Nombre de la tarea" value={newTask?.name} onChange={handleChangeText} />
                </div>
                <div className='flex mb-6  flex-row' style={{marginTop: 10}}>
                    <SelectBox required validations={validations} name="priority" className='mr-8 w-80' label="Prioridad" onChange={handlePrioridadSelection} valueKey="id" value={newTask?.priority} options={prioridades} text="valor" />
                    <SelectBox required validations={validations} name="effortUnit" className='mr-8 w-80' label="Unidad de esfuerzo" onChange={handleUnidadSelection} valueKey="valor" value={newTask?.effortUnit} options={efforts} text="valor" />
                </div>
                <div className='flex mb-6 flex-row'>
                    <Autocomplete
                            disablePortal
                            className='mr-8 w-80'
                            id="combo-box-demo"
                            defaultValue={projectResources[0]}
                            options={projectResources}
                            sx={{ width: 300 }}
                            renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField {...params} name= 'resource' label="Recurso" variant="outlined" color='primary' required/>}
                            onChange={(event: any, newValue: any) => {
                                setNewTask(({ ...newTask, resource: newValue }))
                            }}
                    />
                    <ValidatingInput required validations={validations} name="effort" className='mr-8 w-80' label="Esfuerzo Estimado" value={newTask?.effort} onChange={handleChangeInt} />
                </div>
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
