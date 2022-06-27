import { Autocomplete, TextField } from '@mui/material';
import { ChangeEvent, SyntheticEvent } from 'react';
import SelectBox from '../Inputs/SelectBox';

interface FilterProps {
    filterOptions: any[]
    onKeyChange: (key: string) => void
    onValueChange: (value: string) => void
    filterKey: string
    filterText: string
    currentKey: string
    data: any[],
    value: string
}

const Filter = (props: FilterProps) => {
    const { filterOptions = [], onKeyChange, onValueChange, filterKey, filterText, currentKey, data, value } = props

    const handleValueChange = (event: SyntheticEvent<Element, Event>, value: any) => {
        console.log(value)
        onValueChange(value || '')
    }

    const handleKeyChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onValueChange('')
        onKeyChange(e.target.value)
    }

    const filterWithoutDates = filterOptions.filter(el => el.id !== 'createdAt' && el.id !== 'updatedAt')

    const labelTitle = filterWithoutDates.find(el => el?.[filterKey] === currentKey)?.[filterText] || 'Filtro'
    const options = data.map(el => el?.[currentKey]?.toString() || '')

    const uniqueOptions = [...new Set(options)]

    return (
        <div className='m-4'>
            <div className='flex'>
                <SelectBox onChange={handleKeyChange} label="Filtrar por.." value={currentKey} options={filterWithoutDates} name="" valueKey={filterKey} text={filterText} size='small' className='mr-8 w-80 md:w-56' />
                <Autocomplete
                    value={value}
                    disablePortal
                    size='small'
                    className='mr-8 w-96 md:w-64'
                    options={uniqueOptions}
                    renderInput={(params) => <TextField {...params} label={labelTitle} InputLabelProps={{ shrink: true }} />}
                    onChange={handleValueChange}
                    
                />
            </div>
        </div>
    )
}

export default Filter
