import { useEffect, useState } from "react";
import PageContainer from "../../components/common/PageContainer";
import api from "../../utils/apiClient";

export default function MyMilkEntries() {
  const [entries, setEntries] = useState([]);

  const load = async () => {
    try {
      const res = await api.get("/milk-entries/my");
      setEntries(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <PageContainer title="My Milk Transactions">
      <p className="mb-4 text-gray-600">Your milk collection history</p>

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

              <div className="font-bold text-blue-600 text-lg">
                ₹{e.amount?.toFixed(2)}
              </div>
            </div>

            <div className="mt-2 text-sm">
              Liters: {e.liters} | Fat: {e.fat} | SNF: {e.snf}
            </div>

            <div className="text-xs text-gray-400 mt-1">
              Rate: ₹{e.rate} / liter
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
