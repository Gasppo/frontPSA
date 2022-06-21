import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'
import {Project} from '../../components/types/projectTypes'
import LoadingIndicator from '../../components/Loading/LoadingIndicator'
import { useEffect, useState } from 'react'
import { Circle } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TaskTableRow from '../../components/UI/Projects/TaskTableRow';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link, useNavigate} from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Popup from 'reactjs-popup';
import AddTaskModal from './AddTaskModal';
import EditProjectModal from '../../components/UI/Projects/editProjectModal';
import { Task } from '../../components/types/taskType'
import AddResourcesModal from '../proyectos/AddResourcesModal'

interface ProyectProps {
    projectData: Project,
    __proto__: Object,
    onRefresh: () => void,
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const Proyecto = () => {
    const location = useLocation()
    
    const prop = location.state as ProyectProps;
    const projectData = prop.projectData;
    const [project, setProject] = useState(projectData);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [showProjectModal, setshowProjectModal] = useState(false);
    const [isOpenNewTaskModal, setIsOpenNewTaskModal] = useState(false);
    const [loadedTasks, setLoadedTasks] = useState<Task[]>([]);
    const [riskColor, setRiskColor] = useState('#9297A0');
    const [riskImpact, setRiskImpact] = useState('None');
    const [showResourcesModal, setshowResourcesModal] = useState(false);
    const [stateTagColor, setStateTagColor] = useState('#9297A0');
    const [expandedRecursos, setexpandedRecursos] = useState(false);
    const [expandedDates, setexpandedDates] = useState(false);
    const [expandedDetails, setexpandedDetails] = useState(false);
    const navigate = useNavigate();
    const [isADevelopmentProject, setIfItIsADevelomentProject]= useState(false);
    const [newProject, setNewProject] = useState({
        tasks: projectData.tasks,
    });


    //const recursos = ["RS12345678", "RS87654321", "RS98765432", "RS67543245", "RS87657905"];
    const fetchProject = () => {
        fetch(`http://localhost:2000/projects/${projectData.code}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                return response.json()})
            .then((myJson) => {
                setProject((JSON.parse(JSON.stringify(myJson)))[0]);
            })
            .catch(err => console.log(err));
            sleep(3000).then(res => setLoading(false));
    }

    const gatherTasks = () => {
        //setLoading(true)
        fetch('http://localhost:2000/tasks',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                return response.json()})
            .then((myJson) => {
               // console.log(myJson);
                setLoadedTasks(JSON.parse(JSON.stringify(myJson)));

            })
            .catch(err => console.log(err))
            sleep(3000).then(res => setLoading(false));
            //console.log(loadedTasks);
    }

    const handleAddResourcesSubmit = () => {
        //asociar los recursos
        setshowResourcesModal(false);
    };
    
    const handleModalAddResourcesClose = () => {
        setshowResourcesModal(false);
    };

    const handleOpenModalAddResources = () =>{
        setshowResourcesModal(true);
    };

    const updateProjectUsingAPI = async () => {
        const response = await fetch(`http://localhost:2000/projects/${projectData.code}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(newProject)
        })
        return response
    }

    const determineRisk = () => {
        if(project.risk?.impact == 1){
            setRiskImpact(state => ('Bajo'));
            setRiskColor(state => ('#8CD867'));
        }else if (project.risk?.impact == 2){
            setRiskImpact(state => ('Medio'));
            setRiskColor(state => ('#FFB20F'));
        }else if (project.risk?.impact == 3){
            setRiskImpact(state => ('Alto'));
            setRiskColor(state => ('#E71D36'));
        }else if (project.risk?.impact == 4){
            setRiskImpact(state => ('Critico'));
            setRiskColor(state => ('#481E3A'));
        }
    }

    const determineStateTagColor = () => {
        if(project.state === 'No Iniciado' || project.state === 'no iniciado' ){
            setStateTagColor(state => ('#FC7A1E'));
        }else if (project.state === 'Iniciado' || project.state === 'iniciado'){
            setStateTagColor(state => ('#329F5B'));
        }else if (project.state === 'Finalizado' || project.state === 'finalizado'){
            setStateTagColor(state => ('#4D7298'));
        }else if (project.state === 'Cancelado' || project.state === 'cancelado'){
            setStateTagColor(state => ('#A54657'));
        }
    }

    const changeexpandedRecursosSetUp = () =>{
        setexpandedRecursos(!expandedRecursos);
        console.log(expandedDates);
        console.log(expandedRecursos);
    }

    const changeexpandedDatesSetUp = () =>{
        setexpandedDates(!expandedDates);
    }

    const handleAddProjectClose = () => {
        setshowProjectModal(false)
    };

    const handleModalOpen = () => {
        setshowProjectModal(true)
    };

    const changeexpandedDetailsSetUp = () =>{
        setexpandedDetails(!expandedDetails);
    }

    const checkIfItIsADevelopmentProject = () =>{
        setIfItIsADevelomentProject((project.type=="Desarrollo"));
    }

    const openNewTaskModal = () => {
        setIsOpenNewTaskModal(true);
    };
    
    const handleAddTaskSubmit = () =>{
        //agregar la tarea
        setIsOpenNewTaskModal(false);
    };

    const handleNewTaskClose = () =>{
        setIsOpenNewTaskModal(false);
    };

    useEffect(() => {
        fetchProject();
        //gatherTasks();
        determineRisk();
        determineStateTagColor();
        setexpandedRecursos(false);
        setexpandedDates(false);
        setexpandedDetails(false);
        checkIfItIsADevelopmentProject();
    }, []);

    return (
        <>
            <EditProjectModal onRefresh={fetchProject} onClose={handleAddProjectClose} show={showProjectModal} row={project} />
            <AddTaskModal onSubmit={handleAddTaskSubmit} onClose={handleNewTaskClose} show={isOpenNewTaskModal} toProject={project.code}/>
            <AddResourcesModal onSubmit={handleAddResourcesSubmit} onClose={handleModalAddResourcesClose} show={showResourcesModal} project={project}/> 
            <div style={{display: 'flex', flexDirection: 'row', margin: 25, paddingBottom: 20, paddingLeft: 80, borderBottomColor:'#C5D0CB', borderBottomWidth: '1px'}}> 
                
                <ArrowBackIosNewIcon  onClick={() => navigate(-1)} style={{color: 'slate', fontSize: 25, marginTop: -9, marginRight: 20}} className= 'hover:bg-gray-200 hover:text-teal-900 hover:rounded-3xl hover:shadow-lg transition-all duration-200  group  h-12'/>
               
                <Typography variant='h5' className={'slate'}>{project.name}</Typography>
                <div className = 'group'>
                    <Circle  style={{ alignSelf: 'left', color: riskColor, height: '5vh', marginLeft: '5vh', marginTop: -8}}></Circle>
                    <span className="risk-tooltip group-hover:scale-100" >
                        Riesgo: {riskImpact}
                    </span>
                </div>
                <Typography variant='body2' style={{marginLeft: "85vh", color: '#C5D0CB', marginTop: "1vh"}}>#{project.code}</Typography>
                <Popup
                    trigger={ <MoreHorizIcon style={{color:'gray', marginLeft: 80}} className= 'hover:bg-gray-100 hover:rounded-3xl transition-all duration-200  group w-8 h-8'></MoreHorizIcon>}
                    closeOnDocumentClick
                    mouseLeaveDelay={300}
                    mouseEnterDelay={0}
                    arrow={false}
                    position="right top"
                >
                    <div className="menu" style={{backgroundColor: '#F4F6F5', borderRadius: 20, height: 132, width: 230}} >
                        <Typography variant='body2' className='menu-item hover:bg-gray-200' style={{ padding: 12, color: '#5C7067', borderTopLeftRadius: 20, borderTopRightRadius: 20}} onClick={handleModalOpen}>Editar Proyecto</Typography>
                        <Typography variant='body2' className='menu-item hover:bg-gray-200' style={{ padding: 12, color: '#5C7067'}} onClick={openNewTaskModal}>Agregar nueva tarea</Typography>
                        <Typography variant='body2' className='menu-item hover:bg-gray-200' style={{ padding: 12, color: '#5C7067', borderBottomLeftRadius: 20, borderBottomRightRadius: 20}} onClick={handleOpenModalAddResources}>Agregar recursos al proyecto</Typography>
                    </div>
                </Popup>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', marginLeft: 100}}> 
                <div style={{display: 'flex', flexDirection: 'column', marginTop: -10, width:'90vh'}}>
                    <div style={{padding: 5, width: 90, height: 30, display: 'flex', flexDirection: 'row', backgroundColor: stateTagColor, borderRadius: 5}}><Typography variant='body2' style= {{color: '#F4F6F5', fontWeight: 'bold'}}>{project.state}</Typography></div>
                    <div style={{alignSelf:'left', marginTop: 25}}>
                        <Typography variant='body2' className='w-[27vh]' style={{fontWeight: 'bold', color: '#5C7067'}}>Descripción: </Typography>
                        <div style= {{ marginTop: 10, backgroundColor: "#E9EDEB", borderRadius: 15, padding: 10, paddingLeft: 30, paddingRight: 30, minHeight:110}}>
                            <Typography variant='body2' className={'slate'}>{project.description}</Typography>
                        </div>
                    </div>
                    <div style={{marginTop: 25}}>
                    <Typography variant='body2' className='w-[27vh]' style={{fontWeight: 'bold', color: '#5C7067'}}>Tareas: </Typography>
                        <LoadingIndicator show={isLoading} className={`flex flex-col items-start  transition-all duration-200`} >
                            {!isLoading && (<> 
                                <TableContainer component={Paper} className="mt-5 ml-100 mr-100" style = {{width: 640, borderColor: "#B0BFB8", borderRadius: 15, borderWidth: '0.5px'}}  >
                                    <Table className='ml-100 mr-100'>
                                        <TableHead >
                                            <TableRow>
                                                <TableCell align="left" style={{color: '#5C7067' }}>Código</TableCell>
                                                <TableCell align="left" style={{color: '#5C7067' }}>Nombre</TableCell>
                                                <TableCell align="left" style={{color: '#5C7067' }}>Prioridad</TableCell>
                                                <TableCell align="left" style={{color: '#5C7067' }}>Esfuerzo Estimado</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {loadedTasks && project.tasks.map(row => <TaskTableRow refresh={gatherTasks} row={row} code= {project.code} tasks = {project.tasks} key={row.code} />)}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </>
                            )}
                        </LoadingIndicator>
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
                            <div style={{marginBottom:10, display: 'flex', flexDirection: 'row', color: '#5C7067'}}><Typography variant='body2' className='w-[27vh]  ml-5'>Tipo de proyecto: </Typography><Typography variant='body2' className={'slate'}>{project.type}</Typography></div>
                            <div style={{marginBottom:10, display: 'flex', flexDirection: 'row', color: '#5C7067'}}><Typography variant='body2' className='w-[27vh]  ml-5'>Cliente: </Typography><Typography variant='body2' className={'slate'}>{project.client}</Typography></div>
                            <div style={{marginBottom:10, display: 'flex', flexDirection: 'row',color: '#5C7067'}}><Typography variant='body2' className='w-[27vh]  ml-5'>Fecha de inicio: </Typography><Typography variant='body2' className={'slate'}>{project.startDate}</Typography></div>
                            <div style={{marginBottom:10,display: 'flex', flexDirection: 'row',color: '#5C7067'}}><Typography variant='body2' className='w-[27vh]  ml-5'>Fecha de cierre: </Typography><Typography variant='body2' className={'slate'}>{project.endDate}</Typography></div>
                            {isADevelopmentProject && <div style={{display: 'flex', flexDirection: 'row', color: '#5C7067'}}><Typography variant='body2' className='w-[27vh]  ml-5'>Producto: </Typography><Typography variant='body2' className={'slate'}>{project.productId}</Typography></div>}
                            </>}
                    </div>
                    <div className = 'hover:bg-gray-100 transition-all duration-200  group' style={{width: '400', marginTop: 10, padding: 15, display: 'flex', flexDirection: 'column', borderColor: "#B0BFB8", borderRadius: 15, borderWidth: '1px',marginRight: '5vh'}} onClick={changeexpandedRecursosSetUp}>
                        <div style={{ display: 'flex', flexDirection: 'row',color: '#5C7067', borderBottomColor: expandedRecursos ? "#B0BFB8":'transparent', paddingBottom: expandedRecursos ? 10:0, marginBottom:expandedRecursos ? 10:0, borderBottomWidth: '1px'}}><Typography variant='body2' className='w-[30vh] ml-5' style={{fontWeight: 'bold'}}>Recursos </Typography>
                            {expandedRecursos && <KeyboardArrowUpIcon className='ml-7' style={{color: '#5C7067'}}/>}
                            {!expandedRecursos && <KeyboardArrowDownIcon className='ml-7' style={{color: '#5C7067'}}/>}    
                        </div>
                        <div>
                            {expandedRecursos && 
                            <>
                                <div style={{width: 400}}>
                                    {project.resources.map(recurso =>  <div style={{display: 'flex', flexDirection: 'row', margin: 5, padding: 5, width: 120, height: 30, backgroundColor: "#E9EDEB", borderRadius: 5}}><AccountCircleIcon className= 'mr-1 h-5' style={{color: '#5C7067'}}/><Typography variant='caption' className='slate' >{recurso}</Typography></div>)}
                                </div>
                            </>}
                        </div>
                    </div>
                    <div className='hover:bg-gray-100' style={{marginTop: 10, padding: 15, display: 'flex', flexDirection: 'column', borderColor: "#B0BFB8", borderRadius: 15, borderWidth: '1px',marginRight: '5vh'}} onClick={changeexpandedDatesSetUp}>
                        <div style={{ borderBottomColor: expandedDates ? "#B0BFB8":'transparent', paddingBottom: expandedDates ? 10:0, marginBottom:expandedDates ? 10:0, display: 'flex', flexDirection: 'row',color: '#5C7067', borderBottomWidth: '1px'}}><Typography variant='body2' className='w-[30vh] ml-5' style={{fontWeight: 'bold'}}>Actividad </Typography>
                            {expandedDates && <KeyboardArrowUpIcon className='ml-7' style={{color: '#5C7067'}}/>}
                            {!expandedDates && <KeyboardArrowDownIcon className='ml-7' style={{color: '#5C7067'}}/>}
                        </div>
                            {expandedDates && 
                            <>
                            <div style={{marginBottom:10, display: 'flex', flexDirection: 'row',color: '#5C7067'}}><Typography variant='body2' className='w-[27vh]  ml-5'>Fecha de creación: </Typography><Typography variant='body2' className={'slate'}>{project.creationDate}</Typography></div>
                            <div style={{marginBottom:10, display: 'flex', flexDirection: 'row',color: '#5C7067'}}><Typography variant='body2' className='w-[27vh]  ml-5'>Fecha de la última modificación: </Typography><Typography variant='body2' className={'slate'}>{project.updatedDate}</Typography></div>
                            </>}
                    </div>   
                </div>
            </div>
        </>
    )
}

export default Proyecto;