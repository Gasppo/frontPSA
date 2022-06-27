import React from 'react'
import Select from '@mui/material/Select';
import { FormControl, FormHelperText, InputLabel, MenuItem } from '@mui/material';

interface SelectProps {
    value: any
    options: any[]
    onChange: (e: any) => void
    valueKey: string
    text: string
    name: string
    className?: string
    label: string
    disabled?: boolean,
    validations?: ((value: any) => string)[]
    required?: boolean
    disabledText?: string
    size?: 'medium' | 'small' | undefined
}

const SelectBox = (props: SelectProps) => {

    const { value, onChange, options, valueKey, text, name, className, label, disabled, validations = [], required, disabledText = 'Disabled',size } = props

    const errorMessage = validations.reduce((prev, validation) => {
        const newError = validation(value)
        if (newError !== "") {
            if (prev === "") return newError
            return prev + ` - ${newError}`
        }
        return prev
    }, "")

    const renderText = () => disabled ? disabledText : options.find(el => el?.[valueKey] === value)?.[text] || ''

    return (
        <FormControl error={!!errorMessage} required={required}>
            <InputLabel>{label}</InputLabel>
            <Select
                name={name}
                label={label}
                onChange={onChange}
                className={className || ''}
                variant="outlined"
                color='primary'
                size={size ? size : 'medium'}
                disabled={disabled}
                renderValue={renderText}
                value={value}
            >
                {options.map((el, i) => <MenuItem value={el[valueKey]} key={i}>{el?.[text] || 'N/A'}</MenuItem>)}
            </Select>
            {errorMessage && (
                <FormHelperText>{errorMessage}</FormHelperText>
            )}
        </FormControl>
    )
}

export default SelectBox
