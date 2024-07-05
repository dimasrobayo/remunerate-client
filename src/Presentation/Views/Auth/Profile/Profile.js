import React from 'react';
import './Profile.scss';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import useViewModel from './ViewModel';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import ListItem from '@mui/material/ListItem';
import { Search, Icon } from 'semantic-ui-react';
import Typography from '@mui/material/Typography';
import {UpdateAuth} from '../UpdateAuth/UpdateAuth';
import Messages from '../../../components/Messages';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Notifications from '../../../components/Notifications';

export default function Profile({grayscale, setGrayscale, changeGrayscale}) {
    const profile = JSON.parse(localStorage.getItem(('my_profile')));
    const {id, name, lastname, myColor} = profile;
    const { 
        state, 
        openModal, 
        setOpenModal, 
        handleOpen, 
        toggleDrawer, 
        closeSession 
    } = useViewModel();
    
    const rightMenu = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Toolbar>
                <Stack direction="row" spacing={2} className='profileImg' >
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
                        
                        <ListItemText onClick={handleOpen} primary="Editar Perfil" />
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

            <Divider />

            <List>
                <ListItem key="4" disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Icon name='shutdown' size='large' style={{color:myColor}} />
                        </ListItemIcon>
                        <ListItemText onClick={closeSession} primary="Cerrar Sessión" />
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
                    <Link to="/home" className="nav-link">Inicio</Link>
                </li>
                
                <li className="nav-item d-none d-sm-inline-block">
                    <Link to="/home" className="nav-link">Contacto</Link>
                </li>
            </ul>

            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Search />
                </li>
                
                <Messages myColor={myColor} />
                
                <Notifications myColor={myColor} />

                <li className="nav-item">
                    <p className="nav-link" data-widget="fullscreen" role="button">
                        <Icon name='expand arrows alternate' style={{color:myColor}} size='large' />
                    </p>
                </li>

                <li className="nav-item" onClick={changeGrayscale}>
                    <p className="nav-link" role="button">
                        <Icon name='adjust' style={{color:myColor}} size='large' />
                    </p>
                </li>
                
                <li className="nav-item" onClick={toggleDrawer('right', true)}>
                    <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="/#" role="button">
                        <Icon name='block layout' style={{color:myColor}} size='large' />
                    </a>
                </li>
            </ul>
            <Drawer
                anchor={'right'}
                open={state['right']}
                onClose={toggleDrawer('right', false)}
            >
                {rightMenu('right')}
            </Drawer>

            <UpdateAuth 
                title="Editar Perfil"
                openModal={openModal}
                setOpenModal={setOpenModal}
                widthModal={646}
                heightModal={720}
            />
        </nav>
    );
}
