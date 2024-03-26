import { getPackage } from "@/lib/Actions"

export default async function DetailPackage({id} : {id: string}){
  const pkg = await getPackage(id); 
  return (
    <div className="flex flex-col md:flex-row bg-gray-100 p-8 rounded-lg">
      <div className="md:w-1/3 mb-8 md:mb-0">
        <img
          src={pkg.imageURL}
          alt={pkg.name}
          className="w-full h-auto rounded-lg"
        />
      </div>
      <div className="md:w-2/3 md:pl-8">
        <h1 className="text-3xl font-bold mb-4">{pkg.name}</h1>
        <p className="text-xl font-bold mb-4">Price: ${pkg.price}</p>
        <div
          className="text-lg"
          dangerouslySetInnerHTML={{ __html: pkg.innerhtml }}
        />
      </div>
    </div>
  )
}