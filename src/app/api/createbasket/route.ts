import { NextApiRequest } from "next";
import { cookies } from "next/headers";
import { Basket } from "../../../../types";

export async function GET(req: NextApiRequest) {
  const baseURL = "https://headless.tebex.io";
  const baseHeader = { Accept: "application/json" };
  const url = `${baseURL}/api/accounts/${process.env.WEBSTORE_IDENT}/baskets`;
  const res = await fetch(url, { method: "POST", headers: baseHeader });

  const json = await res.json();

  const basket: Basket = {
    id: json.data.ident,
    username: json.data.username,
    price: json.data.total_price,
    ip: json.data.ip,
    checkoutURL: "",
  };

  cookies().set("basketIdent", basket.id);
  return Response.json(basket);
}
