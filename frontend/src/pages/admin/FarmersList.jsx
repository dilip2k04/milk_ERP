import { useEffect, useState } from "react";
import PageContainer from "../../components/common/PageContainer";
import api from "../../utils/apiClient";
import { useNavigate } from "react-router-dom";

export default function FarmersList() {
  const [farmers, setFarmers] = useState([]);
  const navigate = useNavigate();

  const loadFarmers = async () => {
    try {
      const res = await api.get("/users?role=farmer");
      setFarmers(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadFarmers();
  }, []);

  return (
    <PageContainer title="All Farmers">
      <p className="mb-4 text-gray-600">Click on a farmer to view milk entries</p>

      <div className="space-y-3">
        {farmers.map((f) => (
          <div
            key={f._id}
            onClick={() => navigate(`/admin/farmer/${f._id}/entries`)}
            className="border p-4 rounded bg-white shadow cursor-pointer hover:bg-gray-50"
          >
            <div className="font-semibold">{f.name}</div>
            <div className="text-sm text-gray-600">{f.email}</div>
            <div className="text-xs text-gray-500">Role: {f.role}</div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
