import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import HeaderBar from './components/UI/Header/HeaderBar'
import SideBar from './components/UI/SideBar/SideBar'
import Router from './routes/Router'


const App = () => {
  const [sideBarExpanded, setSideBarExpanded] = useState<boolean>(false)

  const { pathname } = useLocation()



  const handleSideBarExpand = () => {
    setSideBarExpanded(prev => !prev)
    console.log(pathname)

  }

  return (
    <div>
      <div className="flex">
        <SideBar handleExpand={handleSideBarExpand} sidebarExpanded={sideBarExpanded} />
        <HeaderBar sidebarExpanded={sideBarExpanded} />
      </div>
      <div className={`${sideBarExpanded ? 'ml-60' : 'ml-20'} transition-all duration-200 `}>
        <Router />
      </div>
    </div>
  )
}

export default App
