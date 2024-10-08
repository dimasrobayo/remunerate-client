//layouts
import LayoutBasic from '../Presentation/layouts/LayoutBasic';
import LayoutAuth from '../Presentation/layouts/LayoutAuth';

//pages
import Login from '../Presentation/Views/Auth/Login/Login';
import Register from '../Presentation/Views/Auth/Register/Register';

//remuneration book
import RemunerationBook from '../Presentation/Views/RemunerationBook/RemunerationBookList';
import CreateRemunerationBook from '../Presentation/Views/RemunerationBook/create';

//types concepts
import TypesConcepts from '../Presentation/Views/TypesConcepts/List';
import CreateTypesConcepts from '../Presentation/Views/TypesConcepts/create';

//internal categories
import InternalCategories from '../Presentation/Views/InternalCategories/List';
import CreateInternalCategories from '../Presentation/Views/InternalCategories/create';

//institutions
import Institutions from '../Presentation/Views/Institutions/List';
import CreateInstitutions from '../Presentation/Views/Institutions/create';

//companies
import Companies from '../Presentation/Views/Companies/List';
import CreateCompany from '../Presentation/Views/Companies/Create';

//lists
import Lists from '../Presentation/Views/Lists/List';
import CreateList from '../Presentation/Views/Lists/create';

//concepts
import Concepts from '../Presentation/Views/Concepts/ConceptsList';
import CreateConcepts from '../Presentation/Views/Concepts/create';

//employees
import Employees from '../Presentation/Views/Employees/List';
import CreateEmployees from '../Presentation/Views/Employees/Create';

//contracts
import Contracts from '../Presentation/Views/Contracts/List';
import CreateContracts from '../Presentation/Views/Contracts/Create';

//PayrollTemplate
import PayrollTemplate from '../Presentation/Views/PayrollTemplate/List';
import CreatePayrollTemplate from '../Presentation/Views/PayrollTemplate/Create';

//Variables
import Variables from '../Presentation/Views/Variables/Create';

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
        path: "/companies/create",
        layout: LayoutBasic,
        component: CreateCompany,
        exact: true,
    },
    {
        path: "/companies/update/:id",
        layout: LayoutBasic,
        component: CreateCompany,
        exact: true,
    },
    {
        path: "/remunerationbook",
        layout: LayoutBasic,
        component: RemunerationBook,
        exact: true,
    },
    {
        path: "/remunerationbook/create",
        layout: LayoutBasic,
        component: CreateRemunerationBook,
        exact: true,
    },
    {
        path: "/remunerationbook/update/:id",
        layout: LayoutBasic,
        component: CreateRemunerationBook,
        exact: true,
    },
    {
        path: "/concepts",
        layout: LayoutBasic,
        component: Concepts,
        exact: true,
    },
    {
        path: "/concepts/create",
        layout: LayoutBasic,
        component: CreateConcepts,
        exact: true,
    },
    {
        path: "/concepts/update/:id",
        layout: LayoutBasic,
        component: CreateConcepts,
        exact: true,
    },
    {
        path: "/employees",
        layout: LayoutBasic,
        component: Employees,
        exact: true,
    },
    {
        path: "/employees/create",
        layout: LayoutBasic,
        component: CreateEmployees,
        exact: true,
    },
    {
        path: "/employees/update/:id",
        layout: LayoutBasic,
        component: CreateEmployees,
        exact: true,
    },
    {
        path: "/contracts/:id",
        layout: LayoutBasic,
        component: Contracts,
        exact: true,
    },
    {
        path: "/contracts/create/:id",
        layout: LayoutBasic,
        component: CreateContracts,
        exact: true,
    },
    {
        path: "/contracts/update/:id",
        layout: LayoutBasic,
        component: CreateContracts,
        exact: true,
    },
    {
        path: "/payrolltemplate/:id",
        layout: LayoutBasic,
        component: PayrollTemplate,
        exact: true,
    },
    {
        path: "/payrolltemplate/create/:userId",
        layout: LayoutBasic,
        component: CreatePayrollTemplate,
        exact: true,
    },
    {
        path: "/payrolltemplate/update/:userId/:conceptId",
        layout: LayoutBasic,
        component: CreatePayrollTemplate,
        exact: true,
    },
    {
        path: "/variables",
        layout: LayoutBasic,
        component: Variables,
        exact: true,
    },
    {
        path: "*",
        layout: LayoutBasic,
        component: Error404,
    }
];

export default routes;