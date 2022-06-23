import { useEffect, useState } from 'react'
import { Modal, TextField, Typography, TextFieldProps } from '@mui/material';
import ValidatingInput from '../../components/UI/Inputs/ValidatingInput';
import SelectBox from '../../components/UI/Inputs/SelectBox'
import { Project } from '../../components/types/projectTypes'
import { Resource } from '../../components/types/resourceType';
import { Task } from '../../components/types/taskType';
import Autocomplete from '@mui/material/Autocomplete';

interface AddTicketModalProps {
    onSubmit: () => void
    onClose: () => void
    show: boolean
    toProject: Project
    projectResources: number[]
}

const AddTaskModal = (props: AddTicketModalProps) => {
    const [prioridad, setPrioridad] = useState("1");
    const { onSubmit, onClose, show, toProject } = props;
    const [projectTasks, setProjectTasks] = useState<Task[]>([])
    //const [isLoading, setIsLoading] = useState(false)
    const [resources, setLoadedResources] = useState<Resource[]>([]);
    const [flag, setFlag] = useState(true)
    const [newTask, setNewTask] = useState({
        projectCode: toProject.code,
        name: " ",
        priority: 1,
        effort: 0,
        resource: 1,
        description: " ",
    })
    const [runValidations, setRunValidations] = useState(false)

    const invalidFields = (!newTask?.name || newTask.resource == 0);
    const prioridades = [{ id: 1, valor: "Baja" }, { id: 2, valor: "Media" }, { id: 3, valor: "Alta" }, { id: 4, valor: "Critica" }];

    const generateTaskUsingAPI = async () => {
        const response = await fetch('https://modulo-proyectos-psa-2022.herokuapp.com/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask)
        })
        console.log(response)
        return response;
    }

    const getTasksByProject = async () => {
        fetch(`https://modulo-proyectos-psa-2022.herokuapp.com/tasks/${toProject.code}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                return response.json()
            })
            .then((myJson) => {
                setProjectTasks(JSON.parse(JSON.stringify(myJson)));
            })
            .catch(err => console.log(err))
        //sleep(3000).then(res => setLoading(false));
    }

    const updateProject = async () => {
        console.log("project tasks");
        console.log(projectTasks);
        const response = await fetch(`https://modulo-proyectos-psa-2022.herokuapp.com/projects/${toProject.code}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ tasks: projectTasks })
        })
        console.log(response);
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
        //setIsLoading(true);
        generateTaskUsingAPI();
        getTasksByProject();
        updateProject();
        window.location.reload();
        //setIsLoading(false);
        onSubmit();

    };

    const handlePrioridadSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrioridad(event.target.value);
        setNewTask(({ ...newTask, [event.target.name]: event.target.value }))
    };

    const getResources = () => {
        //setLoading(true)
        fetch('https://modulo-recursos-psa.herokuapp.com/employees', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                return response.json()
            })
            .then((myJson) => {
                setLoadedResources(Object.values(JSON.parse(JSON.stringify(myJson))));

            })
            .catch(err => console.log(err))
        //sleep(3000).then(res => setLoading(false));
    };

    const onCloseCreateProjectModal = () => {
        setPrioridad('1');
        setNewTask(({ ...newTask, name: "", effort: 0, resource: 0, description: "", }));
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

    const isEmptyResource = (value: any) => !value ? "Debe seleccionar un recurso para la tarea" : ""

    return (
        <Modal onClose={onClose} open={show} >
            <div className='absolute bg-gray-200  text-slate-800 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100vh] h-[75vh] rounded-xl shadow-lg'>

                <Typography variant='h5' style={{ marginTop: 70 }} className={'m-10'}>Ingrese los datos para crear la tarea</Typography>
                <div className='ml-10 flex flex-col items-center'>

                    <div className='flex mb-6  flex-row' style={{ marginTop: 10 }}>
                        <ValidatingInput required validations={validations} name="name" className='mr-8 w-80' label="Nombre de la tarea" value={newTask?.name} onChange={handleChangeText} />
                        <SelectBox required validations={validations} name="priority" className='mr-8 w-80' label="Seleccione la prioridad" onChange={handlePrioridadSelection} valueKey="id" value={newTask?.priority} options={prioridades} text="valor" />
                    </div>
                    <div className='flex mb-6 flex-row'>
                        <Autocomplete
                            disablePortal
                            className='mr-8 w-80'
                            id="combo-box-demo"
                            defaultValue={resources.filter(resource => props.projectResources.includes(resource.legajo))[0]}
                            options={resources.filter(resource => props.projectResources.includes(resource.legajo))}
                            getOptionLabel={(option: { Nombre: any; }) => (option.Nombre) ? option.Nombre : ""}
                            sx={{ width: 300 }}
                            renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField {...params} name='resource' label="Recurso" variant="outlined" color='primary' required />}
                            onChange={(event: any, newValue: any) => {
                                setNewTask(({ ...newTask, resource: newValue.legajo }))
                            }}
                        />
                        <ValidatingInput required validations={validations} name="effort" className='mr-8 w-80' label="Esfuerzo Estimado" value={newTask?.effort} onChange={handleChangeInt} />
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
