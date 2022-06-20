import { Typography } from '@mui/material'
import React from 'react'

interface TitleAndSpanProps {
    className?: string
    title: string
    info: string
}

const TitleAndSpan = (props: TitleAndSpanProps) => {

    const { className = 'mb-4', info, title } = props

    return (
        <div className={className}>
            <Typography variant='h6'>{title}</Typography>
            <span>{info}</span>
        </div>
    )
}

export default TitleAndSpan
