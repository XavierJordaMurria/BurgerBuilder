import React from 'react';
import Aux from '../../hoc/Aux'
const layout = (props) => (
    <div>ToolBar, SideDrawer, BackDrop</div>
    <main>
        {props.children}
    </main>
);