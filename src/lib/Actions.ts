"use server";
import { RedirectType, redirect } from "next/navigation";
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

export async function getBasket(): Promise<Basket> {
  const basketIdent = cookies().get("basketIdent")?.value;
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
    // create basket
    const basket = await createBasket();
    // retrieve auth url
    const authURL = await getBasketAuth();
    // redirect to auth
    redirect(authURL, RedirectType.replace);
    return false;
  }
  const basketIdent = cookies().get("basketIdent")?.value;
  if ((await authedBasket()) === false) {
    const authURL = await getBasketAuth();
    redirect(authURL, RedirectType.replace);
  }
  const pkgId = formData.get("pkgId");

  const url = `${baseURL}/api/baskets/${basketIdent}/packages`;
  const options: FetchOptions = {
    method: "POST",
    headers: { ...baseHeader, "Content-Type": "application/json" },
    body: JSON.stringify({ package_id: pkgId }),
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error(`error: ${res.statusText}}`);
  }
  const json = await res.json();

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

export async function logIn(): Promise<void> {
  if (!cookies().has("basketIdent")) {
    const basket = await createBasket();
  }
  const authURL = await getBasketAuth();

  redirect(authURL, RedirectType.replace);
}

export async function authedBasket(): Promise<boolean | User> {
  await new Promise((resolve) => setTimeout(resolve, 250));
  if (!cookies().has("basketIdent") || cookies().get("basketIdent")?.value == "") {
    return false;
  }
  console.log("the cookie exists somehow");
  console.log(cookies().get("basketIdent"));
  const basketIdent = cookies().get("basketIdent")?.value;
  const url = `${baseURL}/api/accounts/${process.env.WEBSTORE_IDENT}/baskets/${basketIdent}`;

  const options: FetchOptions = {
    method: "GET",
    headers: baseHeader,
  };
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error(`Error: ${res.statusText}`);
  }
  const json = await res.json();

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
// async function deleteBasket(): Promise<boolean> {}

export async function logOut(): Promise<void> {
  // clear cookie
  cookies().delete("basketIdent");

  // wait
  await new Promise((resolve) => setTimeout(resolve, 250));
  // delete basket
  // do we need to?

  // redirect back
  redirect("/store", RedirectType.push);
}

export async function getCheckoutLink(): Promise<string> {
  const basket = await getBasket();
  console.log(basket);
  return basket.checkoutURL;
}

export async function getPackage(id: string): Promise<Package> {
  const url = `${baseURL}/api/accounts/${process.env.WEBSTORE_IDENT}/packages/${id}`;
  const res = await fetch(url, { method: "GET", headers: baseHeader });

  if (!res.ok) {
    throw new Error(`Error: ${res.statusText}`);
  }

  const json = await res.json();

  const pkg: Package = {
    id: json.data.id,
    innerhtml: json.data.description,
    name: json.data.name,
    imageURL: json.data.image,
    price: json.data.total_price,
    category: {
      name: json.data.category.name,
      id: json.data.category.id,
    },
    discount: undefined,
    tax: undefined,
  };

  return pkg;
}
