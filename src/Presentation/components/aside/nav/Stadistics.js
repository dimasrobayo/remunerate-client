import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

export default function Stadistics() {
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
      <Link to="#" className="nav-link" onClick={() => menuOpen()}>
        <Icon className="nav-icon fas fa-chart-pie" />
          <p>
            Estadisticas
            <Icon className="right fas fa-angle-left" />
          </p>
      </Link>
        <ul className="nav nav-treeview">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <Icon className="far fa-circle nav-icon" />
              <p>General de Nominas</p>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/" className="nav-link">
              <Icon className="far fa-circle nav-icon" />
              <p>Estadisticas Asistencias</p>
            </Link>
          </li>
          
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <Icon className="far fa-circle nav-icon" />
              <p>Estadisticas Calificaciones</p>
            </Link>
          </li>
        </ul>
    </li>
  );
}
