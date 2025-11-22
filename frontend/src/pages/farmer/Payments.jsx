// pages/farmer/Payments.jsx
import PageContainer from "../../components/common/PageContainer";
import DataTable from "../../components/common/DataTable";

export default function FarmerPayments() {
  const columns = [
    { key: "date", label: "Payment Date" },
    { key: "session", label: "Session" },
    { key: "amount", label: "Amount (₹)" },
    { key: "method", label: "Payment Method" }
  ];

  return (
    <PageContainer title="Payments from Admin">
      <DataTable columns={columns} data={[]} />
    </PageContainer>
  );
}
