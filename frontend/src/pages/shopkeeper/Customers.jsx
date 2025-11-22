// pages/shopkeeper/Customers.jsx
import PageContainer from "../../components/common/PageContainer";
import DataTable from "../../components/common/DataTable";
import { Button } from "@/components/ui/button";

export default function Customers() {
  const columns = [
    { key: "name", label: "Customer Name" },
    { key: "phone", label: "Phone" },
  ];

  return (
    <PageContainer title="Manage Customers">
      <div className="flex justify-end mb-4">
        <Button>Add Customer</Button>
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
