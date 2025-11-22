// pages/shopkeeper/Dashboard.jsx
import PageContainer from "../../components/common/PageContainer";
import OrdersChart from "../../components/charts/OrdersChart";
import FinanceChart from "../../components/charts/FinanceChart";

export default function ShopkeeperDashboard() {
  return (
    <PageContainer title="Shopkeeper Dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OrdersChart data={[]} />
        <FinanceChart data={[]} />
      </div>
    </PageContainer>
  );
}
