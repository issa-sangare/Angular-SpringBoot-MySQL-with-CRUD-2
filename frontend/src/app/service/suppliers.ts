import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Supplier} from '../model/Supplier';

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  private url = "http://localhost:8080/suppliers";

  constructor(private http: HttpClient) { }

  // Add Product - Create
  addSupplier(supplier: Supplier): Observable<Supplier>{
    return this.http.post<Supplier>(`${this.url}add`, supplier)
  }

  // Get Products - Read
  getSuppliers(): Observable<Supplier[]>{
    return this.http.get<Supplier[]>(this.url)
  }

  // Get Product by Id - Read
  getSupplierById(id: number): Observable<Supplier>{
    return this.http.get<Supplier>(`${this.url}supplier/${id}`)
  }

  // Update Product - Update - Enlevez les ? et ajoutez les types
  updateSupplier(id: number, supplier: Supplier): Observable<Supplier>{
    return this.http.put<Supplier>(`${this.url}update/${id}`, supplier)
  }

  // Delete Product
  deleteSupplier(id: number): Observable<string>{
    return this.http.delete(`${this.url}delete/${id}`, {
      responseType: 'text'
    });
  }
}
