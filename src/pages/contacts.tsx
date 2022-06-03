import { Button, Typography } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import HeaderBar from '../components/UI/Header/HeaderBar'
import SideBar from '../components/UI/SideBar/SideBar'

const ContactsPage = () => {
  const [sideBarExpanded, setSideBarExpanded] = useState<boolean>(false)


  const handleSideBarExpand = () => {
    setSideBarExpanded(prev => !prev)
  }

  return (
    <>
      <div className="flex">
        <SideBar handleExpand={handleSideBarExpand} sidebarExpanded={sideBarExpanded} />
        <HeaderBar sidebarExpanded={sideBarExpanded} />

      </div>
      <div className="flex flex-col justify-center items-center h-full">
        <Typography variant='h1'>Pantalla en Construcción</Typography>
        <Link to={'/'} >
          <Button>Volver al inicio</Button>
        </Link>
      </div>
    </>

  )
}

export default ContactsPage
