import React, { FunctionComponent } from 'react'
import { IndicatorProps, LoadingContext } from '../../hooks/useLoadingContext'

interface Props {
	blocking: FunctionComponent<IndicatorProps>,
	nonBlocking: FunctionComponent<IndicatorProps>,
	replacing: FunctionComponent<IndicatorProps>,
}

const LoadingIndicatorProvider: FunctionComponent<Props & { [key: string]: any }> = ({ children, blocking, nonBlocking, replacing, ...rest }) => {
	return (
		<LoadingContext.Provider value={{ blocking, nonBlocking, replacing, props: rest }}>
			{children}
		</LoadingContext.Provider>
	)
}

export default LoadingIndicatorProvider
