import { Paper, Table, TableBody, TableContainer, TableFooter } from '@mui/material'
import { useState } from 'react'
import { Order } from '../../../types/ticketTypes';
import DefaultTableFooter from '../../Table/DefaultTableFooter';
import EnhancedTaskTableHead from './EnhancedTaskTableHead'
import TaskTableRow from './TaskTableRow'

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
}

interface TicketTasksProps {
    loadedTasks: Task[]
}

const tableHeaders = [
    { id: "code", label: "Codigo de identificacion", numeric: false },
    { id: "name", label: "Titulo", numeric: false },
    { id: "resource", label: "Recurso", numeric: false },
] as HeadCell[]

const headerTask = [
    { headerId: "code", taskId: "id" },
    { headerId: "name", taskId: "name" },
    { headerId: "resource", taskId: "resource" },
]


const TicketTasks = (props: TicketTasksProps) => {

    const { loadedTasks } = props

    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Data>('name');
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [page, setPage] = useState(0)


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

    return (
        <TableContainer component={Paper} className="mt-10 w-[95%]"  >
            <Table>
                <EnhancedTaskTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} headers={tableHeaders} />
                <TableBody>
                    {loadedTasks &&
                        loadedTasks
                            .sort(sortFunction)
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(row => (
                                <TaskTableRow row={row} />
                            ))}
                </TableBody>
                <TableFooter>
                    <DefaultTableFooter
                        disableRowsPerPage
                        colSpan={3}
                        count={loadedTasks.length || 0}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        page={page}
                        rowsPerPage={rowsPerPage}
                    />
                </TableFooter>
            </Table>
        </TableContainer>
    )
}

export default TicketTasks
