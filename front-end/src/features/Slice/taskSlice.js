import { createSlice } from "@reduxjs/toolkit";
import { userRecords, userTaskCreate } from "../actions/taskActions";

const initialState = {
  loading: false,
  userRecordDetails: [],
  taskDetails: "",
  inputData: [],
  arrData: [],
  idContent: "",
  removedItem: []
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addUserTask: (state, action) => {
      console.log(action.payload, "rerrererer");
      state.inputData.push(action.payload);
    },
    addIdContent: (state, action) => {
      console.log(action?.payload, "wqqwqwqwqw");
      state.idContent.push(action.payload);
    },
    removeItem: (state, action) => {
      console.log(action?.payload, "qweqweqwesdadas")
      state.removedItem.push(action.payload)
    }
  },
  extraReducers: {
    [userRecords?.pending]: (state) => {
      console.log("pending");
    },
    [userRecords?.fulfilled]: (state, action) => {
      console.log(action.payload?.data?.data, "fulfill");
      state.userRecordDetails = action.payload
      let newArr = action?.payload?.data?.data?.map((elem) => elem?.data?.map((item) => item))
      let vall = Object.assign({}, newArr)
      console.log(action?.payload, "rtrtrtrtrtrt")
      state.arrData = vall
    },
    [userRecords?.rejected]: (state, action) => {
      console.log(action.payload, "dsdsdsdsdsd");
    },
    [userTaskCreate?.pending]: (state) => {
      console.log("pending");
    },
    [userTaskCreate?.fulfilled]: (state, action) => {
      // console.log(
      //   action.payload.data.map((elem) => elem?.data.map((item) => item)),
      //   "fulfdsdfsdfsdfsfill"
      // );
      state.taskDetails = action?.payload
    },
    [userTaskCreate?.rejected]: (state, action) => {
      console.log(action.payload, "dsdsdsdsdsd");
    },
  },
});

export const { addUserTask, addIdContent } = taskSlice.actions;

export default taskSlice.reducer;
