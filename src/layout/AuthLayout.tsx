import { classNames } from 'primereact/utils';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { LayoutContext } from './context/layoutcontext';

const AuthLayout = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    return (
        <div className={containerClassName}>
            <Outlet />
        </div>
    );
};

export default AuthLayout;
