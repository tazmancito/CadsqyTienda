import { NestedTreeControl } from "@angular/cdk/tree";
import { Component } from "@angular/core";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { Category } from "@models/category";
import { CategoryService } from "@services/category-service.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  treeControl = new NestedTreeControl<Category>((node) => node.categories);
  dataSource = new MatTreeNestedDataSource<Category>();

  hasSubmenu = (_: number, node: Category) =>
    !!node.categories && node.categories.length > 0;

  constructor(private _categoryServise: CategoryService) {}

  ngOnInit() {
    this.getFullCategories();
  }

  orderCategories(categories: any[], subCategories: any[]): Category[] {
    let mapCategorias = new Map<number, Category>();

    categories.forEach((category) => {
      let aux: Category = {
        CategoryId: category.CategoriaId,
        Nombre: category.Nombre,
        categories: [],
      };
      mapCategorias.set(category.CategoriaId, aux);
    });

    subCategories.forEach((subCategory) => {
      let aux: Category = {
        CategoryId: subCategory.CategoriaId,
        Nombre: subCategory.Nombre,
        categories: [],
      };
      mapCategorias.get(subCategory.CategoriaPadreId)?.categories?.push(aux);
    });

    let result = Array.from(mapCategorias.values());
    return result;
  }

  getFullCategories() {
    this._categoryServise
      .getCategories()
      .subscribe((categories: Category[]) => {
        this._categoryServise.getSubCateries().subscribe((subcategories) => {
          this.dataSource.data = this.orderCategories(
            categories,
            subcategories
          );
        });
      });
  }
}
