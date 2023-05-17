export interface Category {
  CategoryId?: number;
  name: string;
  img?: string;
  fatherId?: number | null;
  categories: Category[];
}
