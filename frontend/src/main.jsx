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

// Toast Provider - Add this
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RoleProvider>
        <UIProvider>
          <App />
          <Toaster position="top-right" />
        </UIProvider>
      </RoleProvider>
    </AuthProvider>
  </React.StrictMode>
);