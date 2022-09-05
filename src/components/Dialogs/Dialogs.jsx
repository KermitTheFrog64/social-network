import React from 'react';
import c from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Navigate } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { Textarea } from '../common/FormsControllers/FormsControllers';

/* const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id} />);

    let messagesElements = state.messages.map(m => <Message message={m.message} />);

    let onSendMessage = () => {
        props.sendMessage()
    }

    let onMessageChange = (e) => {
        let text = e.target.value;
        props.updateNewMessageText(text)
    }

    if (!props.isAuth) return <Navigate to={"/login"}/>

    return (
        <div className={c.dialogs}>
            <div className={c.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={c.messages}>
                <div>
                    {messagesElements}
                </div>
                <div>
                    <div>
                        <textarea onChange={onMessageChange} value={state.newMessageText}></textarea>
                    </div>
                    <div>
                        <button onClick={onSendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
} */

const maxLength50 = maxLengthCreator(50);

const MessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Message"} name={"message"} component={Textarea}
                    validate={[required, maxLength50]} />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const MessageReduxForm = reduxForm({form: 'message'})(MessageForm)

const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id} />);

    let messagesElements = state.messages.map(m => <Message message={m.message} />);

    const onSubmit = (formData) => {
        props.sendMessage(formData.message)
    }

    if (!props.isAuth) return <Navigate to={"/login"}/>

    return (
        <div className={c.dialogs}>
            <div className={c.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={c.messages}>
                <div>
                    {messagesElements}
                </div>
                <MessageReduxForm onSubmit={onSubmit} />
            </div>
        </div>
    )
}

export default Dialogs;