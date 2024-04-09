/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

export const MenuContext = React.createContext({} as any);

export const MenuProvider = (props: any) => {
    const [activeMenu, setActiveMenu] = useState('');

    const value = {
        activeMenu,
        setActiveMenu
    };

    return <MenuContext.Provider value={value}>{props.children}</MenuContext.Provider>;
};
