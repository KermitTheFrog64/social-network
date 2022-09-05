import { userAPI } from "../api/api";
import { updateObjectInArray } from "../utils/object-helper";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS';

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []

}

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case SET_USERS:
            return { ...state, users: action.users }
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage }
        case SET_TOTAL_USERS_COUNT:
            return { ...state, totalUsersCount: action.count }
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return { ...state, 
                followingInProgress: action.isFetching 
                ? [...state.followingInProgress, action.userId] 
                : state.followingInProgress.filter(id => id != action.userId)}
        default:
            return state;
    }
}

export const followSuccess = (userId) => ({type: FOLLOW, userId})

export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId})

export const setUsers = (users) => ({type: SET_USERS, users})

export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})

export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount})

export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})

export const toggleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})

export const requestUsers = (currentPage, pageSize) => async (dispatch) => {

    dispatch(toggleIsFetching(true));

    let data = await userAPI.getUsers(currentPage, pageSize);

    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));

}

export const getUsersByPage = (pageNumber, pageSize) => async (dispatch) => {

    dispatch(setCurrentPage(pageNumber));

    dispatch(toggleIsFetching(true));

    let data = await userAPI.getUsers(pageNumber, pageSize);

    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));

}

const followUnfolloFlow = async (dispatch, userId, apiMethod, actionCreator) => {

    dispatch(toggleFollowingProgress(true, userId));

    let data = await apiMethod(userId);

    if (data.resultCode == 0) {
        dispatch(actionCreator(userId))
    }

    dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId) => async (dispatch) => {

    followUnfolloFlow (dispatch, userId, userAPI.followUser.bind(userAPI), followSuccess);

}

export const unfollow = (userId) => async (dispatch) => {

    followUnfolloFlow (dispatch, userId, userAPI.unfollowUser.bind(userAPI), unfollowSuccess);

}

export default usersReducer;