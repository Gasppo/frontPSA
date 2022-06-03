import { FunctionComponent } from 'react'
import useLoadingContext from '../../hooks/useLoadingContext'

export interface LoadingIndicatorProps {
    variant?: 'blocking' | 'nonBlocking' | 'replacing',
    show?: boolean
}

const LoadingIndicator: FunctionComponent<LoadingIndicatorProps & { [key: string]: any }> = ({ variant = 'blocking', show = true, children, ...other }) => {
    const loading = useLoadingContext()
    const indicator = loading[variant]
    return indicator({ children, show, ...loading.props, ...other })
}

export default LoadingIndicator