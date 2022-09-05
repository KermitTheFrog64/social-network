import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: 'Hello, I\'m Natalie', numberOfLikes: '15' },
                { id: 2, message: 'Hi! How are you?', numberOfLikes: '35' },
            ],
            newPostText: 'newPost',
        },
        dialogsPage: {
            dialogs: [
                { id: 1, name: 'Natalie' },
                { id: 2, name: 'Dora' },
                { id: 3, name: 'Knara' },
                { id: 4, name: 'Nastya' },
                { id: 5, name: 'Tanya' },
                { id: 6, name: 'Ola' }
            ],
            messages: [
                { id: 1, message: 'Hey!' },
                { id: 2, message: 'Hello!' },
                { id: 3, message: 'Hi!' },
                { id: 4, message: 'How do you do?' },
                { id: 5, message: 'What\'s up?' },
            ],
            newMessageText: 'Hello! Type your message',
        },
        sidebar: {}
    },
    _callSubscriber () {
        console.log('State was changed');
    },

    getState () {
        return  this._state
    },
    subscribe (observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
    }
    
}

export default store;

window.store = store;