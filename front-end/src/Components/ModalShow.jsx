import React, { useRef } from "react";
import { Field, Form } from "react-final-form";
import { useDispatch } from "react-redux";
import { Button, Col, Container, Row } from "react-bootstrap";
import Select from "react-select";
import { userTaskCreate } from "../features/actions/authActions";

const ModalShow = () => {
  const form = useRef();

  const dispatch = useDispatch();

  const options = [
    { value: "inprogress", label: "Inprogress" },
    { value: "code review", label: "Code Review" },
    { value: "completed", label: "completed" },
    { value: "incomplete", label: "Incomplete" },
  ];

  const onSubmit = (values) => {
    console.log( values.status.value, "hgfds");
    dispatch(userTaskCreate({status: values.status.value, task: values.task}))

  };

  return (
    <div>
      <h3>modal show</h3>

      <div className="mx-auto">
        <Form
          onSubmit={onSubmit}
          validate={(values) => {
            // const error = {};
            // if (!values.email) {
            //   error["email"] = "email required!";
            // }
            // return error;
          }}
          render={({ handleSubmit }) => (
            <Container>
              <form onSubmit={handleSubmit} ref={form}>
                <div>
                  <Row className="">
                    <Col md={3} className="mx-auto">
                      <Field name="task">
                        {({ input }) => (
                          <div className="mb-3">
                            <label>Task</label>
                            <input {...input} type="text" placeholder="task" />
                            {/* {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )} */}
                          </div>
                        )}
                      </Field>
                    </Col>
                  </Row>
                </div>
                <div>
                  <Row>
                    <Col>
                      <Field name="status">
                        {({ input, meta }) => (
                          <div>
                            <label>status</label>
                            <div>
                              <Select
                                {...input}
                                placeholder="status"
                                options={options}
                              />
                            </div>
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

export default ModalShow;
