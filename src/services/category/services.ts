import { http, type HttpResponseData } from "@/services";
import { SERVICE_GET_CATEGORY_LIST } from "@/services/category";

import type { ICategoryList } from "@/types";

export const GET_CATEGORY_LIST = (): Promise<HttpResponseData<ICategoryList>> =>
  http.get(SERVICE_GET_CATEGORY_LIST());
