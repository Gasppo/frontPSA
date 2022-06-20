import { TableCell, TableRow } from '@mui/material'
import React from 'react'
import { useEffect, useState } from 'react'
import { Task } from '../../types/taskType'
import DeleteIcon from '@mui/icons-material/Delete';
import { Circle } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import EditProjectModal from './editProjectModal'
import CircleIcon from '@mui/icons-material/Circle';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import ConfirmModal from './confirmationModal'

interface  TaskTableRowProps {
    row: Task,
    code: number,
    tasks: Task[],
    refresh: () => void,
}


const  TaskTableRow = (props:  TaskTableRowProps) => {
    const { row, refresh, code,tasks } = props;
    const [showCofirmationModal, setShowConfirmationModal] = useState(false);
    
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

    const handleAddProjectClose = () => {
        setshowProjectModal(false)
    };

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

    const [riskImpact, setRiskImpact] = useState('');
    const [riskColor, setRiskColor] = useState('#9297A0');

    useEffect(() => {

    }, []);


    return (
        <>
            <ConfirmModal onSubmit={handleDeleteConfirmation} onClose={handleNotConfirmation} show={showCofirmationModal} txt="Seguro que desea elimiar la tarea"/>
            <TableRow hover key={row.code}>
                <TableCell align="left"><Link to='/proyecto' state={{ projectData: row }}>{row.code}</Link></TableCell>
                <TableCell align="left"><Link to='/proyecto' state={{ projectData: row }}>{row.name}</Link></TableCell>
                <TableCell align="left"><Link to='/proyecto' state={{ projectData: row }}>{row.priority}</Link></TableCell>
                <TableCell align="left"><Link to='/proyecto' state={{ projectData: row }}>{row.effort}</Link></TableCell>               
                <TableCell align="right">
                    <div className='hover:text-teal-600 text-slate-600 cursor-pointer' onClick={openConfirmationDeleteModal}>
                        <DeleteIcon />
                    </div>
                </TableCell>
                <TableCell align="right">
                    <div className='hover:text-teal-600 text-slate-600 cursor-pointer' onClick={handleModalOpen}>
                        <EditIcon />
                    </div>
                </TableCell>
        </TableRow></>
    )
}

export default  TaskTableRow
