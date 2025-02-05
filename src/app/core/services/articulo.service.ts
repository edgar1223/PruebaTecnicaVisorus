import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Articulo } from '../models/articulo';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  private apiUrl=environment.apiUrl+"articulo";


  constructor(private http: HttpClient) {} 

  getArticulos(): Observable<Articulo[]> {
    return this.http.get<{ data: Articulo[], total: number }>(this.apiUrl).pipe(
      map(response => response.data) 
    );
  }

  getArticuloById(id: number): Observable<Articulo> {
    return this.http.get<Articulo>(`${this.apiUrl}/${id}`);
  }

  createArticulo(articulo: Articulo): Observable<any> {
    return this.http.post<any>(this.apiUrl, articulo);
  }

  updateArticulo(id: number, articulo: Articulo): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, articulo);
  }

  deleteArticulo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
