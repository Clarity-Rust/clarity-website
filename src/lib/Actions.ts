"use server";
import { redirect } from "next/navigation";
import { Basket, Category, User } from "../../types";
import { Package } from "../../types";
import { cookies } from "next/headers";

const baseURL = "https://headless.tebex.io";
const baseHeader = { Accept: "application/json" };

interface FetchOptions {
  method: string;
  headers: Record<string, string>;
  body?: string;
}

// Endpoints as functions
export async function getAllPackages(): Promise<Package[]> {
  const url = `${baseURL}/api/accounts/${process.env.WEBSTORE_IDENT}/categories?includePackages=1`;
  const response = await fetch(url, { method: "GET", headers: baseHeader });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const json = await response.json();
  const pkgs: Package[] = [];

  json.data.forEach((category: any) => {
    category.packages.forEach((pkg: any) => {
      pkgs.push({
        id: pkg.id,
        imageURL: pkg.image,
        innerhtml: pkg.description,
        price: pkg.total_price,
        name: pkg.name,
        category: {
          name: pkg.category.name,
          id: pkg.category.id,
        },
      });
    });
  });

  return pkgs.sort((a, b) => {
    if (a.category?.name < b.category.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
}

export async function getBasket(basketIdent: string): Promise<Basket> {
  const url = `${baseURL}/api/accounts/${process.env.WEBSTORE_IDENT}/baskets/${basketIdent}`;
  const response = await fetch(url, { method: "GET", headers: baseHeader });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  const json = await response.json();

  const basket: Basket = {
    id: json.data.ident,
    username: json.data.username,
    checkoutURL: json.data.links.checkout,
    price: json.data.total_price,
    ip: json.data.ip,
    packages: [],
  };

  json.data.packages.forEach((pkg: any) => {
    basket.packages?.push(pkg.id);
  });

  return basket;
}

export async function createBasket(): Promise<Basket> {
  const url = `${baseURL}/api/accounts/${process.env.WEBSTORE_IDENT}/baskets`;
  const res = await fetch(url, { method: "POST", headers: baseHeader });

  if (!res.ok) {
    throw new Error(`Error: ${res.statusText}`);
  }

  const json = await res.json();

  const basket = {
    id: json.data.ident,
    username: json.data.username,
    price: json.data.total_price,
    ip: json.data.ip,
    checkoutURL: "",
  };

  // set basketIdent as cookie if it does not exist
  if (!cookies().has("basketIdent")) {
    cookies().set("basketIdent", basket.id, { secure: true });
  }

  return basket;
}

export async function getBasketAuth(
  returnURL: string = "https://clarityrust.gg/store/"
): Promise<string> {
  const basketIdent = cookies().get("basketIdent")?.value;
  const encodedURL = encodeURIComponent(returnURL);
  const url = `${baseURL}/api/accounts/${process.env.WEBSTORE_IDENT}/baskets/${basketIdent}/auth?returnUrl=${encodedURL}`;
  const res = await fetch(url, { method: "GET", headers: baseHeader });

  if (!res.ok) {
    throw new Error(`Error: ${res.statusText}`);
  }

  const json = await res.json();
  return json[0].url;
}

export async function addPackage(formData: FormData): Promise<boolean> {
  if (!cookies().has("basketIdent")) {
    console.log("add package ran");
    // create basket
    const basket = await createBasket();
    // retrieve auth url
    const authURL = await getBasketAuth();
    // redirect to auth
    redirect(authURL);
    return false;
  }
  const basketIdent = cookies().get("basketIdent")?.value;
  if ((await authedBasket()) === false) {
    const authURL = await getBasketAuth(); 
    redirect(authURL);
  }
  const pkgId = formData.get("pkgId");

  const url = `${baseURL}/api/baskets/${basketIdent}/packages`;
  const options: FetchOptions = {
    method: "POST",
    headers: { ...baseHeader, "Content-Type": "application/json" },
    body: JSON.stringify({ package_id: pkgId }),
  };

  console.log(pkgId);

  return true;
}

export async function removePackage(
  basketIdent: string,
  pkgId: string
): Promise<boolean> {
  const url = `${baseURL}/api/baskets/${basketIdent}/packages/remove`;
  const options: FetchOptions = {
    method: "POST",
    headers: { ...baseHeader, "Content-Type": "application/json" },
    body: JSON.stringify({ package_id: pkgId }),
  };
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error(`Error: ${res.statusText}`);
  }

  return true;
}

export async function authedBasket(): Promise<Boolean | User> {
  const basketIdent = cookies().get("basketIdent")?.value;
  console.log(basketIdent);
  const url = `${baseURL}/api/accounts/${process.env.WEBSTORE_IDENT}/baskets/${basketIdent}`;

  const options: FetchOptions = {
    method: "GET",
    headers: baseHeader,
  };
  const res = await fetch(url, options);

  // if (!res.ok) {
  //   throw new Error(`Error: ${res.statusText}`);
  // }
  const json = await res.json();
  console.log(json);

  if (json.data.username === null) {
    return false;
  } else {
    const user: User = {
      name: json.data.username,
      id: json.data.username_id,
    };

    return user;
  }
}
