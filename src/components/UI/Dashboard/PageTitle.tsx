import { Typography } from '@mui/material'
import React from 'react'

interface PageTitleProps {
    children?: React.ReactNode
    label: string
}

const PageTitle = (props: PageTitleProps) => {
    return (
        <div className={`flex flex-col items-start transition-all duration-200 mb-20`} >
                <Typography variant='h3'>{props.label}</Typography>
                {props.children}
            </div>
    )
}

export default PageTitle
