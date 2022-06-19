import { Link, Outlet } from 'react-router-dom'
import LinkCard from '../../components/UI/Card/LinkCard'
import PageTitle from '../../components/UI/Dashboard/PageTitle'
import LoadingIndicator from '../../components/Loading/LoadingIndicator'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import AddHourModal from '../../components/UI/Horas/AddHourModal'
import { Hours } from '../../components/types/resourcesTypes'
import { useCallback, useEffect, useState } from 'react'
interface RecursosProps {

}


const Recursos = (props: RecursosProps) => {

    const [isLoading, setLoading] = useState<boolean>(false)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [horas, setHoras] = useState([])

    const fetchHours = () => {
        fetch('https://modulo-recursos-psa.herokuapp.com/hours')
        .then(res => res.json())
        .then(res => {
            let horasId = res.filter((element:Hours) => {return element.hourAssignee==4})
            setHoras(horasId)
        })
        .catch(err => {
            console.log(JSON.stringify(err))
        })
        

    }

    const handleAddOpen = () => {
        setShowAddModal(true)
    }


    const handleClose = () => {
        setShowAddModal(false)
        setShowEditModal(false)
    }

    const handleSubmit = () => {
        setShowAddModal(false)
        setShowEditModal(false)
    }

    const sendToAddHoras = () =>{
        
    }

    useEffect(() => {
        fetchHours()
    }, []);



    return (
        <>
            <PageTitle label='Modulo de Recursos Humanos'>
            <div className="flex flex-row" >
                <Link to={'/'} >
                    <Button>Volver al inicio</Button>
                </Link>
                </div>
            </PageTitle>
            <Typography variant='h5' className={'mb-10'}>Recursos</Typography>
            <LoadingIndicator show={isLoading} className={`flex flex-col items-start  transition-all duration-200`} >

                <div className="self-end mr-10 border-2 text-center  rounded-xl shadow-lg text-slate-800 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer">
                    <Link to={'addHoras'}>
                    <div className="m-4"> Cargar Horas</div>
                    </Link>
                </div>
                    
                

                <TableContainer component={Paper} className="mt-10"  >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Codigo de Proyecto</TableCell>
                                <TableCell align="left">Proyecto</TableCell>
                                <TableCell align="left">Codigo de Tarea</TableCell>
                                <TableCell align="left">Tarea</TableCell>
                                <TableCell align="left">Descripcion</TableCell>
                                <TableCell align="left">Cantidad de Horas</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {

                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </LoadingIndicator>
        </>
    )
}

export default Recursos
