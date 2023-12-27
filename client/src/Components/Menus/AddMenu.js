import React, { useEffect, useState, } from 'react'
import './AddMenu.css'

function AddMenu(props) {
   
    const [addValues, setAddValues] = useState({
        שם: '',
        קטגוריה: ''
    });

    const [dataCategories, setDataCategories] = useState([])

    useEffect(() => {
        fetch(`http://localhost:4000/api/menus/categories`)
        .then(response => response.json())
        .then(data => setDataCategories(data.reverse()))
    }, [dataCategories])

    function updateData(event) {
        setAddValues({
            ...addValues,
            [event.target.name]: event.target.value
        })
    }

    function saveData() {
        props.OpenClose()
            fetch('http://localhost:4000/api/menus/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(addValues),
            })
                .then(response => {response.json()
    })}

    return (
        <div className='AddMenu-box'>
            <form className='AddMenu-Box-Content'>
                <div className='AddMenu-Title'>הוספת תפריט</div>
                <div className='AddMenu-InputBox'>
                    <label className='AddMenu-Label'>שם :</label>
                    <input className='AddMenuPage-Input' type="text" name='שם' value={addValues.שם} onChange={updateData} required />
                    <label className='AddMenu-Label'>קטגוריה :</label>
                    <select name='קטגוריה' value={addValues.קטגוריה} onChange={updateData} required pattern=".*\S+.*" title="This field is required">
                        <option value=''>בחר קטגוריה</option>
                        {dataCategories.map((category) => 
                             <option value={category.שם}>{category.שם}</option>
                        )}
                    </select> 
                </div>
                    <div className='AddMenu-Buttons'>
                        <button className='AddMenu-Button' onClick={props.OpenClose}>ביטול</button>
                        <input type="submit" value={'שמירה'} className='AddDish-Button' onClick={saveData}></input>
                    </div>
            </form>
        </div>
    )
}

export default AddMenu