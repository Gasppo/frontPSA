import { TableCell, TableRow } from '@mui/material'
import { useState } from 'react'
import { setConstantValue } from 'typescript'
import { Task } from '../../types/resourcesTypes'
interface LoadHoursTableRowProps {
    row: Task,
    onChange: any
}

const LoadHoursTableRow = (props: LoadHoursTableRowProps) => {
    const { row } = props
    const [value,setValue] = useState(0.5)

    const handleChange = (event: any) => {
        const value = event.target.value
        if (value <= 0) {
            setValue(0.5)
        } else if (value > 8) {
            setValue(8)
        } else if(value%0.5!=0){
            setValue(Math.round(value))
        }else{
            setValue(value)
        }
        console.log(value,row)
    }


    return (
        <TableRow hover key={row._id}>
            <TableCell align="left">{row.proyectCode}</TableCell>
            <TableCell align="left">{row.proyectName}</TableCell>
            <TableCell align="left">{row.code}</TableCell>
            <TableCell align="left">{row.name}</TableCell>
            <TableCell align="left">{row.description}</TableCell>
            <TableCell align="left">
                <div className="flex flex-row" >
                    <input max="8" min="0.5" step="0.5"type="number" value={value} className="width-20" defaultValue={0} onChange={(value) =>{handleChange(value); props.onChange(value, row)}}></input>
                </div>
            </TableCell>
        
        </TableRow>
    )
}

export default LoadHoursTableRow