import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControllers/FormsControllers';
import c from './MyPosts.module.css';
import Post from './Post/Post';

const maxLength10 = maxLengthCreator(10);

const PostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Post"} name={"post"} component={Textarea} 
                validate={[required, maxLength10]} />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const PostReduxForm = reduxForm({form: 'post'})(PostForm)

const MyPosts = React.memo(props => {

    let postsElements = [...props.posts]
    .reverse()
    .map(p => <Post key={p.id} message={p.message} numberOfLikes={p.numberOfLikes} />);

    const onSubmit = (formData) => {
        props.addPost(formData.post)
    }

    return (
        <div className={c.postsBlock}>
            <h3>My posts</h3>
            <PostReduxForm onSubmit={onSubmit} />
            <div className={c.posts}>
                {postsElements}
            </div>
        </div>
    )
}
)

export default MyPosts;

/* const MyPosts = (props) => {

    let postsElements = props.posts.map(p => <Post message={p.message} numberOfLikes={p.numberOfLikes} />);

    let onAddPost = () => {
        props.addPost();
    }

    let onPostChange = (e) => {
        let text = e.target.value;
        props.updateNewPostText(text)
    }

    return (
        <div className={c.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange} value = {props.newPostText}/>
                </div>
                <div>
                    <button onClick={onAddPost}>Add post</button>
                </div>
            </div>
            <div className={c.posts}>
                {postsElements}
            </div>
        </div>
    )
} */