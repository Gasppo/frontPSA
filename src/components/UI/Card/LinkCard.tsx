import { SvgIconTypeMap, Typography } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import React from 'react';
import { Link } from 'react-router-dom';

interface LinkCardProps {
    children?: React.ReactNode
    description?: string
    title: string
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>
    href?: string,
    customSize?: string,
}

const LinkCard = (props: LinkCardProps) => {

    const { description, title, Icon, href = '/placeholder', customSize } = props
    const iconStyle = 'w-36 h-36'

    return (
        <>
            <Link to={href !== '/placeholder' ? href : '#'}>
                <div
                    className={
                        `${customSize ? customSize : "w-60 h-80"} ${ href !== '/placeholder' ? 'dashboard-card-enabled' : 'dashboard-card-disabled'}`
                    }>
                    <Typography variant='h5' className="self-start ml-8 mb-8" >{title}</Typography>
                    <Icon className={iconStyle} />
                    <Typography variant='caption' className="self-start ml-4 mt-8" >{description}</Typography>
                </div>
            </Link>
        </>
    )
}

export default LinkCard
