import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import TimeTable from "./pages/TimeTable"
import UpdateTimeTable from "./pages/updateTimeTable";
import Scheduler from "./pages/Scheduler";
// import TimetableB from "./pages/TimeTableB";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
      <App />
      // <Scheduler/>
);
