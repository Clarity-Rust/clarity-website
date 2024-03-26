export interface Category {
  name: string;
  id: string;
  desc?: string;
}
export interface Package {
  id: string;
  innerhtml: string;
  name: string;
  imageURL: string;
  price: string;
  category: Category;
  discount?: string;
  tax?: string;
}

export interface Basket {
  packages?: string[];
  id: string;
  checkoutURL: string;
  username: string;
  price: number;
  ip: string;
}

export interface User {
  name: string;
  id: string;
}