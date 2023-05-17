import { Component } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { ActivatedRoute } from "@angular/router";
import { arrayToMap, mapToArray } from "@components/utils/mapUtil";
import { Category } from "@models/category";
import { Product } from "@models/product";
import { CategoryService } from "@services/category-service.service";
import { ProductService } from "@services/product-service.service";
import { v4 as uuidv4 } from "uuid";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent {
  products: Product[] = [];
  productsShowing: Product[] = [];
  category: any;
  subCategories: any[] = [];

  length = this.products.length;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 25, 50];

  constructor(
    private _productService: ProductService,
    private _categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit() {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (params.get("categoria") != null) {
        this._categoryService
          .getCategoryByName(params.get("categoria")!)
          .subscribe((result) => {
            this.category = result[0];
            this._categoryService
              .getSubCateriesByCategory(this.category.CategoriasId!)
              .subscribe((res) => {
                this.subCategories = res;
              });
          });
        this._productService
          .getProductsByCategory(params.get("categoria")!)
          .subscribe((result: Product[]) => {
            if (result.length > 0) {
              this.pageIndex = 0;
              this.chageProductList(result);
            }
          });
      } else {
        if (params.get("nombreProducto") != null) {
          this.searchProduct(params.get("nombreProducto")!);
        } else {
          this.getProducts();
        }
      }
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.length = e.length;
    this.pageIndex = e.pageIndex;
    this.showProducts();
  }

  async searchProduct(nameProduct: string) {
    this._productService
      .getProductsByName(nameProduct)
      .subscribe((result: Product[]) => {
        this.chageProductList(result);
      });
  }

  async getProducts() {
    this._productService
      .getProductsAleatory()
      .subscribe((result: Product[]) => {
        this.chageProductList(result);
      });
  }

  chageProductList(list: Product[]) {
    this.products = list;
    this.pageSize = 10;
    this.length = this.products.length;
    this.showProducts();
  }

  showProductsByCategory(categoria: string) {
    this._productService
      .getProductsByCategory(categoria)
      .subscribe((result: Product[]) => {
        this.chageProductList(result);
      });
  }

  showProducts() {
    this.productsShowing = [];
    let min = 0;
    let max = this.pageSize;

    if (this.pageIndex > 0) {
      min = this.pageSize * this.pageIndex;
      max = this.pageSize * (this.pageIndex + 1);
      console.log(min + " - " + max);
    }

    for (let i = min; i < max && i < this.products.length; i++) {
      this.productsShowing.push(this.products[i]);
    }
  }

  addProductToCart(product: any) {
    // if (localStorage.getItem("carrito")) {
    //   try {
    //     let cart: any[] = JSON.parse(localStorage.getItem("carrito")!);
    //     let aux = arrayToMap(cart);

    //     if (aux.has(product)) {
    //       aux.set(product, aux.get(product)! + 1);
    //     } else {
    //       aux.set(product, 1);
    //     }

    //     localStorage.setItem("carrito", JSON.stringify(mapToArray(aux)));
    //   } catch (error) {
    //     console.log("hubo un error");
    //   }
    // } else {
    //   let aux = [{ clave: product, valor: 1 }];

    //   localStorage.setItem("carrito", JSON.stringify(aux));
    // }

    const deviceID = uuidv4();
    console.log(deviceID);
  }
}
