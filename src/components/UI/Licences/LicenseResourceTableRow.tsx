import EditIcon from '@mui/icons-material/Edit';
import { TableCell, TableRow } from '@mui/material';
import { License } from '../../types/resourcesTypes';

interface LicenseResourceTableRowProps {
    row: License
}

const LicenseResourceTableRow = (props: LicenseResourceTableRowProps) => {
    const { row } = props

    const addDays = (date:Date, days:number) => {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    const getCountdownDays = () => {

        let fechaInicio = (new Date(row.startingDate))
        let fechaFinal = addDays(fechaInicio, row.durationDays)
        console.log(row.durationDays)
        console.log(fechaFinal)
        return fechaFinal.toDateString()

    }

    return (
        <TableRow hover key={row._id}>
            <TableCell align="left">{row.licenseType}</TableCell>
            <TableCell align='left'>{'Messi'}</TableCell>
            <TableCell align="left">{row.licensedPersonCode}</TableCell>
            <TableCell align="left">{row.startingDate}</TableCell>
            <TableCell align="left">{0}</TableCell>
            <TableCell align="left">{getCountdownDays()}</TableCell>
        </TableRow>
    )
}

export default LicenseResourceTableRow