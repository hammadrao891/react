import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { AuthContextProvider } from "./context/AuthContext";
import TimeTable from "./pages/TimeTable"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
  <AuthContextProvider>
      <App />
      {/* <TimeTable/> */}
      </AuthContextProvider>
     </Provider> 
);
