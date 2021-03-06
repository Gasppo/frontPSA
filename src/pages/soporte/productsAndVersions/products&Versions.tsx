import React from 'react';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import ContactsIcon from '@mui/icons-material/Contacts';
import AppsIcon from '@mui/icons-material/Apps';
import { Button} from '@mui/material'
import LinkCard from '../../../components/UI/Card/LinkCard';
import PageTitle from '../../../components/UI/Dashboard/PageTitle'
import { Link } from 'react-router-dom'


interface ProductsProps {
}

const ProductsAndVersions = (props: ProductsProps) => {

    const sections = [
        { title: 'Portal Productos', description: 'Acceso al portal de gestión de productos', Icon: AppsIcon, href: 'products' },
        { title: 'Portal Licencias', description: 'Acceso al portal de gestión de licencias', Icon: HistoryEduIcon, href: 'licences'},
        { title: 'Portal Clientes', description: 'Acceso al portal de gestión de clientes', Icon: ContactsIcon, href: 'clients'},
    ]

    return (
        <>
            <PageTitle label='Gestión de Productos y Versiones'>
                    <div className="flex flex-row" >
                        <Link to={'/'}>
                            <Button>Inicio</Button>
                        </Link>
                        <Button disabled>{'>'}</Button>
                        <Link to={'/soporte'}>
                            <Button>Soporte</Button>
                        </Link>
                    </div>
                </PageTitle>
            <div className={`flex flex-col items-center transition-all duration-200`} >
                <div className="grid grid-cols-4 gap-4 my-8" >
                    {sections.map((section, i) => <LinkCard customSize='w-96 h-96  md:w-80 md:h-80 m-4' {...section} key={i} />)}
                </div>
            </div>
        </>
    )
}

export default ProductsAndVersions
