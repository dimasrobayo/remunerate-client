//layouts
import LayoutBasic from '../Presentation/layouts/LayoutBasic';
import LayoutAuth from '../Presentation/layouts/LayoutAuth';

//pages
import Login from '../Presentation/Views/Auth/Login/Login';
import Register from '../Presentation/Views/Auth/Register/Register';

//internal categories
import InternalCategories from '../Presentation/Views/InternalCategories/List';
import CreateInternalCategories from '../Presentation/Views/InternalCategories/create';

//types concepts
import TypesConcepts from '../Presentation/Views/TypesConcepts/List';
import CreateTypesConcepts from '../Presentation/Views/TypesConcepts/create';

//institutions
import Institutions from '../Presentation/Views/Institutions/List';
import CreateInstitutions from '../Presentation/Views/Institutions/create';

//lists
import Lists from '../Presentation/Views/Lists/List';
import CreateList from '../Presentation/Views/Lists/create';

//companies
import Companies from '../Presentation/Views/Companies/List';


import Home from '../Presentation/Views/Home';
import Error404 from '../Presentation/Views/error404';

const routes = [
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
        path: "/internalcategories",
        layout: LayoutBasic,
        component: InternalCategories,
        exact: true,
    },
    {
        path: "/internalcategories/create",
        layout: LayoutBasic,
        component: CreateInternalCategories,
        exact: true,
    },
    {
        path: "/internalcategories/update/:id",
        layout: LayoutBasic,
        component: CreateInternalCategories,
        exact: true,
    },
    {
        path: "/typesconcepts",
        layout: LayoutBasic,
        component: TypesConcepts,
        exact: true,
    },
    {
        path: "/typesconcepts/create",
        layout: LayoutBasic,
        component: CreateTypesConcepts,
        exact: true,
    },
    {
        path: "/typesconcepts/update/:id",
        layout: LayoutBasic,
        component: CreateTypesConcepts,
        exact: true,
    },
    {
        path: "/institutions",
        layout: LayoutBasic,
        component: Institutions,
        exact: true,
    },
    {
        path: "/institutions/create",
        layout: LayoutBasic,
        component: CreateInstitutions,
        exact: true,
    },
    {
        path: "/institutions/update/:id",
        layout: LayoutBasic,
        component: CreateInstitutions,
        exact: true,
    },
    {
        path: "/lists",
        layout: LayoutBasic,
        component: Lists,
        exact: true,
    },
    {
        path: "/lists/create",
        layout: LayoutBasic,
        component: CreateList,
        exact: true,
    },
    {
        path: "/lists/update/:id",
        layout: LayoutBasic,
        component: CreateList,
        exact: true,
    },
    {
        path: "/companies",
        layout: LayoutBasic,
        component: Companies,
        exact: true,
    },
    {
        path: "*",
        layout: LayoutBasic,
        component: Error404,
    }
];

export default routes;