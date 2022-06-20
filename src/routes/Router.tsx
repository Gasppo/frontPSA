import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home'
import PlaceHolderSite from '../pages/placeholder'
import Soporte from '../pages/soporte/soporte'
import Tickets from '../pages/soporte/tickets'
import Recursos from '../pages/recursos/recursos'
import AddHoras from '../pages/recursos/addHoras'
import CargaDeHoras from '../pages/recursos/cargaDeHoras'
import LandingPageHR from '../pages/recursos/landingPageHR'
import Calendario from '../pages/recursos/calendario'

interface RouterProps {
    
}

const Router = (props: RouterProps) => {
    return (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='recursos' element={<LandingPageHR/>} />
            <Route path='recursos/horasSemanales' element= {<Recursos/>}/>
            <Route path='recursos/horasSemanales/carga' element= {<AddHoras/>}/>
            <Route path='recursos/calendario' element= {<Calendario/>}/>
            <Route path="soporte" element={<Soporte />} />
            <Route path='soporte/tickets' element={<Tickets />} />
            <Route path="placeholder" element={<PlaceHolderSite />} />
            <Route path="contacts" element={<PlaceHolderSite />} />
            <Route path="recursos/horasSemanales/carga/seleccion" element={<CargaDeHoras />} />
           
          </Routes>
    )
}

export default Router
