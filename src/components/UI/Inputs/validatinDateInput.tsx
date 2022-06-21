import { TextField } from '@mui/material';

interface ValidatingInputProps {
    value?: any
    onChange: (e: any) => void
    label: string,
    name: string,
    className?: string
    validations?: ((value: any) => string)[]
    required?: boolean
    disabled?: boolean
    multiline?: boolean
    rows?: number
    inputProps?: any
    defaultValue?: string
}


const ValidatingDateInput = (props: ValidatingInputProps) => {
    const { required, value, onChange, label, name, className, validations = [], disabled, multiline, rows, inputProps, defaultValue } = props

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
            type='date'
            name={name}
            inputProps={inputProps}
            defaultValue={defaultValue}
            className={className || ''}
            label={label}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            color='primary'
            onChange={onChange}
            helperText={errorMessage}
            error={!!errorMessage}
            required={required}
            disabled={disabled}
            multiline={multiline}
            rows={rows}
        />
    )
}

export default ValidatingDateInput
