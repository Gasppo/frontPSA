import { Link, Outlet } from 'react-router-dom'
import LinkCard from '../../components/UI/Card/LinkCard'
import PageTitle from '../../components/UI/Dashboard/PageTitle'
import LoadingIndicator from '../../components/Loading/LoadingIndicator'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import AddHourModal from '../../components/UI/Horas/AddHourModal'
import { useCallback, useEffect, useState } from 'react'
interface RecursosProps {

}


const Recursos = (props: RecursosProps) => {

    const [isLoading, setLoading] = useState<boolean>(false)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

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

   

    return (
        <>
            <PageTitle label='Modulo de Recursos Humanos'>
            <div className="flex flex-row" >
                    <Link to={'/'}>
                        <Button>Inicio</Button>
                    </Link>
                    <Button disabled>{'>'}</Button>
                </div>
            </PageTitle>
            <Typography variant='h5' className={'mb-10'}>Recursos</Typography>
            <LoadingIndicator show={isLoading} className={`flex flex-col items-start  transition-all duration-200`} >

                <div className="self-end mr-10 border-2 text-center  rounded-xl shadow-lg text-slate-800 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={handleAddOpen}>
                    <div className="m-4" > Cargar Horas</div>
                </div>
                    
                <AddHourModal onSubmit={handleSubmit} onClose={handleClose} show={showAddModal} />

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
                            <td>128219</td>
                            <td>Implementacion de SAP</td>
                            <td>41201</td>
                            <td>Training</td>
                            <td>Entrenamiento sobre SAP</td>
                            <td>5</td> 
                        </TableBody>
                    </Table>
                </TableContainer>
            </LoadingIndicator>
        </>
    )
}

export default Recursos
