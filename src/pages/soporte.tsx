import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import { Button, Typography } from '@mui/material'
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import LinkCard from '../components/UI/Card/LinkCard'
import HeaderBar from '../components/UI/Header/HeaderBar'
import SideBar from '../components/UI/SideBar/SideBar'
interface SoporteProps {

}


const Soporte = (props: SoporteProps) => {
    const [sideBarExpanded, setSideBarExpanded] = useState<boolean>(false)

    const handleSideBarExpand = () => {
        setSideBarExpanded(prev => !prev)
    }

    const sections = [
        { title: 'Gestion de Tickets', description: 'Acceso a portal de gestion de tickets', Icon: SupportAgentIcon, href: 'tickets' },
        { title: 'Gestion de Productos', description: 'Acceso a portal de gestion de productos', Icon: AccountBalanceIcon },
    ]

    return (
        <>
            <div className="flex">
                <SideBar handleExpand={handleSideBarExpand} sidebarExpanded={sideBarExpanded} />
                <HeaderBar sidebarExpanded={sideBarExpanded} />

            </div>
            <div className={`flex flex-col items-start ${sideBarExpanded ? 'ml-60' : 'ml-20'} transition-all duration-200 mb-20`} >
                <Typography variant='h3'>Soporte</Typography>
                <Link to={'/'}>
                    <Button>Volver al inicio</Button>
                </Link>
            </div>
            <div >
                <div className={`flex flex-col items-center ${sideBarExpanded ? 'ml-60' : 'ml-20'} transition-all duration-200`} >
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
