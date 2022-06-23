import { DateComponent } from '@fullcalendar/react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { MultiSelect } from "react-multi-select-component";
import { Link } from 'react-router-dom';
import LoadingIndicator from '../../components/Loading/LoadingIndicator';
import { Proyect, SelectProyect, Task } from '../../components/types/resourcesTypes';
import PageTitle from '../../components/UI/Dashboard/PageTitle';
import TasksTableRow from '../../components/UI/Horas/TasksTableRow';
import PageLinker from '../../components/UI/Inputs/PageLinker';
//import DatePicker from "react-datepicker"


interface AddHorasProps {

}




const AddHoras = (props: AddHorasProps) => {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [selected, setSelected] = useState<SelectProyect[]>([]);
    const [proyectos, setProyectos] = useState<SelectProyect[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const [date,setDate]= useState<any>(new Date().toISOString().split('T')[0]);
    const [rowsPerPage, setRowsPerPage] = useState(9);
    const [page, setPage] = useState(0);
    const [allTasks, setAllTasks] = useState<any[]>([]);

    const fetchProyects = () => {
        fetch('https://modulo-proyectos-psa-2022.herokuapp.com/projects')
            .then(res => res.json())
            .then(res => {
                let projs: SelectProyect[] = [];
                res.forEach((item: any) => {
                    let proj = {
                        label: item.name,
                        value: item.code
                    }
                    if (true)
                        projs.push(proj)
                })
                setProyectos(projs)
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })
    }

/*    const fetchTasks = () => {
        fetch('https://modulo-proyectos-psa-2022.herokuapp.com/projects')
            .then(res => res.json())
            .then(res => {
                setTasks([])
                let proyectsId: any[] = []
                selected.forEach(item => proyectsId.push(item.value))
                let selectedProyects = res.filter((item: Proyect) => proyectsId.includes(item.code))
                let tasks: Task[] = []
                selectedProyects.forEach((element: Proyect) => {
                    element.tasks.forEach((item: Task) => {
                        let proyectTask = {
                            ...item,
                            proyectName: element.name,
                            proyectCode: element.code,
                        }
                        tasks.push(proyectTask)
                    });
                    setTasks(tasks)
                });


            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })

    }*/

    const fetchAllTasks = () => {
        fetch('https://modulo-proyectos-psa-2022.herokuapp.com/tasks/')
        .then(res => res.json())
        .then(res => {
            setAllTasks(res)
        })
    }

    const fetchTasks = (selected:any) => {
        let tasksSelected:any[] = []
        selected.forEach((item:any) => {
            let selectedTasks = allTasks.filter((element)=> element.projectCode === item.value)
            selectedTasks.forEach((element)=>{
                let taskSelected = {
                    _id: element._id,
                    priority: element.priority,
                    name: element.name,
                    description: element.description,
                    effort:element.number,
                    resource:element.resource,
                    code:element.code,
                    _v: element._v,
                    proyectCode: element.projectCode,
                    proyectName: item.label,
                }
                tasksSelected.push(taskSelected)
            })
            
        })

        setTasks(tasksSelected)
    }

    const handleSelect = (item: any) => {
        setSelectedItems(prev => [...prev, item])
    }

    const handleRemoveItem = (itemId: number) => {
        setSelectedItems(prev => prev.filter(el => el.code !== itemId))
    }

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        fetchProyects();
        fetchAllTasks();
        console.log(selected)
        fetchTasks(selected);

    }, [selected]);

    useEffect(() => {

    }, [selected]);


    const links = [
        { label: "Inicio", href: "/" },
        { label: "Recursos", href: "/recursos/horasSemanales" },
    ]

    return (
        <>
            <PageTitle label='Carga de Horas'>
                <PageLinker links={links} />
            </PageTitle>
            <Typography variant='h5' className={'mb-10'}></Typography>
            <LoadingIndicator show={isLoading} className={`flex flex-col items-start  transition-all duration-200`} >
                <div className="flex justify-between w-full" >
                    <div  >
                        <TextField type='date' onChange={(value)=>{setDate(value.currentTarget.value)}} inputProps={{ max: new Date().toISOString().slice(0, 10) }} defaultValue={new Date().toISOString().split('T')[0]} ></TextField>
                    </div>
                    <div className="mr-10 border-2 text-center  rounded-xl shadow-lg text-slate-800 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer">
                        <Link to={'/recursos/horasSemanales/carga/seleccion'} state={{ items: selectedItems, date: date }} >
                            <div className="m-4">Siguiente</div>
                        </Link>
                    </div>
                </div>

                <div className='w-80 my-8'>
                    <MultiSelect options={proyectos} value={selected} onChange={setSelected} labelledBy="Seleccionar Proyectos" />
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
                                <TableCell align='left'>Seleccionar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                tasks &&
                                tasks
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row: Task) => <TasksTableRow row={row} key={row._id} onSelect={handleSelect} onRemove={handleRemoveItem} />)}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={8}
                                    count={tasks.length}
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
            </LoadingIndicator>
        </>

    )
}

export default AddHoras