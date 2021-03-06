import CategoryIcon from '@mui/icons-material/Category'
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
        { title: 'Gestion de Productos', description: 'Acceso a portal de gestion de productos', Icon: CategoryIcon, href: 'productsAndVersions'},
    ]

    return (
        <>
            <PageTitle label='Soporte'>
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

export default Soporte
