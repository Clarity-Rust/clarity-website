import { Package } from "../../../types";

export default function Item({pkg}: {pkg: Package}) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={pkg.imageURL}
        alt={pkg.name}
        className="w-full h-56 object-cover object-center"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800">{pkg.name}</h3>
        <p className="text-gray-600">Price: {pkg.price}</p>
        <p className="text-gray-600">Type: {pkg.type}</p>
        {/* <div className="mt-4">
          <h4 className="font-semibold text-gray-700">
            Category: {pkg.category.name}
          </h4>
          <p className="text-sm text-gray-600">{pkg.category.desc}</p>
        </div> */}
      </div>
    </div>
  );
}
