import { Button, Paper, Table, TableBody, TableContainer, TableFooter, TablePagination, TableRow, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import PageTitle from '../../../components/UI/Dashboard/PageTitle'
import EnhancedTableHead from '../../../components/UI/Clients/EnhancedTableHead'
import LoadingIndicator from '../../../components/Loading/LoadingIndicator'
import { Client } from '../../../components/types/clientTypes'
import { productAndVersionsURI } from '../../../components/dev/URIs'
import ClientTableRow from '../../../components/UI/Clients/ClientTableRow'
import Filter from '../../../components/UI/Table/Filter'

type Order = 'asc' | 'desc';
interface Data {
    id: number;
    razonSocial: string;
    CUIT: string;
}

interface HeadCell {
    id: keyof Data;
    label: string;
    numeric?: boolean;
}

const tableHeaders = [
    { id: "id", label: "Codigo de identificacion", numeric: false },
    { id: "razonSocial", label: "Cliente", numeric: false },
    { id: "CUIT", label: "CUIT", numeric: false }
] as HeadCell[]

const headerClient = [
    { headerId: "id", clientId: "id" },
    { headerId: "razonSocial", clientId: "razonSocial" },
    { headerId: "CUIT", clientId: "CUIT" },
]

const Clients = () => {

    const [loadedClients, setLoadedClients] = useState<Client[]>([])
    const [isLoading, setLoading] = useState<boolean>(false)
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Data>('razonSocial');
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [page, setPage] = useState(0)
    const [filterKey, setFilterKey] = useState<string>('id')
    const [filterValue, setFilterValue] = useState('')


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


    const handleFilterKeyChange = (key: string) => {
        setFilterKey(key)
    }

    const handleFilterValueChange = (value: string) => {
        setFilterValue(value)
    }


    const gatherClients = useCallback(() => {
        setLoading(true)
        fetch(`${productAndVersionsURI}/client`)
            .then(res => res.json())
            .then(res => {
                setLoadedClients(res.clients)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }, [])

    const sortFunction = (a: any, b: any) => {
        const currKey = headerClient.find(el => el.headerId === orderBy)?.clientId || "title"
        if (order === 'asc') {
            if (a?.[currKey] < b?.[currKey]) return 1
            if (a?.[currKey] > b?.[currKey]) return -1
            return 0
        }
        if (a?.[currKey] < b?.[currKey]) return -1
        if (a?.[currKey] > b?.[currKey]) return 1
        return 0
    }

    useEffect(() => {
        gatherClients()
    }, [gatherClients]);

    const fullClients = loadedClients.filter((row: any) => filterKey in row ? row[filterKey]?.toString()?.toLowerCase()?.includes(filterValue?.toLowerCase()) : false)

    return (
        <>
            <PageTitle label='Portal de Clientes'>
                <div className="flex flex-row" >
                    <Link to={'/'}>
                        <Button>Inicio</Button>
                    </Link>
                    <Button disabled>{'>'}</Button>
                    <Link to={'/soporte'}>
                        <Button>Soporte</Button>
                    </Link>
                    <Button disabled>{'>'}</Button>
                    <Link to={'/soporte/productsAndVersions'}>
                        <Button>Productos y Versiones</Button>
                    </Link>
                </div>
            </PageTitle>
            <Typography variant='h5' className={'mb-10'}>Clientes</Typography>
            <LoadingIndicator show={isLoading} className={`flex flex-col items-start  transition-all duration-200`} >
                <TableContainer component={Paper} className="mt-10"  >
                    <Filter data={fullClients || []} currentKey={filterKey} value={filterValue} onKeyChange={handleFilterKeyChange} onValueChange={handleFilterValueChange} filterOptions={tableHeaders} filterKey="id" filterText='label' />
                    <Table>
                        <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} headers={tableHeaders} />
                        <TableBody>
                            {fullClients &&
                                fullClients
                                    .sort(sortFunction)
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(row => <ClientTableRow refresh={gatherClients} row={row} key={row.id} />)}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={8}
                                    count={fullClients.length}
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

export default Clients
