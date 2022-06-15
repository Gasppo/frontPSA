import { TextField } from '@mui/material'
import React from 'react'

interface ValidatingInputProps {
    value: any
    onChange: (e: any) => void
    label: string,
    name: string,
    className?: string
    validations?: ((value: any) => string)[]
}

const ValidatingInput = (props: ValidatingInputProps) => {
    const { value, onChange, label, name, className, validations = [] } = props

    const errorMessage = validations.reduce((prev, validation) => {
        const newError = validation(value)
        if (newError !== "") {
            if (prev === "") return newError
            return prev + ` - ${newError}`
        }
        return prev
    }, "")

    return (
        <TextField
            name={name}
            className={className || ''}
            label={label}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            onChange={onChange}
            value={value}
            helperText={errorMessage}
            error={!!errorMessage}
        />
    )
}

export default ValidatingInput
