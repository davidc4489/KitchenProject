import React, { useEffect, useState, } from 'react'
import './UpdateMenu.css'
import UpdateMenuDishes from './UpdateMenuDishes.js';

function UpdateMenu(props) {

    const menuToUpdate = props.MenuToUpdate
    const [formMode, setFormMode] = useState('edit');
   
    const [updateValues, setUpdateValues] = useState({
        שם: menuToUpdate.שם,
        קטגוריה: menuToUpdate.קטגוריה
    });

    const [dataCategories, setDataCategories] = useState([])
    const [dataMenuDishes, setDataMenuDishes] = useState([])
    const [showUpdateMenuDishesDialog, setShowUpdateMenuDishesDialog] = useState(false)
    const [dataDishes, setDataDishes] = useState([])

    useEffect(() => {
        fetch(`http://localhost:4000/api/dishes`)
        .then(response => response.json())
        .then(data => setDataDishes(data))
    }, [])

    useEffect(() => {
        fetch(`http://localhost:4000/api/menus/categories`)
        .then(response => response.json())
        .then(data => setDataCategories(data.reverse()))
    }, [dataCategories])

    useEffect(() => {
        fetch(`http://localhost:4000/api/menus/menuDishes/${menuToUpdate.id}`)
        .then(response => response.json())
        .then(data => setDataMenuDishes(data))
    }, [dataMenuDishes])

    function openUpdateMenuDishesDialog (){
        setShowUpdateMenuDishesDialog(!showUpdateMenuDishesDialog)
    }

    function updateMenuDishes(){
        setShowUpdateMenuDishesDialog(true)
        // setDishToUpdate(item)
    }

    function updateData(event) {
        setUpdateValues({
            ...updateValues,
            [event.target.name]: event.target.value,
        })
        setFormMode('edit')
    }

    function saveData() {
        setFormMode('edit')
            fetch(`http://localhost:4000/api/menus/${menuToUpdate.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateValues),
            })
                .then(response => {response.json()})
    }

    function deleteMenu() {
        props.OpenClose()
        setFormMode('delete')
        fetch(`http://localhost:4000/api/menu/${menuToUpdate.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(menuToUpdate),
        })
            .then(response => {response.json()})
}

    const handleClick = (event) => {
        event.preventDefault()
        updateMenuDishes()
    };

    return (
        <div className='UpdateMenu-box'>
            <form className='UpdateMenu-Box-Content'>
                <div className='UpdateMenu-Title'>עריכת תפריט</div>
                <div className='UpdateMenu-InputBox'>
                    <label className='UpdateMenu-Label'>שם : </label>
                    <input className='UpdateMenuPage-Input' type="text" name='שם' value={updateValues.שם} onChange={updateData} required={formMode === 'edit'} pattern=".*\S+.*" title="This field is required"/> 
                    <label className='UpdateMenu-Label'>קטגוריה :</label>
                    <select name='קטגוריה' value={updateValues.קטגוריה} onChange={updateData} required pattern=".*\S+.*" title="This field is required">
                        <option value=''>בחר קטגוריה</option>
                        {dataCategories.map((category) => 
                             <option value={category.שם}>{category.שם}</option>
                        )}
                    </select> 
                    <div>
                </div>
                <div className='ingredients-title'>: מנות</div>
                    <div className='add-ingredient-input'>
                        <div className='ingredient-labels'>
                            <label className='ingredientName-label'>שם</label>
                        </div>
                        {Array.from(dataMenuDishes).map((dish) => (
                            dataDishes.map((product) => (
                                product.id == dish.idDish
                             &&
                            <div className='ingredientsList'>
                                <div>{product.קטגוריה}</div>
                                <div>{product.שם}</div>
                            </div>
                        ))))}
                    </div>
                    <div className='UpdateDish-Buttons'>
                        <button className='UpdateDish-Ingredients-Button' onClick={handleClick}>עריכת מנות</button>
                    </div>
                    <div className='UpdateMenu-Buttons'>
                        <button className='UpdateMenu-Button' onClick={props.OpenClose}>ביטול</button>
                        <button className='UpdateMenu-Button' onClick={deleteMenu}>מחיקת תפריט</button>
                        <input type='submit' value={'שמירה'} className='UpdateMenu-Button' onClick={saveData}></input>
                    </div>
                </div>
            </form>
            {showUpdateMenuDishesDialog ? <UpdateMenuDishes OpenClose={openUpdateMenuDishesDialog} MenuToUpdate={menuToUpdate}/> : null} 
        </div>
    )
}

export default UpdateMenu