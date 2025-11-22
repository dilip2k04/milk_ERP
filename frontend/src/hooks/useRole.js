// hooks/useRole.js
import { useRole } from "../context/RoleContext";

/**
 * Hook: useRole
 * Returns role helpers: isAdmin, isCompany, isShopKeeper, isFarmer
 */
export default function useRoleHook() {
  return useRole();
}
