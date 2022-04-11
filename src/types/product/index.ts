import type { ICategory } from "@/types";

export interface IProduct_Image {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export interface IProduct {
  id_product: string;
  name: string;
  price: string;
  image_product: IProduct_Image;
  category: ICategory;
}

export interface IProductList {
  quantity: number;
  products: IProduct[];
}

export interface IProductCreateResponse {
  message: string;
}
