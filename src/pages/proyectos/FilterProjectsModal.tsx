import { Modal, TextField, Typography, MenuItem, InputAdornment } from '@mui/material';
import { border } from '@mui/system';
import Triangle from './Triangle';
import { useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';

interface FilterProjectsModalProps {
    onClose: () => void
    onSubmit: () => void
    show: boolean
}

interface ProyectProps {
}

const FilterProjectsModal = (props: FilterProjectsModalProps) => {
    const { onSubmit, onClose, show } = props;
    const [type, setType] = useState('');
    const [state, setState] = useState('');
    const [filters, setFilters] = useState({
        title: "",
        producto: "",
        state: "",
        type: "",
        client:"",
    });

    const types = [{ value: 'desarrollo', label: 'Desarrollo', }, {value: 'soporte', label: 'Soporte'} ];
    const states = [{ value: 'no iniciado', label: 'No Iniciado', }, {value: 'inicio', label: 'Inicio'}, {value: 'cancelado', label: 'Cancelado'}, {value: 'finalizado', label: 'Finalizado'} ];

    const handleChangeText = (e: any) => {
        setFilters(({ ...filters, [e.target.name]: e.target.value }))
    };

    const generateFilter = async () => {
        
    };

    const handleSubmit = async () => {
        generateFilter();
        onSubmit();
    };
    
    const handleTypeSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        setType(event.target.value);
    };

    const handleStateSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(event.target.value);
    };

    return (
        <Modal onClose={onClose} open={show} >
            <div style= {{padding: '4vh'}} className='p-15 absolute bg-white  text-slate-800 top-1/3 left-[115vh] transform -translate-x-1/2 -translate-y-1/2 w-[90vh] h-[60vh] rounded-xl'>
                <Triangle/>
                <Typography variant='h5'>Generar filtro para los proyectos</Typography>
                <div style= {{padding: '5vh', marginLeft: '5vh'}} className='flex flex-col items-center'>
                    <div className='flex mb-4 flex-row'>
                        <TextField   id="outlined-basic" name="title" className='mr-8 w-60' label="Nombre del Proyecto" InputLabelProps={{ shrink: true}} variant="outlined" onChange={handleChangeText} />
                        <TextField   select value={type} id="outlined-basic" name="type" className='mr-8 w-60' label="Tipo de proyecto" variant="outlined" onChange={handleTypeSelection}>
                            {types.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className='flex mb-4 flex-row'>
                        <TextField   id="outlined-basic" name="client" className='mr-8 w-60' label="Cliente" InputLabelProps={{ shrink: true}} variant="outlined" onChange={handleChangeText} 
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
                        <TextField   id="outlined-basic" name="poduct" className='mr-8 w-60' label="Producto" InputLabelProps={{ shrink: true}} variant="outlined" onChange={handleChangeText} /> 
                        <div className='mr-8 w-60'></div>
                    </div>
                    <div className="flex flex-row ml-[25vh]" >
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
