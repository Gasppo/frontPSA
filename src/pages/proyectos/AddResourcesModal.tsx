import { Modal, TextField, Typography, MenuItem, InputAdornment } from '@mui/material';
import { border } from '@mui/system';
import { useEffect, useState } from 'react'
import{Resource} from '../../components/types/resourceType'
import {Project} from '../../components/types/projectTypes'
import AccountCircle from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/DeleteForeverOutlined'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { render } from "react-dom";
import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
//import * as Collections from 'typescript-collections';

interface AddProjectModalProps {
    onClose: () => void
    onSubmit: () => void
    show: boolean
    project: Project
    onRefresh: () => void
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const AddProjectModal = (props: AddProjectModalProps) => {
    const { onSubmit, onClose, show, project, onRefresh } = props;
    const [newProject, setNewProject] = useState({
        resources: project.resources
    });

    const [resources, setLoadedResources] = useState<Resource []>([]);
    const [resourcesNumbers,setResourcesNumbers] = useState<number[]>([]);

    const getResources = () => {
        //setLoading(true)
        fetch('https://modulo-recursos-psa.herokuapp.com/employees',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                return response.json()})
            .then((myJson) => {
                //console.log(myJson);
                setLoadedResources(Object.values(JSON.parse(JSON.stringify(myJson))));
                //setOptions( resources.map( resource => {resource.legajo }));

            })
            .catch(err => console.log(err))
            //sleep(3000).then(res => setLoading(false));
    }
    useEffect(() => {
        getResources();
    }, [resources,resourcesNumbers, newProject]);

    const handleSubmit = async () => {
        sleep(100);
        const res = await updateProjectUsingAPI();
        onSubmit();
        props.onRefresh();
        /*const response = await addResourcesToProjectUsingAPI()
        if (response.status === 200) {
            onSubmit()
        }*/

    }

    const updateProjectUsingAPI = async () => {
        const response = await fetch(`http://localhost:2000/projects/${project.code}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(newProject)
        })
        console.log(newProject)
        console.log(response)
        return response;
    }

    const handleResourceRemoval = async (resource : number) => {
        setNewProject({resources: newProject.resources.filter((item:any)=> item!==resource)});
    }


    return (
        <Modal onClose={onClose} open={show} >
            <div style= {{padding: '10vh', backgroundColor: 'white'}} className='p-15 absolute text-slate-800 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100vh] h-[60vh] rounded-xl shadow-lg'>
                <Typography variant='h5'>Asigne recursos que desee al proyecto #{project.code}</Typography>
                <div style= {{padding: '5vh'}} className='flex flex-col items-center'>
                    <div className='flex mb-6 flex-row'>
                        {/* <TextField id="outlined-basic" name="resources" className='mr-8 w-80' label="Busque un recurso por legajo" InputLabelProps={{ shrink: true}} variant="outlined" onChange={handleChangeText} /> */}
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={resources}
                            getOptionLabel={(option) => option.legajo.toString()}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Recurso" />}
                            onChange={(event: any, newValue: any) => {
                                if (newProject.resources.includes(newValue.legajo) === false) {
                                //setResourcesNumbers([...resourcesNumbers, newValue.legajo]);
                                setNewProject({
                                    resources: [...newProject.resources, newValue.legajo]
                                })
                                sleep(100)
                                //setSelectedResources(prevSelection => [...prevSelection,newValue]);
                            }}}
                        />
                       <div className='mr-8 w-80'></div>
                    </div>
                    <div style = {{alignSelf: 'left', width: 700, marginLeft:'5vh'}}>
                                    {/* {(selectedResources).map( (resource) =>  <div key={resource.legajo} style={{display: 'flex', flexDirection: 'row', margin: 5, padding: 5, width: 180, height: 30, backgroundColor: "#E9EDEB", borderRadius: 5}}><AccountCircleIcon className= 'mr-1 h-5' style={{color: '#5C7067'}}/><Typography variant='caption' className='slate' >{resource.legajo} - {resource.Nombre} {resource.Apellido}</Typography></div>)} */}
                                    {(newProject.resources).map( (resource) =>  <div key={resource} style={{display: 'flex', flexDirection: 'row', margin: 5, padding: 5, width: 180, height: 33, backgroundColor: "#E9EDEB", borderRadius: 5}}><AccountCircleIcon className= 'mr-1 h-5' style={{color: '#5C7067'}}/><Typography variant='caption' className='slate' >{resource}</Typography>                    
                                    <div style = {{alignSelf: 'right', marginLeft:'12vh', marginBottom:'1vh'}} className='hover:text-teal-600 text-slate-600 cursor-pointer' onClick={() => handleResourceRemoval(resource)}>
                        <DeleteIcon/>
                    </div></div>)}
                         </div>
                    <div style = {{alignSelf: 'right', marginLeft: '55vh', marginTop: '27vh', verticalAlign: 'bottom', position: 'absolute'}} className="text-center mr-8 mb-6 w-52 bg-teal-600 rounded-xl shadow-lg font-bold text-slate-800 hover:bg-gray-400 transition-all duration-300 cursor-pointer" onClick={handleSubmit}>
                        <div className="m-4" >Confirmar</div>
                    </div>

                </div>

            </div>
        </Modal >
    )
}

export default AddProjectModal
/*onChangeText={(text) => this.setState({description:text})} */