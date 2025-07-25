// client/src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import { CookiesProvider } from "react-cookie"; 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      
      <CookiesProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>
);