import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

const PrivateRoute = ({ layout: Layout, component: Component, ...rest }) => {
    const { session } = useContext( UserContext )
    console.log(session)

    return (
        <Route
            {...rest}
            render={(props) =>
                <Layout>
                    <Component {...props} />
                </Layout>
            }
        />
    );
};

export default PrivateRoute;