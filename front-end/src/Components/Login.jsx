import React from "react";
import { Field, Form } from "react-final-form";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { userLogin } from "../features/actions/authActions";

const Login = () => {
  // const [inputData, setInputData] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

 // const userLoginDetails = useSelector((state) => state?.authData?.loginData);
 // const errorMessage = useSelector((state) => state?.authData?.loginErrMsg);

  function onSubmit(values) {
    dispatch(userLogin(values)).then((item) => {
      if (!item.payload.success) {
        toast.error(`${item?.payload?.message}`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        if (item?.payload?.id) {
          navigate(`/otpverify/${item?.payload?.id}`);
        }
      } else {
        toast.success(`${item?.payload?.message}`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        localStorage.setItem("token", item?.payload?.token);
        // navigate('/home')
        window.location.href = "/home";
      }
    });

    // if (userLoginDetails?.success === true) {
    //   localStorage.setItem("auth-token", userLoginDetails?.token);
    //   // toast.success("success");
    //   navigate("/user");
    // } else {
    //   // if (errorMessage) {
    //   toast.error(errorMessage);
    //   //}
    // }
  }
  // const forgotMessage = useSelector((state) => state?.authData?.forgotMessage);

  return (
    <div className="d-flex flex-column  align-items-center">
      <h3>Login</h3>
      <div className="d-flex flex-column content">
        <Form
          onSubmit={onSubmit}
          validate={(values) => {
            const error = {};
            if (!values.email) {
              error["email"] = "email required!";
            }
            if (!values.password) {
              error["password"] = "password required!";
            }
          }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field name="email">
                {({ input, meta }) => (
                  <div>
                    <label>Email: </label>
                    <input {...input} type="text" placeholder="email" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <div>
                <Field name="password">
                  {({ input, meta }) => (
                    <div>
                      <label>Password: </label>
                      <input
                        {...input}
                        type="password"
                        placeholder="password"
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              <div className="">
                <button type="submit" className="w-100 mt-3">
                  Login
                </button>
              </div>
            </form>
          )}
        />
        <div className="">
          <button className="w-100 mt-3" onClick={() => navigate("/email")}>
            forgot password
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default Login;
