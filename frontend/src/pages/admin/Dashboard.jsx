// pages/admin/Dashboard.jsx
import PageContainer from "../../components/common/PageContainer";
import MilkSummaryChart from "../../components/charts/MilkSummaryChart";
import OrdersChart from "../../components/charts/OrdersChart";
import FinanceChart from "../../components/charts/FinanceChart";

export default function Dashboard() {
  return (
    <PageContainer title="Admin Dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MilkSummaryChart data={[]} />
        <OrdersChart data={[]} />
        <FinanceChart data={[]} />
      </div>
    </PageContainer>
  );
}
