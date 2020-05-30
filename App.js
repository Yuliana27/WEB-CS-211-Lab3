import React, { Component} from "react";
import Main from "./components/MainComponent";
import { BrowserRouter } from 'react-router-dom';
import './App.css';

import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

import axiosInstance from "../axiosApi";

const store = ConfigureStore();

class App extends Component {

    constructor() {
        super();
        this.handleLogout = this.handleLogout.bind(this);
    }

    async handleLogout() {
        try {
            const response = await axiosInstance.post('/blacklist/', {
                "refresh_token": localStorage.getItem("refresh_token")
            });
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;
            return response;
        }
        catch (e) {
            console.log(e);
        }
    };

   render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;