import { Category, Package } from "../../../types";
import Item from "./SmallPkg";
import {getAllPackages} from "@/lib/Actions";

export default async function StoreGrid() {
  const data: Package[] = await getAllPackages();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {data.map((pkg: Package) => (
        <Item key={pkg.id} pkg={pkg} />
      ))}
    </div>
  );
}
