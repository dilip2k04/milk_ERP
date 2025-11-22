// context/RoleContext.jsx
import { createContext, useContext, useMemo } from "react";
import useAuth from "../hooks/useAuth";


const RoleContext = createContext();
export const useRole = () => useContext(RoleContext);

export function RoleProvider({ children }) {
  const { user, role } = useAuth();

  const value = useMemo(
    () => ({
      role,
      isAdmin: role === "admin",
      isCompany: role === "company",
      isShopKeeper: role === "shop_keeper",
      isFarmer: role === "farmer",
      user,
    }),
    [role, user]
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}
