import { useEffect, useState } from "react";
import PageContainer from "../../components/common/PageContainer";
import api from "../../utils/apiClient";

export default function MilkEntries() {
  const [entries, setEntries] = useState([]);

  const load = async () => {
    try {
      const res = await api.get("/milk-entries");
      setEntries(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <PageContainer title="Milk Entries">
      <p className="mb-4 text-gray-600">All milk collection entries</p>

      <div className="space-y-3">
        {entries.map((e) => (
          <div
            key={e._id}
            className="border p-4 rounded bg-white shadow-sm"
          >
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">{e.farmerId?.name}</div>
                <div className="text-xs text-gray-500">
                  Phone: {e.farmerId?.phone}
                </div>
                <div className="text-xs text-gray-500">
                  Session: {e.sessionId?.sessionName}
                </div>
              </div>

              <div className="font-bold text-green-600 text-lg">
                ₹{e.amount?.toFixed(2)}
              </div>
            </div>

            <div className="mt-2 text-sm text-gray-700">
              <b>Liters:</b> {e.liters} |
              <b> Fat:</b> {e.fat} |
              <b> SNF:</b> {e.snf} |
              <b> Water:</b> {e.water}
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
