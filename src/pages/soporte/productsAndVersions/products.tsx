import { Button, Paper, Table, TableBody, TableContainer, TableFooter, TablePagination, TableRow, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Product } from '../../../components/types/productTypes'
import PageTitle from '../../../components/UI/Dashboard/PageTitle'
import { productAndVersionsURI } from '../../../components/dev/URIs'
import ProductTableRow from '../../../components/UI/Products/ProductTableRow'
import LoadingIndicator from '../../../components/Loading/LoadingIndicator'
import AddProductModal from '../../../components/UI/Products/AddProductModal'
import EnhancedTableHead from '../../../components/UI/Products/EnhacedTableHeader'

type Order = 'asc' | 'desc';
interface Data {
    id: number;
    name: string;
}

interface HeadCell {
    id: keyof Data;
    label: string;
    numeric?: boolean;
}

const tableHeaders = [
    { id: "id", label: "Codigo de identificacion", numeric: false },
    { id: "nombre", label: "Nombre", numeric: false },
    {id: "versiones", label: "Versiones", numeric: false }
] as HeadCell[]

const headerProduct = [
    { headerId: "id", productId: "id" },
    { headerId: "title", productId: "title" }
]

const Products = () => {

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
      gatherProducts()
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

  const sortFunction = (a: any, b: any) => {
      const currKey = headerProduct.find(el => el.headerId === orderBy)?.productId || "title"
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
      gatherProducts()
  }, [gatherProducts]);

  return (
    <>
      <PageTitle label='Portal de Productos'>
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
                    <div className="m-4" > Crear Producto</div>
                </div>
                <AddProductModal onSubmit={handleSubmit} onClose={handleClose} show={showAddModal} />
                <AddProductModal onSubmit={handleSubmit} onClose={handleClose} show={showEditModal} />
                <TableContainer component={Paper} className="mt-10"  >
                    <Table>
                        <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} headers={tableHeaders} />
                        <TableBody>
                            {loadedProducts &&
                                loadedProducts
                                    .sort(sortFunction)
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(row => <ProductTableRow refresh={gatherProducts} row={row} key={row.id} onEdit={handleEditOpen} />)}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={8}
                                    count={loadedProducts.length}
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

export default Products
