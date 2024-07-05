import LayoutAuth from '../layouts/LayoutAuth';
import LayoutBasic from '../layouts/LayoutBasic';

//pages
import Login from '../Views/Auth/Login/Login';
import Register from '../Views/Auth/Register/Register';

import Home from '../Views/Home';

import Error404 from '../../pages/error404';

const PrivateRoutes = [
    {
        path: "/",
        layout: LayoutAuth,
        component: Login,
        exact: true,
    },
    {
        path: "/register",
        layout: LayoutAuth,
        component: Register,
        exact: true,
    },
    {
        path: "/home",
        layout: LayoutBasic,
        component: Home,
        exact: true,
    },
    {
        layout: LayoutBasic,
        component: Error404,
    }
];

export default PrivateRoutes;