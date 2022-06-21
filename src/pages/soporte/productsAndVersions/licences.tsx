import { Button, Paper, Table, TableBody, TableContainer, TableFooter, TablePagination, TableRow, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Licence, Product } from '../../../components/types/productTypes'
import { useCallback, useEffect, useState } from 'react'
import PageTitle from '../../../components/UI/Dashboard/PageTitle'
import { productAndVersionsURI } from '../../../components/dev/URIs'
import LicenceTableRow from '../../../components/UI/Licences/LicenceTableRow'
import LoadingIndicator from '../../../components/Loading/LoadingIndicator'
import AddLicenceModal from '../../../components/UI/Licences/AddLicenceModel'
import EnhancedTableHead from '../../../components/UI/Licences/EnahcedTableHeader'
import { Client } from '../../../components/types/clientTypes'
import EditLicenceModal from '../../../components/UI/Licences/EditLicenceModal'

type Order = 'asc' | 'desc';
interface Data {
    id: number,
    name: string,
    product: string,
    version: string,
    client: string,
    expirationDate: string,
    state: string
}


interface HeadCell {
    id: keyof Data;
    label: string;
    numeric?: boolean;
}

const tableHeaders = [
    { id: "id", label: "Codigo de identificacion", numeric: false },
    { id: "productName", label: "Producto", numeric: false },
    {id: "versionName", label: "Version", numeric: false },
    {id: "clientName", label: "Cliente", numeric: false },
    {id: "expirationDate", label: "Fecha de Expiración", numeric: false },
    {id: "state", label: "Estado", numeric: false },
] as HeadCell[]

const headerLicence = [
    { headerId: "id", licenceId: "id" },
    { headerId: "productName", licenceId: "productName" },
    { headerId: "versionName", licenceId: "versionName" },
    { headerId: "clientName", licenceId: "clientName" },
    { headerId: "expirationDate", licenceId: "expirationDate" },
    { headerId: "state", licenceId: "state" }
]

const Licences = () => {

  const [loadedLicences, setLoadedLicences] = useState<Licence[]>([])
  const [loadedClients, setLoadedClients] = useState<Client[]>([])
  const [loadedProducts, setLoadedProducts] = useState<Product[]>([])
  const [isLoading, setLoading] = useState<boolean>(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [currentId, setCurrentID] = useState<number | null>(null)
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('name');
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)

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
      gatherLicences()
      setShowAddModal(false)
      setShowEditModal(false)
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


  const gatherLicences = useCallback(() => {
      setLoading(true)
      fetch(`${productAndVersionsURI}/populatedLicence`)
          .then(res => res.json())
          .then(res => {
              setLoadedLicences(res.licences)
              setLoading(false)
          })
          .catch(err => {
              setLoading(false)
              console.log(err)
          })
    }, [])

    const gatherProducts = useCallback(() => {
        setLoading(true)
        fetch(`${productAndVersionsURI}/product`)
            .then(res => res.json())
            .then(res => {
                setLoadedProducts(res.products)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }, [])

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
    const currKey = headerLicence.find(el => el.headerId === orderBy)?.licenceId || "title"
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
    gatherLicences()
}, [gatherLicences]);

useEffect(() => {
    gatherProducts()
}, [gatherProducts]);

useEffect(() => {
    gatherClients()
}, [gatherClients]);

  return (
    <>
      <PageTitle label='Portal de Licencias'>
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
      <LoadingIndicator show={isLoading} className={`flex flex-col items-start  transition-all duration-200`} >
                <div className="self-end mr-10 border-2 text-center  rounded-xl shadow-lg text-slate-800 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={handleAddOpen}>
                    <div className="m-4" > Crear Licencia</div>
                </div>
                <AddLicenceModal onSubmit={handleSubmit} onClose={handleClose} show={showAddModal} clients={loadedClients} products={loadedProducts}/>
                <EditLicenceModal onSubmit={handleSubmit} onClose={handleClose} show={showEditModal} currentId={currentId}/>
                <TableContainer component={Paper} className="mt-10"  >
                    <Table>
                        <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} headers={tableHeaders} />
                        <TableBody>
                            {loadedLicences &&
                                loadedLicences
                                    .sort(sortFunction)
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(row => <LicenceTableRow refresh={gatherLicences} row={row} key={row.id} onEdit={handleEditOpen} />)}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={8}
                                    count={loadedLicences.length}
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

export default Licences
