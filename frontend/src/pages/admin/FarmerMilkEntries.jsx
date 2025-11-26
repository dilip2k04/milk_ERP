import { useEffect, useState } from "react";
import PageContainer from "../../components/common/PageContainer";
import api from "../../utils/apiClient";
import { useParams } from "react-router-dom";

export default function FarmerMilkEntries() {
  const { id } = useParams();
  const [entries, setEntries] = useState([]);
  const [farmer, setFarmer] = useState(null);

  const loadData = async () => {
    try {
      const userRes = await api.get(`/users/${id}`);
      setFarmer(userRes.data.data);

      const entryRes = await api.get(`/milk-entries/by-farmer/${id}`);
      setEntries(entryRes.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageContainer title={`Entries - ${farmer?.name || ""}`}>
      <p className="mb-4 text-gray-600">Milk entries for this farmer</p>

      <div className="space-y-3">
        {entries.map((e) => (
          <div
            key={e._id}
            className="border p-4 rounded bg-white shadow-sm"
          >
            <div className="flex justify-between">
              <div>
                <div className="text-xs text-gray-500">
                  Session: {e.sessionId?.sessionName}
                </div>
                <div className="text-xs text-gray-500">
                  Date: {new Date(e.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="font-bold text-green-600 text-lg">
                ₹{e.amount.toFixed(2)}
              </div>
            </div>

            <div className="mt-2 text-sm">
              Liters: {e.liters} | Fat: {e.fat} | SNF: {e.snf} | Water: {e.water}
            </div>

            <div className="text-xs text-gray-500 mt-1">
              Rate: ₹{e.rate} per liter
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
