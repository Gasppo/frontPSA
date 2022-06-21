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

interface  TaskTableRowProps {
    row: Task,
    code: number,
    tasks: Task[],
    refresh: () => void,
}


const  TaskTableRow = (props:  TaskTableRowProps) => {
    const { row, refresh, code,tasks } = props;
    const [isOpenEditTaskModal, setIsOpenEditTaskModal] = useState(false);
    const [showCofirmationModal, setShowConfirmationModal] = useState(false);
    const [priorityValue, setPriorityValue] = useState('Baja');
    
    const [newTasks, setNewTasks] = useState({
        tasks: props.tasks
    })
    const [showProjectModal, setshowProjectModal] = useState(false)
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

    const updateProjectUsingAPI = async () => {
        const response = await fetch(`http://localhost:2000/projects/${props.code}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(newTasks)
        })
        props.refresh();
        return response
    }

    const deleteTask = () => {
        const filteredTasks = props.tasks.filter(item => item.code !== row.code);
        setNewTasks({tasks: filteredTasks});
        updateProjectUsingAPI();
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
    };

    const handleEditTaskClose = () =>{
        setIsOpenEditTaskModal(false);
    };

    useEffect(() => {
        determinePriorityValue();
    }, []);


    return (
        <>
            <EditTaskModal onSubmit={handleEditTaskSubmit} onClose={handleEditTaskClose} show={isOpenEditTaskModal} currentTask={row}/>
            <ConfirmModal onSubmit={handleDeleteConfirmation} onClose={handleNotConfirmation} show={showCofirmationModal} txt="Seguro que desea elimiar la tarea"/>
            <TableRow hover key={row.code}>
                <TableCell align="left"><Link to='/proyecto' state={{ projectData: row }}>{row.code}</Link></TableCell>
                <TableCell align="left"><Link to='/proyecto' state={{ projectData: row }}>{row.name}</Link></TableCell>
                <TableCell align="left"><Link to='/proyecto' state={{ projectData: row }}>{priorityValue}</Link></TableCell>
                <TableCell align="left"><Link to='/proyecto' state={{ projectData: row }}>{row.effort}</Link></TableCell>               
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
