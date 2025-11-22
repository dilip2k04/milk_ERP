// pages/auth/ChangePassword.jsx
import PageContainer from "../../components/common/PageContainer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";


export default function ChangePassword() {
  const { updatePassword } = useAuth();
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const submit = async () => {
    await updatePassword(oldPass, newPass);
  };

  return (
    <PageContainer title="Change Password">
      <div className="space-y-4">
        <Input type="password" placeholder="Current Password" onChange={(e) => setOldPass(e.target.value)} />
        <Input type="password" placeholder="New Password" onChange={(e) => setNewPass(e.target.value)} />
        <Button onClick={submit}>Update</Button>
      </div>
    </PageContainer>
  );
}
