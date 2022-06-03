import Skeleton from '@mui/material/Skeleton'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import clsx from 'clsx'
import React, { FunctionComponent } from 'react'

interface Props {
    show: boolean
}

const useStyles = makeStyles((theme: any) =>
    createStyles({
        skeleton: {
            borderRadius: 4,
        }
    }))

const LoadingSkeleton: FunctionComponent<Props & any> = (props) => {
    const { children, show, ...other } = props
    const classes = useStyles(props)
    return (
        <>
            {show && <Skeleton className={clsx(classes.skeleton, 'axxd-loading axxd-loading-skeleton')} {...other} {...other.options} />}
            {!show && children}
        </>
    )
}

export default LoadingSkeleton
