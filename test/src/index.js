import React from "react";
import ReactDOM from "react-dom/client";

import {Counter} from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";
import '@aws-amplify/ui-react/styles.css'
import { store } from './redux/store'
import { Provider } from 'react-redux'



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    
    <Provider store={store}>   
    <Counter/>
    </Provider> 
    
);