import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { ErrorHandlerService } from './../core/error-handler.service';
import { MoneyHttp } from './../seguranca/money-http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl: string;

  constructor(
    private http: MoneyHttp,
    private errorHandler: ErrorHandlerService
  ) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
  }

  listaCategorias(): Observable<any> {
    return this.http.get(`${this.categoriasUrl}`)
      .pipe(
        catchError(error => {
          throw this.errorHandler.handle(error);
        })
      );
  }

}
