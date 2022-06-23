import React, { useEffect, useMemo, useState } from 'react'
import { prioridades } from '../../../../dev/dummyData'
import { Project } from '../../../../types/projectTypes'
import { Resource } from '../../../../types/resourcesTypes'
import SelectBox from '../../../Inputs/SelectBox'
import ValidatingInput from '../../../Inputs/ValidatingInput'
import CenteredModal from '../../../Modal/CenteredModal'

type createTaskData = {
    name: string;
    description: string;
    priority: number;
    resource: number;
    ticket: number;
    projectCode: number
    effort: number
}


interface CreateTaskModalProps {
    onClose: () => void
    onSubmit: (taskData: createTaskData) => void
    show: boolean
    ticketId: number
    resources: Resource[]
    projects: Project[]
    loading: boolean
}


const CreateTaskModal = (props: CreateTaskModalProps) => {

    const { onClose, onSubmit, show, ticketId, resources, projects, loading } = props

    const [runValidations, setRunValidations] = useState(false)

    const resourcesWithName = useMemo(() => resources.map(res => ({
        id: res.legajo,
        name: `${res.Apellido} ${res.Nombre}`
    })), [resources])

    const reducedProjects = useMemo(() => projects.map(proj => ({
        id: proj.code,
        name: proj.name
    })), [projects])

    const defaultTaskData = useMemo(() => ({
        description: '',
        name: '',
        priority: 0,
        resource: 0,
        ticket: ticketId,
        projectCode: 0,
        effort: 0,
    }), [ticketId])

    const [input, setInput] = useState<createTaskData>(defaultTaskData)

    const handleChangeText = (e: any) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
    };


    const handleChangeInt = (e: any) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
    };

    const handleSubmit = () => {
        if (invalidFields) {
            setRunValidations(true)
            return
        }
        onSubmit(input)
    }


    useEffect(() => {
        setRunValidations(false)
        setInput(defaultTaskData)
    }, [show, defaultTaskData]);


    const invalidFields = (!input?.description || !input?.name || !input.priority || !input.projectCode || !input.resource)
    const disabled = runValidations && invalidFields


    const isEmpty = (value: any) => !value ? "Este campo no puede estar vacio" : ""
    const validations = runValidations ? [isEmpty] : []



    return (
        <CenteredModal isLoading={loading} onClose={onClose} onSubmit={handleSubmit} show={show} label="Crear tarea" addbuttonLabel="Crear" width='w-[80vh]' disableSubmit={disabled}>
            <div className='flex mb-6 flex-row' >
                <ValidatingInput validations={validations} required name="name" className='mr-8 w-80' label="Titulo" value={input.name} onChange={handleChangeText} />
                <SelectBox validations={validations} required name="projectCode" className='mr-8 w-80' label="Proyecto" onChange={handleChangeInt} valueKey="id" value={input.projectCode} options={reducedProjects} text="name" />
            </div>
            <div className='flex mb-6 flex-row' >
                <SelectBox validations={validations} required name="resource" className='mr-8 w-80' label="Recurso" onChange={handleChangeInt} valueKey="id" value={input.resource} options={resourcesWithName} text="name" />
                <SelectBox validations={validations} required name="priority" className='mr-8 w-80' label="Prioridad" onChange={handleChangeInt} valueKey="id" value={input.priority} options={prioridades} text="valor" />
            </div>
            <ValidatingInput validations={validations} required name="description" className='mb-6 w-[42rem] mr-8' multiline rows={2} label="Descripcion" value={input.description} onChange={handleChangeText} />
        </CenteredModal>
    )
}

export default CreateTaskModal
