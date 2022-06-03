import { useState } from 'react'
import MainContent from './components/MainContent'
import HeaderBar from './components/UI/Header/HeaderBar'
import SideBar from './components/UI/SideBar/SideBar'


const App = () => {
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
      <div>
        <MainContent sidebarExpanded={sideBarExpanded} />
      </div>
    </>
  )
}

export default App
