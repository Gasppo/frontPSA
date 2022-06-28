import { useEffect, useMemo, useState } from 'react'
import { Modal, TextField, Typography, TextFieldProps, InputAdornment } from '@mui/material';
import ValidatingInput from '../Inputs/ValidatingInput';
import SelectBox from '../Inputs/SelectBox'
import {Task} from '../../types/taskType'
import{Resource} from '../../types/resourceType';
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

    const [newTask, setNewTask] = useState({
        code: props.currentTask.code,
        name: props.currentTask.name,
        priority: props.currentTask.priority,
        effort: props.currentTask.effort,
        resource: props.currentTask.resource,
        description: props.currentTask.description,
        isCompleted: props.currentTask.isCompleted,
        realEffort: props.currentTask.realEffort,
        effortUnit: props.currentTask.effortUnit
    })
    
    const [runValidations, setRunValidations] = useState(false)
    const [showRealEffortModal, setRealEffortModal] = useState(false);

    const invalidFields = (!newTask?.name || newTask.resource==0);
 
    const prioridades = [{ id: 1, valor: "Baja" }, { id: 2, valor: "Media" }, { id: 3, valor: "Alta" }, { id: 4, valor: "Critica" }];
    const estados = [{id: 0, valor: "Pendiente"}, {id: 1, valor: "En Proceso"}, {id: 2, valor: "Completa"}];

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
        if(newTask.isCompleted == 2){
            setRealEffortModal(true);
        }else{
            updateTaskUsingAPI();
            onSubmit();
        }
    };

    const handlePrioridadSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(({ ...newTask, [event.target.name]: event.target.value }))
    };

    const handleStateSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(({ ...newTask, [event.target.name]: event.target.value }))
    };

    const onCloseCreateProjectModal = () =>{
        setNewTask(({ ...newTask, name: "", effort: 0, resource: 0, description: "",}));   
        onClose();
    };

    useEffect(() => {
        setRunValidations(false)
    }, []);

    const isEmpty = (value: any) => !value ? "Este campo no puede estar vacio" : ""
    const validations = runValidations ? [isEmpty] : []

    const isEmptyResource = (value: any) => !value ? "Debe seleccionar un recurso para la tarea" : ""
    const validationsResources = runValidations ? [isEmptyResource] : []

    const onCloseRealEffortModal =async () => {
        setRealEffortModal(false);
    }

    const handleSubmitRealEffortModal = async () =>{
        if (!newTask.realEffort) {
            setRunValidations(true);
        }else{
            setRealEffortModal(false);
        }
    }

    const generateTaskUsingAPI = async () => {
        //nose si funciona
        console.log(newTask);
        const response = await fetch('https://modulo-proyectos-psa-2022.herokuapp.com/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(newTask)
        })
        return response
    }

    const updateTaskUsingAPI = async () => {
        const response = await fetch(`https://modulo-proyectos-psa-2022.herokuapp.com/tasks/${newTask.code}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(newTask)
        })
        window.location.reload();
        return response
    }

    return (
        <Modal onClose={onClose} open={show} >
            <div className='absolute bg-gray-200  text-slate-800 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[105vh] h-[85vh] rounded-xl shadow-lg'>

            <Modal onClose={onCloseRealEffortModal} open={showRealEffortModal}>
                    <div className='absolute bg-gray-200  text-slate-800 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70vh] h-[55vh] rounded-xl shadow-lg'>
                        <Typography variant='h5' className={'m-10'}>Ingrese el esfuerzo real de la tarea</Typography>
                        <div className='flex mb-6 flex-row ml-[6vh]'> 
                        <TextField 
                            disabled
                            type='text' 
                            label="Esfuerzo estimado de la tarea"
                            defaultValue={newTask.effort}
                            className='mr-8 w-70'
                        />
                        <TextField 
                            
                            type='text' 
                            label="Unidad de esfuerzo"
                            defaultValue={newTask.effortUnit}
                            className='mr-8 w-70'
                        />
                      </div>
                        <div className='flex mb-6 flex-row ml-[6vh]'> 
                                <ValidatingInput  validations={validations} name="realEffort" className='mr-8 w-80' label="Esfuerzo real de la tarea" value={newTask?.realEffort} onChange={handleChangeInt} />
                        </div>
                        <div className='flex mb-6 flex-row ml-[6vh]'>  </div>
                        <div className="flex flex-row ml-[6vh]" >
                            <div className="text-center mr-8 mb-6 w-52 border-2 border-slate-400  rounded-xl shadow-lg font-bold text-slate-800 hover:border-teal-600 hover:border-1 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={onCloseRealEffortModal} >
                                <div className="m-4" > Cancelar</div>
                            </div>
                            <div className="w-10" ></div>
                            <div className="text-center mr-8 mb-6 w-52  border-2 border-slate-400  rounded-xl shadow-lg font-bold text-slate-800 hover:border-teal-600 hover:border-1 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={handleSubmitRealEffortModal}>
                                <div className="m-4" > Siguiente</div>
                        </div>
                    </div>

                    </div>
                </Modal>


                <Typography variant='h5' style={{marginTop: 70}} className={'m-10'}>Modificar Tarea</Typography>
                <div className='ml-10 flex flex-col items-center'>

                <div className='flex mb-6  flex-row' style={{marginTop: 10}}>
                    <ValidatingInput  validations={validations} name="name" className='mr-8 w-80' label="Nombre de la tarea" value={newTask.name} onChange={handleChangeText} />
                    <div className='mr-8 w-80'></div>
                </div>
                <div className='flex mb-6  flex-row' style={{marginTop: 10}}>
                    <SelectBox  validations={validations} name="isCompleted" className='mr-8 w-80' label="Modifique el estado" onChange={handleStateSelection} valueKey="id" value={newTask?.isCompleted} options={estados} text="valor" />
                    <SelectBox  validations={validations} name="priority" className='mr-8 w-80' label="Modifique la prioridad" onChange={handlePrioridadSelection} valueKey="id" value={newTask?.priority} options={prioridades} text="valor" />
                </div>
                <div className='flex mb-6 flex-row'>
                    <Autocomplete
                            disablePortal
                            className='mr-8 w-80'
                            id="combo-box-demo"
                            defaultValue={newTask.resource}
                            options={projectResources}
                            sx={{ width: 300 }}
                            renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField {...params} name= 'resource' label="Modifique el responsable" variant="outlined" color='primary' />}
                            onChange={(event: any, newValue: any) => {
                                setNewTask(({ ...newTask, resource: newValue }))
                            }}
                    />
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
