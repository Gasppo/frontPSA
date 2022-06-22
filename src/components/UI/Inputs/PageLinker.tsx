import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

interface PageLinkerProps {
    links: {
        href: string,
        label: string
    }[]
}

const PageLinker = (props: PageLinkerProps) => {

    const { links } = props

    return (
        <div className="flex flex-row" >
            {links.map((el, i) => (
                <>
                    <Link to={el.href}>
                        <Button>{el.label}</Button>
                    </Link>
                    {i !== links.length - 1 && <Button disabled>{'>'}</Button>}
                </>))}
        </div>
    )
}

export default PageLinker
