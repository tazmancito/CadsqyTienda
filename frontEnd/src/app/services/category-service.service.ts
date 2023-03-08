import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@enviroment/environment";
import { Category } from "@models/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseURL: string = `${environment.API_URL}/categorias`;

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<Category[]>(this.baseURL);
  }

  savePieceCategory(category: any) {
    return this.http.post(this.baseURL, category);
  }

  delteteCategory(categoryId: any) {
    return this.http.delete(`${this.baseURL}/${categoryId}`);
  }

  updatePieceCategory(category: any, categoryID: number) {
    return this.http.put(`${this.baseURL}/${categoryID}`, category);
  }

}
