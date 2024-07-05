import React from 'react';

export default function Planning() {
    return (
        <li className="nav-item">
            <a href="pages/gallery.html" className="nav-link">
                <i className="nav-icon fas fa-calendar" />
                <p>
                    Planificacciones
                    <i className="fas fa-angle-left right" />
                </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <a href="pages/UI/general.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Mis Cronogramas</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="pages/UI/icons.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Crear Cronograma</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="pages/UI/buttons.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Cuaderno de Tareas</p>
                </a>
              </li>
            </ul>
        </li>
    );
}
