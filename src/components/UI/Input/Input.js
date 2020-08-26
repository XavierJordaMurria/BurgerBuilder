import React from 'react';
import classes from './Input.css';

const Input = (props) => {

    let inputElement = null;
    let validationError = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        validationError = <p>Please enter a valid value</p>
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = (
                <input 
                    className={inputClasses.join(' ')} 
                    {...props.elementConfig} 
                    value={props.value} 
                    onChange={props.onChange}/>);
            break;
        case ('textarea'):
            inputElement = (
                <testarea 
                    className={inputClasses.join(' ')} 
                    {...props.elementConfig} 
                    value={props.value} 
                    onChange={props.onChange}/>);
            break;
        case ('select'):
            inputElement = (
                <select 
                    className={inputClasses.join(' ')} 
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
                    className={inputClasses.join(' ')} 
                    {...props.elementConfig} 
                    value={props.value} 
                    onChange={props.onChange}/>);
    }
    return (
        <div className={classes.Innput}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
}

export default Input;