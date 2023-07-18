import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayName: "",
  uid: "",
  accessToken: "",
  photoURL: "",
  bookmark: [],
};
// redux toolkit을 사용하면 직접 할당 가능.
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.displayName = action.payload.displayName;
      state.uid = action.payload.uid;
      state.accessToken = action.payload.accessToken;
      state.photoURL = action.payload.photoURL;
    },
    clearUser: (state) => {
      state.displayName = "";
      state.uid = "";
      state.accessToken = "";
    },
    setBookmark: (state, action) => {
      // db로부터 북마크 초기화
      state.bookmark = action.payload.bookmark;
    },
    addBookmark: (state, action) => {
      // 북마크 추가

      state.bookmark = [...state.bookmark, action.payload.postId];
    },
    deleteBookmark: (state, action) => {
      // 북마크 삭제
      let tmp = [];
      state.bookmark.map((id) => {
        if (id !== action.payload.postId) tmp.push(id);
      });
      state.bookmark = tmp;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  loginUser,
  clearUser,
  addBookmark,
  deleteBookmark,
  setBookmark,
} = userSlice.actions;

export default userSlice.reducer;
