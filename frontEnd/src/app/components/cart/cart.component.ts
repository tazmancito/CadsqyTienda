import { Component, OnInit } from "@angular/core";
import { Product } from "@models/product";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  products: Product[] = [];

  totalPrice: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    try {
      let aux = JSON.parse(localStorage.getItem("listP")!);

      this.products = aux.map((p: any) => {
        return {
          ProductId: p.ProductId,
          CategoriaId: p.CategoriaId,
          nombre: p.nombre,
          descripcion: p.descripcion,
          img: p.img,
          precio: p.precio,
        } as Product;
      });
    } catch (error) {
      console.log("hubo un error" + error);
    }
  }

  calcTotalPrice(products: any[]) {
    this.totalPrice = 0;
    for (let index = 0; index < products.length; index++) {
      this.totalPrice += products[index].value.precio;
    }
  }
}
