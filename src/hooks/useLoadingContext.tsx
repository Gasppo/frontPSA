import { createContext, FunctionComponent, useContext } from 'react'
import React from 'react'

const NoIndicator: FunctionComponent<any> = ({ children }) => <>{children}</>

export interface IndicatorProps {
    show: boolean
}
export interface LoadingContextValue {
    blocking: FunctionComponent<IndicatorProps>,
    nonBlocking: FunctionComponent<IndicatorProps>,
    replacing: FunctionComponent<IndicatorProps>,
    props: any
}

export const LoadingContext = createContext<LoadingContextValue>({
    blocking: NoIndicator,
    nonBlocking: NoIndicator,
    replacing: NoIndicator,
    props: {}
})


export default function useLoadingContext() {
    const loading = useContext(LoadingContext)
    return loading
}
