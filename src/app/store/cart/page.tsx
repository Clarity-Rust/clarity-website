import React from "react";
import Link from "next/link";
import { getBasket } from "@/lib/Actions";
import DetailPackage from "@/components/store/DetailPackage";

export default async function CartHome() {
  const basket = await getBasket();
  const cartItems = basket.packages;
  const checkoutURL = basket.checkoutURL;
  console.log(checkoutURL);

  return (
    <div className="flex h-screen m-1">
      <div className="w-1/2 overflow-auto flex flex-col place-content-center">
        <h1 className="text-3xl text-bold mb-10">Checkout - Summary </h1>
        {cartItems === undefined
          ? "your cart is empty"
          : cartItems.map((id: string) => <DetailPackage id={id} key={id} />)}
      </div>
      <div className="w-1/2 p-4">
        <div className="m-4 p-4 shadow-lg">
          <p>
            Logged in as <b>boop!</b>
          </p>
          <p>Total: $35.94</p>
        </div>
        <div className="m-4 p-4 flex gap-2">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            <Link href="/store">Return to store</Link>
          </button>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <a href={checkoutURL}>Go to checkout</a>
          </button>
        </div>
      </div>
    </div>
  );
}
