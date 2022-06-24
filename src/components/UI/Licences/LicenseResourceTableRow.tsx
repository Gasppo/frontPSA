import EditIcon from '@mui/icons-material/Edit';
import { TableCell, TableRow } from '@mui/material';
import { License } from '../../types/resourcesTypes';

interface LicenseResourceTableRowProps {
    row: any
}

const LicenseResourceTableRow = (props: LicenseResourceTableRowProps) => {
    const { row } = props

    const addDays = (date:Date, days:number) => {
        var result = new Date(date);
        console.log(days)
        console.log(result.setDate(result.getDate() + days))

        return result;
    }

    let fechaInicio = (new Date(row.startingDate))
    let fechaFinal = addDays(fechaInicio, row.durationDays)
    return (
        <TableRow hover key={row._id}>
            <TableCell align="left">{row.licensedPersonCode}</TableCell>
            <TableCell align='left'>{row.employeeName}</TableCell>
            <TableCell align="left">{row.licenseType}</TableCell>
            <TableCell align="left">{fechaInicio.toLocaleDateString('es-AR')}</TableCell>
            <TableCell align="left">{fechaFinal.toLocaleDateString('es-AR')}</TableCell>
            <TableCell align="left">{row.durationDays}</TableCell>
        </TableRow>
    )
}

export default LicenseResourceTableRow