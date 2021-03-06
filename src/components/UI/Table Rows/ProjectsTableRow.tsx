import { TableCell, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import { Project } from '../../types/projectTypes'
import DeleteIcon from '@mui/icons-material/Delete';
import { Circle } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import EditProjectModal from '../Projects Modal/editProjectModal'
import ConfirmModal from '../Modal/confirmationModal'

interface  ProjectTableRowProps {
    row: Project,
    refresh: () => void,
}


const  ProjectTableRow = (props:  ProjectTableRowProps) => {
    const { row, refresh } = props;
    const [showProjectModal, setshowProjectModal] = useState(false);
    const [showCofirmationModal, setShowConfirmationModal] = useState(false);
    const deleteItems = async () => {
        const response = await fetch(`https://modulo-proyectos-psa-2022.herokuapp.com/projects/${row.code}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
    
            },
        })
        props.refresh()
        return response;   
    }
    const handleAddProjectClose = () => {
        setshowProjectModal(false)
    };

    const handleModalOpen = () => {
        setshowProjectModal(true)
    };
    
    const handleDeleteConfirmation = () =>{
        deleteItems();
        setShowConfirmationModal(false);
    };

    const handleNotConfirmation = () =>{
        setShowConfirmationModal(false);
    };

    const openConfirmationDeleteModal = () =>{
        setShowConfirmationModal(true);
    }

    const [riskColor, setRiskColor] = useState('#9297A0');

    useEffect(() => {
        if(row.risk?.impact == 1){
            setRiskColor(state => ('#8CD867'));
        }else if (row.risk?.impact == 2){
            setRiskColor(state => ('#FFB20F'));
        }else if (row.risk?.impact == 3){
            setRiskColor(state => ('#E71D36'));
        }else if (row.risk?.impact == 4){
            setRiskColor(state => ('#481E3A'));
        }
    }, []);


    return (
        <>
            <ConfirmModal onSubmit={handleDeleteConfirmation} onClose={handleNotConfirmation} show={showCofirmationModal} txt="Seguro que desea elimiar el proyecto"/>
            <EditProjectModal onRefresh={props.refresh} onClose={handleAddProjectClose} show={showProjectModal} row={props.row} />
            <TableRow hover key={row.code}>
                <TableCell align="left"><Link to={`/proyectos/${row.code}`} state={{ projectData: row }}>{row.code.toString()}</Link></TableCell>
                <TableCell align="left"><Link to={`/proyectos/${row.code}`} state={{ projectData: row }}>{row.name}</Link></TableCell>
                <TableCell align="left"><Link to={`/proyectos/${row.code}`} state={{ projectData: row }}>{row.type}</Link></TableCell>
                <TableCell align="left"><Link to={`/proyectos/${row.code}`} state={{ projectData: row }}>{row.state}</Link></TableCell>
                <TableCell align="left"><Link to={`/proyectos/${row.code}`} state={{ projectData: row }}>{row.startDate}</Link></TableCell>
                <TableCell align="left"><Link to={`/proyectos/${row.code}`} state={{ projectData: row }}>{row.endDate}</Link></TableCell>
                <TableCell><Circle style={{ alignSelf: 'left', color: riskColor, height: '4vh' }}></Circle></TableCell>
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

export default  ProjectTableRow
