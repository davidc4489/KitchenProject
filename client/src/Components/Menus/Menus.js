import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import './Menus.css'
import Sidebar from '../SideBar/SideBar.js';
import AddMenu from './AddMenu.js';
import UpdateMenu from './UpdateMenu.js';

function Menus() {

    const location = useLocation();
    const access = location.state ? location.state.access : false;
    const directionAccess = location.state ? location.state.directionAccess : false;
    const [currentUser, setCurrentUser] = useState(() => location.state ? location.state.user : null);

    const [dataMenus, setDataMenus] = useState([])
    const [category, setCategory] = useState('כל התפריטים')
    const [dataCategories, setDataCategories] = useState([])
    const [menuToUpdate, setMenuToUpdate] = useState(null)
    const [search, setSearch] = useState('')

    const [showAddMenuDialog, setShowAddMenuDialog] = useState(false)
    const [showUpdateMenuDialog, setShowUpdateMenuDialog] = useState(false)

    function updateSearch(event){
        setSearch(event.target.value)
    }

    function openAddMenuDialog (){
        setShowAddMenuDialog(!showAddMenuDialog)
    }

    function openUpdateMenuDialog (){
        setShowUpdateMenuDialog(!showUpdateMenuDialog)
    }

    function updateMenu(item){
        setShowUpdateMenuDialog(true)
        setMenuToUpdate(item)
    }

    useEffect(() => {
        fetch(`http://localhost:4000/api/menus`)
        .then(response => response.json())
        .then(data => setDataMenus(data))
    }, [dataMenus])

    useEffect(() => {
        fetch(`http://localhost:4000/api/menus/categories`)
        .then(response => response.json())
        .then(data => setDataCategories(data))
    }, [dataCategories])

    return (
        <div className='Menus'>
            <Sidebar access={access} directionAccess={directionAccess} user={currentUser}/>
            {access ?
            <div className='Menus-Page'>
                <div className='MenusPage-Buttons'>
                    <button className='MenusPage-AddMenu-Button' onClick={() => setShowAddMenuDialog(true)}>הוסף תפריט</button>
                    {dataCategories?.map((item) => (
                            <button key={item.id} className='MenusPage-Button' onClick={() => setCategory(item.שם)}>
                                {item.שם}
                            </button> 
                        ))}
                    <button className='MenusPage-Button' onClick={() => setCategory('כל התפריטים')}>כל התפריטים </button> 
                </div>
                <div className='Menus-TitlePage'>{category}</div>

                <div className='MenusPage-SearchBox'>
                    <input type='text' className='MenusPage-SearchBox-Input' placeholder='חיפוש תפריט לפי שם או כשרות' value={search} onChange={updateSearch}></input>
                </div>

                {dataMenus.length &&
                    <div>
                        <div className='Menus-Headers'>
                            <div className='Menus-Header'> עלות </div>
                            <div className='Menus-Header'> כשרות </div>
                            <div className='Menus-Header'> קטגוריה </div>
                            <div className='Menus-Header'> שם </div>
                        </div>
                            {dataMenus.map((item) => (
                                ((category === 'כל התפריטים' || category == item.קטגוריה) &&
                                 ((item.שם.includes(search)) || (item.כשרות.includes(search)))) &&
                            <button key={item.id} className='Menus-MenuRow' onClick={() => updateMenu(item)} title='פרטי המנות \ עריכת תפריט'>
                                    <div className='Menu-row-field'> {item.עלות} </div>
                                    <div className='Menu-row-field' id={item.כשרות}> {item.כשרות} </div>
                                    <div className='Menu-row-field'> {item.קטגוריה} </div>
                                    <div className='Menu-row-field'> {item.שם} </div>
                            </button>
                            ))}

                            {showAddMenuDialog ? <AddMenu OpenClose={openAddMenuDialog}/> : null}
                            {showUpdateMenuDialog ? <UpdateMenu OpenClose={openUpdateMenuDialog} MenuToUpdate={menuToUpdate}/> : null}                 
                    </div>}
                </div>:<div className='NoAccessAlert'>To access the data please login</div>}
        </div>
    );
}
export default Menus