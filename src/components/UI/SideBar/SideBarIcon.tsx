import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

type Props = {
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>
    text?: string,
    className?: string
    expanded: boolean
    href?: string
}

const SideBarIcon = (props: Props) => {
    const { Icon, text = 'Placeholder tooltip', expanded, href = '/placeholder' } = props

    const [selected, setSelected] = useState(false)
    const { pathname } = useLocation()

    useEffect(() => {
        setSelected(href === '/' ? pathname === href : pathname.includes(href) && href !== '/placeholder')
    }, [pathname, href])

    return (
        <Link to={selected || href === '/placeholder' ? '#' : href}>
            <div className={`group ${expanded ? 'sidebar-icon-expanded' : 'sidebar-icon-contracted'} ${selected ? 'text-slate-900 bg-teal-600 cursor-default' : 'bg-slate-900 text-teal-600 cursor-pointer'}`}>
                <Icon />
                {expanded && <p className='sidebar-tooltip-expanded'>{text}</p>}
                {!expanded && (
                    <span className="sidebar-tooltip group-hover:scale-100" >
                        {text}
                    </span>
                )}
            </div>
        </Link>
    )
}

export default SideBarIcon