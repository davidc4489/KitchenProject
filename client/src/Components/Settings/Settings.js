import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import '../Messages/Messages.css'
import Sidebar from '../SideBar/SideBar.js';

function Settings() {

    const location = useLocation();
    const access = location.state ? location.state.access : false;
    const directionAccess = location.state ? location.state.directionAccess : false;
    const [currentUser, setCurrentUser] = useState(() => location.state ? location.state.user : null);

    const handleCheckboxChange = (order) => {
        let id = order.id
        fetch(`http://localhost:4000/api/suppliersOrdersCalendar/readed`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id}),
        })
            .then(response => {response.json()})
    };

    return (
        <div className='Messages'>
            <Sidebar access={access} directionAccess={directionAccess} user={currentUser}/>
            {access ?
            <div className='Messages-Page'>

                <div className='Messages-TitlePage'>הגדרות משתמש</div>
                    <div>
                        <label className='AddProduct-Label'>עבור כל הזמנה, לשלוח הודעת תזכורת </label>
                        <input className='AddProductPage-Input' type="number" name='כמות'  required/>
                        <label className='AddProduct-Label'>ימים לפני מועד ההזמנה </label>
                    </div>
                </div>:<div className='NoAccessAlert'>To access the data please login</div>}
        </div>
    );
}
export default Settings