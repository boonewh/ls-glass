import StructuredData from "@/components/StructuredData";
import { serviceMetadata, serviceSchema } from "@/lib/seo";

export const metadata = serviceMetadata("auto-glass");

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={serviceSchema("auto-glass")} />
      {children}
    </>
  );
}
