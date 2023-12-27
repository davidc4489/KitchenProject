import React, { useEffect, useState, } from 'react'
import './UpdateDish.css'
import UpdateDishIngredients from './UpdateDishIngredients.js';

function UpdateDish(props) {

    const dishToUpdate = props.DishToUpdate
    const [formMode, setFormMode] = useState('edit');
   
    const [updateValues, setUpdateValues] = useState({
        שם: dishToUpdate.שם,
        קטגוריה: dishToUpdate.קטגוריה
    });

    const [dataCategories, setDataCategories] = useState([])
    const [dataDishIngredients, setDataDishIngredients] = useState([])
    const [showUpdateDishIngredientsDialog, setShowUpdateDishIngredientsDialog] = useState(false)
    const [dataStock, setDataStock] = useState([])

    useEffect(() => {
        fetch(`http://localhost:4000/api/stock`)
        .then(response => response.json())
        .then(data => setDataStock(data))
    }, [])

    useEffect(() => {
        fetch(`http://localhost:4000/api/dishes/categories`)
        .then(response => response.json())
        .then(data => setDataCategories(data))
    }, [])

    useEffect(() => {
        fetch(`http://localhost:4000/api/dishes/dishIngredients/${dishToUpdate.id}`)
        .then(response => response.json())
        .then(data => setDataDishIngredients(data))
    }, [dataDishIngredients])

    function openUpdateDishIngredientsDialog (){
        setShowUpdateDishIngredientsDialog(!showUpdateDishIngredientsDialog)
    }

    function updateDishIngredients(){
        setShowUpdateDishIngredientsDialog(true)
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
            fetch(`http://localhost:4000/api/dishes/${dishToUpdate.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateValues),
            })
                .then(response => {response.json()})
    }

    function deleteDish() {
        props.OpenClose()
        setFormMode('delete')
        fetch(`http://localhost:4000/api/dishes/${dishToUpdate.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dishToUpdate),
        })
            .then(response => {response.json()})
}

    const handleClick = (event) => {
      event.preventDefault()
      updateDishIngredients()
    };

    return (
        <div className='UpdateDish-box'>
            <form className='UpdateDish-Box-Content'>
                <div className='UpdateDish-Title'>עריכת מנה</div>
                <div className='UpdateDish-InputBox'>
                    <label className='UpdateDish-Label'>שם : </label>
                    <input className='UpdateDishPage-Input' type="text" name='שם' value={updateValues.שם} onChange={updateData} required={formMode === 'edit'} pattern=".*\S+.*" title="This field is required"/> 
                    <label className='AddMenu-Label'>קטגוריה :</label>
                    <select name='קטגוריה' value={updateValues.קטגוריה} onChange={updateData} required pattern=".*\S+.*" title="This field is required">
                        <option value=''>בחר קטגוריה</option>
                        {dataCategories.map((category) => 
                             <option value={category.שם}>{category.שם}</option>
                        )}
                    </select> 
                </div>
                <div className='ingredients-title'>: רכיבים</div>
                    <div className='add-ingredient-input'>
                        <div className='ingredient-labels'>
                            <label className="ingredientUnity-label">יחידה</label>
                            <label className="ingredientAmount-label">כמות</label>
                            <label className='ingredientName-label'>שם</label>
                        </div>
                        {Array.from(dataDishIngredients).map((ingredient) => (
                            dataStock.map((product) => (
                                product.id == ingredient.idIngredient
                             &&
                            <div className='ingredientsList'>
                                <div>{ingredient.יחידה}</div>
                                <div>{ingredient.כמות}</div>
                                <div>{product.שם_מוצר}</div>
                            </div>
                        ))))}
                    </div>
                <div className='UpdateDish-Buttons'>
                    <button className='UpdateDish-Ingredients-Button' onClick={handleClick}>עריכת רכיבים</button>
                </div>
                <div className='UpdateDish-Buttons'>
                    <button className='UpdateDish-Button' onClick={props.OpenClose}>ביטול</button>
                    <button className='UpdateDish-Button' onClick={deleteDish}>מחיקת מנה</button>
                    <input type='submit' value={'שמירה'} className='UpdateDish-Button' onClick={saveData}></input>
                </div>
            </form>
            {showUpdateDishIngredientsDialog ? <UpdateDishIngredients OpenClose={openUpdateDishIngredientsDialog} DishToUpdate={dishToUpdate}/> : null} 
        </div>
    )
}

export default UpdateDish