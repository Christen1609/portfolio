import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 requires qualities to be allowlisted; 90 powers the sharp hero.
    qualities: [75, 90],
  },
};

export default nextConfig;
