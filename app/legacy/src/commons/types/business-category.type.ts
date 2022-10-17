export interface BusinessSubCategory {
  categoryId: number;
  categoryName: string;
  subCategoryId: number;
  subCategoryName: string;
  mcc: string;
}

export interface BusinessCategory {
  id: number;
  name: string;
  subCategories: BusinessSubCategory[];
}

export interface BusinessCategoryResponse {
  categories: BusinessCategory[];
}
