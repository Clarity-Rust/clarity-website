import { Package } from "../../../types";
import Item from "./SmallPkg";
import { getPackagesInCategory } from "@/lib/Actions";

export default async function StoreGrid() {
  const data: Package[] = await getPackagesInCategory("2639946");
  return (
    <div>
      {data.map((pkg: Package) => (
        <Item pkg={pkg} />
      ))}
    </div>
  );
}
