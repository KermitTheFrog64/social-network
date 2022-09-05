import React from 'react';
import profileReducer, { addPostActionCreator, deletePost } from "./profile-reducer";

let state = {
    posts: [
        { id: 1, message: 'Hello, I\'m Natalie', numberOfLikes: '15' },
        { id: 2, message: 'Hi! How are you?', numberOfLikes: '35' },
    ]
}

test('post length should be incremented', () => {

    // 1. test data
    let action = addPostActionCreator("it-kamasutra.com");

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(3);
  });


test('new post message should be "it-kamasutra.com"', () => {

    // 1. test data
    let action = addPostActionCreator("it-kamasutra.com");

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts[2].message).toBe("it-kamasutra.com");
});


test('after deleting messages length should be decremented', () => {

    // 1. test data
    let action = deletePost(1);

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(1);
});


test('after deleting messages length should not be decremented if id is incorrect', () => {

    // 1. test data
    let action = deletePost(1000);

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(2);
});