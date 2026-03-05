import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    friends: [],
    pendingFriends: [],
    followers: [],
    following: [],
}

const connectionsSlice = createSlice({
    name: 'connections',
    initialState,
    reducers: {

    }
})

export default connectionsSlice.reducer;