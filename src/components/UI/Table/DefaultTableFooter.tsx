import { TablePagination, TableRow } from '@mui/material'
import React from 'react'

interface TableFooterProps {
    count: number
    colSpan: number
    page: number
    rowsPerPage: number
    onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    disableRowsPerPage?: boolean 
}

const DefaultTableFooter = (props: TableFooterProps) => {

    const { colSpan, count, onPageChange, onRowsPerPageChange, page, rowsPerPage, disableRowsPerPage } = props

    return (
        <TableRow>
            <TablePagination
                rowsPerPageOptions={disableRowsPerPage ? [] : [5, 10, 25, 50]}
                colSpan={colSpan}
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                    inputProps: {
                        'aria-label': 'rows per page',
                    },
                    native: true,
                }}
                labelRowsPerPage={'Filas por pag.'}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
            />
        </TableRow>
    )
}

export default DefaultTableFooter
