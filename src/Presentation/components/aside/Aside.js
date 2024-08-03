import React from 'react';
import './sidebar.scss';
import Settings from './nav/Settings';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react'
import Documents from './nav/Documents';
import Stadistics from './nav/Stadistics';
import { Image } from 'semantic-ui-react';
import avatar from '../../../assets/avatar/avatar.png';
import logo from '../../../assets/png/remunerateWhite.png';

export default function Aside(){
  const profile = JSON.parse(localStorage.getItem(('my_profile')));
  const {name, lastname, myColor} = profile;

  return (
  <aside className="main-sidebar sidebar-master-primary elevation-4" style={{backgroundColor: myColor}}>
    <Link to="/home" className="brand-link">
      <Image src={logo} size='small' />
    </Link>
    <div className="sidebar">
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="avatar">
          <Image src={avatar} size='mini' avatar/>
        </div>

        <div className="info">
          <Link to="/home" className="d-block">{name} {lastname}</Link>
        </div>
      </div>

      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li className="nav-item">
            <Link to="/home" className="nav-link">
              <Icon name='home' size='large' />
              <p>
                Tablero
              </p>
            </Link>
          </li>

          {/* SESSION THE SETTINGS */}
          <Settings />

          {/* SESSION THE STADISTICS */}
          <Stadistics />

          <li className="nav-item">
            <Link to="/employees" className="nav-link">
              <Icon className="far fa-id-badge" />
              <p>Colaboradores</p>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/enrollment" className="nav-link">
              <Icon name='money bill alternate outline' />
              <p>Liquidación de Sueldo</p>
            </Link>
          </li>

          {/* SESSION THE DOCUMENTS */}
          <Documents />

          {/* SESSION THE ORDERS */}
          {/* <Planning /> */}
          {/* SESSION THE READING PLAN */}
          {/* <ReadingPlan /> */}
          {/* SESSION THE TESTING */}
          {/* <Testing /> */}
        </ul>
      </nav>
    </div>
  </aside>
)}