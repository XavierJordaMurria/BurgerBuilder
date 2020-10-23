import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems/>', () => {
    it('It should render 2 navigation items if not authenticated', ()=>{
        const wrapper = shallow(<NavigationItems/>)
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('It should render 3 navigation items if authenticated', ()=>{
        const wrapper = shallow(<NavigationItems isAuthenticated/>)
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('It should contains logout', ()=>{
        const wrapper = shallow(<NavigationItems isAuthenticated/>)
        expect(wrapper.contains(<NavigationItem link="/logout">LogOut</NavigationItem>)).toEqual(true);
    });
});