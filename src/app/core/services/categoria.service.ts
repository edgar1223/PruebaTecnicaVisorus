import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root', // Esto está correcto
})
export class CategoriaService {
  private apiUrl = environment.apiUrl + 'categoria';

  constructor(private http: HttpClient) {} // HttpClient está correctamente inyectado

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<{ data: Categoria[], total: number }>(this.apiUrl).pipe(
      map(response => response.data) // Extraer solo el array de categorías
    );
  }

  getCategoriaById(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/${id}`);
  }

  createCategoria(categoria: Categoria): Observable<any> {
    return this.http.post<any>(this.apiUrl, categoria);
  }

  updateCategoria(id: number, categoria: Categoria): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, categoria);
  }

  deleteCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}