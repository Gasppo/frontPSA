import { useState, useEffect, useCallback } from 'react'
import { MultiSelect } from "react-multi-select-component";
import { TableFooter, TablePagination, TextField } from '@mui/material';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import LoadingIndicator from '../../components/Loading/LoadingIndicator';
import AddResourceLicenceModal from '../../components/UI/Licences/AddResourceLicenceModal';
import LicenseResourceTableRow from '../../components/UI/Licences/LicenseResourceTableRow';
import { License } from '../../components/types/resourcesTypes';
import PageTitle from '../../components/UI/Dashboard/PageTitle';


interface CargaDeLicenciasProps {

}


const CargaDeLicencias = (props: CargaDeLicenciasProps,) => {

    const [isLoading, setLoading] = useState<boolean>(true)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [currentId, setCurrentID] = useState<number | null>(null)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [page, setPage] = useState(0)
    const [licenses, setLicenses] = useState<any>([])
    const [employees, setEmployees] = useState<any>([])


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

    const getEmployees = useCallback(async () => {
       const empleados = await fetch('https://modulo-recursos-psa.herokuapp.com/employees').then(res => res.json())
       setEmployees(empleados)
    }, [])

    const getLicenses = useCallback(() => {
         fetch('https://modulo-recursos-psa.herokuapp.com/licenses')
            .then(res => res.json())
            .then(res => {
                console.log(employees)
                const licencias = res.map((item: License) => {
                    const empleado = employees.find((el: any) => item.licensedPersonCode === el.legajo)
                    return {
                        ...item,
                        employeeName: `${empleado?.Nombre || 'N/A'} ${empleado?.Apellido || 'N/A'}`,
                    }
                })
                setLicenses(licencias)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
            })

    }, [employees])

    useEffect(() => {
        setLoading(true)
        getEmployees()
    }, [getEmployees]);

    useEffect(() => {
        getLicenses()
    }, [getLicenses]);

    return (
        <>

            <PageTitle label='Carga de licencias'>
            <div className="flex flex-row" >
                <Link to={'/recursos/'} >
                    <Button>Volver al inicio</Button>
                </Link>
            </div>
            </PageTitle>

            <Typography variant='h5' className={'mb-10'}></Typography>
            <LoadingIndicator show={isLoading} className={`flex flex-col items-start  transition-all duration-200`} >

                <div className="self-end mr-10 border-2 text-center  rounded-xl shadow-lg text-slate-800 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={handleAddOpen}>
                    <div className="m-4"> Crear Licencia</div>
                </div>

                <AddResourceLicenceModal onSubmit={handleSubmit} onClose={handleClose} show={showAddModal} />
                <AddResourceLicenceModal onSubmit={handleSubmit} onClose={handleClose} show={showEditModal} />

                <TableContainer component={Paper} className="mt-10"  >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Codigo de Empleado</TableCell>
                                <TableCell align="left">Nombre de Empleado</TableCell>
                                <TableCell align="left">Tipo de Licencia</TableCell>
                                <TableCell align="left">Fecha de inicio</TableCell>
                                <TableCell align="left">Fecha de fin</TableCell>
                                <TableCell align="left">Duracion</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {licenses
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row: License) => <LicenseResourceTableRow row={row} key={row._id} />)

                            }
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

export default CargaDeLicencias 