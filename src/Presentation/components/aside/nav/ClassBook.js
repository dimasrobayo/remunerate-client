import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

export default function ClassBook() {
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
      <Link to="/" className="nav-link" onClick={() => menuOpen()}>
        <Icon name="sitemap" />
          <p>
            Libro de Clase
            <Icon className="fas fa-angle-left right" />
          </p>
      </Link>
      <ul className="nav nav-treeview">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            <Icon className="far fa-circle nav-icon" />
            <p>Asignatura por Bloques</p>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/" className="nav-link">
            <Icon className="far fa-circle nav-icon" />
            <p>Asistencia Diaria</p>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/" className="nav-link">
            <Icon className="far fa-circle nav-icon" />
            <p>Calificaciones</p>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/" className="nav-link">
              <Icon className="far fa-circle nav-icon" />
              <p>Inf. de Personalidad</p>
          </Link>
        </li>
        
        <li className="nav-item">
          <Link to="/" className="nav-link">
              <Icon className="far fa-circle nav-icon" />
              <p>Hoja de V&iacute;da</p>
          </Link>
        </li>
      </ul>
    </li>
  );
}
