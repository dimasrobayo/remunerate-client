import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

export default function Reports() {
  const [statusActive, setStatusActive] = useState(false);
  const [active, setActive] = useState('nav-item');
  
  const menuOpen = () => {
    setStatusActive(!statusActive);
  
    !statusActive
    ? 
      setActive('nav-item menu-is-opening menu-open')
    :
      setActive('nav-item')
  }
  
  return (
    <li className={active}>
      <Link to="/#" className="nav-link" onClick={ () => menuOpen()}>
        <Icon className="nav-icon fas fa-edit" />
          <p>
            Reporte
            <Icon className="fas fa-angle-left right" />
          </p>
      </Link>

      <ul className="nav nav-treeview">
        <li className="nav-item">
          <Link to="pages/forms/general.html" className="nav-link">
            <Icon className="far fa-circle nav-icon" />
            <p>General Elements</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="pages/forms/advanced.html" className="nav-link">
            <Icon className="far fa-circle nav-icon" />
            <p>Advanced Elements</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="pages/forms/editors.html" className="nav-link">
            <Icon className="far fa-circle nav-icon" />
            <p>Editors</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="pages/forms/validation.html" className="nav-link">
            <Icon className="far fa-circle nav-icon" />
            <p>Validation</p>
          </Link>
        </li>
      </ul>
    </li>
  );
}
