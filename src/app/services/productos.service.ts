import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';
import { ProductData } from '../components/productos/interface/product.module';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private traductorUrl = enviroment.apiUrls.apiURLTraducida;
  private productosUrl = enviroment.apiUrls.apiURLProductos;

  constructor(private http: HttpClient) {}

  obtenerTraduccion(cadena: string): Observable<{ message: string }> {
    const params = new HttpParams().set('CadenaBusqueda', cadena);
    return this.http.get<{ message: string }>(this.traductorUrl, { params });
  }

  obtenerProductos(cadenaBusqueda: string, traduccion: string): Observable<any> {
    const url = `${this.productosUrl}?CadenaBusqueda=${encodeURIComponent(cadenaBusqueda)}&NumeroPagina=1&Traduccion=${encodeURIComponent(traduccion)}`;
    return this.http.get(url);
  }
}