import { Component, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Product } from '@models/product';
import { ProductService } from '@services/product-service.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  products: Product[] = [];
  productsShowing: Product[] = [];

  length = this.products.length;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 25, 50];

  @Input() category: string = '';

  constructor(
    private _productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (params.get('categoria') != null) {
        this._productService
          .getProductsByCategory(params.get('categoria')!)
          .subscribe((result: Product[]) => {
            if (result.length > 0) {
              this.pageIndex = 0;
              this.chageProductList(result);
            }
          });
      } else {
        this.getProducts();
      }
    });
  }

  handlePageEvent(e: PageEvent) {
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.showProducts();
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
      console.log(min + ' - ' + max);
    }

    for (let i = min; i < max && i < this.products.length; i++) {
      this.productsShowing.push(this.products[i]);
    }
  }
}
