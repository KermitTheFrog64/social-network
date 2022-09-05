const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
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
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {

        case SEND_MESSAGE:
            let body = action.message;
            return {
                ...state,
                messages: [...state.messages, { id: 6, message: body }]
            };
            
        default:
            return state;
    }
}

export const sendMessageActionCreator = (message) => ({type: SEND_MESSAGE, message})

export default dialogsReducer;