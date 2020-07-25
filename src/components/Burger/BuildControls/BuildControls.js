import React from 'react'; // imr
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: "Salad", type: "salad"},
    {label: "Bacon", type: "bacon"},
    {label: "Cheese", type: "cheese"},
    {label: "Meat", type: "meat"},
];

const BuildControls = () => { // slr
    return (
            <div className={classes.BuildControls}>
                {controls.map(c => 
                    <BuildControl key={c.label} label={c.label}></BuildControl>    
                )}
            </div>
    );
}

export default BuildControls;