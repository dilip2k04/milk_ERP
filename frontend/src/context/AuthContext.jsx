// context/AuthContext.jsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  getIdToken,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import authService from "../services/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [firebaseUser, setFirebaseUser] = useState(null); // direct firebase user
  const [token, setToken] = useState("");                 // firebase token
  const [user, setUser] = useState(null);                 // backend DB user
  const [role, setRole] = useState("");                   // role from backend
  const [loading, setLoading] = useState(true);

  // ------------------------------
  // LOGIN
  // ------------------------------
  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ------------------------------
  // LOGOUT
  // ------------------------------
  const logout = async () => {
    await signOut(auth);
    setFirebaseUser(null);
    setUser(null);
    setToken("");
    setRole("");
  };

  // ------------------------------
  // FIREBASE AUTH STATE LISTENER
  // ------------------------------
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);

      if (fbUser) {
        // Get Firebase token
        const idToken = await getIdToken(fbUser);
        setToken(idToken);

        // Load backend user
        try {
          const response = await authService.getMe();
          const backendUser = response.data?.data;

          setUser(backendUser || null);
          setRole(backendUser?.role || "");
        } catch (err) {
          console.error("❌ Failed to load backend user:", err);
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

export function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
