import { classNames } from "primereact/utils";
import { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import { Link } from "react-router-dom";
import { LayoutContext } from "../context/layoutcontext";

const AppTopbar = forwardRef((_props, ref) => {
  const { layoutState, onMenuToggle, showProfileSidebar } =
    useContext(LayoutContext);
  const menubuttonRef = useRef(null);
  const topbarmenuRef = useRef(null);
  const topbarmenubuttonRef = useRef(null);
  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
    topbarmenu: topbarmenuRef.current,
    topbarmenubutton: topbarmenubuttonRef.current,
  }));

  const handleLogout = () => {
    localStorage.removeItem("Token");
  };

  return (
    <div className="layout-topbar">
      <Link to="/" className="layout-topbar-logo">
        <>
          <span>MockProject</span>
        </>
      </Link>

      <button
        ref={menubuttonRef}
        type="button"
        className="p-link layout-menu-button layout-topbar-button"
        onClick={onMenuToggle}>
        <i className="pi pi-bars" />
      </button>

      <button
        ref={topbarmenubuttonRef}
        type="button"
        className="p-link layout-topbar-menu-button layout-topbar-button"
        onClick={showProfileSidebar}>
        <i className="pi pi-ellipsis-v" />
      </button>

      <div
        ref={topbarmenuRef}
        className={classNames("layout-topbar-menu", {
          "layout-topbar-menu-mobile-active": layoutState.profileSidebarVisible,
        })}>
        <button type="button" className="p-link layout-topbar-button">
          <i className="pi pi-calendar"></i>
          <span>Calendar</span>
        </button>
        <Link to={"/auth/login"} onClick={handleLogout}>
          <button type="button" className="p-link layout-topbar-button">
            <i className="pi pi-sign-out"></i>
            <span>Logout</span>
          </button>
        </Link>
        <Link to="/documentation">
          <button type="button" className="p-link layout-topbar-button">
            <i className="pi pi-cog"></i>
            <span>Settings</span>
          </button>
        </Link>
      </div>
    </div>
  );
});

export default AppTopbar;
