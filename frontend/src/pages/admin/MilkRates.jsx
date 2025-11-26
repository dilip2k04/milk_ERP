import { useEffect, useState } from "react";
import PageContainer from "../../components/common/PageContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import api from "@/utils/apiClient";
import { successToast, errorToast } from "@/utils/toast";

export default function MilkRates() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [rate, setRate] = useState(3);

  // ----------------------------------------------------
  // Load rate from API
  // ----------------------------------------------------
  const loadRate = async () => {
    try {
      setLoading(true);
      const res = await api.get("/rate");
      const data = res.data?.data;
      setRate(data?.currentRate || 3);
    } catch (err) {
      errorToast("Failed to load milk rate");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRate();
  }, []);

  // ----------------------------------------------------
  // Update rate
  // ----------------------------------------------------
  const updateRate = async () => {
    if (!rate || rate <= 0) {
      errorToast("Rate must be a positive number");
      return;
    }

    try {
      setSaving(true);
      await api.patch("/rate", { currentRate: Number(rate) });
      successToast("Rate updated successfully");
      loadRate();
    } catch (err) {
      console.error(err);
      errorToast(err?.response?.data?.message || "Failed to update rate");
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageContainer title="Milk Rate Configuration">
      <Card className="max-w-lg">
        <CardContent className="p-6 space-y-4">

          {/* Current Rate Display */}
          <div>
            <label className="text-sm font-medium">Current Rate (₹)</label>
            <Input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="mt-1"
              disabled={loading}
            />
          </div>

          {/* Save Button */}
          <Button
            onClick={updateRate}
            disabled={saving || loading}
            className="bg-black hover:bg-gray-800 text-white w-full"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Updating...
              </>
            ) : (
              "Update Rate"
            )}
          </Button>

          {/* Loading Info */}
          {loading && (
            <p className="text-sm text-gray-500 mt-2">
              Loading current rate...
            </p>
          )}
        </CardContent>
      </Card>

      <p className="text-xs text-gray-500 mt-4">
        This rate is used to calculate farmer milk payments:  
        <br />
        <b>(Fat + SNF) × Rate</b>
      </p>
    </PageContainer>
  );
}
