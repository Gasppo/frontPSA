import { useEffect, useMemo, useState } from 'react'
import { Modal, TextField, Typography, MenuItem, InputAdornment } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Task} from '../../types/taskType'

interface VerTareaModalProps {
    onClose: () => void
    show: boolean
    currentTask: Task
}

const VerTareaModal = (props: VerTareaModalProps) => {
    const { onClose, show, currentTask } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [priorityValue, setPriorityValue] = useState('');
    const [stateTagColor, setStateTagColor] = useState('#F9A620');
    const [stateValue, setStateValue] = useState('Pendiente');

    const determinePrioriryValue = () => {
        if(props.currentTask.priority == 1 ){
            setPriorityValue(state => ('Baja'));
        }else if (props.currentTask.priority == 2){
            setPriorityValue(state => ('Media'));
        }else if (props.currentTask.priority == 3){
            setPriorityValue(state => ('Alta'));
        }else if (props.currentTask.priority == 4){
            setPriorityValue(state => ('Critica'));
        }
    }

    const determineStateTagColor = () => {
        if(props.currentTask.isCompleted == 0 ){
            setStateTagColor(state => ('#F9A620'));
            setStateValue(state => ('Pendiente'));
        }else if (props.currentTask.isCompleted == 1){
            setStateTagColor(state => ('#91AEC1'));
            setStateValue(state => ('En Progreso'));
        }else{
            setStateTagColor(state => ('#7BCC7E'));
            setStateValue(state => ('Completa'));
        }
    }

    useEffect(() => {
        determineStateTagColor();
    }, [stateTagColor]);

    useEffect(() => {
        determinePrioriryValue();
    }, []);



    return (
        <Modal onClose={onClose} open={show} >
        <div className='absolute bg-white  text-slate-800 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100vh] h-[55vh] rounded-xl shadow-lg'>
            <div style={{display: 'flex', flexDirection: 'row', margin: 25, marginTop:80, paddingBottom: 20, paddingLeft: 80, borderBottomColor:'#C5D0CB', borderBottomWidth: '1px'}}>  
                <div  onClick={onClose} style={{color: 'slate', fontSize: 24, fontWeight:'bold', marginTop: -60, marginRight: 30, marginLeft: -70}} className= 'hover:text-teal-600  transition-all duration-200  group  h-12 w-8'>x</div>
                <Typography variant='h5' className={'slate'}>{props.currentTask.name}</Typography>
                <Typography variant='body2' style={{marginLeft: "55vh", color: '#C5D0CB', marginTop: "1vh"}}>#{props.currentTask.code}</Typography>
            </div>
                    
            <div style={{display: 'flex', flexDirection: 'row', marginLeft: 80, marginTop: 50, marginRight:70}}> 
                <div style={{display: 'flex', flexDirection: 'column', marginTop: -35, width:'150vh'}}>
                <div style={{padding: 5, width: 120, height: 30, display: 'flex', flexDirection: 'row', backgroundColor: stateTagColor, borderRadius: 5}}><Typography variant='body2' style= {{color: '#F4F6F5', fontWeight: 'bold'}}>{stateValue.toUpperCase()}</Typography></div>
                    <div style={{alignSelf:'left', marginTop: 25}}>
                        <Typography variant='body2' className='w-[27vh]' style={{fontWeight: 'bold', color: '#5C7067'}}>Descripción: </Typography>
                        <div style= {{ width:'40vh', marginTop: 10, backgroundColor: "#E9EDEB", borderRadius: 15, padding: 10, paddingLeft: 30, paddingRight: 30, minHeight:110}}>
                            <Typography variant='body2' className={'slate'}>{props.currentTask.description}</Typography>
                        </div>
                    </div> 
                </div>
                <div style= {{display: 'flex', flexDirection: 'column', width: '40vh',marginLeft: 60}} >
                    <div className='hover:bg-gray-100' style={{padding: 15, display: 'flex', flexDirection: 'column', borderColor: "#B0BFB8", borderRadius: 15, borderWidth: '1px', marginRight: '5vh'}}>
                        <div style={{ borderBottomColor: "#B0BFB8", paddingBottom: 10, marginBottom: 10, display: 'flex', flexDirection: 'row',color: '#5C7067', borderBottomWidth: '1px'}}><Typography variant='body2' className='w-[30vh] ml-5' style={{fontWeight: 'bold'}}>Detalles </Typography></div>
                            
                        <div style={{marginBottom:10, display: 'flex', flexDirection: 'row', color: '#5C7067'}}><Typography variant='body2' className='w-[27vh]  ml-5'>Prioridad: </Typography><Typography variant='body2' className={'slate'}>{props.currentTask.priority}</Typography></div>
                        <div style={{marginBottom:10, display: 'flex', flexDirection: 'row', color: '#5C7067'}}><Typography variant='body2' className='w-[27vh]  ml-5'>Esfuerzo Estimado: </Typography><Typography variant='body2' className={'slate'}>{props.currentTask.effort}</Typography></div>
                        <div style={{marginBottom:10, display: 'flex', flexDirection: 'row',color: '#5C7067'}}>
                        <Typography variant='body2' className='w-[27vh]  ml-5'>Responsable: </Typography>
                            <div style={{display: 'flex', flexDirection: 'row', margin: 5, padding: 5, width: 120, height: 30, backgroundColor: "#E9EDEB", borderRadius: 5}}><AccountCircleIcon className= 'mr-1 h-5' style={{color: '#5C7067'}}/><Typography variant='caption' className='slate' >ID-{props.currentTask.resource}</Typography></div>    
                        </div>      
                    </div>
                </div>
            </div>
        </div>
        </Modal>
    )
}

export default VerTareaModal
