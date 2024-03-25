type pkgType = "subscription" | "other-look up later";
export interface Category {
  name: string;
  id: string;
  desc: string;
}
export interface Package {
  id: string;
  innerhtml: string;
  name: string;
  imageURL: string;
  price: string;
  type?: pkgType;
  category?: Category;
}

export interface Basket {
  packages: Package[];
  id: string;
  checkoutURL: string;
  username: string;
  price: number;
  ip: string;
}
