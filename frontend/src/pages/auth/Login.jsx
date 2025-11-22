// pages/auth/Login.jsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageContainer from "../../components/common/PageContainer";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, role } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);

      // REDIRECT BASED ON ROLE
      setTimeout(() => {
        if (role === "admin") nav("/admin");
        else if (role === "company") nav("/company");
        else if (role === "shop_keeper") nav("/shop");
        else if (role === "farmer") nav("/farmer");
      }, 200);
    } catch (err) {
      alert("Invalid Credentials");
      console.error(err);
    }
  };

  return (
    <PageContainer title="Login">
      <form onSubmit={submit} className="space-y-4">
        <Input 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />

        <Input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />

        <Button className="w-full">Login</Button>
      </form>
    </PageContainer>
  );
}
