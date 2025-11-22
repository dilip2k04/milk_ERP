// pages/admin/MilkRates.jsx
import PageContainer from "../../components/common/PageContainer";
import { Button } from "@/components/ui/button";

export default function MilkRates() {
  return (
    <PageContainer title="Milk Rate Config">
      <Button>Create Rate Config</Button>
      <p className="mt-4">Rate list...</p>
    </PageContainer>
  );
}
