import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { authLogout } from "../features/actions/authActions";
import { getToken, logOut } from "../utils/util";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authLogout()).then((e) => {
      console.log("asdasdcceeeeeeeeee", e);

      if (e.payload.data.success) {
        toast.success(`${e.payload.data.message}`, { autoClose: 1000 });
        navigate("/login");
      } else {
        console.log(e, "asdasdcc");
        toast.error(`${e.payload.data.message}`);
      }
    });
    logOut();
  };

  return (
    <div className="d-flex flex-column align-items-center mt-4">
      <h2>welcome user</h2>
      <div>
        <button className="" onClick={() => handleLogout()}>logout</button>
      </div>
    </div>
  );
};

export default Home;
