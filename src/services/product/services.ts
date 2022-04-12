import { http, type HttpResponseData } from "@/services";
import {
  SERVICE_GET_PRODUCT_LIST,
  SERVICE_CREATE_PRODUCT,
} from "@/services/product";

import type {
  IProductList,
  IProductCreateResponse,
  IProductDeleteResponse,
} from "@/types";
import { SERVICE_DELETE_PRODUCT } from "./routes";

export const GET_PRODUCT_LIST = (): Promise<HttpResponseData<IProductList>> =>
  http.get(SERVICE_GET_PRODUCT_LIST());

export const CREATE_PRODUCT = (
  body: FormData
): Promise<HttpResponseData<IProductCreateResponse>> =>
  http.post(SERVICE_CREATE_PRODUCT(), body);

export const DELETE_PRODUCT = (
  product_id: string
): Promise<HttpResponseData<IProductDeleteResponse>> =>
  http.delete(SERVICE_DELETE_PRODUCT(product_id));
