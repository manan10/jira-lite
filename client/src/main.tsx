import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'; 

import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext.tsx";
import { store } from './store/store';
import { ErrorBoundary } from "./components/ErrorBoundry.tsx";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <BrowserRouter>
          <ThemeProvider>
            <ToastProvider>
              <App />
            </ToastProvider>
          </ThemeProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
);
