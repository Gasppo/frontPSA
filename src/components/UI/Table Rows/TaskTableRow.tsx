import { TableCell, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import { Task } from '../../types/taskType'
import DeleteIcon from '@mui/icons-material/Delete';
import { Circle } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import ConfirmModal from '../Modal/confirmationModal';
import EditTaskModal from '../Tasks Modal/EditTaskModal';
import{Resource} from '../../types/resourceType'
import { Link, useNavigate } from 'react-router-dom';

interface  TaskTableRowProps {
    row: Task,
    code: number,
    tasks: Task[],
    refresh: () => void,
    projectResources: Resource[]
}


const  TaskTableRow = (props:  TaskTableRowProps) => {
    const { row, refresh, code,tasks,projectResources } = props;
    const [isOpenEditTaskModal, setIsOpenEditTaskModal] = useState(false);
    const [showCofirmationModal, setShowConfirmationModal] = useState(false);
    const [priorityValue, setPriorityValue] = useState('Baja');
    const [stateTagColor, setStateTagColor] = useState('#F9A620');
    const [stateValue, setStateValue] = useState('Pendiente');
    const taskResource = projectResources.find(resource => resource.legajo === row.resource);
    const estimatedEffortWithUnit = row.effort.toString()+' '+row.effortUnit;

    
    const handleDeleteConfirmation = () =>{
        deleteTask();
        setShowConfirmationModal(false);
    };

    const handleNotConfirmation = () =>{
        setShowConfirmationModal(false);
    };

    const openConfirmationDeleteModal = () =>{
        setShowConfirmationModal(true);
    }

    const determineStateTagColor = () => {
        if(row.isCompleted == 0 ){
            setStateTagColor(state => ('#F9A620'));
            setStateValue(state => ('Pendiente'));
        }else if (row.isCompleted == 1){
            setStateTagColor(state => ('#91AEC1'));
            setStateValue(state => ('En Progreso'));
        }else{
            setStateTagColor(state => ('#7BCC7E'));
            setStateValue(state => ('Completa'));
        }
    }



    const removeTask = async () => {
        const response = await fetch(`https://modulo-proyectos-psa-2022.herokuapp.com/tasks/${row.code}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
    
            },
        })
        window.location.reload();
        return response;   
    }

    const deleteTask = () => {
        removeTask();
        props.refresh();
    };

    const determinePriorityValue = () => {
        if(row.priority == 1 ){
            setPriorityValue(state => ('Baja'));
        }else if (row.priority == 2){
            setPriorityValue(state => ('Media'));
        }else if (row.priority == 3){
            setPriorityValue(state => ('Alta'));
        }else if (row.priority == 4){
            setPriorityValue(state => ('Critica'));
        }
    }

    const openEditTaskModal = () => {
        setIsOpenEditTaskModal(true);
    };
    
    const handleEditTaskSubmit = () =>{
        setIsOpenEditTaskModal(false);
        props.refresh()
    };

    const handleEditTaskClose = () =>{
        setIsOpenEditTaskModal(false);
    };


    useEffect(() => {
        determineStateTagColor();
        determinePriorityValue();
    }, [stateTagColor, priorityValue]);


    return (
        <>
            <EditTaskModal onSubmit={handleEditTaskSubmit} onClose={handleEditTaskClose} show={isOpenEditTaskModal} currentTask={row} projectResources={props.projectResources}/>
            <ConfirmModal onSubmit={handleDeleteConfirmation} onClose={handleNotConfirmation} show={showCofirmationModal} txt="Seguro que desea elimiar la tarea"/>
            <TableRow hover key={row.code}>
                <TableCell align="left" ><Link to={`/proyectos/${code}/${row.code}`} state={{ currentTask: row, projectResources: projectResources }}>{row.code}</Link></TableCell>
                <TableCell align="left" ><Link to={`/proyectos/${code}/${row.code}`} state={{ currentTask: row, projectResources: projectResources}}>{row.name}</Link></TableCell>
                <TableCell align="left" ><Link to={`/proyectos/${code}/${row.code}`} state={{ currentTask: row,projectResources: projectResources }}>{priorityValue}</Link></TableCell>
                <TableCell align="left"><Link to={`/proyectos/${code}/${row.code}`} state={{ currentTask: row,projectResources: projectResources }}>{taskResource?.Nombre} {taskResource?.Apellido}</Link></TableCell>
                <TableCell align="left"><Link to={`/proyectos/${code}/${row.code}`} state={{ currentTask: row,projectResources: projectResources }}>{estimatedEffortWithUnit}</Link></TableCell>
                { row.isCompleted!=2 && <TableCell align="left"><Link to={`/proyectos/${code}/${row.code}`} state={{ currentTask: row,projectResources: projectResources }}>-</Link></TableCell>}
                { row.isCompleted== 2 && <TableCell align="left"><Link to={`/proyectos/${code}/${row.code}`} state={{ currentTask: row,projectResources: projectResources }}>{row.realEffort} {row.effortUnit}</Link></TableCell>}
                <TableCell className = 'group'>
                    <Circle style={{ alignSelf: 'left', color: stateTagColor, height: '4vh' }}></Circle>
                    <span className="task-state-tooltip group-hover:scale-100" >
                        {stateValue.toUpperCase()}
                    </span>
                </TableCell>                   
                {!(row.isCompleted=== 2) && <TableCell align="right">
                    <div className='hover:text-teal-600 text-slate-600 cursor-pointer' onClick={openConfirmationDeleteModal}>
                        <DeleteIcon />
                    </div>
                </TableCell>}
                {(row.isCompleted=== 2) && <TableCell align="right">
                    <div className='hover:text-teal-600 text-slate-600 cursor-pointer'>
                    </div>
                </TableCell>}
                {!(row.isCompleted=== 2) && <TableCell align="right">
                    <div className='hover:text-teal-600 text-slate-600 cursor-pointer' onClick={openEditTaskModal}>
                        <EditIcon />
                    </div>
                </TableCell>}
                {(row.isCompleted=== 2) && <TableCell align="right">
                    <div className='hover:text-teal-600 text-slate-600 cursor-pointer'>
                    </div>
                </TableCell>}
        </TableRow></>
    )
}

export default  TaskTableRow
