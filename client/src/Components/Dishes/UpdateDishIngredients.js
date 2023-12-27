import React, { useState, useEffect } from 'react';
import './UpdateDishIngredients.css';

function UpdateDishIngredients(props) {

    const dishToUpdate = props.DishToUpdate
    const [ingredientId, setIngredientId] = useState('');
    const [ingredientAmount, setIngredientAmount] = useState('');
    const [ingredientUnity, setIngredientUnity] = useState('גרם');
    const [dataStock, setDataStock] = useState([])
    const [dataDishIngredients, setDataDishIngredients] = useState([])

    useEffect(() => {
        fetch(`http://localhost:4000/api/stock`)
        .then(response => response.json())
        .then(data => setDataStock(data))
    }, [])

    useEffect(() => {
        fetch(`http://localhost:4000/api/dishes/dishIngredients/${dishToUpdate.id}`)
        .then(response => response.json())
        .then(data => setDataDishIngredients(data))
    }, [dataDishIngredients])

    const [updateValues, setUpdateValues] = useState({
        id: dishToUpdate?.id || '',
        שם: dishToUpdate?.שם || '',
        ingredients: []
    });

    function addIngredient(event) {
        event.preventDefault()

        let updateIngredient = []
        updateIngredient = updateValues.ingredients?.filter(item => (item.id == ingredientId))
        if(updateIngredient.length>0){
            for (let i = 0; i<updateValues.ingredients.length; i++){
                if(updateValues.ingredients[i].id === ingredientId){
                    updateValues.ingredients[i].amount = ingredientAmount
                    updateValues.ingredients[i].unity = ingredientUnity
                }
            }
        }
        else {
            const newIngredient = {
                id: ingredientId,
                amount: ingredientAmount > 0 ? ingredientAmount : 0,
                unity: ingredientUnity,
            };
            setUpdateValues(prevState => ({
                ...prevState,
                ingredients: [...prevState.ingredients, newIngredient]
            }));}
            console.log(updateIngredient)
            setIngredientAmount('');
            setIngredientId('');
    }

    function saveData(event) {
        event.preventDefault()
        if (updateValues.id) {
            fetch(`http://localhost:4000/api/dishes/${updateValues.id}`, {
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
                <div className='UpdateDish-Title'>עריכת רכיבים</div>
                <div className='UpdateDish-InputBox'>
                    <label className='AddMenu-Label'>: רכיבים</label>
                    <select name='ingredientId' onChange={(e) => setIngredientId(e.target.value)} value={updateValues.ingredients.id} required pattern=".*\S+.*" title="This field is required">
                        <option value=''>בחר רכיב</option>
                        {dataStock.map((item) => 
                             <option key={item.id} value={item.id}>{item.שם_מוצר}</option>
                        )}
                    </select>
                    <label className='AddMenu-Label' htmlFor="ingredientAmount">: כמות</label> 
                    <input type="number" id="ingredientAmount" value={ingredientAmount} onChange={(e) => e.target.value > 0 ? setIngredientAmount(e.target.value): setIngredientAmount(0) } required pattern=".*\S+.*" title="This field is required"/>
                    <label className='AddMenu-Label'>: יחידה</label>
                    <select id="amountType" value={ingredientUnity} onChange={(e) => setIngredientUnity(e.target.value)}>
                        <option value="גרם">גרם</option>
                        <option value='ק"ג'>ק"ג</option>
                        <option value="גרם">ליטר</option>
                        <option value="יחידה">יחידה</option>
                    </select>
                    <br></br>
                    <button className="add-ingredient-button" onClick={addIngredient}>הוספת \ שינוי רכיב</button>
                    <br></br>
                    <table id="ingredientsTable">
                        <tbody>
                            {dataDishIngredients.map((ingredient, idx) => (
                                <tr key={idx}>
                                    {dataStock.map((item) => (
                                        ((item.id == ingredient.idIngredient) && (ingredient.כמות>0) &&
                                        ((updateValues.ingredients?.filter(value => (value.id == ingredient.idIngredient))).length == 0)
                                        )&&
                                    <div className='ingredientItem'>
                                        <td className='ingredientItem-Name'>{item.שם_מוצר} :</td>
                                        <td className='ingredientItem-Amount'>{ingredient.כמות}</td>
                                        <td className='ingredientItem-Unity'>{ingredient.יחידה}</td>
                                    </div>))}
                                </tr>
                            ))}
                            {updateValues.ingredients.map((ingredient, idx) => (
                                <tr key={idx}>
                                    {dataStock.map((item) => (
                                        ((item.id == ingredient.id) && (ingredient.amount>0))&&
                                    <div className='ingredientItem'>
                                        <td className='ingredientItem-Name'>{item.שם_מוצר} :</td>
                                        <td className='ingredientItem-Amount'>{ingredient.amount}</td>
                                        <td className='ingredientItem-Unity'>{ingredient.unity}</td>
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

export default UpdateDishIngredients;