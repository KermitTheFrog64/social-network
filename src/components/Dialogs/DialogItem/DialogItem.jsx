import React from 'react';
import { NavLink } from 'react-router-dom';
import c from './../Dialogs.module.css';

const DialogItem = (props) => {
    let path = "/dialog/" + props.id;
    return (
        <div className={c.dialog + ' ' + c.active}>
            <img className={c.avatar} src='https://s1.stc.all.kpcdn.net/afisha/msk/wp-content/uploads/sites/5/2021/12/avatar-2-1.jpg' />
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;