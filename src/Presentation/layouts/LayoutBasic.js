import React, { useState } from 'react';
import Aside from '../components/aside/Aside';
import Footer from '../components/footer/Footer';
import Profile from '../Views/Auth/Profile/Profile';

export default function LayoutBasic(props) {
    const {children} = props;
    const [grayscale, setGrayscale] = useState(false);  

    const changeGrayscale = () => {
        setGrayscale(!grayscale);
        localStorage.setItem('grayscale', grayscale);
    };

    return (
        <div className={grayscale === 'true' ? 'wrapper grayscale' : 'wrapper'}>
            <Profile grayscale={grayscale} setGrayscale={setGrayscale} changeGrayscale={changeGrayscale} />
            <Aside />
            <>
                {children}
            </>
            <Footer />
        </div>
    )
}
