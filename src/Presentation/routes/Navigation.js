import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute'; 
import PrivateRoutes from './PrivateRoutes';
import { UserProvider } from '../Context/UserContext';

const Navigation = () => {
    return (
        <UserStateContext>
            <Router>
                <Switch>
                    {PrivateRoutes.map((route, index) => (
                        <PrivateRoute
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            layout={route.layout}
                            component={route.component}
                        />
                    ))}
                </Switch>
            </Router>
        </UserStateContext>
    );
};

const UserStateContext = ({children}) => {
    return (
        <UserProvider>
            { children }
        </UserProvider>
    )
}

export default Navigation;