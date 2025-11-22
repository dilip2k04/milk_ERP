// context/UIContext.jsx
import { createContext, useContext, useState } from "react";

const UIContext = createContext();
export const useUI = () => useContext(UIContext);

export function UIProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState("light");
  const [globalLoading, setGlobalLoading] = useState(false);
  const [modal, setModal] = useState({
    open: false,
    content: null,
  });

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const openModal = (content) => setModal({ open: true, content });
  const closeModal = () => setModal({ open: false, content: null });

  const value = {
    sidebarOpen,
    toggleSidebar,
    theme,
    setTheme,
    globalLoading,
    setGlobalLoading,
    modal,
    openModal,
    closeModal,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
