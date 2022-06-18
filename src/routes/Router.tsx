import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home'
import PlaceHolderSite from '../pages/placeholder'
import Soporte from '../pages/soporte/soporte'
import Tickets from '../pages/soporte/tickets'
import Recursos from '../pages/recursos/recursos'
import Proyectos from '../pages/proyectos/proyectos'
import Proyecto from '../pages/proyecto/proyecto'

interface RouterProps {
    
}

const Router = (props: RouterProps) => {
    return (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='recursos' element={<Recursos/>} />
            <Route path="soporte" element={<Soporte />} />
            <Route path="proyectos" element={<Proyectos />} />
            <Route path="proyecto" element={<Proyecto/>} />
            <Route path='soporte/tickets' element={<Tickets />} />
            <Route path="placeholder" element={<PlaceHolderSite />} />
            <Route path="contacts" element={<PlaceHolderSite />} />
           
          </Routes>
    )
}

export default Router
