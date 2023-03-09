export interface Category {
  CategoryId: number;
  Nombre: string;
  CategoriaPadreId?: number;
  categories?: Category[];
}
