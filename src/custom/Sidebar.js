import React from 'react';
import '../tailwind.generated.css';
import { Column, NavLink } from '../dashboard/Utils';

export const SidebarButton = ({ children, onClick }) => (
  <button onClick={onClick}
    className="text-left w-full h-12 transition duration-500 ease-in-out bg-gray-500 text-white py-2 pl-10 shadow-inner / hover:bg-gray-600 ">
    {children}
  </button>);


const Sidebar = () => {
  return (
    <Column className="flex-none center-x w-64 bg-gray-500 shadow-2xl">
      <Column className="flex-none w-full mt-1 mb-3 p-5">
        <h1 className="font-bold text-white text-xl">BCI Dashboard</h1>
        <h2 className="text-white">Alpha version</h2>
      </Column>
      <div className="w-full h-c-25 bg-gray-600"></div>
      <NavLink to="/user" state={{}} className="w-full">
        <SidebarButton>Usuarios</SidebarButton>
      </NavLink>
      <NavLink to="/protocol" state={{}} className="w-full">
        <SidebarButton>Protocolos</SidebarButton>
      </NavLink>
      <NavLink to="/classifier" state={{}} className="w-full">
        <SidebarButton>Clasificadores</SidebarButton>
      </NavLink>
      <NavLink to="/movement" state={{}} className="w-full">
        <SidebarButton>Movimiento</SidebarButton>
      </NavLink>
      <div className="w-full h-c-25 bg-gray-600"></div>
      <NavLink to="/model" state={{}} className="w-full">
        <SidebarButton>Modelos</SidebarButton>
      </NavLink>
      <NavLink to="/task" state={{}} className="w-full">
        <SidebarButton>Tareas</SidebarButton>
      </NavLink>
      {/* <NavLink to="/role" state={{}} className="w-full">
        <SidebarButton>Roles</SidebarButton>
      </NavLink> */}
      <div className="w-full h-c-25 bg-gray-600"></div>
      <NavLink to="/not-found" state={{}} className="w-full">
        <SidebarButton>404</SidebarButton>
      </NavLink>
    </Column>
  );
}

export default Sidebar;