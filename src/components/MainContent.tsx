import React from 'react';
import { sections } from './dev/pageSections';
import LinkCard from './UI/Card/LinkCard';

interface MainContentProps {
    sidebarExpanded: boolean
}

const MainContent = (props: MainContentProps) => {
    const { sidebarExpanded } = props


    return (
        <div className={`flex flex-col items-center ${sidebarExpanded ? 'ml-60' : 'ml-20'} transition-all duration-200`} >
            <div className="grid grid-cols-4 gap-4 my-8" >
                {sections.map((section, i) => <LinkCard {...section} key={i} />)}
            </div>
        </div>
    )
}

export default MainContent
