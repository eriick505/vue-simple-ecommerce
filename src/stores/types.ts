import type { AuthUser, ICategory, IProduct } from "@/types";

export interface RootState {
  auth: {
    user?: AuthUser;
    authenticated: boolean;
    loading: boolean;
    error: string;
  };
  product: {
    isLoading: {
      getProductList: boolean;
      getCategoryList: boolean;
      postProductCreate: boolean;
      deleteProduct: boolean;
    };
    error: string;
    productList?: IProduct[];
    productQuantity?: number;
    categoryList?: ICategory[];
    categoryQuantity?: number;
    wishList: string[];
  };
}
