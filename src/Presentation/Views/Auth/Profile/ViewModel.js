import { useState } from 'react';
import { removeToken, removeProfile } from '../../../../Store/utils/utils';
import { useNavigate } from 'react-router-dom';

const ProfileViewModel = () => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);

    const handleOpen = () => {
        setOpenModal(true);
    };

    const closeSession = () => {
        removeToken();
        removeProfile();
        navigate('/');
    }

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

    return {
        state,
        openModal,
        setOpenModal,
        handleOpen,
        closeSession,
        toggleDrawer
    }
}

export default ProfileViewModel;