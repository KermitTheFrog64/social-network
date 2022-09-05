import React from 'react';
import { NavLink } from 'react-router-dom';
import c from'./Header.module.css';

const Header = (props) => {
    return <header className={c.header}>
        <img src='https://cdn.dribbble.com/users/10882/screenshots/15172621/media/cd2246d5d0f54f9a4316bd4d276764b2.png?compress=1&resize=400x300' />
        <div className={c.loginBlock}>
            {props.isAuth 
            ? <div>{props.login} - <button onClick={props.logout}>Log out</button> </div>
            : <NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>
}

export default Header;