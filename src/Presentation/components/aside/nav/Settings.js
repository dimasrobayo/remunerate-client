import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

export default function Settings() {
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
        <Link to="#" name="configuracion" className="nav-link" onClick={() => menuOpen()}>
            <Icon className="nav-icon fas fa-cogs" />
            <p>
                Configuraciones
                <Icon className="fas fa-angle-left right" />
            </p>
        </Link>
        <ul className="nav nav-treeview">
            <li className="nav-item">
                <Link to="/internalcategories" className="nav-link">
                <Icon className='far fa-circle' />
                    <p>Categorias Internas</p>
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/typesconcepts" className="nav-link">
                <Icon className='far fa-circle' />
                    <p>Tipos de Conceptos</p>
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/institutions" className="nav-link">
                <Icon className='far fa-circle' />
                    <p>Instituciones</p>
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/lists" className="nav-link">
                <Icon className='far fa-circle' />
                    <p>Listas</p>
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/companies" className="nav-link">
                <Icon className='far fa-circle' />
                    <p>Empresas</p>
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/subjets" className="nav-link">
                <Icon className='far fa-circle' />
                    <p>Conceptos</p>
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/subjets" className="nav-link">
                <Icon className='far fa-circle' />
                    <p>Funciones</p>
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/subjets" className="nav-link">
                <Icon className='far fa-circle' />
                    <p>Variables</p>
                </Link>
            </li>
        </ul>
    </li>
  );
}
