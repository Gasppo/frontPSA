import { Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import PageTitle from '../../../components/UI/Dashboard/PageTitle'


const Clients = () => {
  return (
    <>
      <PageTitle label='Portal de Clientes'>
        <div className="flex flex-row" >
              <Link to={'/'}>
                  <Button>Inicio</Button>
              </Link>
              <Button disabled>{'>'}</Button>
              <Link to={'/soporte'}>
                  <Button>Soporte</Button>
              </Link>
              <Button disabled>{'>'}</Button>
              <Link to={'/soporte/productsAndVersions'}>
                  <Button>Productos y Versiones</Button>
              </Link>
          </div>
        </PageTitle>
      <div className="flex flex-col justify-center items-center h-full">
        <Typography variant='h1'>Pantalla en Construcción</Typography>
        <Link to={'/'} >
          <Button>Volver al inicio</Button>
        </Link>
      </div>
    </>
  )
}

export default Clients
