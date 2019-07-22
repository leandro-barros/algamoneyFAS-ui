import { ErrorHandlerService } from './../core/error-handler.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) { }

  categoriasUrl = 'http://localhost:8080/categorias';

  listaCategorias(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    });
    return this.http.get(`${this.categoriasUrl}`, { headers })
      .pipe(
        catchError(error => {
          throw this.errorHandler.handle(error);
        })
      );
  }

}
