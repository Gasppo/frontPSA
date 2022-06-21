import { Modal, TextField, Typography, MenuItem, InputAdornment } from '@mui/material';
import { border } from '@mui/system';
import { useEffect, useState } from 'react'
import{Resource} from '../../components/types/resourceType'
import {Project} from '../../components/types/projectTypes'
import AccountCircle from '@mui/icons-material/AccountCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { render } from "react-dom";
import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import * as Collections from 'typescript-collections';

import Stack from '@mui/material/Stack';
import { Set } from 'typescript';
/*const rootElement = document.getElementById("root");
render(
  <>
    <h2>Simple-React Autocomplete Functional-component Tsx</h2>

    <AutoComplete
      inputStyle={{ backgroundColor: "PaleTurquoise" }}
      optionsStyle={{ backgroundColor: "LemonChiffon" }}
      data={data}
      iconColor="Turquoise"
    />
  </>,
  rootElement
);*/


interface AddProjectModalProps {
    onClose: () => void
    onSubmit: () => void
    show: boolean
    project: any
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const AddProjectModal = (props: AddProjectModalProps) => {
    const { onSubmit, onClose, show, project } = props;
    const [isLoading, setLoading] = useState<boolean>(false)
    const [resources, setLoadedResources] = useState<Resource []>([]);
    const [selectedResources, setSelectedResources] = useState<Resource []>([]);
    const [options, setOptions] = useState<number[]>([]);

   /* const handleChangeText = (e: any) => {
        //cuando se selecciona una persona debera ser no onChangeText
        //el tema es que deberia de ser un field de tipo select, pero que no aparezcan las opciones
        //sino que a medida que se entran x caracteres ahi aparece
        const currentResources = Array.from(resources);
        const newValue = e.target.value;
        setLoadedResources(new Set([...currentResources, [newValue]]));
    };*/

    /*const addResourcesToProjectUsingAPI = async () =>  {
        //deberiamos elegir el proyecto recien creado y agregarle estos recursos
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
                console.log(myJson);
                setResources(JSON.parse(JSON.stringify(myJson)));

            })
            .catch(err => console.log(err))
            sleep(3000).then(res => setLoading(false));
    }*/
    const getResources = () => {//no va aca, lo puse para pruebas
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
            sleep(3000).then(res => setLoading(false));
    }
    useEffect(() => {
        getResources();
    }, []);

    const handleSubmit = async () => {
        onSubmit();
        /*const response = await addResourcesToProjectUsingAPI()
        if (response.status === 200) {
            onSubmit()
        }*/

    }


    return (
        <Modal onClose={onClose} open={show} >
            <div style= {{padding: '15vh'}} className='p-15 absolute bg-gray-200  text-slate-800 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120vh] h-[90vh] rounded-xl shadow-lg'>
                <Typography variant='h5'>Asigne recursos que desee al proyecto #{project.code}</Typography>
                <div style= {{padding: '5vh', marginLeft: '15vh'}} className='flex flex-col items-center'>
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
                                if (selectedResources.includes(newValue) === false) {
                                
                                setSelectedResources(prevSelection => [...prevSelection,newValue]);
                                }
                            }}
                        />
                       <div className='mr-8 w-80'></div>
                    </div>
                    <div style = {{alignSelf: 'left', width: 700, marginLeft:'5vh'}}>
                                    {(selectedResources).map( (resource) =>  <div key={resource.legajo} style={{display: 'flex', flexDirection: 'row', margin: 5, padding: 5, width: 180, height: 30, backgroundColor: "#E9EDEB", borderRadius: 5}}><AccountCircleIcon className= 'mr-1 h-5' style={{color: '#5C7067'}}/><Typography variant='caption' className='slate' >{resource.legajo} - {resource.Nombre} {resource.Apellido}</Typography></div>)}
                         </div>
                    <div style = {{alignSelf: 'right', marginLeft: '55vh', marginTop: '40vh', verticalAlign: 'bottom', position: 'absolute'}} className="text-center mr-8 mb-6 w-52 bg-teal-600 rounded-xl shadow-lg font-bold text-slate-800 hover:bg-gray-400 transition-all duration-300 cursor-pointer" onClick={handleSubmit}>
                        <div className="m-4" >Siguiente</div>
                    </div>

                </div>

            </div>
        </Modal >
    )
}

export default AddProjectModal
/*onChangeText={(text) => this.setState({description:text})} */