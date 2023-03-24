import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { authLogout } from "../features/actions/authActions";
//import { userRecords } from "../features/actions/taskActions";
import { getToken, logOut } from "../utils/util";
import ModalShow from "./ModalShow";

const Home = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(userRecords())
  // }, []);

  const name = useSelector((e) => e.authData.name);
  console.log(name, "ddddddddddddddddddddd");

  const handleLogout = () => {
    dispatch(authLogout()).then((e) => {
      console.log("asdasdcceeeeeeeeee", e);

      if (e.payload.data.success) {
        toast.success(`${e.payload.data.message}`, { autoClose: 1000 });
        //  navigate("/login");
      } else {
        console.log(e, "asdasdcc");
        toast.error(`${e.payload.data.message}`);
      }
    });
    logOut();
  };

  return (
    <div className="d-flex flex-column align-items-center mt-4">
      <h2>welcome {name}</h2>
      <div>
        <button className="" onClick={() => handleLogout()}>
          logout
        </button>
      </div>
      <br></br>
      <div>
        <button onClick={() =>navigate('/modalshow')}>+ Add User</button>
      </div>

      {/* <div>{show && <ModalShow />}</div> */}
    </div>
  );
};

export default Home;
