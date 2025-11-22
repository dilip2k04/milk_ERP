// context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, getIdToken, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import authService from "../services/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);   // <-- backend user: role, name, etc.
  const [role, setRole] = useState("");     // <-- admin | company | shop_keeper | farmer
  const [loading, setLoading] = useState(true);

  // ------------------------------
  // LOGIN FUNCTION
  // ------------------------------
  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  // ------------------------------
  // LOGOUT FUNCTION
  // ------------------------------
  const logout = async () => {
    await signOut(auth);
    setFirebaseUser(null);
    setUser(null);
    setRole("");
    setToken("");
  };

  // ------------------------------
  // FIREBASE LISTENER
  // ------------------------------
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseUser(firebaseUser);

      if (firebaseUser) {
        const idToken = await getIdToken(firebaseUser);

        setToken(idToken);

        // Fetch backend user (/auth/me)
        try {
          const res = await authService.getMe();
          const backendUser = res.data?.data;

          setUser(backendUser || null);
          setRole(backendUser?.role || "");

        } catch (err) {
          console.error("Failed to load backend user:", err);
          setUser(null);
          setRole("");
        }
      } else {
        setUser(null);
        setRole("");
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        token,
        user,
        role,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// EXPORT useAuth HOOK
export function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
