// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

// Styles
import "../styles/index.css";
import "../styles/overrides.css";

// Context Providers
import { AuthProvider } from "./context/AuthContext";
import { RoleProvider } from "./context/RoleContext";
import { UIProvider } from "./context/UIContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RoleProvider>
        <UIProvider>
          <App />
        </UIProvider>
      </RoleProvider>
    </AuthProvider>
  </React.StrictMode>
);
