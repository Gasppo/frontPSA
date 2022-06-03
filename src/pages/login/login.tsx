import { ThemeProvider } from '@emotion/react';
import { createTheme, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import Login from '../../components/Authentication/Login';
import Register from '../../components/Authentication/Register';
import LoadingIndicator from '../../components/Loading/LoadingIndicator';
import { AuthContext } from '../../store/AuthContext';


const theme = createTheme({
    palette: {
        primary: {
            main: '#1e293b',
        },
        secondary: {
            main: '#0d9488',
        },
    },
});

const LoginSite = () => {

    const [showLogin, setShowLogin] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const { isLoggedIn } = useContext(AuthContext)

    useEffect(() => {
        if (isLoggedIn) return
    }, [isLoggedIn]);


    const handleChangeToRegister = () => {
        setShowLogin(false)
    }

    const handleChangeToLogin = () => {
        setShowLogin(true)
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="flex flex-col justify-center items-center h-full">
                <Typography variant='h1'>Pantalla en Construcción</Typography>
                <LoadingIndicator show={isLoading}>
                    <div className='flex flex-col border-2 w-96 h-5/6 m-10 p-10 shadow-xl rounded-md'>
                        {showLogin && <Login loading={setIsLoading} handleRegisterOpen={handleChangeToRegister} />}
                        {!showLogin && <Register handleLoginOpen={handleChangeToLogin} />}
                    </div>
                </LoadingIndicator>
            </div>
        </ThemeProvider>
    )
}

export default LoginSite
