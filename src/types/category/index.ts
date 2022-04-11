export interface ICategory {
  categoryId: string;
  name: string;
}

export interface ICategoryList {
  quantity: number;
  categories: ICategory[];
}
