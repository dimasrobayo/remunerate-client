import React from 'react'
import { Icon } from 'semantic-ui-react'

export default function Notifications({myColor}) {
    return (
        <li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="/#">
                <Icon name='bell' style={{color:myColor}} size='large'/>
                <span className="badge badge-warning navbar-badge">15</span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <span className="dropdown-item dropdown-header">15 Notifications</span>
                <div className="dropdown-divider" />
                <a href="/#" className="dropdown-item">
                    <i className="fas fa-envelope mr-2" /> 4 new messages
                    <span className="float-right text-muted text-sm">3 mins</span>
                </a>

                <div className="dropdown-divider" />
                <a href="/#" className="dropdown-item">
                    <i className="fas fa-users mr-2" /> 8 friend requests
                    <span className="float-right text-muted text-sm">12 hours</span>
                </a>

                <div className="dropdown-divider" />
                <a href="/#" className="dropdown-item">
                    <i className="fas fa-file mr-2" /> 3 new reports
                    <span className="float-right text-muted text-sm">2 days</span>
                </a>

                <div className="dropdown-divider" />
                <a href="/#" className="dropdown-item dropdown-footer">Ver todos los Mensajes</a>
            </div>
        </li>
    )
}
