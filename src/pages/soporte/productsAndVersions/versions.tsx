import { Button, Paper, Table, TableBody, TableContainer, TableFooter, TablePagination, TableRow } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { productAndVersionsURI } from '../../../components/dev/URIs'
import LoadingIndicator from '../../../components/Loading/LoadingIndicator'
import { Version } from '../../../components/types/productTypes'
import PageTitle from '../../../components/UI/Dashboard/PageTitle'
import AddVersionModal from '../../../components/UI/Versions/AddVersionModal'
import EditVersionModal from '../../../components/UI/Versions/EditVersionModal'
import EnhancedTableHead from '../../../components/UI/Versions/EnhacedTableHeader'
import VersionTableRow from '../../../components/UI/Versions/VersionTableRow'
import Filter from '../../../components/UI/Table/Filter'

interface LocationState {
      productId: number,
      productName: string
}
type Order = 'asc' | 'desc';
interface Data {
    id: number,
    name: string,
    state: string
}

interface HeadCell {
    id: keyof Data,
    label: string,
    numeric?: boolean
}

const tableHeaders = [
    { id: "id", label: "Codigo de identificacion", numeric: false },
    { id: "name", label: "Nombre", numeric: false },
    { id: "state", label: "Estado", numeric: false }
] as HeadCell[]

const headerVersion = [
    { headerId: "id", versionId: "id" },
    { headerId: "name", versionId: "name" },
    { headerId: "state", versionId: "state" }
]

const Versions = () => {
    const location = useLocation();
    const data = location.state as LocationState
    const productName = data.productName
    const productId = data.productId

    const [loadedVersions, setLoadedVersions] = useState<Version[]>([])
    const [isLoading, setLoading] = useState<boolean>(false)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [currentId, setCurrentID] = useState<number | null>(null)
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Data>('name');
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [page, setPage] = useState(0)
    const [filterKey, setFilterKey] = useState<string>('id')
    const [filterValue, setFilterValue] = useState('')
  
    const handleAddOpen = () => {
        setShowAddModal(true)
    }
  
    const handleEditOpen = (id: number) => {
        setCurrentID(id)
        setShowEditModal(true)
    }
  
    const handleClose = () => {
        setShowAddModal(false)
        setShowEditModal(false)
    }
  
    const handleSubmit = () => {
        gatherVersions()
        setShowAddModal(false)
        setShowEditModal(false)
    }

    const handleFilterKeyChange = (key: string) => {
        setFilterKey(key)
        }
    
    const handleFilterValueChange = (value: string) => {
        setFilterValue(value)
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
  
  
    const gatherVersions = useCallback(() => {
        setLoading(true)
        fetch(`${productAndVersionsURI}/versions/${productId}`)
            .then(res => res.json())
            .then(res => {
                setLoadedVersions(res.versions)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }, [])
  
    const sortFunction = (a: any, b: any) => {
        const currKey = headerVersion.find(el => el.headerId === orderBy)?.versionId || "title"
        if (order === 'asc') {
            if (a?.[currKey] < b?.[currKey]) return 1
            if (a?.[currKey] > b?.[currKey]) return -1
            return 0
        }
        if (a?.[currKey] < b?.[currKey]) return -1
        if (a?.[currKey] > b?.[currKey]) return 1
        return 0
    }

    const fullVersions = loadedVersions
    .filter((row: any) => filterKey in row ? row[filterKey]?.toString()?.toLowerCase()?.includes(filterValue?.toLowerCase()) : false)

  
    useEffect(() => {
        gatherVersions()
    }, [gatherVersions]);
    
    return (
        <>
            <PageTitle label={'Versiones del producto: ' + productName}>
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
                        <Button disabled>{'>'}</Button>
                        <Link to={'/soporte/productsAndVersions/products'}>
                            <Button>Productos</Button>
                        </Link>
                    </div>
            </PageTitle>
            <LoadingIndicator show={isLoading} className={`flex flex-col items-start  transition-all duration-200`} >
                <div className="self-end mr-10 border-2 text-center  rounded-xl shadow-lg text-slate-800 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={handleAddOpen}>
                    <div className="m-4" > Crear Version</div>
                </div>
                <AddVersionModal onSubmit={handleSubmit} onClose={handleClose} show={showAddModal} product={productId}/>
                <EditVersionModal onSubmit={handleSubmit} onClose={handleClose} show={showEditModal} currentId={currentId}/>
                <TableContainer component={Paper} className="mt-10"  >
                <Filter data={fullVersions || []} currentKey={filterKey} value={filterValue} onKeyChange={handleFilterKeyChange} onValueChange={handleFilterValueChange} filterOptions={tableHeaders} filterKey="id" filterText='label' />
                    <Table>
                        <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} headers={tableHeaders} />
                        <TableBody>
                            {fullVersions &&
                                fullVersions
                                    .sort(sortFunction)
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(row => <VersionTableRow refresh={gatherVersions} row={row} key={row.id} onEdit={handleEditOpen} />)}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={8}
                                    count={fullVersions?.length || 0}
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

export default Versions
