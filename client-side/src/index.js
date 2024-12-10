import React from 'react';
// import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client'; 
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import { Provider } from 'react-redux';
import { persistor, store }  from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

// const root = ReactDOM.createRoot(document.getElementById('root'));

const container = document.getElementById('root');
const root = createRoot(container); // Create root for React 18

root.render(
  <React.StrictMode>
    <Provider  store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <BrowserRouter>
          {/* <AuthProvider > */}
            <Routes>
              <Route path='/*' element={<App/>} />
            </Routes>
        {/* </AuthProvider> */}
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
