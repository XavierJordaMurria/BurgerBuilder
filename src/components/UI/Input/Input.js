import React from 'react';
import classes from './Input.css';

const Input = (props) => {

    let inputElement = null;

    switch (props.elementType) {
        case ('input'):
            inputElement = (
                <input 
                    className={classes.InputElement} 
                    {...props.elementConfig} 
                    value={props.value} 
                    onChange={props.onChange}/>);
            break;
        case ('textarea'):
            inputElement = (
                <testarea 
                    className={classes.InputElement} 
                    {...props.elementConfig} 
                    value={props.value} 
                    onChange={props.onChange}/>);
            break;
        case ('select'):
            inputElement = (
                <select 
                    className={classes.InputElement} 
                    {...props.elementConfig} 
                    value={props.value}
                    onChange={props.onChange}>
                    {props.elementConfig.options.map(op => (
                        <option key={op.value} value={op.value}>{op.displayValue}</option>
                    ))}
                </select>);
            break;
        default:
            inputElement = (
                <input 
                    className={classes.InpInputElementue} 
                    {...props.elementConfig} 
                    value={props.value} 
                    onChange={props.onChange}/>);
    }
    return (
        <div className={classes.Innput}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default Input;