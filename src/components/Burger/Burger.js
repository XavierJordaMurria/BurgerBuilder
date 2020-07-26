import React from 'react';
import classes from './Burger.css';
import BurguerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformetIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        const arrLength = props.ingredients[igKey] > 0 ? props.ingredients[igKey] : 0;  
        return [...Array(arrLength)]
        .map((_,i) => <BurguerIngredient key={igKey+i} type={igKey}></BurguerIngredient>)
    })
    .reduce((arr, el) => {
        return arr.concat(el)
    }, []);
    console.log(transformetIngredients);

    if(transformetIngredients.length === 0){
        transformetIngredients = <p>Please add some ingredients to make it more tasty!!</p>
    }
    return (  
        <div className={classes.Burger}>
            <BurguerIngredient type="bread-top"/>
            {transformetIngredients}
            <BurguerIngredient type="bread-bottom"/>
        </div>
    );
}
 

export default burger;