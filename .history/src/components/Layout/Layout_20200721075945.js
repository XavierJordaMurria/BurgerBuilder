import react frpm 'react';

const layout = (props) => (
    <div>ToolBar, SideDrawer, BackDrop</div>
    <main>
        {props.children}
    </main>
);