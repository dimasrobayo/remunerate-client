import React from 'react';
import { Link } from 'react-router-dom';

export default function Title({ title, component, position, path }) {
    const profile = JSON.parse(localStorage.getItem(('my_profile')));

    return (
        <div className="container-fluid">
            <div className="row mb-2">
                <div className="col-sm-6">
                    <h1 className="m-0" style={{color: profile.myColor}}>{title}</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item">
                            <Link to={path} style={{color: profile.myColor}}>{component}</Link>{position}
                        </li>
                        <li className="breadcrumb-item active">Tablero v1</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}
