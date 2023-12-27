import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import './Dishes.css'
import Sidebar from '../SideBar/SideBar.js';
import AddDish from './AddDish.js';
import UpdateDish from './UpdateDish.js';

function Dishes() {

    const location = useLocation();
    const access = location.state ? location.state.access : false;
    const directionAccess = location.state ? location.state.directionAccess : false;
    const [currentUser, setCurrentUser] = useState(() => location.state ? location.state.user : null);

    const [dataDishes, setDataDishes] = useState([])
    const [category, setCategory] = useState('כל המנות')
    const [dataCategories, setDataCategories] = useState([])
    const [dishToUpdate, setDishToUpdate] = useState(null)
    const [search, setSearch] = useState('')

    const [showAddDishDialog, setShowAddDishDialog] = useState(false)
    const [showUpdateDishDialog, setShowUpdateDishDialog] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:4000/api/dishes/categories`)
        .then(response => response.json())
        .then(data => setDataCategories(data.reverse()))
    }, [dataCategories])

    function updateSearch(event){
        setSearch(event.target.value)
    }

    function openAddDishDialog (){
        setShowAddDishDialog(!showAddDishDialog)
    }

    function openUpdateDishDialog (){
        setShowUpdateDishDialog(!showUpdateDishDialog)
    }

    function updateDish(item){
        setShowUpdateDishDialog(true)
        setDishToUpdate(item)
    }

    useEffect(() => {
        fetch(`http://localhost:4000/api/dishes`)
        .then(response => response.json())
        .then(data => setDataDishes(data))
    }, [dataDishes])

    return (
        <div className='Dishes'>
            <Sidebar access={access} directionAccess={directionAccess} user={currentUser}/>
            {access ?
            <div className='Dishes-Page'>
                <div className='DishesPage-Buttons'>
                    <button className='DishesPage-AddDish-Button' onClick={() => setShowAddDishDialog(true)}>הוסף מנה</button>
                    {dataCategories?.map((item) => (
                            <button key={item.id} className='StockPage-Button' onClick={() => setCategory(item.שם)}>
                                {item.שם}
                            </button> 
                        ))}
                    <button className='DishesPage-Button' onClick={() => setCategory('כל המנות')}>כל המנות</button>
                </div>
                <div className='Dishes-TitlePage'>{category}</div>

                <div className='DishesPage-SearchBox'>
                    <input type='text' className='DishesPage-SearchBox-Input' placeholder='חיפוש מנה לפי שם או כשרות' value={search} onChange={updateSearch}></input>
                </div>

                {dataDishes.length &&
                    <div>
                        <div className='Dishes-Headers'>
                            <div className='Dishes-Header'> עלות </div>
                            <div className='Dishes-Header'> כשרות </div>
                            <div className='Dishes-Header'> קטגוריה </div>
                            <div className='Dishes-Header'> שם </div>
                        </div>
                            {dataDishes.map((item) => (
                                ((category === 'כל המנות' || category == item.קטגוריה) && 
                                ((item.שם.includes(search)) || (item.כשרות?.includes(search)))) &&
                            <button key={item.id} className='Dishes-DishRow' onClick={() => updateDish(item)}>
                                <div className='Dish-row-field'> {item.עלות} </div>
                                <div className='Dish-row-field' id={item.כשרות}> {item.כשרות} </div>
                                <div className='Dish-row-field'> {item.קטגוריה} </div>
                                <div className='Dish-row-field'> {item.שם} </div>
                            </button>
                            ))}

                            {showAddDishDialog ? <AddDish OpenClose={openAddDishDialog}/> : null}
                            {showUpdateDishDialog ? <UpdateDish OpenClose={openUpdateDishDialog} DishToUpdate={dishToUpdate}/> : null}                 
                    </div>}
                </div>:<div className='NoAccessAlert'>To access the data please login</div>}
        </div>
    );
}
export default Dishes