import { Modal, TextField, Typography } from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';
import ValidatingInput from '../Inputs/ValidatingInput';
import ValidatingInputDates from '../Inputs/ValidatingInputDates';
import SelectBox from '../Inputs/SelectBox';
import Autocomplete from '@mui/material/Autocomplete';
import{Resource} from '../../types/resourceType';

interface AddTicketModalProps {
    onSubmit: (newProject: any) => void
    onClose: () => void
    show: boolean
}

const AddProjectModal = (props: AddTicketModalProps) => {
    const partsCurrentDate = (new Date().toLocaleDateString('es-AR')).split("/");
    var currentDate: string;
    if(partsCurrentDate[1].length==1){
        currentDate = partsCurrentDate[0] + "/0" + partsCurrentDate[1] + "/" + partsCurrentDate[2];
    }else{
        currentDate= partsCurrentDate[0] + "/" + partsCurrentDate[1] + "/" + partsCurrentDate[2];
    }
    

    const [type, setType] = useState('Desarrollo');
    const { onSubmit, onClose, show} = props
    const [clientType, setClientType] = useState('Externo');
    const [clients, setClients] = useState<any[]>([]);
    const [showProductModal, setProductModal] = useState(false);
    const [runValidations, setRunValidations] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [resources, setLoadedResources] = useState<Resource []>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [newProject, setNewProject] = useState({
        name: "",
        creationDate: currentDate,
        updatedDate: currentDate,
        startDate: "dd/mm/yyyy",
        endDate: "dd/mm/yyyy",
        type: type,
        state: "No Iniciado",
        clientType: 'Interno',
        client: 1,
        productId: 0,
        description: " ",
    })


    const clientTypes = [{ id: 'Externo', valor: 'Externo'}, {id:'Interno', valor: 'Interno'} ];
    const types = [{ id: 'Desarrollo', valor: 'Desarrollo', }, {id: 'Soporte', valor: 'Soporte'}]


    const handleChangeText = (e: any) => {
        setNewProject(({ ...newProject, [e.target.name]: e.target.value }))
    };

    const isADevelopProjectAndHasNOTAProductAssign = (newProject.type == "Desarrollo") && newProject.productId == 0;

    const handleClientTypeSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClientType(event.target.value);
        setNewProject(({ ...newProject, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async () => {
        if (invalidFields) {
            setRunValidations(true);
            return
        }
        if(isADevelopProjectAndHasNOTAProductAssign){
            setProductModal(true);
        }else{
            setIsLoading(true);
            const partsS = newProject.startDate.split('-');
            newProject.startDate = partsS[2] + "/" + partsS[1] + "/" + partsS[0];
            const partsE = newProject.endDate.split('-');
            newProject.endDate = partsE[2] + "/" + partsE[1] + "/" + partsE[0];
            generateProjectUsingAPI();
            setIsLoading(false);
            onSubmit(newProject);
        }
    
    };

    const handleSubmitProductModal = async () =>{
        setProductModal(false);
        setNewProject(({ ...newProject, productId: 110 }));
    }

    const onCloseProductoModal =async () => {
        setProductModal(false);
    }

    const handleTypeSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        setType(event.target.value);
        setNewProject(({ ...newProject, [event.target.name]: event.target.value }))
        console.log(newProject)
    };

    const onCloseCreateProjectModal = () =>{
        setClientType('Externo');
        setType('');
        setNewProject({ name: "",
                        creationDate: currentDate,
                        updatedDate: currentDate,
                        startDate: "dd/mm/yyyy",
                        endDate: "dd/mm/yyyy",
                        type: type,
                        state: "No Iniciado",
                        clientType: 'Externo',
                        client: 1,
                        productId: 0,
                        description: " ",});
        
        onClose();
    };

    const getClients = () => {
        fetch('https://modulo-soporte-productos-psa.herokuapp.com/client',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                return response.json()})
            .then((myJson) => {
                setClients(Object.values(JSON.parse(JSON.stringify(myJson))));
            })
            .catch(err => console.log(err))
    }

    const getResources = () => {
        fetch('https://modulo-recursos-psa.herokuapp.com/employees',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                return response.json()})
            .then((myJson) => {
                setLoadedResources(Object.values(JSON.parse(JSON.stringify(myJson))));
            })
            .catch(err => console.log(err))
            //sleep(3000).then(res => setLoading(false));
    };

    const getProducts = () => {
        //setLoading(true)
        fetch('https://modulo-soporte-productos-psa.herokuapp.com/product',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                return response.json()})
            .then((myJson) => {
                setProducts(Object.values(JSON.parse(JSON.stringify(myJson))));
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setRunValidations(false)
    }, []);

    useEffect(()=>{
        getClients();
        getProducts();
        getResources();
    }, []);


    const generateProjectUsingAPI = async () => {
        console.log(newProject);
        const response = await fetch('https://modulo-proyectos-psa-2022.herokuapp.com/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(newProject)
        })
        console.log(response);
        window.location.reload();
        return response
    }

    const invalidFields = (!newProject?.name || newProject.startDate== "dd/mm/yyyy" || newProject.endDate < newProject.startDate  || newProject.endDate == "dd/mm/yyyy" || !clientType || newProject.client==0 || !newProject?.type )

    const isEmpty = (value: any) => !value ? "Este campo no puede estar vacio" : ""
    const validations = runValidations ? [isEmpty] : []

    const isValidStartDate = (value: any) => (value == "dd/mm/yyyy") ? "Ingrese una fecha valida" : "";
    const validationStartDate = runValidations ? [isValidStartDate] : []
    
    const isValidEndDate = (value: any) => (value < newProject.startDate || value == "dd/mm/yyyy") ? "Ingrese una fecha valida" : "";
    const validationEndDate = runValidations ? [isValidEndDate] : []


    return (
        <Modal onClose={onClose} open={show} >
            <div className='absolute bg-gray-200  text-slate-800 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100vh] h-[75vh] rounded-xl shadow-lg'>


                <Modal onClose={onCloseProductoModal} open={showProductModal}>
                    <div className='absolute bg-gray-200  text-slate-800 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70vh] h-[55vh] rounded-xl shadow-lg'>
                        <Typography variant='h5' className={'m-10'}>Ingrese el poducto correspondiente al proyecto de desarrollo</Typography>
                        <div className='flex mb-6 flex-row ml-[6vh]'>  
                            <Autocomplete
                                disablePortal
                                className='mr-8 w-80'
                                id="combo-box-demo"
                                options={products[1]}
                                getOptionLabel={(option) => (option.name) ? option.name : ""}
                                sx={{ width: 300 }}
                                defaultValue={{"_id":"62adcf659de8aa00167c57d3","id":110,"name":"PSA Spring CRM","createdAt":"2022-06-18T13:13:09.505Z","updatedAt":"2022-06-21T21:58:52.486Z","__v":0}}
                                renderInput={(params) => <TextField {...params} name= 'productId' label="Producto" variant="outlined" color='primary' required/>}
                                onChange={(event: any, newValue: any) => {
                                    setNewProject(({ ...newProject, productId: newValue.id }))
                                }}
                            />
                        </div>
                        <div className='flex mb-6 flex-row ml-[6vh]'>  </div>
                        <div className="flex flex-row ml-[6vh]" >
                            <div className="text-center mr-8 mb-6 w-52 border-2 border-slate-400  rounded-xl shadow-lg font-bold text-slate-800 hover:border-teal-600 hover:border-1 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={onCloseProductoModal} >
                                <div className="m-4" > Cancelar</div>
                            </div>
                            <div className="w-10" ></div>
                            <div className="text-center mr-8 mb-6 w-52  border-2 border-slate-400  rounded-xl shadow-lg font-bold text-slate-800 hover:border-teal-600 hover:border-1 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={handleSubmitProductModal}>
                                <div className="m-4" > Siguiente</div>
                        </div>
                    </div>

                    </div>
                </Modal>

                <Typography variant='h5' style={{marginTop: 70}} className={'m-10'}>Ingrese los datos para el nuevo proyecto</Typography>
                <div className='ml-10 flex flex-col items-center'>

                <div className='flex mb-6  flex-row' style={{marginTop: 10}}>
                    <ValidatingInput required validations={validations} name="name" className='mr-8 w-80' label="Nombre del Proyecto" value={newProject?.name} onChange={handleChangeText} />
                    <SelectBox required validations={validations} name="type" className='mr-8 w-80' label="Seleccione el tipo de proyecto" onChange={handleTypeSelection} valueKey="id" value={type} options={types} text="valor" />
                </div>
                <div className='flex mb-6 flex-row'>
                    <SelectBox required validations={validations} name="clientType" className='mr-8 w-80' label="Seleccione el tipo de cliente" onChange={handleClientTypeSelection} valueKey="id" value={clientType} options={clientTypes} text="valor" />
                    {(clientType==="Interno") && 
                    <Autocomplete
                            disablePortal
                            className='mr-8 w-80'
                            id="combo-box-demo"
                            options={resources}
                            getOptionLabel={(option) => option.legajo.toString() ? option.legajo.toString() : ""}
                            sx={{ width: 300 }}
                            defaultValue = {{"legajo":1,"Nombre":"Mario","Apellido":"Mendoza"}}
                            renderInput={(params) => <TextField {...params} name= 'client' label="Seleccione un Cliente" required/>}
                            onChange={(event: any, newValue: any) => {
                                console.log(newValue)
                                setNewProject(({ ...newProject, client: newValue.legajo }))
                            }}
                        />}
                     {!(clientType==="Interno") && 
                    <Autocomplete
                            disablePortal
                            className='mr-8 w-80'
                            id="combo-box-demo"
                            options={clients[0]}
                            getOptionLabel={(option) => option.CUIT ? option.CUIT : ""}
                            sx={{ width: 300 }}
                            defaultValue={{"id":1,"CUIT":"20-12345678-2","razonSocial":"FIUBA"}}
                            renderInput={(params) => <TextField {...params} name= 'client' label="Seleccione un Cliente por su CUIT" required/>}
                            onChange={(event: any, newValue: any) => {
                                setNewProject(({ ...newProject, client: newValue.id, clientType: "Externo" }))
                            }}
                        />}
                </div>
                <div className='flex mb-6 flex-row' >
                    <ValidatingInputDates required validations={validationStartDate} name="startDate" className='mr-8 w-80' label="Fecha de inicio del Proyecto" value={newProject?.startDate} onChange={handleChangeText} />
                    <ValidatingInputDates required validations={validationEndDate} name="endDate" className='mr-8 w-80' label="Fecha de fin del Proyecto" value={newProject?.endDate} onChange={handleChangeText} />
                </div>
                <TextField id="outlined-basic" className='mb-6 w-[42rem] mr-8' name='description' label="Descripcion" multiline rows={3} InputLabelProps={{ shrink: true }} variant="outlined" onChange={handleChangeText} />
                <div className="flex flex-row" >
                    <div className="text-center mr-8 mb-6 w-52 border-2 border-slate-400  rounded-xl shadow-lg font-bold text-slate-800 hover:border-teal-600 hover:border-1 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={onCloseCreateProjectModal} >
                        <div className="m-4" > Cancelar</div>
                    </div>
                    <div className="w-56" ></div>
                    <div className="text-center mr-8 mb-6 w-52  border-2 border-slate-400  rounded-xl shadow-lg font-bold text-slate-800 hover:border-teal-600 hover:border-1 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={handleSubmit}>
                        <div className="m-4" > Crear Proyecto </div>
                    </div>
                </div>
            </div>
        </div>
    </Modal>
    )
}

export default AddProjectModal
