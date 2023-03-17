import instanceApi from "../../api/instanceApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const userRegister = createAsyncThunk(
  "userRegister/auth/register",
  async (data) => {
    console.log("resssssssssssssDataaaaaaaaa", data);
    const response = await instanceApi.post("auth/register", data);
    console.log("resssssssssssss");
    return response;
  }
);

export const userOtpVerify = createAsyncThunk(
  "userOtpVerify/auth/otpverify",
  async ({ otp, id }) => {
    const response = await instanceApi.post("auth/otpverify/", {
      otp,
      id,
    });
    return response.data;
  }
);

export const resendOtp = createAsyncThunk(
  "resendOtp/auth/resendotp",
  async (data) => {
    const response = await instanceApi.post("auth/resendotp", data);
    return response;
  }
);

export const userLogin = createAsyncThunk(
  "userLogin/auth/login",
  async (data) => {
    // const response = await
    const res = await instanceApi.post("auth/login", data);

    console.log(res, "sdsdsdsd");
    return res.data;
  }
);
export const userRegisterName = createAsyncThunk(
  "userRegisterName/auth/",
  async (data) => {
    const response = await instanceApi.post("auth/getRole", data);
    return response.data;
  }
);

export const authLogout = createAsyncThunk(
  "authLogout/auth/logout",
  async () => {
    const response = await instanceApi.post("auth/logout");
    console.log(response, "vvvvvvvvvvv");
    return response;
  }
);

export const userforgotPassword = createAsyncThunk(
  "userforgotPassword/auth/forgotpassword",
  async (data) => {
    return instanceApi
      .post("auth/forgotpassword", data)
      .then((res) => {
        // console.log(res.data, "erererer");
        return res?.data;
      })
      .catch((err) => {
        // console.log(err?.response?.data, "nknknkmnjjnjn");
        throw new Error(err?.response?.data);
      });
  }
);

export const userUpdatePassword = createAsyncThunk(
  "userUpdatePassword/auth/updatepassword",
  async ({ id, password }) => {
    //  console.log(id, password, "dsdsdsdsd");
    const response = await instanceApi.post("auth/updatepassword", {
      id,
      password,
    });
    console.log(response.data, "updatedataresponse");
    return response.data;
  }
);

export const userRecords = createAsyncThunk("userRecords/task/getrecords", async() => {
  const response = await instanceApi.get("task/getrecords")
  console.log(response, "jmhngbfvcsx")
  return response
})

export const userTaskCreate= createAsyncThunk("userTaskCreate/task/create", async(data) => {
  const response = await instanceApi.post("task/create", data)
  console.log(response, "uiytrdsdfghjkhgfd")
})