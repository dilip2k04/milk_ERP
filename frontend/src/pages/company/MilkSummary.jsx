// pages/company/MilkSummary.jsx
import PageContainer from "../../components/common/PageContainer";
import DataTable from "../../components/common/DataTable";

export default function MilkSummary() {
  const columns = [
    { key: "date", label: "Date" },
    { key: "totalLiters", label: "Total Milk (L)" },
  ];

  return (
    <PageContainer title="Milk Summary">
      <DataTable
        columns={columns}
        data={[]}
        actions={null}
      />
    </PageContainer>
  );
}
