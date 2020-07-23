import React, { Component } from 'react';

const layout = (props) => (
    <div>ToolBar, SideDrawer, BackDrop</div>
    <main>
        {props.children}
    </main>
);