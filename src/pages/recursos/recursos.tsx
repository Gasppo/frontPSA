import { Link, Outlet } from 'react-router-dom'
import LinkCard from '../../components/UI/Card/LinkCard'
import PageTitle from '../../components/UI/Dashboard/PageTitle'
import LoadingIndicator from '../../components/Loading/LoadingIndicator'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
//import AddHourModal from '../../components/UI/Horas/AddHourModal'
import { Hours } from '../../components/types/resourcesTypes'
import { useCallback, useEffect, useState } from 'react'
import HoursTableRow from '../../components/UI/Horas/HoursTableRow'
interface RecursosProps {

}


const Recursos = (props: RecursosProps) => {

    const [isLoading, setLoading] = useState<boolean>(false)
    const [horas, setHoras] = useState<Hours[]>([])

    const fetchHours = () => {
        let body = JSON.stringify({
            startDate:'2022-06-14',
            finalDate: '2022-06-21',
            hourAssignee: 2})


        fetch('https://modulo-recursos-psa.herokuapp.com/hours/filterByDate',{
            method:'POST',
            body:body,
            headers: {"Content-Type":"application/json"},
        })
        .then(res => res.json())
        .then(res => {

            //let horasId = res.filter((element:Hours) => {return element.hourAssignee==4})
            let horasAgrupadasPorTask:{[id: string]:Hours[]} = {}
            res.forEach((item:Hours) => {
               if(!Object.keys(horasAgrupadasPorTask).includes(item.task.code.toString())){
                    horasAgrupadasPorTask[item.task.code]=[item] 
                }else{
                    horasAgrupadasPorTask[item.task.code].push(item)
                }
                
            });

            let horas: Hours[]= [] 

            Object.keys(horasAgrupadasPorTask).forEach((key:string) =>{
                let horaInicial:Hours = {
                    _id: horasAgrupadasPorTask[key][0]._id,
                    hourAssignee:horasAgrupadasPorTask[key][0].hourAssignee,
                    created: horasAgrupadasPorTask[key][0].created,
                    _v: horasAgrupadasPorTask[key][0]._v,
                    task: horasAgrupadasPorTask[key][0].task,
                    startingDate: horasAgrupadasPorTask[key][0].startingDate,
                    duration: 0,
                }

                horasAgrupadasPorTask[key].forEach((item:Hours)=>{
                    horaInicial.duration += item.duration
                })

                horas.push(horaInicial)

            })

            console.log(horas);
            setHoras(horas);


        })
        .catch(err => {
            console.log(JSON.stringify(err))
        })
        

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
                    <Link to={'/recursos/horasSemanales/carga'}>
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
                            {horas.map((row:Hours)=><HoursTableRow row={row} key={row._id}/>)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </LoadingIndicator>
        </>
    )
}

export default Recursos
