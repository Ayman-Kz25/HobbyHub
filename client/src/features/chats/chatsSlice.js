import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios.js";

const initialState = {
    messages: [],
};

export const fetchMsgs = createAsyncThunk(
    "msgs/fetchMsgs",
    async ({ token, userId }) => {
    const { data } = await api.post(
      "/api/chat/get",
      { reciever_id: userId },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    console.log(data)
    return data.success ? data : null;
  },
);

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setMessages: (state, actions) => {
      state.messages = actions.payload;
    },
    addMessages: (state, actions) => {
      state.messages = [...state.messages, actions.payload];
    },
    resetMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMsgs.fulfilled, (state, actions) => {
      if (actions.payload) {
        state.messages = actions.payload.messages;
      }
    });
  },
});

export const { setMessages, addMessages, resetMessages } = chatSlice.actions;

export default chatSlice.reducer;
