import { TextField } from '@mui/material';

interface ValidatingInputProps {
    value: any
    onChange: (e: any) => void
    label: string,
    name: string,
    className?: string
    validations?: ((value: any) => string)[]
    required?: boolean
    disabled?: boolean
    multiline?: boolean
    rows?: number
}


const ValidatingInput = (props: ValidatingInputProps) => {
    const { required, value, onChange, label, name, className, validations = [], disabled, multiline, rows } = props

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
            color='primary'
            onChange={onChange}
            value={value}
            helperText={errorMessage}
            error={!!errorMessage}
            required={required}
            disabled={disabled}
            multiline={multiline}
            rows={rows}
        />
    )
}

export default ValidatingInput;
