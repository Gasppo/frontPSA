import { Paper, Table, TableBody, TableContainer, TableFooter, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { proyectsAPI } from '../../../../dev/URIs';
import LoadingIndicator from '../../../../Loading/LoadingIndicator';
import { Project } from '../../../../types/projectTypes';
import { Resource } from '../../../../types/resourcesTypes';
import { Order, Ticket } from '../../../../types/ticketTypes';
import DefaultTableFooter from '../../../Table/DefaultTableFooter';
import Filter from '../../../Table/Filter';
import CreateTaskModal from '../Modals/CreateTaskModal';
import EnhancedTaskTableHead from './EnhancedTaskTableHead';
import TaskTableRow from './TaskTableRow';

interface Data {
    code: number;
    name: string;
    resource: number;
}

interface HeadCell {
    id: keyof Data;
    label: string;
    numeric?: boolean;
}


type Task = {
    _id: string;
    priority: number;
    name: string;
    description: string;
    effort: number;
    resource: number;
    projectCode?: number;
    code: number;
    __v: number;
    ticket: number;
}


type createTaskData = {
    name: string;
    description: string;
    priority: number;
    resource: number;
    ticket: number;
    effort: number;
}

interface TicketTasksProps {
    ticket?: Ticket
}

const tableHeaders = [
    { id: "code", label: "Codigo de identificacion", numeric: false },
    { id: "name", label: "Titulo", numeric: false },
    { id: "resource", label: "Recurso", numeric: false },
    { id: "projectCode", label: "Proyecto", numeric: false },
] as HeadCell[]

const headerTask = [
    { headerId: "code", taskId: "id" },
    { headerId: "name", taskId: "name" },
    { headerId: "resource", taskId: "resource" },
    { headerId: "projectCode", taskId: "projectCode" },
]


const TicketTasks = (props: TicketTasksProps) => {

    const { ticket } = props

    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Data>('name');
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(false)
    const [loadedTask, setLoadedTask] = useState<Task[]>([])
    const [show, setShow] = useState(false)
    const [resources, setResources] = useState<Resource[]>([])
    const [projects, setProjects] = useState<Project[]>([])
    const [filterKey, setFilterKey] = useState<string>('code')
    const [filterValue, setFilterValue] = useState('')

    const handleClose = () => {
        setShow(false)
    }

    const handleOpen = () => {
        setShow(true)
    }

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data,) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleTaskSubmit = async (taskData: createTaskData) => {
        setLoading(true)
        const response = await createTask(taskData)
        console.log(response)
        gatherTasks(ticket?.id || 0)
        setLoading(false)
        handleClose()
    }

    const handleFilterKeyChange = (key: string) => {
        setFilterKey(key)
    }

    const handleFilterValueChange = (value: string) => {
        setFilterValue(value)
    }

    const sortFunction = (a: any, b: any) => {
        const currKey = headerTask.find(el => el.headerId === orderBy)?.taskId || "name"
        if (order === 'asc') {
            if (a?.[currKey] < b?.[currKey]) return 1
            if (a?.[currKey] > b?.[currKey]) return -1
            return 0
        }
        if (a?.[currKey] < b?.[currKey]) return -1
        if (a?.[currKey] > b?.[currKey]) return 1
        return 0
    }

    const createTask = useCallback(async (taskData: createTaskData) => {
        const response = await fetch('https://modulo-proyectos-psa-2022.herokuapp.com/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData)
        })
        return response.json()
    }, [])


    const gatherProjects = useCallback(() => {
        fetch('https://modulo-proyectos-psa-2022.herokuapp.com/projects')
            .then(res => res.json())
            .then(json => setProjects(json))
            .catch(err => { console.log(err) })
    }, [])

    const gatherEmployees = useCallback(() => {
        fetch('https://modulo-recursos-psa.herokuapp.com/employees')
            .then(res => res.json())
            .then(json => setResources(json))
            .catch(err => { console.log(err) })
    }, [])


    const gatherTasks = useCallback((ticketId: number) => {
        setLoading(true)
        fetch(`${proyectsAPI}/tasks`)
            .then(response => response.json())
            .then(json => { return json?.filter((task: Task) => { return task.ticket === ticketId }) || [] })
            .then(tasks => { setLoading(false); setLoadedTask(tasks) })
            .catch(err => { setLoading(false); console.log(err) })
    }, [])

    useEffect(() => {
        setLoading(true)
        gatherProjects()
    }, [gatherProjects]);

    useEffect(() => {
        gatherEmployees()
    }, [gatherEmployees]);

    useEffect(() => {
        gatherTasks(ticket?.id || 0)
    }, [gatherTasks, ticket?.id]);


    const fullTasks = loadedTask.filter((row: any) => filterKey in row ? row[filterKey]?.toString()?.toLowerCase()?.includes(filterValue?.toLowerCase()) : false)

    return (
        <LoadingIndicator show={loading} className="w-[95%] mb-10">
            {loadedTask.length === 0 && (
                <div className='flex flex-col justify-center mb-20'>
                    <Typography variant="h6" className="text-center">
                        No hay tareas creadas sobre este ticket para mostrar
                    </Typography>
                    <Typography variant="h6" className="text-center text-teal-600 hover:text-teal-400 cursor-pointer" onClick={handleOpen} >
                        Crear una tarea para este ticket
                    </Typography>
                </div>
            )}
            <CreateTaskModal loading={loading} show={show} onClose={handleClose} onSubmit={handleTaskSubmit} ticketId={ticket?.id || 0} resources={resources} projects={projects} />
            {loadedTask?.length > 0 && (
                <div className="self-end mr-10 w-36 border-2 text-center rounded-xl shadow-lg text-slate-800 bg-white hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={handleOpen}>
                    <div className="m-3" >Agregar tarea</div>
                </div>
            )}
            <TableContainer component={Paper} className="mt-10">
                <Filter data={fullTasks || []} currentKey={filterKey} value={filterValue} onKeyChange={handleFilterKeyChange} onValueChange={handleFilterValueChange} filterOptions={tableHeaders} filterKey="id" filterText='label' />
                <Table>
                    <EnhancedTaskTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} headers={tableHeaders} />
                    <TableBody>
                        {fullTasks &&
                            fullTasks
                                .sort(sortFunction)
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(row => (
                                    <TaskTableRow row={row} resources={resources} proyectos={projects} />
                                ))}
                    </TableBody>
                    <TableFooter>
                        <DefaultTableFooter
                            disableRowsPerPage
                            colSpan={4}
                            count={fullTasks.length || 0}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            page={page}
                            rowsPerPage={rowsPerPage}
                        />
                    </TableFooter>
                </Table>
            </TableContainer>
        </LoadingIndicator>
    )
}

export default TicketTasks
