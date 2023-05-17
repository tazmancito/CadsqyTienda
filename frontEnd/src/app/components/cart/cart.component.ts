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

  displayedColumns: string[] = ['producto', 'precio', 'cantidad', 'seleccionar'];
  dataSource:Product[] =[];

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    try {
      let aux = JSON.parse(localStorage.getItem("carrito")!);

      this.products = aux.map((p: any) => {
        return {
          ProductId: p.clave.ProductId,
          CategoriaId: p.clave.CategoriaId,
          nombre: p.clave.nombre,
          descripcion: p.clave.descripcion,
          img: p.clave.img,
          precio: p.clave.precio,
        } as Product;
      });
      this.dataSource = this.products;
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
