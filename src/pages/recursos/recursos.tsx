import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import LoadingIndicator from '../../components/Loading/LoadingIndicator'
import PageTitle from '../../components/UI/Dashboard/PageTitle'
//import AddHourModal from '../../components/UI/Horas/AddHourModal'
import { useEffect, useState } from 'react'
import { Hours, Proyect } from '../../components/types/resourcesTypes'
import HoursTableRow from '../../components/UI/Horas/HoursTableRow'
interface RecursosProps {

}


const Recursos = (props: RecursosProps) => {

    const [isLoading, setLoading] = useState<boolean>(true)
    const [proyects, setProyects] = useState<Proyect[]>([])
    const [horas, setHoras] = useState<Hours[]>([])
    const [rowsPerPage, setRowsPerPage] = useState(9)
    const [page, setPage] = useState(0)
    const [initialDay, setInitialDay] = useState("")
    const [endDay, setEndDay] = useState("")
    const [totalHours, setTotalHours] = useState(0)

    const fetchProyects = () => {
            fetch('https://modulo-proyectos-psa-2022.herokuapp.com/projects/')
            .then(res => res.json())
            .then(res => {
                setProyects(res)
                console.log(proyects)
            })
    }

    const getProyectID = (id:number) => {
        return proyects.find((item) => item.code === id)
    }

    const fetchProjects = () => {
        // monday =date of this weeks monday at 23:59:59
        const monday = new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 1))
        const friday = new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 5))
        monday.setHours(0, 0, 0)
        friday.setHours(23, 59, 59)

        // slice monday and friday to keep only the date
        const mondayDate = monday.toISOString().slice(0, 10)
        const fridayDate = friday.toISOString().slice(0, 10)

        setInitialDay(mondayDate)
        setEndDay(fridayDate)

        let body = JSON.stringify({
            startDate:mondayDate,
            finalDate: fridayDate,
            hourAssignee: 3})


        fetch('https://modulo-recursos-psa.herokuapp.com/hours/filterByDate',{
            method:'POST',
            body:body,
            headers: {"Content-Type":"application/json"},
        })
        .then(res => res.json())
        .then(res => {

            //let horasId = res.filter((element:Hours) => {return element.hourAssignee==4})
            let horasAgrupadasPorTask:{[id: string]:any[]} = {}
            
            res.forEach((item:any) => {
                let hora = {
                    ...item,
                    proyectName: typeof getProyectID(item.code)?.name === "undefined" ? "null" : getProyectID(item.code)?.name
                }
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


            setHoras(horas);
            setLoading(false)


        })
        .catch(err => {
            console.log("Error")
        })
        

    }
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const fetchTotalTimeWorked = () => {
        fetch("https://modulo-recursos-psa.herokuapp.com/reports/person/3")
        .then(res => res.json())
        .then(res => {
            setTotalHours(typeof res.total_hours_worked == "undefined" ? 0 :res.total_hours_worked )
            console.log(res)
        })
    }

    useEffect(() => {
        fetchProyects()
        fetchProjects()
        fetchTotalTimeWorked()
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
            <LoadingIndicator show={isLoading} className={`flex flex-col items-start  transition-all duration-200`} >

                <div className="self-end mr-10 border-2 text-center  rounded-xl shadow-lg text-slate-800 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer">
                    <Link to={'/recursos/horasSemanales/carga'}>
                    <div className="m-4"> Cargar Horas</div>
                    </Link>
                </div>
                    
                <Typography variant='h5' className={'mb-0'}>{"Horas de la semana " + initialDay + " - " + endDay}</Typography>

                <TableContainer component={Paper} className="mt-5"  >
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
                            {horas &&
                                    horas
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row:Hours)=><HoursTableRow row={row} key={row._id}/>)}
                        </TableBody>
                        <TableFooter>
                          <TableRow>
                              <TablePagination
                                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                  colSpan={8}
                                  count={horas.length}
                                  rowsPerPage={rowsPerPage}
                                  page={page}
                                  SelectProps={{
                                      inputProps: {
                                          'aria-label': 'rows per page',
                                      },
                                      native: true,
                                  }}
                                  onPageChange={handleChangePage}
                                  onRowsPerPageChange={handleChangeRowsPerPage}
                              />
                          </TableRow>
                      </TableFooter>
                    </Table>
                </TableContainer>
                <div>{"TOTAL: " + totalHours}</div>
            </LoadingIndicator>
        </>
    )
}

export default Recursos
