import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from "@mui/icons-material/Settings";
import { Divider } from "@mui/material";
import React from "react";
import { sections } from '../../dev/pageSections';
import Expand from './Expand';
import SideBarIcon from "./SideBarIcon";

type Props = {
  sidebarExpanded: boolean,
  handleExpand: () => void,
};


const SideBar = (props: Props) => {

  const { sidebarExpanded, handleExpand } = props

  return (
    <>
      <div className={`fixed top-0 left-0 h-screen ${sidebarExpanded ? 'w-56' : 'w-16'} flex flex-col bg-slate-800 text-white shadow-md transition-all duration-200  z-10`}>
        <SideBarIcon expanded={sidebarExpanded} href='/' text="Inicio" Icon={HomeIcon} />
        {sections.map(section => section.title !== "Ajustes" && <SideBarIcon expanded={sidebarExpanded} href={section?.href} text={section.title} Icon={section.Icon} />)}
        <Divider variant="middle" className="my-4" color="#B5B5B5" />
        <SideBarIcon expanded={sidebarExpanded} text="Ajustes" Icon={SettingsIcon} />
        <Expand expanded={sidebarExpanded} onClick={handleExpand} />
      </div>
    </>
  );
};

export default SideBar;
