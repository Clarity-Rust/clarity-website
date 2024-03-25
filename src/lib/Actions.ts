import { Category } from "../../types";
import { Package } from "../../types";

const baseURL = "https://headless.tebex.io";
const baseHeader = { Accept: "application/json" };

interface FetchOptions {
  method: string;
  headers: Record<string, string>;
  body?: string;
}

// Endpoints as functions
export async function getAllCategories(): Promise<Category[]> {
  const url = `${baseURL}/api/accounts/${process.env.WEBSTORE_IDENT}/categories?includePackages=0`;
  const response = await fetch(url, { method: "GET", headers: baseHeader });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const json = await response.json();
  const cats: Category[] = [];

  json.data.forEach((category: any) => {
    cats.push({
      name: category.name,
      id: category.id,
      desc: category.description,
    });
  });

  return cats;
}

export async function getPackagesInCategory(catID: string): Promise<Package[]> {
  const url = `${baseURL}/api/accounts/${process.env.WEBSTORE_IDENT}/categories/${catID}?includePackages=1`;
  const response = await fetch(url, { method: "GET", headers: baseHeader });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  const json = await response.json();
  console.log(json);
  const pkgs: Package[] = [];
  json.data.packages.forEach((pkg: any) => {
    console.log(pkg);
    pkgs.push({
      name: pkg.name,
      id: pkg.id,
      innerhtml: pkg.description,
      imageURL: pkg.image,
      price: pkg.base_price
    });
  });

  return pkgs;
}

export async function getBasket(basketIdent: string): Promise<Response> {
  const url = `${baseURL}/api/accounts/${process.env.WEBSTORE_IDENT}/baskets/${basketIdent}`;
  return fetch(url, { method: "GET", headers: baseHeader });
}

export async function createBasket(): Promise<Response> {
  const url = `${baseURL}/api/accounts/${process.env.WEBSTORE_IDENT}/baskets`;
  return fetch(url, { method: "POST", headers: baseHeader });
}

export async function getBasketAuth(
  basketIdent: string,
  returnURL: string = "https://clarityrust.gg/store/"
): Promise<Response> {
  const encodedURL = encodeURIComponent(returnURL);
  const url = `${baseURL}/api/accounts/${process.env.WEBSTORE_IDENT}/baskets/${basketIdent}/auth?returnUrl=${encodedURL}`;
  return fetch(url, { method: "GET", headers: baseHeader });
}

export async function addPackage(
  basketIdent: string,
  pkgId: string
): Promise<Response> {
  const url = `${baseURL}/api/baskets/${basketIdent}/packages`;
  const options: FetchOptions = {
    method: "POST",
    headers: { ...baseHeader, "Content-Type": "application/json" },
    body: JSON.stringify({ package_id: pkgId }),
  };
  return fetch(url, options);
}

export async function removePackage(
  basketIdent: string,
  pkgId: string
): Promise<Response> {
  const url = `${baseURL}/api/baskets/${basketIdent}/packages/remove`;
  const options: FetchOptions = {
    method: "POST",
    headers: { ...baseHeader, "Content-Type": "application/json" },
    body: JSON.stringify({ package_id: pkgId }),
  };
  return fetch(url, options);
}
