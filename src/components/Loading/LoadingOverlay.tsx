import { CircularProgress, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import createStyles from '@mui/styles/createStyles'
import clsx from 'clsx'
import React, { FunctionComponent } from 'react'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        loadingIndicator: {
            position: "absolute",
            zIndex: 9999,
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            pointerEvents: "unset",
            backgroundColor: "white",
            opacity: 0.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        wrapper: {
            position: 'relative'
        }
    }))

interface Props {
    show: boolean
}

const LoadingOverlay: FunctionComponent<Props & any> = ({ children, show, ...props }) => {
    const classes = useStyles({ ...props })
    return children ? (
        <div className={clsx(classes.wrapper, props.className)}>
            {children}
            {show && <div className={clsx(classes.loadingIndicator, 'axxd-loading axxd-loading-overlay')}>
                <CircularProgress size="5rem" />
            </div>}
        </div>) :
        (<div className={clsx(classes.loadingIndicator, 'axxd-loading axxd-loading-overlay')}>
            <CircularProgress size="5rem" />
        </div>)
}

export default LoadingOverlay