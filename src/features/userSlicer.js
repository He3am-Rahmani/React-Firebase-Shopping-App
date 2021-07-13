// // import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   displayName: null,
//   email: null,
//   photoURL: null,
// };

// const userSlicer = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     login: (state, action) => {
//       state.displayName = action.payload.displayName;
//       state.photoURL = action.payload.photoURL;
//       state.email = action.payload.email;
//     },
//     logout: (state, action) => {
//       state.displayName = action.payload.displayName;
//       state.photoURL = action.payload.photoURL;
//       state.email = action.payload.email;
//     },
//     updateProfile: (state, action) => {
//       state.displayName = action.payload.displayName
//         ? action.payload.displayName
//         : state.displayName;
//       state.photoURL = action.payload.photoURL
//         ? action.payload.photoURL
//         : state.photoURL;
//       state.email = action.payload.email ? action.payload.email : state.email;
//     },
//   },
// });

// export const { login, logout, updateProfile } = userSlicer.actions;
// export const user = (state) => state.user;
// export default userSlicer.reducer;
