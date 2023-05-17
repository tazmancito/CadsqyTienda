import { NestedTreeControl } from "@angular/cdk/tree";
import { Component, ViewChild } from "@angular/core";
import { MatDrawer } from "@angular/material/sidenav";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { Router } from "@angular/router";
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
  nameProduct: string = "";
  routeMap: string[] = [];

  @ViewChild("categorias") drawer1!: MatDrawer;
  @ViewChild("carrito") drawer2!: MatDrawer;

  hasSubmenu = (_: number, node: Category) =>
    !!node.categories && node.categories.length > 0;

  constructor(
    private _categoryServise: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getFullCategories();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.code === "Enter") {
      let cleanWord = this.nameProduct.replace(/[^a-zA-ZñÑáéíó]/g, "");
      this.nameProduct = cleanWord;

      this.router.navigate([`/buscar/${cleanWord}`]);
    }
  }

  searchProduct() {
    this.router.navigate([`/buscar/${this.nameProduct}`]);
  }

  toggleDrawerMenus() {
    this.drawer1.toggle();
    if (this.drawer2.opened && this.drawer1.opened) {
      this.drawer2.toggle();
    }
  }

  toggleDrawerCarrito() {
    this.drawer2.toggle();
    if (this.drawer1.opened && this.drawer2.opened) {
      this.drawer1.toggle();
    }
  }

  getFullCategories() {
    this._categoryServise.getCategories().subscribe((categories: any) => {
      this.orderCategories(categories);
    });
  }

  orderCategories(categoriasDelBack: any[]) {
    let aux: any[] = [];
    let temp: Category;

    categoriasDelBack.forEach((cat) => {
      if (cat.CategoriasPadreId === null) {
        temp = {
          CategoryId: cat.CategoriasId,
          name: cat.Nombre,
          categories: [],
          fatherId: null,
        };

        aux.push(temp);
      }
    });

    let i = 0;
    aux.forEach(async (cat, i) => {
      aux[i] = this.searchSubcategories(aux[i], categoriasDelBack);
    });

    this.dataSource.data = aux;
  }

  searchSubcategories(cat: Category, lista: any[]): Category {
    let temp: Category;

    lista.forEach((c) => {
      if (cat.CategoryId === c.CategoriasPadreId) {
        temp = {
          CategoryId: c.CategoriasId,
          name: c.Nombre,
          categories: [],
          fatherId: c.CategoriasPadreId,
        };
        if (c.EsPadre == true) {
          cat.categories?.push(this.searchSubcategories(temp, lista));
        } else {
          cat.categories?.push(temp);
        }
      }
    });
    return cat;
  }
  printNode(node: Category) {
    this.routeMap = [];
    this._categoryServise.getCategories().subscribe((categories: any) => {
      this.printFamily(node, categories);
      this.routeMap = this.routeMap.reverse();
    });
  }

  printFamily(cat: Category, list: any[]) {
    let temp: Category;
    this.routeMap.push(cat.name);
    if (cat.fatherId != null) {
      list.forEach((c) => {
        if (c.CategoriasId == cat.fatherId) {
          temp = {
            CategoryId: c.CategoriasId,
            name: c.Nombre,
            categories: [],
            fatherId: c.CategoriasPadreId,
          };
          this.printFamily(temp, list);
        }
      });
    }
  }
}
