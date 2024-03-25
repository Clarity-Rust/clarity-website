import CategoryDropdown from "@/components/store/CategoryDropdown";
import StoreGrid from "@/components/store/StoreGrid";

export default async function StoreHome() {
  return (
    <div className="w-screen grid place-items-center max-h-max ">
      {/* <CategoryDropdown /> */}
      <StoreGrid />
    </div>
  );
}
