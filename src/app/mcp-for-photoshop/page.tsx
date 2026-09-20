import type { Metadata } from "next";
import { IntegrationPage, integrationMetadata } from "@/components/sections/integration-page";

export const metadata: Metadata = integrationMetadata("mcp-for-photoshop");

export default function Page() {
  return <IntegrationPage slug="mcp-for-photoshop" />;
}
