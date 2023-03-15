import React, { useRef } from "react";
import { Field, Form } from "react-final-form";
import { useDispatch } from "react-redux";
import { Button, Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { userforgotPassword } from "../features/actions/authActions";

const Email = () => {
  const form = useRef();

  const dispatch = useDispatch();

  const onSubmit = (values) => {
    console.log(values, "sdfsdfererd");
    dispatch(userforgotPassword({ email: values.email })).then((e) => {
      if (e?.payload?.success) {
        toast.success("please check your email id", { autoClose: 1000 });
      } else {
        toast.error(`${e?.error?.message}`, {
          autoClose: 1000,
          closeOnClick: true,
        });
      }
    });
    
  };

  return (
    <div>
      <h3>Email</h3>

      <div className="mx-auto">
        <Form
          onSubmit={onSubmit}
          validate={(values) => {
            const error = {};
            if (!values.email) {
              error["email"] = "email required!";
            }
            return error;
          }}
          render={({ handleSubmit }) => (
            <Container>
              <form onSubmit={handleSubmit} ref={form}>
                <Row className="">
                  <Col md={3} className="mx-auto">
                    <Field name="email">
                      {({ input, meta }) => (
                        <div className="mb-3 d-contents">
                          <label>Email: </label>
                          <input
                            {...input}
                            size="30"
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
                <Button className="m-auto d-flex" type="submit">
                  send
                </Button>
              </form>
            </Container>
          )}
        />
      </div>
    </div>
  );
};

export default Email;
