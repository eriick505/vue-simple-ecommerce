import { http, type HttpResponseData } from "@/services";
import {
  SERVICE_GET_PRODUCT_LIST,
  SERVICE_CREATE_PRODUCT,
} from "@/services/product";

import type {
  IProductList,
  IProductCreateRequest,
  IProductCreateResponse,
} from "@/types";

export const GET_PRODUCT_LIST = (): Promise<HttpResponseData<IProductList>> =>
  http.get(SERVICE_GET_PRODUCT_LIST());

export const CREATE_PRODUCT = (
  body: IProductCreateRequest
): Promise<HttpResponseData<IProductCreateResponse>> =>
  http.post(SERVICE_CREATE_PRODUCT(), body);
