import { TableCell, TableRow } from '@mui/material'
import React from 'react'
import { useEffect, useState } from 'react'
import { Task } from '../../types/taskType'
import DeleteIcon from '@mui/icons-material/Delete';
import { Circle } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import ConfirmModal from './confirmationModal';
import EditTaskModal from '../../../pages/proyecto/EditTaskModal';
import VerTareaModal from '../../../pages/proyecto/VerTareaModal';

interface  TaskTableRowProps {
    row: Task,
    code: number,
    tasks: Task[],
    refresh: () => void,
    projectResources: number[]
}


const  TaskTableRow = (props:  TaskTableRowProps) => {
    const { row, refresh, code,tasks,projectResources } = props;
    const [isOpenEditTaskModal, setIsOpenEditTaskModal] = useState(false);
    const [showCofirmationModal, setShowConfirmationModal] = useState(false);
    const [priorityValue, setPriorityValue] = useState('Baja');
    const [isTaskDetailsModalOpen, setIsOpenTaskDetailsModal]=useState(false);
    const [newTasks, setNewTasks] = useState<Task[]>([]);
    const [stateTagColor, setStateTagColor] = useState('#F9A620');
    const [stateValue, setStateValue] = useState('Pendiente');
    const [showProjectModal, setshowProjectModal] = useState(false);
    const navigate = useNavigate();

    
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

    const handleModalOpen = () => {
        setshowProjectModal(true)
    };

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
        return response;   
    }

    const deleteTask = () => {
        removeTask();
        props.refresh();
    };
    
    /*const navigateToAPoject = () => {
        navigate('/project');
 
      };*/

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
        //updateDelaTarea

        setIsOpenEditTaskModal(false);
        props.refresh()
    };

    const handleEditTaskClose = () =>{
        setIsOpenEditTaskModal(false);
    };

    const openTaskDetailsModal = ()=>{
        setIsOpenTaskDetailsModal(true);
    };

    const handleTaskDetailsClose = () =>{
        setIsOpenTaskDetailsModal(false);
    };

    useEffect(() => {
        determineStateTagColor();
        determinePriorityValue();
    }, [stateTagColor, priorityValue]);

    return (
        <>
            <VerTareaModal onClose={handleTaskDetailsClose} show={isTaskDetailsModalOpen} currentTask={row}/>
            <EditTaskModal onSubmit={handleEditTaskSubmit} onClose={handleEditTaskClose} show={isOpenEditTaskModal} currentTask={row} projectResources={props.projectResources}/>
            <ConfirmModal onSubmit={handleDeleteConfirmation} onClose={handleNotConfirmation} show={showCofirmationModal} txt="Seguro que desea elimiar la tarea"/>
            <TableRow hover key={row.code}>
                <TableCell align="left" onClick={openTaskDetailsModal}>{row.code}</TableCell>
                <TableCell align="left" onClick={openTaskDetailsModal}>{row.name}</TableCell>
                <TableCell align="left" onClick={openTaskDetailsModal}>{priorityValue}</TableCell>
                <TableCell align="left" onClick={openTaskDetailsModal}>{row.effort}</TableCell>
                <TableCell className = 'group'>
                    <Circle style={{ alignSelf: 'left', color: stateTagColor, height: '4vh' }}></Circle>
                    <span className="task-state-tooltip group-hover:scale-100" >
                        {stateValue.toUpperCase()}
                    </span>
                </TableCell>                   
                <TableCell align="right">
                    <div className='hover:text-teal-600 text-slate-600 cursor-pointer' onClick={openConfirmationDeleteModal}>
                        <DeleteIcon />
                    </div>
                </TableCell>
                <TableCell align="right">
                    <div className='hover:text-teal-600 text-slate-600 cursor-pointer' onClick={openEditTaskModal}>
                        <EditIcon />
                    </div>
                </TableCell>
        </TableRow></>
    )
}

export default  TaskTableRow
