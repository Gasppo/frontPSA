import React from 'react'

interface ModalButtonProps {
    label: string
    onSubmit: () => void
    disabled?: boolean
}

const ModalButton = (props: ModalButtonProps) => {
    const { label, onSubmit, disabled } = props

    const handleClick = () => {
        if (disabled) return
        onSubmit()
    }

    return (
        <div className={`text-center mr-8 mb-6 border-2 transition-all duration-300 rounded-xl shadow-lg font-bold 
        ${disabled ?
                "text-slate-500 border-slate-400 bg-slate-300" :
                "text-slate-800 border-slate-400 hover:border-teal-600 hover:border-1 hover:bg-gray-200 hover:text-teal-600 cursor-pointer"
            }`} onClick={handleClick}>
            <div className="m-3" >{label}</div>
        </div>
    )
}

export default ModalButton
