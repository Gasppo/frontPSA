import { Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const PlaceHolderSite = () => {

  return (
    <>
      
      <div className="flex flex-col justify-center items-center h-full">
        <Typography variant='h1'>Pantalla en Construcción</Typography>
        <Link to={'/'} >
          <Button>Volver al inicio</Button>
        </Link>
      </div>
    </>

  )
}

export default PlaceHolderSite
