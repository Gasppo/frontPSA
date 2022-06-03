import React from 'react';
import { sections } from '../../dev/pageSections';
import LinkCard from '../Card/LinkCard';

interface MainContentProps {
}

const LandingDashboard = (props: MainContentProps) => {


    return (
        <div className={`flex flex-col items-center transition-all duration-200`} >
            <div className="grid grid-cols-4 gap-4 my-8" >
                {sections.map((section, i) => <LinkCard {...section} key={i} />)}
            </div>
        </div>
    )
}

export default LandingDashboard
