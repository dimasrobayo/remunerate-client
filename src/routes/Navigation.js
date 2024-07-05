import React from 'react';
import { map } from 'lodash';
import routes from './routes';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function Navigation() {
    return (
        <Router>
            <Routes>
                {map(routes, (route, index) => (
                    <Route 
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        element={
                            <route.layout>
                                <route.component />
                            </route.layout>
                        }
                    />
                ))}
            </Routes>
        </Router>
    );
}