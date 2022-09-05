import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api.js";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const DELETE_POST = 'DELETE-POST'
const SAVE_PHOTO_SUCCESS = 'SAVE-PHOTO-SUCCESS'

let initialState = {
    posts: [
        { id: 1, message: 'Hello, I\'m Natalie', numberOfLikes: '15' },
        { id: 2, message: 'Hi! How are you?', numberOfLikes: '35' },
    ],
    profile: null,
    status: ""
}

const profileReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_POST:
            let body = action.post;
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, { id: 3, message: body, numberOfLikes: '12' }]
            }

        case SET_USER_PROFILE:
            return { ...state, profile: action.profile }

        case SET_STATUS:
            return { ...state, status: action.status }

        case DELETE_POST:
            return { ...state, posts: state.posts.filter(p => p.id != action.postId) }

        case SAVE_PHOTO_SUCCESS:
            return { ...state, profile: {...state.profile, photos: action.photos} }

        default:
            return state;
    }
}

export const addPostActionCreator = (post) => ({type: ADD_POST, post})

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})

export const setStatus = (status) => ({type: SET_STATUS, status})

export const deletePost = (postId) => ({type: DELETE_POST, postId})

export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})


export const getUserProfile = (userId) => async (dispatch) => {

    let response = await profileAPI.getProfile(userId);

    dispatch(setUserProfile(response.data));
}

export const getStatus = (userId) => async (dispatch) => {

    let response = await profileAPI.getStatus(userId);

    dispatch(setStatus(response.data));
}

export const updateStatus = (status) => async (dispatch) => {

    try {
        let response = await profileAPI.updateStatus(status);

        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    } catch (error) {
        
    }
}

export const savePhoto = (file) => async (dispatch) => {
    debugger;
    let response = await profileAPI.savePhoto(file);

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    let response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    }
    else {
        dispatch(stopSubmit('edit-profile', { _error: response.data.messages[0] }));
        return Promise.reject(response.data.messages[0]);
    }
}

export default profileReducer;