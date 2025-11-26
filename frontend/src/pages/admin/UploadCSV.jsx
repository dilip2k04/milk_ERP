import { useState, useEffect } from "react";
import PageContainer from "../../components/common/PageContainer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import api from "../../utils/apiClient";
import { successToast, errorToast } from "../../utils/toast";

export default function UploadCSV() {
  const [file, setFile] = useState(null);
  const [sessionId, setSessionId] = useState("");
  const [sessions, setSessions] = useState([]);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load milk sessions
  const loadSessions = async () => {
    try {
      const res = await api.get("/milk-sessions");
      setSessions(res.data.data || []);
    } catch (err) {
      console.error(err);
      errorToast("Failed to load milk sessions");
    }
  };

  // Load milk entries
  const loadEntries = async () => {
    setLoading(true);
    try {
      const res = await api.get("/milk-entries");
      setEntries(res.data.data || []);
    } catch (err) {
      console.error(err);
      errorToast("Failed to load milk entries");
    } finally {
      setLoading(false);
    }
  };

  // Upload CSV file
  const upload = async () => {
    if (!file) return errorToast("Please select a CSV file");
    if (!sessionId) return errorToast("Please select a session");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("sessionId", sessionId);

    try {
      const res = await api.post("/csv/upload", formData);
      successToast("CSV Processed Successfully");
      console.log("RESULT:", res.data);
      
      // Reload entries after successful upload
      loadEntries();
      
      // Reset form
      setFile(null);
      setSessionId("");
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";
      
    } catch (err) {
      console.error(err);
      errorToast("Upload failed");
    }
  };

  useEffect(() => {
    loadSessions();
    loadEntries();
  }, []);

  return (
    <PageContainer title="Milk Management">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Upload Section */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-6">Upload Milk CSV</h2>
            
            <div className="space-y-4">
              {/* Milk Session Dropdown */}
              <div>
                <label className="text-sm font-medium">Select Milk Session</label>
                <Select value={sessionId} onValueChange={setSessionId}>
                  <SelectTrigger className="bg-white mt-1">
                    <SelectValue placeholder="Choose a session" />
                  </SelectTrigger>
                  <SelectContent>
                    {sessions.map((s) => (
                      <SelectItem key={s._id} value={s._id}>
                        {s.name} ({s.date ? new Date(s.date).toLocaleDateString() : ""})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* CSV File Upload */}
              <div>
                <label className="text-sm font-medium">Select CSV File</label>
                <Input
                  type="file"
                  accept=".csv"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="bg-white mt-1"
                />
              </div>

              <Button onClick={upload} className="w-full">Upload CSV</Button>
            </div>
          </div>
        </div>

        {/* Right Column - Milk Entries */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Milk Entries</h2>
              <Button 
                onClick={loadEntries} 
                variant="outline" 
                size="sm"
                disabled={loading}
              >
                {loading ? "Loading..." : "Refresh"}
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-8">Loading entries...</div>
            ) : entries.length > 0 ? (
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                <p className="text-gray-600 text-sm">
                  Total {entries.length} milk {entries.length === 1 ? 'entry' : 'entries'}
                </p>
                
                {entries.map((e) => (
                  <div
                    key={e._id}
                    className="border p-4 rounded bg-gray-50 hover:bg-gray-100 transition-colors"
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
                      Rate: ₹{e.rate} per liter | 
                      Date: {e.createdAt ? new Date(e.createdAt).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No milk entries found. Upload a CSV file to get started.
              </div>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}