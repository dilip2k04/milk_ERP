// pages/shopkeeper/OrderHistory.jsx
import PageContainer from "../../components/common/PageContainer";
import DataTable from "../../components/common/DataTable";

export default function OrderHistory() {
  const columns = [
    { key: "date", label: "Date" },
    { key: "product", label: "Product" },
    { key: "qty", label: "Quantity" },
    { key: "status", label: "Status" },
  ];

  return (
    <PageContainer title="Order History">
      <DataTable columns={columns} data={[]} />
    </PageContainer>
  );
}
