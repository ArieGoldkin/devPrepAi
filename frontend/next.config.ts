import type { NextConfig } from "next";
import { config } from "dotenv";
import { join } from "path";

// Load environment variables from root .env file
config({ path: join(__dirname, "..", ".env") });

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
