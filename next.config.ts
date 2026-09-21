import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `/mcp-for-opencv` was retired (see docs: OpenCV is a library, not a host
  // application, so the typed-tool/undo/policy model has nothing to attach to).
  // Kept as a redirect rather than a 404 in case anything still points at it.
  async redirects() {
    return [
      { source: "/mcp-for-opencv", destination: "/integrations", permanent: false },
      { source: "/zh/mcp-for-opencv", destination: "/zh/integrations", permanent: false },
    ];
  },
};

export default nextConfig;
