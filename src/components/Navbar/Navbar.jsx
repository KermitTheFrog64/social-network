import React from 'react';
import { NavLink } from 'react-router-dom';
import c from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={c.nav}>
            <div>
                <NavLink to='/profile' className = { navData => navData.isActive ? c.active : c.item }>Profile</NavLink>
            </div>
            <div>
                <NavLink to='/dialogs' className = { navData => navData.isActive ? c.active : c.item }>Messages</NavLink>
            </div>
            <div>
                <NavLink to='/news' className = { navData => navData.isActive ? c.active : c.item }>News</NavLink>
            </div>
            <div>
                <NavLink to='/music' className = { navData => navData.isActive ? c.active : c.item }>Music</NavLink>
            </div>
            <div>
                <NavLink to='/settings' className = { navData => navData.isActive ? c.active : c.item }>Settings</NavLink>
            </div>
            <div>
                <NavLink to='/users' className = { navData => navData.isActive ? c.active : c.item }>Users</NavLink>
            </div>
            <div>
                <h3>Friends</h3>
            </div>
            <div>
            <img className={c.avatar} src='https://s1.stc.all.kpcdn.net/afisha/msk/wp-content/uploads/sites/5/2021/12/avatar-2-1.jpg' />
            <img className={c.avatar} src='https://s1.stc.all.kpcdn.net/afisha/msk/wp-content/uploads/sites/5/2021/12/avatar-2-1.jpg' />
            <img className={c.avatar} src='https://s1.stc.all.kpcdn.net/afisha/msk/wp-content/uploads/sites/5/2021/12/avatar-2-1.jpg' />
            </div>
        </nav>
    )
}

export default Navbar;