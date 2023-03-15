const { jwtDecode } = require("../utils/util");
const taskDB = require("../models/tasks");
const authUser = require("../models/auth");

const createRecords = async (req, res) => {
  console.log(req.headers, "heeeeeeeeeee");
  let tokenHeader = req.headers.authorization.split(" ")[1];
  let jwtResult = await jwtDecode(tokenHeader);
  console.log(jwtResult, "jwtttt");
  const loggedUser = await authUser.findOne({ _id: jwtResult.id });
  console.log(loggedUser, "user");
  if (!loggedUser) {
    return res.status(404).send("Access Denied, Please check Token");
  }
  const Task = new taskDB({
    status: req.body.status,
    task: req.body.task,
    // _id: loggedUser._id,
    dev: loggedUser.role === "dev" && {
      name: loggedUser.name,
      id: loggedUser._id,
    },
    manager:
      loggedUser.role === "dev"
        ? {
            name: loggedUser.manager.name,
            id: loggedUser.manager._id,
          }
        : { name: loggedUser.name, id: loggedUser.id },
    createdAt: Date.now(),
  });

  try {
    await Task.save();
    res
      .status(200)
      .send({ message: "Task created successfully", success: true });
  } catch (error) {
    res.status(404).send({ message: "FAILED", success: false, error: error });
  }
};

const getRecords = async (req, res) => {
  let tokenHeader = req.headers.authorization.split(" ")[1];
  let jwtResult = await jwtDecode(tokenHeader);
  let loggedUser = await authUser.findById({ _id: jwtResult.id });

  if (!loggedUser) {
    return res
      .status(404)
      .send({ message: "Access Denied, Please check Token", success: false });
  }

  //   let loggedUser= null;
  let myUser = null;
  console.log(loggedUser, "loggggggggggggggggggggedddddddddddddddd");

  if (loggedUser.role === "manager") {
    myUser = await taskDB.find({ "manager.id": loggedUser._id });
  } else {
    myUser = await taskDB.find({ "dev.id": loggedUser._id });
  }

  return res.status(200).send({ data: myUser, success: true });
};

module.exports = { getRecords, createRecords };
