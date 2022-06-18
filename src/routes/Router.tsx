import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home'
import PlaceHolderSite from '../pages/placeholder'
import Soporte from '../pages/soporte/soporte'
import Tickets from '../pages/soporte/tickets'
import Recursos from '../pages/recursos/recursos'
import AddHoras from '../pages/recursos/addHoras'

interface RouterProps {
    
}

const Router = (props: RouterProps) => {
    return (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='recursos' element={<Recursos/>} />
            <Route path='recursos/addHoras' element= {<AddHoras/>}/>
            <Route path="soporte" element={<Soporte />} />
            <Route path='soporte/tickets' element={<Tickets />} />
            <Route path="placeholder" element={<PlaceHolderSite />} />
            <Route path="contacts" element={<PlaceHolderSite />} />
           
          </Routes>
    )
}

export default Router
