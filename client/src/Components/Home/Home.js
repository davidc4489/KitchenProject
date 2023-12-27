import Sidebar from "../SideBar/SideBar.js"
import { useLocation } from 'react-router-dom';
import React, { useState, } from 'react'
import './Home.css'

export default function Home(){

    const location = useLocation();
    const access = location.state ? location.state.access : false;
    const directionAccess = location.state ? location.state.directionAccess : null;
    const [currentUser, setCurrentUser] = useState(() => location.state ? location.state.user : null);

    return (
        <div className="Home">
            <Sidebar access={access} directionAccess={directionAccess} user={currentUser}/>
            <div className="Home-Titles">
                <div className="Home-FirstTitle">ברוכים הבאים לאיזי<span className="Home-LogoTitle">קיטשן</span> אפליקציה</div>
                <div className="Home-SecondTitle">האפליקציה המובילה לניהול מטבח</div>
                {access == false &&<div className="Home-ThirdTitle">נא להזדהות עבור גישה לנתונים</div>}
            </div>
        </div>
    )
}