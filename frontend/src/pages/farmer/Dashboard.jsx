// pages/farmer/Dashboard.jsx
import PageContainer from "../../components/common/PageContainer";
import MilkSummaryChart from "../../components/charts/MilkSummaryChart";
import FinanceChart from "../../components/charts/FinanceChart";

export default function FarmerDashboard() {
  return (
    <PageContainer title="Farmer Dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MilkSummaryChart data={[]} />
        <FinanceChart data={[]} />
      </div>
    </PageContainer>
  );
}
