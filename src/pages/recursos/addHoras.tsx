import { useState } from 'react'
import { MultiSelect } from "react-multi-select-component";
import {  TextField } from '@mui/material';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
//import DatePicker from "react-datepicker"

const options = [
    { label: "Proyecto 1", value: "grapes" },
    { label: "Proyecto 2", value: "mango" },
    { label: "Proyecto 3", value: "strawberry", disabled: true },
  ];



interface AddHorasProps {

}


const AddHoras= (props: AddHorasProps) => {

    const [selected, setSelected] = useState([]);
      
return(    
    <>
   
        
        <div className="flex flex-row" >
            <Link to={'recursos'} >
                <Button>Volver al inicio</Button>
            </Link>
            </div>
        <div>
 
            <TextField type='date'inputProps={{max: new Date().toISOString().slice(0, 10)}} defaultValue='2022-06-16'></TextField>
            <MultiSelect options={options} value={selected} onChange={setSelected} labelledBy="Select" />
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
                    </Table>
            </TableContainer>
        </div>
    
        
        </>
        
    ) 
}

export default AddHoras