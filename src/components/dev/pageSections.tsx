import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ForumIcon from "@mui/icons-material/Forum";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import SettingsIcon from "@mui/icons-material/Settings";
import SupportAgentIcon from '@mui/icons-material/SupportAgent';


export const sections = [
    { title: 'Proyectos', description: 'Acceso a portal de Proyectos', Icon: LibraryBooksIcon },
    { title: 'Soporte al Cliente', description: 'Acceso a portal de soporte al cliente', Icon: SupportAgentIcon, href: '/soporte' },
    { title: 'Finanzas', description: 'Acceso a portal de finanzas', Icon: AccountBalanceIcon  },
    { title: 'Ventas', description: 'Acceso a portal de  de ventas', Icon: PointOfSaleIcon  },
    { title: 'Recursos Humanos', description: 'Acceso a portal de Recursos Humanos', Icon: PersonSearchIcon  },
    { title: 'Contactos', description: 'Listado de contactos', Icon: AccountBoxIcon, href: '/contacts'  },
    { title: 'Mensajes', description: 'Acceso a portal de mensajería', Icon: ForumIcon  },
    { title: 'Ajustes', description: 'Configurar componentes de la herramienta', Icon: SettingsIcon  },
]