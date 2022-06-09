import { TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Autocomplete from '@mui/material/Autocomplete';

type Resource = {
    firstName: string;
    lastName: string;
    age: number;
    address: string;
    email: string;
}

interface AutocompleteProps {
    options: Resource[]
}

const AutocompleteInput = (props: AutocompleteProps) => {
    const { options } = props
    return (
        <Autocomplete
            sx={{ width: 300 }}
            options={options}
            autoHighlight
            getOptionLabel={(option: Resource) => `${option.firstName} ${option.lastName}` }
            renderOption={(props: any, option: Resource) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    {option.firstName} {option.lastName} 
                </Box>
            )}
            renderInput={(params: any) => (
                <TextField
                    {...params}
                    label="Choose a country"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
            )}
        />
    )
}

export default AutocompleteInput
