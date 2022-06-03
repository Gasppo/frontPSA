import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import React from 'react';

type Props = {
    expanded: boolean,
    onClick: () => void
}

const Expand = (props: Props) => {

    const { expanded, onClick } = props

    const arrowStyle = "self-end relative l-1 w-7 h-7 mt-4 bottom-2 shadow-none z-1 bg-slate-900 text-teal-600 rounded-full hover:bg-teal-600 hover:text-slate-900"

    return (
        <>
            {expanded && <ArrowRightIcon onClick={onClick} className={arrowStyle} />}
            {!expanded && <ArrowLeftIcon onClick={onClick} className={arrowStyle} />}
        </>
    )
}

export default Expand