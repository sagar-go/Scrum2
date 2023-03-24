import React from "react";
import { useSelector } from "react-redux";


const TaskStatus = (props) => {
  const addTaskFromStore = useSelector((state) => state?.taskData?.inputData);


  return (
    <div>
     
      <div>
        {addTaskFromStore &&
          addTaskFromStore.map((elem) => {
            return (
              <div style={{ backgroundColor: "LightGray", width: "20%" }}>
                <p>task: {elem.task}</p>
                <p>status: {elem.status}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TaskStatus;
