import { http, type HttpResponseData } from "@/services";
import { SERVICE_GET_PRODUCT_LIST } from "@/services/products";

import type { IProductList } from "@/types";

export const GET_PRODUCT_LIST = (): Promise<HttpResponseData<IProductList>> =>
  http.get(SERVICE_GET_PRODUCT_LIST());
