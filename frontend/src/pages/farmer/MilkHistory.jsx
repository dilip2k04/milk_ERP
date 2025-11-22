// pages/farmer/MilkHistory.jsx
import PageContainer from "../../components/common/PageContainer";
import DataTable from "../../components/common/DataTable";

export default function MilkHistory() {
  const columns = [
    { key: "date", label: "Date" },
    { key: "liters", label: "Milk (L)" },
    { key: "fat", label: "Fat %" },
    { key: "snf", label: "SNF %" },
    { key: "water", label: "Water %" },
    { key: "amount", label: "Amount (₹)" }
  ];

  return (
    <PageContainer title="Milk History">
      <DataTable columns={columns} data={[]} />
    </PageContainer>
  );
}
