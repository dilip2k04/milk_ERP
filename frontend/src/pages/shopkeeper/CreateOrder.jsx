// pages/shopkeeper/CreateOrder.jsx
import PageContainer from "../../components/common/PageContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { useState } from "react";

export default function CreateOrder() {
  const [qty, setQty] = useState("");
  const [paymentType, setPaymentType] = useState("full");

  return (
    <PageContainer title="Place Order">
      <div className="space-y-4">
        <Select>
          <SelectTrigger>Select Product</SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Product 1</SelectItem>
            <SelectItem value="2">Product 2</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Quantity"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />

        <Select onValueChange={setPaymentType}>
          <SelectTrigger>Select Payment Type</SelectTrigger>
          <SelectContent>
            <SelectItem value="full">Full</SelectItem>
            <SelectItem value="partial">Partial</SelectItem>
          </SelectContent>
        </Select>

        {paymentType === "partial" && (
          <Input placeholder="Amount Paid Now" />
        )}

        <Button className="w-full">Place Order</Button>
      </div>
    </PageContainer>
  );
}
