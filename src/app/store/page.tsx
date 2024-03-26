import StoreGrid from "@/components/store/StoreGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clarity | STORE AVAILABLE",
  description: "Clarity Rust Homepage",
};
export default async function StoreHome() {
  return (
    <div className="w-screen grid place-items-center">
      <h1>Welcome to the store!</h1>
      <StoreGrid />
    </div>
  );
}
