import React from 'react';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './Store/Store';
import Navigation from './routes/Navigation';
import 'react-toastify/dist/ReactToastify.css';
import {BACKEND} from './Store/utils/constants';
import { ToastContainer } from 'react-toastify';

axios.defaults.baseURL = `${BACKEND}`;
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, HEAD';
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config){
    const token = localStorage.getItem('token_educando');
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config;
});

export default function App(){
  return (
    <Provider store={store}>
      <Navigation /> 
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Provider>
  )
}