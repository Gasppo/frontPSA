import { useContext, useEffect } from 'react'
import LandingDashboard from '../../components/UI/Dashboard/MainContent'
import { AuthContext } from '../../store/AuthContext'


const Home = () => {
  const { isLoggedIn } = useContext(AuthContext)

  useEffect(() => {
    if (isLoggedIn) return
  }, [isLoggedIn]);

  return (
    <div>
      <LandingDashboard />
    </div>
  )
}

export default Home
