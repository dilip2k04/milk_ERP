// pages/admin/UploadCSV.jsx
import PageContainer from "../../components/common/PageContainer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function UploadCSV() {
  return (
    <PageContainer title="Upload Milk CSV">
      <Input type="file" accept=".csv" />
      <Button className="mt-4">Upload</Button>
      <p className="mt-4 text-muted-foreground">CSV processing results will appear here.</p>
    </PageContainer>
  );
}
