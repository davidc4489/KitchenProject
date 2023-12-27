import style from './login.module.css'
import { useLocation } from 'react-router-dom';
import React, { useRef, useState, useEffect } from 'react'
import Sidebar from '../SideBar/SideBar.js';
import UpdatePersonalInformations from './UpdatePersonalInformations.js';

const Login = () => {

    const location = useLocation();
    const [userToUpdate, setUserToUpdate] = useState(null)
    const [currentUser, setCurrentUser] = useState(() => location.state ? location.state.user : null);

    const [showUpdatePersonalInformationsDialog, setShowUpdatePersonalInformationsDialog] = useState(false)

    const [data, setData] = useState([])
    const [access, setAccess] = useState(location.state ? location.state.access : false)
    const [directionAccess, setDirectionAccess] = useState(location.state ? location.state.directionAccess : false)

    const permissions = ['עובד', 'מנהל']

    useEffect(() => {
        fetch(`http://localhost:4000/api/users/`)
            .then(response => response.json())
            .then(data => setData(data))
    })

    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    const permissionInputRef = useRef()

    const submitHandler = (event) => {
        event.preventDefault()
        const enteredEmail = emailInputRef.current.value
        const enteredPassword = passwordInputRef.current.value
        const enteredPermission = permissionInputRef.current.value

        let authenticatedUser = data.find(user => user.מייל === enteredEmail && user.סיסמה === enteredPassword && user.הרשאה === enteredPermission)
        setUserToUpdate(authenticatedUser)
        setCurrentUser(authenticatedUser)

        if (authenticatedUser) {
            setAccess(true)
            if (authenticatedUser.הרשאה == 'Direction'){
                setDirectionAccess(true)
            }
            else{
                setDirectionAccess(false)
            }
            alert(`'Hello' ${authenticatedUser.שם} '!' `)
        } else{
            setAccess(false)
            setDirectionAccess(false)
            alert('Email, Password or Permission Incorrect !')
        }
        
        emailInputRef.current.value = ''
        passwordInputRef.current.value = ''
        permissionInputRef.current.value = ''
    }

    function logout () {setAccess(false)}

    function openUpdatePersonalInformationsDialog (){
        setShowUpdatePersonalInformationsDialog(!showUpdatePersonalInformationsDialog)
    }

    function updatePersonalInformations(item){
        setShowUpdatePersonalInformationsDialog(true)
        setUserToUpdate(item)
    }

    return (
        <div className={style.login}>
        <Sidebar access={access} directionAccess={directionAccess} user={currentUser}/>
        {access === false || access !== true?
        <div>
        <div className={style.loginbox}>
        <div className={style.titlelogin}>כניסת משתמש</div>
        <form onSubmit={submitHandler}>
            <input className={style.logininput} ref={emailInputRef} placeholder=" מייל" type='email' id='email' required/>
            <input className={style.logininput} ref={passwordInputRef} placeholder=" סיסמה" type='password' id='password' required/>
            <select className={style.logininput} id='permission' ref={permissionInputRef}>
                        <option value=''>בחר הרשאה</option>
                        {permissions.map((permission) => 
                            <option value={permission}>{permission}</option>
                        )}
                    </select>
            <div className={style.loginbuttoncontainer}>
                <button type="submit" className={style.loginbutton} onClick={()=>{}}>כניסה</button>
            </div>
        </form>
        </div>
        </div>
        :        
        <div>
            <div className={style.logoutbox}>
                <div className={style.titlelogout}>Logout</div>
                    <div className={style.logoutbuttonbox}>
                    <button className={style.personalinformationsbutton} onClick={() => updatePersonalInformations(userToUpdate)}>Change Email or Password</button>
                    <button className={style.logoutbutton} onClick={logout}>Logout</button>
                    </div>
                </div>
                {showUpdatePersonalInformationsDialog ? <UpdatePersonalInformations OpenClose={openUpdatePersonalInformationsDialog} UserToUpdate={currentUser}/> : null}  
            </div>}
        </div>
    )
}

export default Login