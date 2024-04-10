// import { Navigate } from 'react-router-dom';
// import ButtonDemo from '../../../views/uikit/button';
// import ChartDemo from '../../../views/uikit/charts';
// import FileDemo from '../../../views/uikit/file';
// import FloatLabelDemo from '../../../views/uikit/floatlabel';
// import FormLayoutDemo from '../../../views/uikit/formlayout';
// import InputDemo from '../../../views/uikit/input';
// import InvalidStateDemo from '../../../views/uikit/invalidstate';
// import ListDemo from '../../../views/uikit/list';
// import MediaDemo from '../../../views/uikit/media';
// import MenuDemo from '../../../views/uikit/menu';
// import MessagesDemo from '../../../views/uikit/message';
// import MiscDemo from '../../../views/uikit/misc';
// import OverlayDemo from '../../../views/uikit/overlay';
// import PanelDemo from '../../../views/uikit/panel';
// import TreeDemo from '../../../views/uikit/tree';
import TableDemo from '../../../views/uikit/table';

const uiComponentsRoutes = [
  {
    path: '/uikit',
    children: [
      // {
      //   path: '/uikit',
      //   element: <Navigate to="/" replace />,
      // },
      // {
      //   path: 'formlayout',
      //   element: <FormLayoutDemo />,
      // },
      // {
      //   path: 'input',
      //   element: <InputDemo />,
      // },
      // {
      //   path: 'floatlabel',
      //   element: <FloatLabelDemo />,
      // },
      // {
      //   path: 'invalidstate',
      //   element: <InvalidStateDemo />,
      // },
      // {
      //   path: 'button',
      //   element: <ButtonDemo />,
      // },
      {
        path: 'user',
        element: <TableDemo />,
      },
      // {
      //   path: 'list',
      //   element: <ListDemo />,
      // },
      // {
      //   path: 'tree',
      //   element: <TreeDemo />,
      // },
      // {
      //   path: 'panel',
      //   element: <PanelDemo />,
      // },
      // {
      //   path: 'overlay',
      //   element: <OverlayDemo />,
      // },
      // {
      //   path: 'media',
      //   element: <MediaDemo />,
      // },
      // {
      //   path: 'menu',
      //   element: <MenuDemo children={undefined} />,
      // },
      // {
      //   path: 'message',
      //   element: <MessagesDemo />,
      // },
      // {
      //   path: 'file',
      //   element: <FileDemo />,
      // },
      // {
      //   path: 'charts',
      //   element: <ChartDemo />,
      // },
      // {
      //   path: 'misc',
      //   element: <MiscDemo />,
      // },
    ],
  },
];

export default uiComponentsRoutes;
