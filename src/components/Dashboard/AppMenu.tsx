
import { IModel } from '../../models/commonModel';
import allNavigations from '../Navigation/allDashboardNavigations';
import { MenuProvider } from '../../pages/context/menucontext';
import AppMenuitem from './AppMenuitem';

const AppMenu = () => {
  const model: IModel[] = [...allNavigations];
  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item.separator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
        })}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
