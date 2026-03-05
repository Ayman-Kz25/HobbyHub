import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    messages: []
}

const chatSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {

    }
})

export default chatSlice.reducer;