import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import * as React from 'react';


interface Data {
    id: number;
    title: string;
    razonSocial: string;
    productName: string;
    createdAt: string;
    updatedAt: string
    status: string;
}

type Order = 'asc' | 'desc';

interface HeadCell {
    id: keyof Data;
    label: string;
    numeric?: boolean;
}

interface EnhancedTableHeadProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
    headers: HeadCell[]
}

const EnhancedTableHead = (props: EnhancedTableHeadProps) => {
    const { order, orderBy, onRequestSort, headers } = props;

    const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headers.map((headCell) => (
                    <TableCell key={headCell.id} align={headCell.numeric ? 'right' : 'left'} sortDirection={orderBy === headCell.id ? order : false}>
                        <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={createSortHandler(headCell.id)} >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default EnhancedTableHead
