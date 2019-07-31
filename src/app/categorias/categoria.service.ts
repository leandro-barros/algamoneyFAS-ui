import { ErrorHandlerService } from './../core/error-handler.service';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get(`${this.categoriasUrl}`)
      .pipe(
        catchError(error => {
          throw this.errorHandler.handle(error);
        })
      );
  }

}
