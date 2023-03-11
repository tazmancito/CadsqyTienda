import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@enviroment/environment";
import { Product } from "@models/product";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private baseURL: string = `${environment.API_URL}/productos`;

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(`${this.baseURL}/productos`);
  }

  getProductsAleatory() {
    return this.http.get<Product[]>(
      `${this.baseURL}/productos-orden-aleatorio`
    );
  }

  getProductsByName(name: string) {
    return this.http.get<Product[]>(`${this.baseURL}/buscar-productos/${name}`);
  }

  getProductsById(id: number) {
    return this.http.get<Product[]>(`${this.baseURL}/producto/${id}`);
  }

  getProductsByCategory(category: string) {
    return this.http.get<Product[]>(`${this.baseURL}/categoria/${category}`);
  }

  addProduct(product: Product) {
    return this.http.post(this.baseURL, product);
  }

  updateProduct(product: Product, productId: number) {
    return this.http.put(`${this.baseURL}/${productId}`, product);
  }

  delteteProduct(productId: number) {
    return this.http.delete(`${this.baseURL}/${productId}`);
  }
}
