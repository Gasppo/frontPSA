import { useState, useEffect } from 'react'
import { MultiSelect } from "react-multi-select-component";
import { TableFooter, TablePagination, TextField } from '@mui/material';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import LoadingIndicator from '../../components/Loading/LoadingIndicator';
import AddResourceLicenceModal from '../../components/UI/Licences/AddResourceLicenceModal';
import LicenseResourceTableRow from '../../components/UI/Licences/LicenseResourceTableRow';
import { License } from '../../components/types/resourcesTypes';


interface CargaDeLicenciasProps {

}


const CargaDeLicencias = (props: CargaDeLicenciasProps,) => {

    const [isLoading, setLoading] = useState<boolean>(false)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [currentId, setCurrentID] = useState<number | null>(null)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [page, setPage] = useState(0)
    const [licenses, setLicenses] = useState<any>([])

    
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
    const  getLicenses = ()=>{
        let licencias: License [] = [       {

            _id:"62b1041fad7779110976cb33",
            licensedPersonCode:2,
            startingDate:"2022-09-20T00:00:00.000Z",
            durationDays:2,
            licenseType:"Maternidad",
            created:new Date("2022-06-20T23:34:55.191Z"),
        
        }] 
        
 
        setLicenses(licencias)
        console.log(licencias)
        console.log(licenses)

        /* fetch('https://modulo-recursos-psa.herokuapp.com/licenses')
            .then(res => res.json())
            .then(res => {
                let licenciasAMostrar:any[] = []
                console.log(res)
                res.forEach((item:any)=>{
                    let licenciaACargar:any =
                    {
                        ...item

                    }
                    licenciasAMostrar.push(licenciaACargar)

                })
                setLicenses(licenciasAMostrar)
                //console.log(licenses)

                
            }) 
            .catch(err => {
                console.log(JSON.stringify(err))
            })*/

    }
    useEffect(() => {
        getLicenses()
    }, []);

    
    return (
        <>

            <div className="flex flex-row" >
                <Link to={'/recursos/'} >
                    <Button>Volver atras</Button>
                </Link>
            </div>
            
             
            

            <Typography variant='h5' className={'mb-10'}></Typography>
            <LoadingIndicator show={isLoading} className={`flex flex-col items-start  transition-all duration-200`} >
                
            <div className="self-end mr-10 border-2 text-center  rounded-xl shadow-lg text-slate-800 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={handleAddOpen}>
                <div className="m-4"> Crear Licencia</div>        
            </div>

            <AddResourceLicenceModal onSubmit={handleSubmit} onClose={handleClose} show={showAddModal} clients={[]} products={[]}/>
            <AddResourceLicenceModal onSubmit={handleSubmit} onClose={handleClose} show={showEditModal} clients={[]} products={[]}/> 
                
                <TableContainer component={Paper} className="mt-10"  >
                    <Table>
                        <TableHead>
                            <TableRow>
                            <TableCell align="left">Tipo de Licencia</TableCell>
                                <TableCell align="left">Empleado</TableCell>
                                <TableCell align="left">Codigo de Empleado</TableCell>
                                <TableCell align="left">Fecha de inicio</TableCell>
                                <TableCell align='left'>Estado</TableCell>
                                <TableCell align="left">Dias restantes</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {licenses
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row:License)=> <LicenseResourceTableRow row={row} key={row._id}/>)
                            
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

export default  CargaDeLicencias 