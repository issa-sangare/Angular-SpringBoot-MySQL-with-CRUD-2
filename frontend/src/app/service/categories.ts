import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../model/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private url = "http://localhost:8080/categories";

  constructor(private http: HttpClient) { }

  // Add Category - Create
  addCategory(category: Category){
    return this.http.post<Category>(`${this.url}add`, category)
  }

  // Get Categories - Read
  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.url);
  }

  // Get Category by Id - Read
  getCategoryById(id: number): Observable<Category>{
    return this.http.get<Category>(`${this.url}category/${id}`)
  }

  // Update Category - Update
  updateCategory(id?: number, category?: any): Observable<any>{
    return this.http.put<any>(`${this.url}update/${id}`, category)
  }

  deleteCategory(id: number): Observable<string>{
    return this.http.delete(`${this.url}delete/${id}`, {
      responseType: 'text'
    });
  }

}
