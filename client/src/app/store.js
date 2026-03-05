import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice'
import chatsReducer from '../features/chats/chatsSlice'
import connectionsReducer from '../features/connections/connectionsSlice.js'


export const store = configureStore({
    reducer:{
        user: userReducer,
        connections: connectionsReducer,
        chats: chatsReducer,
    }
})