import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@enviroment/environment';
import { Product } from '@models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseURL: string = `${environment.API_URL}/productos`;

  constructor(private http: HttpClient) {}

  getProductsByName(name: string) {
    return this.http.get<Product[]>(`${this.baseURL}/buscar-productos/${name}`);
  }

  getProductsAleatory() {
    return this.http.get<Product[]>(
      `${this.baseURL}/productos-orden-aleatorio`
    );
  }

  getProductsByCategory(category: string) {
    return this.http.get<Product[]>(`${this.baseURL}/categoria/${category}`);
  }

  saveProduct(product: Product) {
    return this.http.post(this.baseURL, product);
  }

  delteteProduct(productId: number) {
    return this.http.delete(`${this.baseURL}/${productId}`);
  }

  updatePieceCategory(product: Product, productId: number) {
    return this.http.put(`${this.baseURL}/${productId}`, product);
  }
}
