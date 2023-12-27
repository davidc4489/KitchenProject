import React, { useState, useEffect } from 'react';
import './UpdateMenuDishes.css';

function UpdateMenuDishes(props) {

    const menuToUpdate = props.MenuToUpdate
    const [dishId, setDishId] = useState('');
    const [dataDishes, setDataDishes] = useState([])
    const [dataMenuDishes, setDataMenuDishes] = useState([])

    useEffect(() => {
        fetch(`http://localhost:4000/api/dishes`)
        .then(response => response.json())
        .then(data => setDataDishes(data))
    }, [])

    useEffect(() => {
        fetch(`http://localhost:4000/api/menus/menuDishes/${menuToUpdate.id}`)
        .then(response => response.json())
        .then(data => setDataMenuDishes(data))
    }, [dataMenuDishes])

    const [updateValues, setUpdateValues] = useState({
        id: menuToUpdate?.id || '',
        שם: menuToUpdate?.שם || '',
        dishes: []
    });

    function addDish(event) {
        event.preventDefault()

        const newDish = {
            id: dishId
        };
        setUpdateValues(prevState => ({
            ...prevState,
            dishes: [...prevState.dishes, newDish]
        }))
    }

    function saveData(event) {
        event.preventDefault()
        if (updateValues.id) {
            fetch(`http://localhost:4000/api/menus/${updateValues.id}`, {
                method: 'PUT', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateValues),  
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } 
        props.OpenClose();
    }

    return (
        <div className='UpdateDish-box'>
            <form className='UpdateDish-Box-Content'>
                <div className='UpdateDish-Title'>עריכת מנות</div>
                <div className='UpdateDish-InputBox'>
                    <label className='AddMenu-Label'>: מנות</label>
                    <select name='dishId' onChange={(e) => setDishId(e.target.value)} value={updateValues.dishes.id} required pattern=".*\S+.*" title="This field is required">
                        <option value=''>בחר מנה</option>
                        {dataDishes.map((item) => 
                             <option key={item.id} value={item.id}>{item.שם}</option>
                        )}
                    </select>
                    <br></br>
                    <button className="add-ingredient-button" onClick={addDish}>הוספת מנה</button>
                    <br></br>
                    <table id="ingredientsTable">
                        <tbody>
                            {dataMenuDishes.map((dish, idx) => (
                                <tr key={idx}>
                                    {dataDishes.map((item) => (
                                        ((item.id == dish.idDish) && (dish.כמות>0) &&
                                        ((updateValues.dishes?.filter(value => (value.id == dish.idDish))).length == 0)
                                        )&&
                                    <div className='ingredientItem'>
                                        <td className='ingredientItem-Name'>{item.שם} :</td>
                                        <td className='ingredientItem-Name'>{item.קטגוריה}</td>
                                    </div>))}
                                </tr>
                            ))}
                            {updateValues.dishes.map((dish, idx) => (
                                <tr key={idx}>
                                    {dataDishes.map((item) => (
                                        ((item.id == dish.id))&&
                                    <div className='ingredientItem'>
                                        <td className='ingredientItem-Name'>{item.שם} :</td>
                                        <td className='ingredientItem-Name'>{item.קטגוריה}</td>
                                    </div>))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                    <div className='UpdateDish-Buttons'>
                        <button className='UpdateDish-Button' onClick={props.OpenClose}>ביטול</button>
                        <input type='submit' value={'שמירה'} className='UpdateDish-Button' onClick={saveData}></input>
                    </div>
            </form>
        </div>
    )
}

export default UpdateMenuDishes;