import React from 'react';
import imgLoginpng from '../../assets/png/imgLogin.png'

export default function LayoutAuth(props) {
    const {children} = props;

    return (
        <div className="wrapper" style={{ display: "flex" }}>
            <div style={{ 
                backgroundColor: "#f6f6fa", 
                width: "70%", 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center" 
            }}>
                <img src={imgLoginpng} alt="imgLoginpng" />
            </div>
            <div style={{ width: "30%" }}>
                {children}
            </div>
        </div>
    )
}
