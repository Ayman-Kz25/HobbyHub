import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice.js'
import chatsReducer from '../features/chats/chatsSlice.js'
import friendReducer from '../features/friends/friendsSlice.js'


export const store = configureStore({
    reducer:{
        user: userReducer,
        friends: friendReducer,
        chats: chatsReducer,
    }
})