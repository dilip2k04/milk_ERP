// pages/admin/Users.jsx
import PageContainer from "../../components/common/PageContainer";
import DataTable from "../../components/common/DataTable";
import { Button } from "@/components/ui/button";

export default function Users() {
  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
  ];

  return (
    <PageContainer title="Manage Users">
      <div className="flex justify-end mb-4">
        <Button>Create User</Button>
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
