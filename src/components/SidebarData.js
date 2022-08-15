import React from 'react';
import * as FaIcons from 'react-icons/fa';
// import * as AiIcons from 'react-icons/ai';
// import * as IoIcons from 'react-icons/io';

export const SideBarData = [
    {
        title: 'Ingresos y egresos',
        path: '/home',
        icon: <FaIcons.FaDoorOpen/>,
        cName: 'nav-text'
    },
    {
        title: 'Empleados',
        path: '/empleados',
        icon: <FaIcons.FaMale/>,
        cName: 'nav-text'
    }
]