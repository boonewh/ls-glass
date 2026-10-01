import StructuredData from "@/components/StructuredData";
import { serviceMetadata, serviceSchema } from "@/lib/seo";

export const metadata = serviceMetadata("heavy-equipment");

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData data={serviceSchema("heavy-equipment")} />
      {children}
    </>
  );
}
