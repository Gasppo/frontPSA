import React from 'react'

interface CreateTicketButtonProps {
    onClick: () => void
}

const CreateTicketButton = (props: CreateTicketButtonProps) => {
    const { onClick } = props
    return (
        <div className="self-end mr-10 border-2 text-center  rounded-xl shadow-lg text-slate-800 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={onClick}>
            <div className="m-4" > Crear Ticket</div>
        </div>
    )
}

export default CreateTicketButton
