import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import { Button } from '@mui/material'
import { Link, Outlet } from 'react-router-dom'
import LinkCard from '../../components/UI/Card/LinkCard'
import PageTitle from '../../components/UI/Dashboard/PageTitle'
interface SoporteProps {

}


const Soporte = (props: SoporteProps) => {

    const sections = [
        { title: 'Gestion de Tickets', description: 'Acceso a portal de gestion de tickets', Icon: SupportAgentIcon, href: 'tickets' },
        { title: 'Gestion de Productos', description: 'Acceso a portal de gestion de productos', Icon: AccountBalanceIcon },
    ]

    return (
        <>
            <PageTitle label='Soporte'>
                <Link to={'/'}>
                    <Button>Volver al inicio</Button>
                </Link>
            </PageTitle>
            <div >
                <div className={`flex flex-col items-center transition-all duration-200`} >
                    <div className="grid grid-cols-4 gap-4 my-8" >
                        {sections.map((section, i) => <LinkCard customSize='w-96 h-96' {...section} key={i} />)}
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default Soporte
