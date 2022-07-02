import { useEffect, useMemo, useState } from 'react'
import { updateTicket } from '../../../api/ticketSupport'
import { ticketSupportURI } from '../../../dev/URIs'
import { Resource } from '../../../types/resourcesTypes'
import SelectBox from '../../Inputs/SelectBox'
import CenteredModal from '../../Modal/CenteredModal'

interface AssignSupportModalProps {
    resources: Resource[]
    onClose: () => void
    onSubmit: () => void
    show: boolean
    currentId: number | null

}

const AssignSupportModal = (props: AssignSupportModalProps) => {
    const { resources, onSubmit, onClose, show, currentId } = props
    const [isLoading, setIsLoading] = useState(false)
    const [assigneeId, setAssigneeId] = useState<number>(0)

    const ticketURL = useMemo(() => `${ticketSupportURI}/tickets/${currentId || 0}`, [currentId])
    const resroucesWithFullName = useMemo(() => resources.map(el => ({ ...el, fullName: `${el.Nombre} ${el.Apellido}` })), [resources])

    const handleAsssigneeChange = (e: any) => {
        setAssigneeId(Number(e.target.value))
    }


    const updateTicketUsingAPI = async (assigneeId: number) => {
        return updateTicket({ asigneeId: assigneeId }, ticketURL)
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        const response = await updateTicketUsingAPI(assigneeId)
        setIsLoading(false)
        if (response.status === 200) onSubmit()
    }

    useEffect(() => {
        if (!show) setAssigneeId(0)
    }, [show]);


    return (
        <CenteredModal isLoading={isLoading} onClose={onClose} show={show} onSubmit={handleSubmit} label={`Asignar Recurso de Soporte - Ticket #${currentId}`} width='md:w-[42rem] w-[48rem]' addbuttonLabel="Asignar" disableSubmit={false}>
            <div className="my-6" >
                <SelectBox required name="assigneeId" className='mr-8 w-[36rem] md:w-[30rem]' label="Nombre del recurso" onChange={handleAsssigneeChange} valueKey="legajo" value={assigneeId} options={resroucesWithFullName} text="fullName" />
            </div>
        </CenteredModal>
    )
}

export default AssignSupportModal
