import "./i18n";
import "./index.css";
import React from "react";
import App from "./App.jsx";
import { store } from "./store";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import reportWebVitals from "./reportWebVitals.js";
import StepProvider from "./contexts/StepContext";
import TabProvider from "./contexts/ActiveTabContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="251471180394-eo11pfqn01b08afqhau4nua9k4c27tj4.apps.googleusercontent.com">
    <Provider store={store}>
      <StepProvider>
        <TabProvider>
          <App />
          <Toaster />
        </TabProvider>
      </StepProvider>
    </Provider>
  </GoogleOAuthProvider>
);

reportWebVitals();
