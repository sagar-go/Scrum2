import React, { useEffect, useRef, useState } from "react";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { resendOtp, userOtpVerify } from "../features/actions/authActions";
import OtpInput from "react18-input-otp";
import OtpTimer from "otp-timer";

const OtpVerify = () => {
  let { id } = useParams();

  const form = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getOtp = useSelector((state) => state?.authData?.otpMessage);

  const otpConfirm = useSelector((state) => state?.authData?.otpConfirmation);

  const onSubmit = (values) => {
    // if (getOtp?.otp === values.otp || id === getOtp?.id) {
    //   dispatch(
    //     userOtpVerify({
    //       otp: values?.otp,
    //       id: id,
    //     })
    //   );

    //   if (otpConfirm.success === true) {
    //     // toast.success(otpConfirm.message);
    //     navigate("/login");
    //   }

    //   if (otpConfirm?.success === false && values) {
    //     toast.error(otpConfirm?.message);
    //   }
    // }
    // if (getOtp.otp !== values.otp) {
    //   toast.error(otpConfirm?.message);
    //   console.log("otp not match");
    // }
    dispatch(
      userOtpVerify({
        otp: values?.otp,
        id: id,
      })
    )
      .then((ele) => {
        if (!ele.payload.success) {
          toast.error(`${ele?.payload?.message}`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.success(`${ele?.payload?.message}`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/login");
        }
      })
      .catch((ele) => {
        console.log(ele, "eeeeewww22222222");
      });
  };

  function onSubmit2() {
    // setTimeLeft(30);

    dispatch(resendOtp({ id: id }));
  }

  return (
    <div>
      <div className="d-flex justify-content-center flex-column  align-items-center">
        <h2>OTP Verification</h2>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, form: { change } }) => (
            <form onSubmit={handleSubmit} ref={form}>
              <Field name="otp">
                {({ input, meta }) => (
                  <div>
                    <label> Check your email-id : </label>
                    {/* <input {...input} type="number" placeholder="otp" /> */}
                    <div className="input-otp">
                      <OtpInput className="otp" {...input} numInputs={4} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  </div>
                )}
              </Field>
              <div className="mx-auto w-60 mb-1">
                <button className="w-100" type="submit">
                  {" "}
                  send
                </button>
              </div>
            </form>
          )}
        />

        {/* {!timeLeft && <button onClick={() => onSubmit2()}>Resend otp</button>} */}
        <div>
          {/* {<h3>{timeLeft}</h3>} */}
          <OtpTimer seconds={30} minutes={0} resend={() => onSubmit2()} />
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default OtpVerify;
