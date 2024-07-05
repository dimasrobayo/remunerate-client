import React from 'react';

export default function Widgets() {
    return (
    <li className="nav-item">
        <a href="pages/widgets.html" className="nav-link">
            <i className="nav-icon fas fa-th" />
            <p>
                Widgets
                <span className="right badge badge-danger">New</span>
            </p>
        </a>
    </li>
    );
}
