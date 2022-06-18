import { Modal, TextField, Typography, MenuItem, InputAdornment } from '@mui/material';
import { useEffect, useState } from 'react'
import{Client} from '../../components/types/clientTypes'
import AccountCircle from '@mui/icons-material/AccountCircle';

interface AddProjectModalProps {
    onClose: () => void
    onSubmit: () => void
    show: boolean
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const AddProjectModal = (props: AddProjectModalProps) => {

    const partsCurrentDate = (new Date().toLocaleDateString('es-AR')).split("/");
    var currentDate: string;
    if(partsCurrentDate[1].length==1){
        currentDate = partsCurrentDate[0] + "/0" + partsCurrentDate[1] + "/" + partsCurrentDate[2];
    }else{
        currentDate= partsCurrentDate[0] + "/" + partsCurrentDate[1] + "/" + partsCurrentDate[2];
    }
    const [type, setType] = useState('Desarrollo');
    const [showProductModal, setProductModal] = useState(false);
    const { onSubmit, onClose, show } = props;
    //const regexddmmyyyy = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
    const [isFormValid, setFormValidation] = useState(false);
    const [isNameValid, setNameValidation] = useState(true);
    const [isStartDateValid, setStartDateValidation] = useState(true);
    const [isEndDateValid, setEndDateValidation] = useState(true);
    const [isClientValid, setClientValidation] = useState(true);
    const [isTypeValid, setTypeValidation] = useState(true);
    const [isLoading, setLoading] = useState<boolean>(false)
    const [loadedClients, setLoadedClients] = useState<Client[]>([])
    const [newProject, setNewProject] = useState({
        name: "",
       // id: 0, //realizar un generador de id
        creationDate: currentDate,
        updatedDate: currentDate,
        startDate: "dd/mm/yyyy",
        endDate: "dd/mm/yyyy",
        type: type,
        state: "No Iniciado",
        client: 0,
        productId: 0,
        description: " ",
    })

    const types = [{ value: 'Desarrollo', label: 'Desarrollo', }, {value: 'Soporte', label: 'Soporte'} ];

    const handleChangeText = (e: any) => {
        setNewProject(({ ...newProject, [e.target.name]: e.target.value }))
    };

    
    const getClientsFromExternalAPI = () => {
        //setLoading(true)
        fetch('https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                return response.json()})
            .then((myJson) => {
                console.log(myJson);
                setLoadedClients(JSON.parse(JSON.stringify(myJson)));

            })
            .catch(err => console.log(err))
            sleep(3000).then(res => setLoading(false));
    }

    useEffect(() => {
        //getClientsFromExternalAPI();
    }, []);

    const generateProjectUsingAPI = async () => {
        console.log(newProject);
        const response = await fetch('http://localhost:2000/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(newProject)
        })
        return response
    }

    const handleSubmitProductModal = async () =>{
        setProductModal(false);
    }

    const onCloseProductoModal =async () => {
        setProductModal(false);
    }

    const validateProjectName = () =>{
        if (newProject.name != "" && newProject.name.length<=20)
            setNameValidation(true);
        else
            setNameValidation(false);
    }

    const validateProjectType = () =>{
        if (newProject.type != "")
            setTypeValidation(true);
        else 
            setTypeValidation(false);
    }

    const validateProjectClient = () =>{
        if (newProject.client != 0)
            setClientValidation(true);
        else
            setClientValidation(false);
    }

    const validateProjectStartDate = () =>{
        //if(regexddmmyyyy.test(newProject.startDate)){
        if(newProject.startDate!="dd/mm/yyyy" && newProject.startDate >= currentDate){
            setStartDateValidation(true);
        }
        else
            setStartDateValidation(false)
    }

    const validateProjectEndDate = () =>{
        //if(regexddmmyyyy.test(newProject.endDate)){
        if(newProject.endDate!="dd/mm/yyyy" && newProject.endDate >= currentDate && newProject.endDate > newProject.startDate){
            setEndDateValidation(true)
        }
        else
            setEndDateValidation(false)
    }
  
    const isADevelopProjectAndHasNOTAProductAssign = (newProject.type == "Desarrollo") && newProject.productId == 0;
    
    const validateProjectValues = () =>{
        validateProjectClient();
        validateProjectStartDate();
        validateProjectEndDate();
        validateProjectName();
        validateProjectType();

        if (isNameValid && isTypeValid && isClientValid && isEndDateValid && isStartDateValid){
            setFormValidation(true);
            console.log("entro");
        }
    }

    const handleSubmit = async () => {
        //Falta hacer la validacion
       if(isADevelopProjectAndHasNOTAProductAssign){
            setProductModal(true);
        }else{
            const partsS = newProject.startDate.split('-');
            newProject.startDate = partsS[2] + "/" + partsS[1] + "/" + partsS[0];
            const partsE = newProject.endDate.split('-');
            newProject.endDate = partsE[2] + "/" + partsE[1] + "/" + partsE[0];
            generateProjectUsingAPI();
            onSubmit();
        }
    
    };

    const handleTypeSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        setType(event.target.value);
        setNewProject(({ ...newProject, [event.target.name]: event.target.value }))
    };

    const onCloseCreateProjectModal = () =>{
        setClientValidation(true);
        setFormValidation(false);
        setNameValidation(true);
        setTypeValidation(true);
        setEndDateValidation(true);
        setStartDateValidation(true);
        onClose();
    };

    return (
        <Modal onClose={onClose} open={show} >
            <div className='absolute bg-gray-200  text-slate-800 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120vh] h-[85vh] rounded-xl shadow-lg'>
                
                <Modal onClose={onCloseProductoModal} open={showProductModal}>
                    <div className='absolute bg-gray-200  text-slate-800 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70vh] h-[55vh] rounded-xl shadow-lg'>
                        <Typography variant='h5' className={'m-10'}>Ingrese el poducto correspondiente al proyecto de desarrollo</Typography>
                        <div className='flex mb-6 flex-row ml-[6vh]'>  
                            <TextField required id="outlined-basic" name="productId" className='mr-8 w-80' label="Seleccione el producto asociado al proyecto" InputLabelProps={{ shrink: true}} variant="outlined" onChange={handleChangeText} /> 
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

                <Typography variant='h5' className={'m-10'}>Ingrese los datos para el nuevo proyecto</Typography>
                <div className='ml-10 flex flex-col items-center'>
                    <div className='flex mb-6 flex-row'>
                        <TextField required id="outlined-basic" name="name" className='mr-8 w-80' style={{backgroundColor: isNameValid ? 'transparent' : '#F3909C'}} label="Nombre del Proyecto" InputLabelProps={{ shrink: true}} variant="outlined" onChange={handleChangeText} />
                        <div className='mr-8 w-80'></div>
                    </div>
                    <div className='flex mb-6 flex-row'>
                        <TextField required select value={type} id="outlined-basic" name="type" className='mr-8 w-80' style={{backgroundColor: isTypeValid ? 'transparent' : '#F3909C'}} label="Seleccione el tipo de proyecto" variant="outlined" onChange={handleTypeSelection}>
                            {types.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField required name="client" className='mr-8 w-80' style={{backgroundColor: isClientValid ? 'transparent' : '#F3909C'}}  label="Identifique el cliente por nombre o por CUIT" InputLabelProps={{ shrink: true}} variant="outlined" onChange={handleChangeText} 
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle/>
                                </InputAdornment>),}}
                        />
                        
                    </div>
                    <div className='flex mb-6 flex-row'>
                        <TextField required id="outlined-basic" type="date" name="startDate" className='mr-8 w-80' style={{backgroundColor: isStartDateValid ? 'transparent' : '#F3909C'}} label="Fecha de inicio del Proyecto" InputLabelProps={{ shrink: true}} variant="outlined" onChange={handleChangeText} />
                        <TextField required id="outlined-basic" type="date" name="endDate" className='mr-8 w-80' style={{backgroundColor: isEndDateValid ? 'transparent' : '#F3909C'}} label="Fecha de fin del Proyecto" InputLabelProps={{ shrink: true}} variant="outlined" onChange={handleChangeText} />
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
        </Modal >
    )
}

export default AddProjectModal

