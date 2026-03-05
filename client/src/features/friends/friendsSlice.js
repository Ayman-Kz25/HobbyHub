import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios.js";

const initialState = {
  friends: [],
  pendingRequests: [],
  followers: [],
  following: [],
};

export const fetchFriends = createAsyncThunk(
  "friends/fetchFriends",
  async (token) => {
    const { data } = await api.get("/api/user/friends", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(data)
    return data.success ? data : null;
  },
);

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFriends.fulfilled, (state, action) => {
      if (action.payload) {
        state.friends = action.payload.friends;
        state.pendingRequests = action.payload.pendingRequests;
        state.followers = action.payload.followers;
        state.following = action.payload.following;
      }
    });
  },
});

export default friendsSlice.reducer;
