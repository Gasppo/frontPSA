import { useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Task } from '../../components/types/taskType'
import { Box, Modal, Tab, Tabs, Typography} from '@mui/material';
import { useTicketInfo } from '../../hooks/useTicketInfo';
import { useLocation } from 'react-router-dom';
import TicketDetails from '../../components/UI/Tickets/Modals/TicketDetails';
import EditTaskModal from '../../components/UI/Tasks Modal/EditTaskModal';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Popup from 'reactjs-popup';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditProjectModal from '../../components/UI/Projects Modal/editProjectModal';
import { Link, useNavigate } from 'react-router-dom';

interface VerTareaProps {
    currentTask: Task,
    projectResources: [],
    __proto__: Object,
    onRefresh: () => void,
}

const Tarea = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const prop = location.state as VerTareaProps;
    const currentTask = prop.currentTask;
    const projectResources= prop.projectResources;
    const [isLoading, setIsLoading] = useState(false);
    const [priorityValue, setPriorityValue] = useState('');
    const [stateTagColor, setStateTagColor] = useState('#F9A620');
    const [isOpenEditTaskModal, setIsOpenEditTaskModal] = useState(false);
    const [stateValue, setStateValue] = useState('Pendiente');
    const [value, setValue] = useState(0);
    const [expandedTicket, setExpandedTicket] = useState(false);
    const [expandedDetails, setexpandedDetails] = useState(false);
    const {client, currentTicket,  product, asignee} = useTicketInfo(currentTask.ticket)

    //Agregar lo de ESFUERZO ESTIMADO REAL

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    const determinePrioriryValue = () => {
        if (currentTask.priority == 1) {
            setPriorityValue(state => ('Baja'));
        } else if (currentTask.priority == 2) {
            setPriorityValue(state => ('Media'));
        } else if (currentTask.priority == 3) {
            setPriorityValue(state => ('Alta'));
        } else if (currentTask.priority == 4) {
            setPriorityValue(state => ('Critica'));
        }
    }

    const determineStateTagColor = () => {
        if (currentTask.isCompleted == 0) {
            setStateTagColor(state => ('#F9A620'));
            setStateValue(state => ('Pendiente'));
        } else if (currentTask.isCompleted == 1) {
            setStateTagColor(state => ('#91AEC1'));
            setStateValue(state => ('En Progreso'));
        } else {
            setStateTagColor(state => ('#7BCC7E'));
            setStateValue(state => ('Completa'));
        }
    }

    const handleEditTaskSubmit = () =>{
        setIsOpenEditTaskModal(false);
    };

    const handleEditTaskClose = () =>{
        setIsOpenEditTaskModal(false);
    };

    const changeexpandedDetailsSetUp = () =>{
        setexpandedDetails(!expandedDetails);
    }

    const handleModalOpen = () => {
        setIsOpenEditTaskModal(true)
    };

    const changeexpandedTicketSetUp = () =>{
        setExpandedTicket(!expandedTicket);
    }

    console.log("imprimo el ticket");
    console.log(currentTicket);

    useEffect(() => {
        determineStateTagColor();
    }, [stateTagColor]);

    useEffect(() => {
        setExpandedTicket(false);
        setexpandedDetails(false);
        determinePrioriryValue();
    }, []);


    useEffect(() => {
        setValue(0)
    }, []);


    return (
        <>
            <EditTaskModal onSubmit={handleEditTaskSubmit} onClose={handleEditTaskClose} show={isOpenEditTaskModal} currentTask={currentTask} projectResources={projectResources}/>
            <div style={{display: 'flex', flexDirection: 'row', margin: 25, paddingBottom: 20, paddingLeft: 80, borderBottomColor:'#C5D0CB', borderBottomWidth: '1px'}}> 
                
                <ArrowBackIosNewIcon  onClick={() => navigate(-1)} style={{color: 'slate', fontSize: 25, marginTop: -9, marginRight: 20}} className= 'hover:bg-gray-200 hover:text-teal-900 hover:rounded-3xl hover:shadow-lg transition-all duration-200  group  h-12'/>
               
                <Typography variant='h5' className={'slate'}>Tarea: {currentTask.name}</Typography>
                <Typography variant='body2' style={{marginLeft: "85vh", color: '#C5D0CB', marginTop: "1vh"}}>Tarea #{currentTask.code}</Typography>
                {(currentTask.isCompleted !=2) && <Popup
                    trigger={ <MoreHorizIcon style={{color:'gray', marginLeft: 80}} className= 'hover:bg-gray-100 hover:rounded-3xl transition-all duration-200  group w-8 h-8'></MoreHorizIcon>}
                    closeOnDocumentClick
                    mouseLeaveDelay={300}
                    mouseEnterDelay={0}
                    arrow={false}
                    position="right top"
                >
                    <div className="menu" style={{backgroundColor: '#F4F6F5', borderRadius: 20, height: 44, width: 230}} >
                        <Typography variant='body2' className='menu-item hover:bg-gray-200' style={{ padding: 12, color: '#5C7067', borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20}} onClick={handleModalOpen}>Editar Tarea</Typography>
                    </div>
                </Popup>}
            </div>
                <div style={{display: 'flex', flexDirection: 'row', marginLeft: 100}}> 
                <div style={{display: 'flex', flexDirection: 'column', marginTop: -10, width:'90vh'}}>
                    <div style={{ padding: 5, width: 120, height: 30, display: 'flex', flexDirection: 'row', backgroundColor: stateTagColor, borderRadius: 5 }}><Typography variant='body2' style={{ color: '#F4F6F5', fontWeight: 'bold' }}>{stateValue.toUpperCase()}</Typography></div>
                    <div style={{alignSelf:'left', marginTop: 25}}>
                        <Typography variant='body2' className='w-[27vh]' style={{fontWeight: 'bold', color: '#5C7067'}}>Descripción: </Typography>
                        <div style= {{ marginTop: 10, backgroundColor: "#E9EDEB", borderRadius: 15, padding: 10, paddingLeft: 30, paddingRight: 30, minHeight:110}}>
                            <Typography variant='body2' className={'slate'}>{currentTask.description}</Typography>
                        </div>
                    </div>
                </div>
                <div style= {{display: 'flex', flexDirection: 'column', width: '50vh',marginLeft: 60}} >
                    <div className='hover:bg-gray-100' style={{padding: 15, display: 'flex', flexDirection: 'column', borderColor: "#B0BFB8", borderRadius: 15, borderWidth: '1px', marginRight: '5vh'}} onClick={changeexpandedDetailsSetUp}>
                        <div style={{ borderBottomColor: expandedDetails ? "#B0BFB8":'transparent', paddingBottom: expandedDetails ? 10:0, marginBottom:expandedDetails ? 10:0, display: 'flex', flexDirection: 'row',color: '#5C7067', borderBottomWidth: '1px'}}><Typography variant='body2' className='w-[30vh] ml-5' style={{fontWeight: 'bold'}}>Detalles </Typography>
                            {expandedDetails && <KeyboardArrowUpIcon className='ml-7' style={{color: '#5C7067'}}/>}
                            {!expandedDetails && <KeyboardArrowDownIcon className='ml-7' style={{color: '#5C7067'}}/>}
                        </div>
                            {expandedDetails && 
                            <>
                                <div style={{ marginBottom: 10, display: 'flex', flexDirection: 'row', color: '#5C7067' }}><Typography variant='body2' className='w-[27vh]  ml-5'>Prioridad: </Typography><Typography variant='body2' className={'slate'}>{currentTask.priority}</Typography></div>
                                <div style={{ marginBottom: 10, display: 'flex', flexDirection: 'row', color: '#5C7067' }}><Typography variant='body2' className='w-[27vh]  ml-5'>Esfuerzo Estimado: </Typography><Typography variant='body2' className={'slate'}>{currentTask.effort} {currentTask.effortUnit}</Typography></div>
                                { (currentTask.isCompleted == 2) && <div style={{ marginBottom: 10, display: 'flex', flexDirection: 'row', color: '#5C7067' }}><Typography variant='body2' className='w-[27vh]  ml-5'>Esfuerzo Estimado: </Typography><Typography variant='body2' className={'slate'}>{currentTask.realEffort} {currentTask.effortUnit}</Typography></div>}
                                <div style={{ marginBottom: 10, display: 'flex', flexDirection: 'row', color: '#5C7067' }}>
                                    <Typography variant='body2' className='w-[27vh]  ml-5'>Responsable: </Typography>
                                    <div style={{ display: 'flex', flexDirection: 'row', margin: 5, padding: 5, width: 120, height: 30, backgroundColor: "#E9EDEB", borderRadius: 5 }}><AccountCircleIcon className='mr-1 h-5' style={{ color: '#5C7067' }} /><Typography variant='caption' className='slate' >ID-{currentTask.resource}</Typography></div>
                                </div>
                            </>}
                    </div>
                    {(currentTicket != undefined) && <div className='hover:bg-gray-100' style={{marginTop: 10, padding: 15, display: 'flex', flexDirection: 'column', borderColor: "#B0BFB8", borderRadius: 15, borderWidth: '1px',marginRight: '5vh'}} onClick={changeexpandedTicketSetUp}>
                        <div style={{ borderBottomColor: expandedTicket ? "#B0BFB8":'transparent', paddingBottom: expandedTicket ? 10:0, marginBottom:expandedTicket ? 10:0, display: 'flex', flexDirection: 'row',color: '#5C7067', borderBottomWidth: '1px'}}><Typography variant='body2' className='w-[30vh] ml-5' style={{fontWeight: 'bold'}}>Detalles del Ticket </Typography>
                            {expandedTicket && <KeyboardArrowUpIcon className='ml-7' style={{color: '#5C7067'}}/>}
                            {!expandedTicket && <KeyboardArrowDownIcon className='ml-7' style={{color: '#5C7067'}}/>}
                        </div>
                            {expandedTicket && 
                            <>
                            <div style={{marginBottom:10, display: 'flex', flexDirection: 'row',color: '#5C7067'}}><Typography variant='body2' className='w-[27vh]  ml-5 mr-0'>Nombre: </Typography><Typography variant='body2' className={'slate'}>{currentTicket.title}</Typography></div>
                            <div style={{marginBottom:10, display: 'flex', flexDirection: 'row',color: '#5C7067'}}><Typography variant='body2' className='w-[27vh]  ml-5 mr-0'>Código: </Typography><Typography variant='body2' className={'slate'}>{currentTicket.id}</Typography></div>
                            <div style={{marginBottom:10, display: 'flex', flexDirection: 'row',color: '#5C7067'}}><Typography variant='body2' className='w-[27vh]  ml-5'>Estado: </Typography><Typography variant='body2' className={'slate'}>{currentTicket.status}</Typography></div>
                            <div style={{marginBottom:10, display: 'flex', flexDirection: 'row',color: '#5C7067'}}><Typography variant='body2' className='w-[27vh]  ml-5'>Fecha de creación: </Typography><Typography variant='body2' className={'slate'}>{currentTicket.createdAt.toString()}</Typography></div>
                            <div style={{marginBottom:10, display: 'flex', flexDirection: 'row',color: '#5C7067'}}><Typography variant='body2' className='w-[27vh]  ml-5'>Fecha de la última modificación: </Typography><Typography variant='body2' className={'slate'}>{currentTicket.updatedAt.toString()}</Typography></div>
                            </>}
                    </div> } 
                    {(currentTicket != undefined) &&
                        <Link to= {`../../../soporte/tickets/${currentTicket.id}`}>                 
                                <div className='hover:bg-gray-100' style={{marginTop: 10, padding: 15, display: 'flex', flexDirection: 'column', borderColor: "#B0BFB8", borderRadius: 15, borderWidth: '1px',marginRight: '5vh'}}>
                                    <div style={{ display: 'flex', flexDirection: 'row',color: '#5C7067'}}><Typography variant='body2' className='w-[30vh] ml-5' style={{fontWeight: 'bold'}}>Acceder al Ticket </Typography>
                                    </div>
                                </div>
                        </Link>
                    } 
                </div>
            </div>         
    </>
    )
}

export default Tarea;