import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/authSlice";
import taskReducer from "./Slice/taskSlice"

const store = configureStore({
  reducer: {
    authData: authReducer,
    taskData: taskReducer
  },
});

export default store;
