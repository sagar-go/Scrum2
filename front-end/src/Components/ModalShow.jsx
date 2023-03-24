import React, { useEffect, useRef, useState } from "react";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Row } from "react-bootstrap";
import Select from "react-select";
import {
  // addTasksDetails,
  userRecords,
  userTaskCreate,
} from "../features/actions/taskActions";
import { toast } from "react-toastify";
import TaskStatus from "./TaskStatus";
import { addIdContent, addUserTask } from "../features/Slice/taskSlice";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

// const tasks = [
//   { id: "1", content: "First task" },
//   { id: "2", content: "Second task" },
//   { id: "3", content: "Third task" },
//   { id: "4", content: "Fourth task" },
//   { id: "5", content: "Fifth task" }
// ];

const ModalShow = () => {
  const newTask = useSelector((state) => state?.taskData?.arrData);
  console.log(newTask, "ssddfsdfsdfsfsd");
  // const taskDetails = useSelector(
  //   (state) => state?.taskData?.userRecordDetails
  // );

  // let obj = {};
  // taskDetails?.data?.data.map((ele) => {
  //   obj[ele._id] = { name: ele._id, items: ele.data };
  // });

  // console.log(obj, " weqweqwecsd ");

  const [columns, setColumns] = useState({});
 // console.log(columns, "erterterte");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userRecords()).then((res) => {
    //  console.log(res, "eeeeeressssssssss");
      let obj = {};
      res?.payload?.data?.data.map((ele) => (
        obj[ele._id] = { name: ele._id, items: ele.data }
      ))
      setColumns(obj); 
    })
  }, [dispatch]);

  // useEffect(() => {
  //   const val = Object.entries(taskDetails?.data?.data)
  //   console.log(val, "columns");
  // },[])

  
  useEffect(() => {
    let val = newTask?.map((ele) => ele);
    // dispatch(addIdContent(data))
    console.log(val, "eeeeeeeeeeeeeee111111111");
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
     // console.log(sourceColumn, destColumn, "wewwewwww");
      const destItems = [...destColumn.items];
     // console.log(sourceItems, "vvvvvvvvvvvvvv");
      const [removed] = sourceItems.splice(source.index, 1);

     // console.log(destItems, "vvvvvvvvvvvvvv2222222222222222");
      destItems.splice(destination.index, 0, removed);

    //  console.log(sourceItems, destItems, "esdsadasdasd");
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
    // console.log(copiedItems, "vvvvvvvvvvvvvv");
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const [taskStatus, setTaskStatus] = useState([]);

  const form = useRef();

  const options = [
    { value: "inprogress", label: "Inprogress" },
    { value: "codeReview", label: "Code Review" },
    { value: "completed", label: "completed" },
    { value: "incomplete", label: "Incomplete" },
  ];

  const onSubmit = (values) => {
    //setTaskStatus(values);
    //let newVal = Object.entries(values)
    setTaskStatus(values);
    // setAddTask([...taskStatus, values]);
    dispatch(
      userTaskCreate({ status: values.status.value, task: values.task })
    ).then((e) => {
      if (e?.payload?.data?.success === true) {
        toast.success(e?.payload?.data?.message, { autoClose: 1000 });
      }
    });
    dispatch(addUserTask({ status: values.status.value, task: values.task }));
  };

  return (
    <>
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
                              <input
                                {...input}
                                type="text"
                                placeholder="task"
                              />
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
        {/* <div>
          {taskDetails?.data?.data?.map((elem, index) => {
            return (
              <div key={index}>
                {elem?.data?.map((item) => {
                  return (
                    <div style={{ backgroundColor: "LightGray", width: "20%" }}>
                      <p>task: {item?.task} </p>
                      <p>status: {item?.status}</p>
                    </div>
                  );
                })}
                {/* <p>{elem?._id}</p> */}
        {/* </div> */}
        {/* );
          })}
        </div> */}
      </div>

      <div>
        <div
          style={{ display: "flex", justifyContent: "center", height: "100%" }}
        >
          <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            {Object.entries(columns).map(([columnId, column], index) => {
              // console.log(ele, "fffffffffff", data);
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  key={index}
                >
                  <h2>{column.name}</h2>
                  <div style={{ margin: 8 }}>
                    <Droppable droppableId={columnId} key={`${index}`}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              background: snapshot.isDraggingOver
                                ? "lightblue"
                                : "lightgrey",
                              padding: 4,
                              width: 250,
                              minHeight: 500,
                            }}
                          >
                            <>
                              {column.items.map((element, elementIndex) => {
                                return (
                                  <Draggable
                                    key={element?._id}
                                    draggableId={element?._id}
                                    index={index}
                                  >
                                    {(provided, snapshot) => {
                                      return (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={{
                                            userSelementct: "none",
                                            padding: 16,
                                            margin: "0 0 8px 0",
                                            minHeight: "50px",
                                            backgroundColor: snapshot.isDragging
                                              ? "#263B4A"
                                              : "#456C86",
                                            color: "white",
                                            ...provided.draggableProps.style,
                                          }}>
                                          <div>
                                            task:
                                            {`${element?.manager.name} ${elementIndex}`}
                                          </div>
                                          <div>
                                            status: {element?.status}{" "}
                                            {element?._id}
                                          </div>
                                        </div>
                                      );
                                    }}
                                  </Draggable>
                                );
                              })}
                            </>

                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              );
            })}
          </DragDropContext>
        </div>
      </div>

      <TaskStatus taskStatus={taskStatus} />
    </>
  );
};

export default ModalShow;
