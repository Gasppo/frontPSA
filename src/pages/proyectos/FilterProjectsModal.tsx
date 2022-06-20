import { Modal, TextField, Typography, MenuItem, InputAdornment } from '@mui/material';
import { border } from '@mui/system';
import Triangle from './Triangle';
import { useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import{Project} from '../../components/types/projectTypes';

interface FilterProjectsModalProps {
    onClose: () => void,
    onSubmit: () => void,
    refreshProjects: (filterProjects: Project[])=>void,
    currentProjects: Project[],
    show: boolean
}

interface ProyectProps {
}

const FilterProjectsModal = (props: FilterProjectsModalProps) => {
    const { onSubmit, onClose, refreshProjects, currentProjects, show } = props;
    const [type, setType] = useState('');
    const [filterTitle, setTitle] = useState('');
    const [filterClient, setClient] = useState('');
    const [filterProduct, setProduct] = useState('');
    const [state, setState] = useState('');
    const [filters, setFilters] = useState({
        title: "",
        producto: 0,
        state: "",
        type: "",
        client:0,
    });

    const types = [{ value: 'Desarrollo', label: 'Desarrollo', }, {value: 'Soporte', label: 'Soporte'} ];
    const states = [{value: 'No Iniciado', label: 'No Iniciado'}, { value: 'Iniciado', label: 'Iniciado', }, {value: 'Finalizado', label: 'Finalizado'},{value: 'Cancelado', label: 'Cancelado'} ];

    const limpiarFiltros = () =>{
        props.refreshProjects(props.currentProjects);
        setType('');
        setClient('');
        setState('');
        setTitle('');
        setProduct('');
        onClose();
    };

    const handleTypeSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        setType(event.target.value);
        setFilters(({ ...filters, [event.target.name]: event.target.value }));
    };

    const handleStateSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(event.target.value);
        setFilters(({ ...filters, [event.target.name]: event.target.value }))
    };

    const handleClientChange = (e: any) => {
        setClient(e.target.value );
        setFilters(({ ...filters, [e.target.name]: e.target.value }))
    };

    const handleProductChange = (e: any) => {
        setProduct(e.target.value );
        setFilters(({ ...filters, [e.target.name]: e.target.value }))
    };

    const handleTitleChange = (e: any) => {
        setTitle(e.target.value);
        setFilters(({ ...filters, [e.target.name]: e.target.value }))
    };

    const generateFilter = async () => {
        var filtered = props.currentProjects.filter(project => {
            return (project.name.toUpperCase().includes(filters.title.toUpperCase()));
        });
        if(filters.type!='')
            filtered = props.currentProjects.filter(project => { return (project.type == filters.type);}); 
        if(filters.state!='')
            filtered = props.currentProjects.filter(project => { return ( project.state == filters.state);}); 
        if(filters.client!=0)
            filtered = props.currentProjects.filter(project => { return ((project.client.toString()).includes(filters.client.toString(), 0))}); 
        if(filters.producto!=0)
            filtered = props.currentProjects.filter(project => { return ((project.productId.toString()).includes(filters.producto.toString(), 0));});  
        console.log(filters);
        console.log(filtered);
        props.refreshProjects(filtered);

            
    };

    const handleSubmit = async () => {
        generateFilter();
        onSubmit();
    };

    return (
        <Modal onClose={onClose} open={show} >
            <div style= {{padding: '4vh'}} className='p-15 absolute bg-white  text-slate-800 top-1/3 left-[115vh] transform -translate-x-1/2 -translate-y-1/2 w-[90vh] h-[60vh] rounded-xl'>
                <Triangle/>
                <Typography variant='h5'>Generar filtro para los proyectos</Typography>
                <div style= {{padding: '5vh', marginLeft: '5vh'}} className='flex flex-col items-center'>
                    <div className='flex mb-4 flex-row'>
                        <TextField  value={filterTitle} id="outlined-basic" name="title" className='mr-8 w-60' label="Nombre del Proyecto" InputLabelProps={{ shrink: true}} variant="outlined" onChange={handleTitleChange} />
                        <TextField   select value={type} id="outlined-basic" name="type" className='mr-8 w-60' label="Tipo de proyecto" variant="outlined" onChange={handleTypeSelection}>
                            {types.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className='flex mb-4 flex-row'>
                        <TextField  value={filterClient} id="outlined-basic" name="client" className='mr-8 w-60' label="Cliente" InputLabelProps={{ shrink: true}} variant="outlined" onChange={handleClientChange} 
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle/>
                                </InputAdornment>),}}
                        />
                        <TextField   select value={state} id="outlined-basic" name="state" className='mr-8 w-60' label="Estado" variant="outlined" onChange={handleStateSelection}>
                            {states.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className='flex mb-4 flex-row'>
                        <TextField   value={filterProduct} id="outlined-basic" name="poduct" className='mr-8 w-60' label="Producto" InputLabelProps={{ shrink: true}} variant="outlined" onChange={handleProductChange} /> 
                        <div className='mr-8 w-60'></div>
                    </div>
                    <div className="flex flex-row ml-[25vh]" >
                        <div className="text-center mr-8 mb-6 border-2 border-slate-400  rounded-xl shadow-lg font-bold text-slate-800 hover:border-teal-600 hover:border-1 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={limpiarFiltros} >
                            <div className="m-4" >Restaurar</div>
                        </div>
                        <div className="text-center mr-8 mb-6 w-50 border-2 border-slate-400  rounded-xl shadow-lg font-bold text-slate-800 hover:border-teal-600 hover:border-1 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={onClose} >
                            <div className="m-4" > Cancelar</div>
                        </div>
                        <div className="text-center mr-8 mb-6 w-52 bg-teal-600 rounded-xl shadow-lg font-bold text-slate-800 hover:bg-gray-400 transition-all duration-300 cursor-pointer" onClick={handleSubmit}>
                            <div className="m-4">Filtrar</div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal >
    )
}

export default FilterProjectsModal
