import React, { useState }from 'react';
import './Header.scss';
import Messages from '../Messages';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import Notifications from '../Notifications';
import ListItem from '@mui/material/ListItem';
import { Search, Icon } from 'semantic-ui-react';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

export default function Header() {
    const profile = JSON.parse(localStorage.getItem(('my_profile')));
    const {id, name, lastname, myColor} = profile;

    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
    };
    
    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Toolbar>
                <Stack direction="row" spacing={2}>
                    <Avatar alt={name} src="/static/images/avatar/1.jpg" />
                </Stack> 
                <Typography variant="h6" noWrap component="div" className="header_profile">
                    {name} {lastname}
                </Typography>               
            </Toolbar>
            
            <Divider />

            <List>
                <ListItem key={id} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Icon name='user' type="material" size='large' style={{color:myColor}} />
                        </ListItemIcon>
                        <ListItemText primary="Editar Perfil" />
                    </ListItemButton>
                </ListItem>
            </List>
            
            <List>
                <ListItem key={id} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Icon name='lock' type="material" size='large' style={{color:myColor}} />
                        </ListItemIcon>
                        <ListItemText primary="Cambiar Contraseña" />
                    </ListItemButton>
                </ListItem>
            </List>

            <List>
                <ListItem key="4" disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Icon name='shutdown' size='large' style={{color:myColor}} />
                        </ListItemIcon>
                        <ListItemText primary="Cerrar Sessión" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="/#" role="button"><i className="fas fa-bars" /></a>
                </li>

                <li className="nav-item d-none d-sm-inline-block">
                    <Link to="/" className="nav-link">Inicio</Link>
                </li>
                
                <li className="nav-item d-none d-sm-inline-block">
                    <a href="/#" className="nav-link">Contacto</a>
                </li>
            </ul>

            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Search />
                </li>
                
                <Messages />
                
                <Notifications />

                <li className="nav-item">
                    <a className="nav-link" data-widget="fullscreen" href="/#" role="button">
                        <i className="fas fa-expand-arrows-alt" />
                    </a>
                </li>
                
                <li className="nav-item" onClick={toggleDrawer('right', true)}>
                    <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="/#" role="button">
                        <i className="fas fa-th-large" />
                    </a>
                </li>
            </ul>
            <Drawer
                anchor={'right'}
                open={state['right']}
                onClose={toggleDrawer('right', false)}
            >
                {list('right')}
            </Drawer>
        </nav>
    );
}
