import AccessAlarm from '@mui/icons-material/AccessAlarm'
import FileOpen from '@mui/icons-material/FileOpen'
import Event from '@mui/icons-material/Event'
import { Button } from '@mui/material'
import { Link, Outlet } from 'react-router-dom'
import LinkCard from '../../components/UI/Card/LinkCard'
import PageTitle from '../../components/UI/Dashboard/PageTitle'
interface LandingPageHRProps {

}


const LandingPageHR = (props: LandingPageHRProps) => {

    const sections = [
        { title: 'Gestion de Licencias', description: 'Acceso a portal de gestion de licencias', Icon: FileOpen },
        { title: 'Carga de Horas', description: 'Acceso a portal de carga de horas', Icon: AccessAlarm, href:'/recursos/horasSemanales' },
        { title: 'Vista Calendario', description: 'Acceso a la vista calendario', Icon: Event, href:'/recursos/calendario' },
    ]

    return (
        <>
            <PageTitle label='Recursos'>
                <Link to={'/'}>
                    <Button>Volver al inicio</Button>
                </Link>
            </PageTitle>
            <div >
                <div className={`flex flex-col items-start ml-20     transition-all duration-200`} >
                    <div className="flex flex-wrap my-8 -m-4" >
                        {sections.map((section, i) => <LinkCard customSize='w-96 h-96  md:w-80 md:h-80 m-4' {...section} key={i} />)}
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default LandingPageHR
