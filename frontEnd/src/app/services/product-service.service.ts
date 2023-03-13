import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@enviroment/environment";
import { Product } from "@models/product";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private baseURL: string = `${environment.API_URL}/productos`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseURL}/productos`);
  }

  getProductsAleatory(): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.baseURL}/productos-orden-aleatorio`
    );
  }

  getProductsByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseURL}/buscar-productos/${name}`);
  }

  getProductsById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseURL}/producto/${id}`);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
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
