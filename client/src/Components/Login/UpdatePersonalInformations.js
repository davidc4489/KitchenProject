import React, { useEffect, useState, } from 'react'
import './UpdatePersonalInformations.css'
import validator from "validator";

function UpdatePersonalInformations(props) {

    const userToUpdate = props.UserToUpdate
   
    const [updateValues, setUpdateValues] = useState({
        שם: userToUpdate.שם,
        מייל: userToUpdate.מייל,
        סיסמה:  userToUpdate.סיסמה,
        הרשאה: userToUpdate.הרשאה
    });

    function updateData(event) {
        setUpdateValues({
            ...updateValues,
            [event.target.name]: event.target.value,
        })}

    function saveData() {
        if(!validator.isEmail(updateValues.מייל)){alert('כתובת מייל לא תקינה !')}
        else{
            fetch(`http://localhost:4000/api/users/${userToUpdate.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateValues),
            })
                .then(response => {response.json()})}
    }

    return (
        <div className='UpdateUser-box'>
            <form className='UpdatePersonalInformations-Box-Content'>
                <div className='UpdateUser-Title'>עריכת משתמש</div>
                <div className='UpdateUser-InputBox'>
                    <label className='UpdateUser-Label'>שם :</label>
                    <input className='UpdateUserPage-Input' type="text" name='שם' value={updateValues.שם} onChange={updateData} required pattern=".*\S+.*" title="This field is required"/> 
                    <label className='UpdateUser-Label'>מייל :</label>
                    <input className='UpdateUserPage-Input' type="email" name='מייל' value={updateValues.מייל} onChange={updateData} required pattern=".*\S+.*" title="This field is required"/>
                    <label className='UpdateUser-Label'>סיסמה :</label>
                    <input className='UpdateUserPage-Input' name='סיסמה' value={updateValues.סיסמה} onChange={updateData} required pattern=".*\S+.*" title="This field is required"/>
                    <div>
                </div>

                    <div className='UpdateUser-Buttons'>
                        <button className='UpdateUser-Button' onClick={props.OpenClose}>ביטול</button>
                        <input type='submit' value={'שמירה'} className='UpdateUser-Button' onClick={saveData}></input>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdatePersonalInformations