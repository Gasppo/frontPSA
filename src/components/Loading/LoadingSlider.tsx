import LinearProgress from '@mui/material/LinearProgress'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import clsx from 'clsx'
import React, { FunctionComponent } from 'react'

interface Props {
    show: boolean
}

const useStyles = makeStyles((theme: any) =>
    createStyles({
        progress: {
            zIndex: 100,
        }
    }))

const LoadingSlider: FunctionComponent<Props & any> = ({ children, show, options, ...props }) => {
    const classes = useStyles()
    return (
        <>
            {show && <div style={{ height: 0, overflow: 'visible' }}><LinearProgress className={clsx(classes.progress, 'axxd-loading axxd-loading-slider', options?.className || {})} /></div>}
            <div className={props.className}>
                {children}
            </div>
        </>
    )
}

export default LoadingSlider
