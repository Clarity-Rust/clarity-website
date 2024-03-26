import { Package } from "../../../types";
import { FaShoppingCart } from "react-icons/fa";
import { addPackage } from "@/lib/Actions";

export default function Item({ pkg }: { pkg: Package }) {
  
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={pkg.imageURL}
        alt={pkg.name}
        className="w-full h-56 object-cover object-center"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800">{pkg.name}</h3>
        <p className="text-gray-600">{"$" + pkg.price}</p>
        <div className="mt-4">
          <h4 className="font-semibold text-gray-700">
            Category: {pkg.category.name}
          </h4>
        </div>
        <form action={addPackage} method="post">
          <input type="hidden" name="pkgId" value={pkg.id} />
          <button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
          >
            <FaShoppingCart />
            Add to Cart
          </button>
        </form>
      </div>
    </div>
  );
}
