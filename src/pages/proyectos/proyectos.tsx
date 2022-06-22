import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useEffect, useState} from 'react'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Link } from 'react-router-dom'
import PageTitle from '../../components/UI/Dashboard/PageTitle'
import LoadingIndicator from '../../components/Loading/LoadingIndicator'
import{Project} from '../../components/types/projectTypes'
import ProjectTableRow from '../../components/UI/Projects/ProjectsTableRow'
import AddProjectModal from '../proyectos/AddProjectModal'
import FilterProjectsModal from '../proyectos/FilterProjectsModal';
 

interface ProyectosProps {
    
}

const Proyectos = (props: ProyectosProps) => {
    const [loadedProjects, setLoadedProjects] = useState<Project[]>([])
    const [type, setType] = useState('Desarrollo');
    const partsCurrentDate = (new Date().toLocaleDateString('es-AR')).split("/");
    var currentDate: string;
    if(partsCurrentDate[1].length==1){
        currentDate = partsCurrentDate[0] + "/0" + partsCurrentDate[1] + "/" + partsCurrentDate[2];
    }else{
        currentDate= partsCurrentDate[0] + "/" + partsCurrentDate[1] + "/" + partsCurrentDate[2];
    }
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
    const [isLoading, setLoading] = useState<boolean>(false)
    const [showProjectModal, setshowProjectModal] = useState(false)
    const [showResourcesModal, setshowResourcesModal] = useState(false)
    const [showFiltersModal, setshowFiltersModal] = useState(false)
    const [newProject, setProject] = useState({
        name: "",
       // id: 0, //realizar un generador de id
        creationDate: currentDate,
        updatedDate: currentDate,
        startDate: "dd/mm/yyyy",
        endDate: "dd/mm/yyyy",
        type: type,
        state: "No Iniciado",
        clientType: 'Interno',
        client: 0,
        productId: 0,
        description: " ",

    })

    const updateCurrentProjects = (filterProjects: Project[] ) =>{
        setFilteredProjects(filterProjects);
    
    }

    const handleModalOpen = () => {
        setshowProjectModal(true)
    };

    const handleFiltersSubmit = () => {
        //aplicar los filtros
        setshowFiltersModal(false);
    };

    const showAlert = () =>{
        alert("modified");
    }

    const handleModalFiltersClose = () =>{
        setshowFiltersModal(false);
    };

    const handleFiltersModalOpen = () =>{
        setshowFiltersModal(true);
    };

    const handleModalAddResourcesClose = () => {
        setshowResourcesModal(false);
    };

    const handleAddResourcesSubmit = () => {
        //asociar los recursos
        setshowResourcesModal(false);
    };

    const handleAddProjectClose = () => {
        setshowProjectModal(false)
    };

    const handleAddProjectSubmit = (projectCreated : Project) => {
        gatherProjects();
        setshowProjectModal(false);
        //setshowResourcesModal(true);
        setProject(projectCreated);
        //window.location.reload();
    
    };

    const gatherProjects = () => {
            //setLoading(true)
            fetch('https://modulo-proyectos-psa-2022.herokuapp.com/projects',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    return response.json()})
                .then((myJson) => {
                    setLoadedProjects(state => JSON.parse(JSON.stringify(myJson)));
                    setFilteredProjects(state => JSON.parse(JSON.stringify(myJson)));
                })
                .catch(err => console.log(err))
    }


    useEffect(() => {
        gatherProjects();
    },[]);



    return (
        <>
        <div style= {{marginLeft: '3%', marginRight: '5%'}}>
            <div className='flex flex-row'>
                <PageTitle label='Proyectos'>
                    <Link to={'/'}>
                        <Button>Volver al inicio</Button>
                    </Link>
                </PageTitle>
                <FilterAltIcon style={{color: 'slate', fontSize: 25, marginLeft: '4vh', marginTop: '1vh'}} className= 'hover:bg-gray-200 hover:text-teal-900 hover:rounded-3xl hover:shadow-lg transition-all duration-200  group  h-12' onClick={handleFiltersModalOpen}></FilterAltIcon>
                <FilterProjectsModal refreshProjects={updateCurrentProjects} currentProjects={loadedProjects} onSubmit={handleFiltersSubmit} onClose={handleModalFiltersClose} show={showFiltersModal} /> 
                <div className="h-[9vh] mt-[1vh] mb-[3vh] ml-[110vh] border-2 text-center  rounded-xl shadow-lg text-slate-800 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={handleModalOpen}>
                    <div className="m-4" > Crear Proyecto</div>
                </div>
            </div>
            <LoadingIndicator show={isLoading} className={`flex flex-col items-start  transition-all duration-200`} >
                {!isLoading && (<> 
                    <AddProjectModal onSubmit={handleAddProjectSubmit} onClose={handleAddProjectClose} show={showProjectModal}  />
                    {/* <AddResourcesModal onSubmit={handleAddResourcesSubmit} onClose={handleModalAddResourcesClose} show={showResourcesModal} project={newProject}/>  */}

                    <TableContainer component={Paper} className="mt-10"  >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Codigo</TableCell>
                                    <TableCell align="left">Nombre</TableCell>
                                    <TableCell align="left">Tipo</TableCell>
                                    <TableCell align="left">Estado</TableCell>
                                    <TableCell align="left">Fecha de Inicio</TableCell>
                                    <TableCell align="left">Fecha de Fin</TableCell>
                                    <TableCell align="left">Riesgo</TableCell>
                                    <TableCell align="left"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredProjects && filteredProjects.map(row => <ProjectTableRow refresh={gatherProjects} row={row} key={row.code} />)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
                )}
            </LoadingIndicator>
        </div>
        </>
    )
}

export default Proyectos
