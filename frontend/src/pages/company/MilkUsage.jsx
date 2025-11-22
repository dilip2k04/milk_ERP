// pages/company/MilkUsage.jsx
import PageContainer from "../../components/common/PageContainer";
import { Button } from "@/components/ui/button";
import DataTable from "../../components/common/DataTable";

export default function MilkUsage() {
  const columns = [
    { key: "product", label: "Product" },
    { key: "litersUsed", label: "Liters Used" },
    { key: "producedAmount", label: "Produced (Units)" },
  ];

  return (
    <PageContainer title="Milk Usage">
      <div className="flex justify-end mb-4">
        <Button>Create Usage Entry</Button>
      </div>

      <DataTable
        columns={columns}
        data={[]}
        actions={(row) => (
          <>
            <Button size="sm" variant="outline">Edit</Button>
            <Button size="sm" variant="destructive">Delete</Button>
          </>
        )}
      />
    </PageContainer>
  );
}
