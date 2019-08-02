import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorHandlerService } from './../core/error-handler.service';
import { MoneyHttp } from './../seguranca/money-http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private http: MoneyHttp,
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
