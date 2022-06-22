import { useState, useEffect } from 'react'
import { MultiSelect } from "react-multi-select-component";
import { TableFooter, TablePagination, TextField } from '@mui/material';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import LoadingIndicator from '../../components/Loading/LoadingIndicator';
import AddResourceLicenceModal from '../../components/UI/Licences/AddResourceLicenceModal';


interface CargaDeLicenciasProps {

}


const CargaDeLicencias = (props: CargaDeLicenciasProps,) => {

    const [isLoading, setLoading] = useState<boolean>(false)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [currentId, setCurrentID] = useState<number | null>(null)
    
    
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [page, setPage] = useState(0)

    const { state }: any = useLocation()

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
       
        setShowAddModal(false)
        setShowEditModal(false)
    }

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <>

            <div className="flex flex-row" >
                <Link to={'/recursos/horasSemanales/carga/'} >
                    <Button>Volver atras</Button>
                </Link>
            </div>
            
            <div className="self-end mr-10 border-2 text-center  rounded-xl shadow-lg text-slate-800 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={handleAddOpen}>
                    <div className="m-4" > Crear Licencia</div>
                </div>
                <AddResourceLicenceModal onSubmit={handleSubmit} onClose={handleClose} show={showAddModal} clients={[]} products={[]}/>
                <AddResourceLicenceModal onSubmit={handleSubmit} onClose={handleClose} show={showEditModal} clients={[]} products={[]}/> 
            

            <Typography variant='h5' className={'mb-10'}></Typography>
            <LoadingIndicator show={isLoading} className={`flex flex-col items-start  transition-all duration-200`} >
                <TableContainer component={Paper} className="mt-10"  >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Codigo de Proyecto</TableCell>
                                <TableCell align="left">Proyecto</TableCell>
                                <TableCell align="left">Codigo de Tarea</TableCell>
                                <TableCell align="left">Tarea</TableCell>
                                <TableCell align="left">Descripcion</TableCell>
                                <TableCell align='left'>Horas a cargar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        </TableBody>
                        <TableFooter>
                          <TableRow>
                              <TablePagination
                                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                  colSpan={8}
                                  count={4}
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

export default  CargaDeLicencias 