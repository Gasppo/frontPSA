import { useContext, useEffect, useState } from 'react'
import MainContent from '../components/MainContent'
import HeaderBar from '../components/UI/Header/HeaderBar'
import SideBar from '../components/UI/SideBar/SideBar'
import { AuthContext } from '../store/AuthContext'


const Home = () => {
  const [sideBarExpanded, setSideBarExpanded] = useState<boolean>(false)
  const { isLoggedIn } = useContext(AuthContext)


  const handleSideBarExpand = () => {
    setSideBarExpanded(prev => !prev)
  }

  useEffect(() => {
    if (isLoggedIn) return
  }, [isLoggedIn]);

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

export default Home
