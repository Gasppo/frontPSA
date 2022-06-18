import { Modal, TextField, Typography, MenuItem, InputAdornment } from '@mui/material';
import { border } from '@mui/system';
import { useEffect, useState } from 'react'
import AccountCircle from '@mui/icons-material/AccountCircle';

interface AddProjectModalProps {
    onClose: () => void
    onSubmit: () => void
    show: boolean
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const AddProjectModal = (props: AddProjectModalProps) => {
    const { onSubmit, onClose, show } = props;
    const [isLoading, setLoading] = useState<boolean>(false)
    const [resources, setResources] = useState(new Set()); //uso sets para no tener repetidos

    const handleChangeText = (e: any) => {
        //cuando se selecciona una persona debera ser no onChangeText
        //el tema es que deberia de ser un field de tipo select, pero que no aparezcan las opciones
        //sino que a medida que se entran x caracteres ahi aparece
        const currentResources = Array.from(resources);
        const newValue = e.target.value;
        setResources(new Set([...currentResources, [newValue]]));
    };

    const addResourcesToProjectUsingAPI = async () =>  {
        //deberiamos elegir el proyecto recien creado y agregarle estos recursos
        //setLoading(true)
        fetch('https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/recursos-psa/1.0.0/m/api/recursos',{
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
    }
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
                console.log(myJson);
                //setLoadedResources(JSON.parse(JSON.stringify(myJson)));

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
                <Typography variant='h5'>Asigne recursos que desee a su proyecto</Typography>
                <div style= {{padding: '5vh', marginLeft: '15vh'}} className='flex flex-col items-center'>
                    <div className='flex mb-6 flex-row'>
                        <TextField id="outlined-basic" name="resources" className='mr-8 w-80' label="Busque un recurso por nombre o id" InputLabelProps={{ shrink: true}} variant="outlined" onChange={handleChangeText} />
                        <div className='mr-8 w-80'></div>
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
