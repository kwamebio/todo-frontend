import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/js/bootstrap.min';
import {SnackbarProvider} from "notistack";
import CloseSnackBar from "./components/CloseSnackbar";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SnackbarProvider
      autoHideDuration={8000}
      maxSnack={1}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      disableWindowBlurListener={true}
      action={<CloseSnackBar />}
    >
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
