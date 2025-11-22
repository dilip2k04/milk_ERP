// pages/admin/MilkSessions.jsx
import PageContainer from "../../components/common/PageContainer";
import { Button } from "@/components/ui/button";

export default function MilkSessions() {
  return (
    <PageContainer title="Milk Sessions">
      <Button>Create New Session</Button>
      <p className="mt-4">List of sessions...</p>
    </PageContainer>
  );
}
