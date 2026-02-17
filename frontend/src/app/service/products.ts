import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  // Add Product - Create
  addProduct(product: Product){
    return this.http.post<Product>(`${this.url}add`, product)
  }

  // Get Products - Read
  getProducts(): Observable<any[]>{
    return this.http.get<any[]>(this.url+'products')
  }

  // Get Product by Id - Read
  getProductById(id: number): Observable<Product>{
    return this.http.get<Product>(`${this.url}product/${id}`)
  }

  // Update Product - Update
  updateProduct(id?: number, product?: any): Observable<any>{
    return this.http.put<any>(`${this.url}update/${id}`, product)
  }

  deleteProduct(id: number): Observable<string>{
    return this.http.delete(`${this.url}delete/${id}`, {
      responseType: 'text'
    });
  }

}
