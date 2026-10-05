import { UserRole } from "@genesis/contracts";

console.log("Genesis TypeScript API Service initializing...");

export function getStatus() {
  return {
    status: "ok",
    service: "genesis-api",
    timestamp: new Date().toISOString(),
  };
}
