import React from 'react';
import c from './../Dialogs.module.css';

const Message = (props) => {
    return (
        <div className={c.message}>
            <img className={c.avatar} src='https://s1.stc.all.kpcdn.net/afisha/msk/wp-content/uploads/sites/5/2021/12/avatar-2-1.jpg' />
            {props.message}
        </div>
    )
}

export default Message;