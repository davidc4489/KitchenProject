import React, { useEffect, useState, } from 'react'
import './AddDish.css'

function AddDish(props) {
   
    const categories = ['Soup', 'Main Course', 'Dessert', 'Drink']
    const [addValues, setAddValues] = useState({
        שם: '',
        קטגוריה: ''
    });

    const [dataCategories, setDataCategories] = useState([])

    useEffect(() => {
        fetch(`http://localhost:4000/api/dishes/categories`)
        .then(response => response.json())
        .then(data => setDataCategories(data))
    }, [dataCategories])

    function updateData(event) {
        setAddValues({
            ...addValues,
            [event.target.name]: event.target.value
        })
    }

    function saveData() {
            fetch('http://localhost:4000/api/dishes/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(addValues),
            })
                .then(response => {response.json()
    })}

    return (
        <div className='AddDish-box'>
            <form className='AddDish-Box-Content'>
                <div className='AddDish-Title'>הוסף מנה</div>
                <div className='AddDish-InputBox'>
                    <label className='AddDish-Label'>שם :</label>
                    <input className='AddDishPage-Input' type="text" name='שם' value={addValues.שם} onChange={updateData} required />
                    <label className='AddMenu-Label'>קטגוריה :</label>
                    <select name='קטגוריה' value={addValues.קטגוריה} onChange={updateData} required pattern=".*\S+.*" title="This field is required">
                        <option value=''>בחר קטגוריה</option>
                        {dataCategories.map((category) => 
                             <option value={category.שם}>{category.שם}</option>
                        )}
                    </select> 
                </div>
                    <div className='AddDish-Buttons'>
                        <button className='AddDish-Button' onClick={props.OpenClose}>ביטול</button>
                        <input type="submit" value={'שמירה'} className='AddDish-Button' onClick={saveData}></input>
                    </div>
            </form>
        </div>
    )
}

export default AddDish