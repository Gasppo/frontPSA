import { Alert, Button, TextField } from '@mui/material'
import { styled } from '@mui/system'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../store/AuthContext'

interface RegisterProps {
    handleLoginOpen: () => void
}

const NuevoButton = styled(Button)({
    backgroundColor: '#0d9488',
    '&:hover': {
        backgroundColor: '#1e293b',
        color: 'white'
    },
})


const Register = (props: RegisterProps) => {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const { onLogin } = useContext(AuthContext)


    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value)
    }

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value)
    }

    const handleRegister = async () => {
        const response = await onLogin(email, password)
        setError(!response?.ok)
    }

    return (
        <>
            <TextField value={email} onChange={handleEmailChange} label={'Email'} variant="standard" InputLabelProps={{ shrink: true }} className="my-2" />
            <TextField value={password} onChange={handlePasswordChange} color='primary' label={'Password'} variant="standard" type="password" InputLabelProps={{ shrink: true }} className="my-4" />
            <NuevoButton onClick={handleRegister} variant="outlined" style={{ backgroundColor: '0d9488' }}>Registrar</NuevoButton>
            {error && <Alert severity="error" className='mt-4'>Error de login!</Alert>}
            <Button className='mt-2' onClick={props.handleLoginOpen} >
                Volver al inicio
            </Button>
        </>
    )
}

export default Register
