import React from 'react';
import c from './Post.module.css';

const Post = (props) => {
    return (
    <div className={c.item}>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe3Q_jHZOfFLWc5SzH7A-xxaPcOOyDj-X8zQ&usqp=CAU' />
        {props.message}
        <div><span>{props.numberOfLikes} likes</span></div>
    </div>
    )
}

export default Post;