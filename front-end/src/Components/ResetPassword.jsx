import React, { useRef } from "react";
import { Field, Form } from "react-final-form";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userUpdatePassword } from "../features/actions/authActions";

const ResetPassword = () => {
  const form = useRef();
  const navigate = useNavigate();

  const updateMessage = useSelector((state) => state?.authData?.updateMessage);

  let { id } = useParams();
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    //  console.log(values, "asasasasa");
    if (values.password === values.confirm_password) {
      // console.log("password match");
      dispatch(userUpdatePassword({ id: id, password: values.password })).then(
        (e) => {
          if (e?.payload?.success === true) {
            toast.success(`${e?.payload?.message}`, { autoClose: 1000 });
            navigate("/login");
          } else {
            toast.error(updateMessage?.message, { autoClose: 1000 });
          }
        }
      );
      // if (updateMessage?.success === true) {
      //   toast.success(updateMessage?.message, { autoClose: 1000 });
      //  // navigate("/login");
      // }
      // if (updateMessage?.success === false) {
      //   toast.error(updateMessage?.message, { autoClose: 1000 });
      // }
    }
    if (values.password !== values.confirm_password) {
      //  console.log("password and confirm_password not match");
      toast.info("password and confirm_password not match", {
        autoClose: 1000,
      });
    }
  };

  return (
    <div>
      <h3>resetpassword</h3>
      <div className="mx-auto">
        <Form
          onSubmit={onSubmit}
          validate={(values) => {
            const error = {};
            if (!values.password) {
              error["password"] = "password required!";
            }
            if (!values.confirm_password) {
              error["confirm_password"] = "confirm password required!";
            }
            return error;
          }}
          render={({ handleSubmit }) => (
            <Container>
              <form onSubmit={handleSubmit} ref={form}>
                <Row className="">
                  <Col md={3} className="mx-auto">
                    <Field name="password">
                      {({ input, meta }) => (
                        <div className="mb-3 d-contents">
                          <label>Password: </label>
                          <input
                            {...input}
                            type="text"
                            placeholder="password"
                          />
                          {meta.error && meta.touched && (
                            <span>{meta.error}</span>
                          )}
                        </div>
                      )}
                    </Field>
                  </Col>
                </Row>
                <div>
                  <Row>
                    <Col md={3} className="mx-auto">
                      <Field name="confirm_password">
                        {({ input, meta }) => (
                          <div className="mb-3">
                            <label>Confirm password: </label>
                            <input
                              {...input}
                              type="text"
                              placeholder="confirm password"
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </Col>
                  </Row>
                </div>
                <Button className="m-auto d-flex" type="submit">
                  Update password
                </Button>
              </form>
            </Container>
          )}
        />
      </div>
    </div>
  );
};

export default ResetPassword;
