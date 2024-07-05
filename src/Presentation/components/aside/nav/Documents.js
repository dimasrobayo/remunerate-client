import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

export default function Documents() {
return (
    <li className="nav-item">
        <Link to="#" className="nav-link">
            <Icon name="book" className="nav-icon " />
            <p>Documentación</p>
        </Link>
    </li>
)}
