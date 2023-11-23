import React from "react";
import ReactDOM from "react-dom";
import "regenerator-runtime/runtime";

import {EnrolmentList} from "./components/EnrolmentList";

const socket = io();

// BONUS
const getUserList = moduleCode => {
  socket.emit("enrolled", moduleCode);
}
// BONUS

socket.on('classes', classes => {
  console.log(classes);

  // For the newest version of react, this will be createRoot
  ReactDOM.render(
    <EnrolmentList classes={classes} getEnrolled={getUserList} />, 
    document.getElementById('root')
  );  
});