import instanceApi from "../../api/instanceApi";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const userRecords = createAsyncThunk("userRecords/task/getrecords", async() => {
  const response = await instanceApi.get("task/getrecords")
  console.log(response, "jmhngbfvcsx")
  return response
})

export const userTaskCreate= createAsyncThunk("userTaskCreate/task/create", async(data) => {
    console.log(data, "rtyrtyrtyrt")
  const response = await instanceApi.post("task/create", data)
  console.log(response, "uiytrdsdfghjkhgfd")
  return response
})

