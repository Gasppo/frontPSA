import { TableCell, TableRow } from '@mui/material'
import React from 'react'
import { Task } from '../../types/resourcesTypes'
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import EditIcon from '@mui/icons-material/Edit';
interface EmployeeReportTableRowProps {
    row: Task
}

const EmployeeReportTableRow = (props: EmployeeReportTableRowProps) => {
    const { row } = props

    return (
        <TableRow hover key={row._id}>
            <TableCell align="left">{row.code}</TableCell>
            <TableCell align="left">{row.name}</TableCell>
            <TableCell align="left">{row.description}</TableCell>
            <TableCell align="left">{row.totalHours}</TableCell>
        </TableRow>
    )
}

export default EmployeeReportTableRow