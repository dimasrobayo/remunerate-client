import React from 'react'
import { Icon } from 'semantic-ui-react'

export default function Messages({myColor}) {
    return (
        <li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="/#">
                <Icon name='wechat' style={{color:myColor}} size='large' />
                <span className="badge badge-danger navbar-badge">3</span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <a href="/#" className="dropdown-item">
                    <div className="media">
                        <img src="dist/img/user1-128x128.jpg" alt="User Avatar" className="img-size-50 mr-3 img-circle" />
                        <div className="media-body">
                            <h3 className="dropdown-item-title">
                                Brad Diesel
                                <span className="float-right text-sm text-danger"><i className="fas fa-star" /></span>
                            </h3>
                            <p className="text-sm">Llamame cuendo puedas...</p>
                            <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
                        </div>
                    </div>
                </a>

                <div className="dropdown-divider" />

                <a href="/#" className="dropdown-item">
                    <div className="media">
                        <img src="dist/img/user8-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
                        <div className="media-body">
                            <h3 className="dropdown-item-title">
                                John Pierce
                                <span className="float-right text-sm text-muted"><i className="fas fa-star" /></span>
                            </h3>
                            <p className="text-sm">I got your message bro</p>
                            <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
                        </div>
                    </div>
                </a>

                <div className="dropdown-divider" />

                <a href="/#" className="dropdown-item">
                    <div className="media">
                        <img src="dist/img/user3-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
                        <div className="media-body">
                            <h3 className="dropdown-item-title">
                                Nora Silvester
                                <span className="float-right text-sm text-warning"><i className="fas fa-star" /></span>
                            </h3>
                            <p className="text-sm">The subject goes here</p>
                            <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
                        </div>
                    </div>
                </a>

                <div className="dropdown-divider" />

                <a href="/#" className="dropdown-item dropdown-footer">Ver todos los Mensajes</a>
            </div>
        </li>
    )
}
