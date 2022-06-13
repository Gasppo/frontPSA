import React from 'react'
import Select from '@mui/material/Select';
import { FormControl, InputLabel, MenuItem } from '@mui/material';

interface SelectProps {
    value: any
    options: any[]
    onChange: (e: any) => void
    valueKey: string
    text: string
    name: string
    className?: string
    label: string
    disabled?: boolean
}

const SelectBox = (props: SelectProps) => {

    const { value, onChange, options, valueKey, text, name, className, label, disabled } = props

    return (
        <FormControl >
        <InputLabel>{label}</InputLabel>
        <Select
            name={name}
            value={value}
            label={label}
            onChange={onChange}
            className={className || ''}
            variant="outlined"
            disabled={ disabled }
        >
            {options.map((el, i) => <MenuItem value={el[valueKey]} key={i}>{el?.[text] || 'N/A'}</MenuItem>)}
        </Select>
        </FormControl>
    )
}

export default SelectBox
