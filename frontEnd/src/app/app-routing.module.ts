import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CartComponent } from "@components/cart/cart.component";
import { CrudProductsComponent } from "@components/crud-products/crud-products.component";
import { HomeComponent } from "@components/home/home.component";
import { ProductDetailComponent } from "@components/product-detail/product-detail.component";
import { ProductListComponent } from "@components/product-list/product-list.component";

const routes: Routes = [
  { path: "", redirectTo: "Inicio", pathMatch: "full" },

  { path: "buscar/:nombreProducto", component: ProductListComponent },

  { path: "categoria/:categoria", component: ProductListComponent },

  { path: "carrito", component: CartComponent },

  { path: "producto/:idProducto", component: ProductDetailComponent },

  { path: "crud", component: CrudProductsComponent },

  { path: "Inicio", component: ProductListComponent },

  { path: "**", redirectTo: "/Inicio", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
