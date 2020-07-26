import React from 'react';
import classes from './ToolBar.css';
import Logo from '../../Logo/Logo';

const ToolBar = (props) => {
    return (
        <header className={classes.ToolBar}>
            <div>Menu</div>
            <Logo/>
            <nav>...</nav>
        </header>
    );
}

export default ToolBar;