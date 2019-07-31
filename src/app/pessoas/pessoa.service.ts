import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Pessoa } from './../core/model';
import { ErrorHandlerService } from './../core/error-handler.service';

export class PessoaFiltro {
  nome: string;
  itensPorPagina = 5;
  pagina = 0;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) { }

  pesquisar(filtro: PessoaFiltro): Observable<any> {
    let params = new HttpParams();

    params = params.append('size', filtro.itensPorPagina.toString());
    params = params.append('page', filtro.pagina.toString());
    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any[]>(`${this.pessoasUrl}?`, { params: params })
      .pipe(
        map(response => {
          const pessoas = response['content'];
          const totalPages = response['totalElements'];
          const resultado = {
            pessoas,
            total: totalPages
          };
          return resultado;
        }),
        catchError(error => {
          throw this.errorHandler.handle(error);
        })
      );
  }

  listarTodasPessoas(): Observable<any> {
    return this.http.get<any[]>(this.pessoasUrl)
      .pipe(
        map(response => response['content']),
        catchError(error => {
          throw this.errorHandler.handle(error);
        })
      );
  }

  excluir(codigo: number): Observable<any> {
    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
      .pipe(
        catchError(error => {
          throw this.errorHandler.handle(error);
        })
      );
  }

  mudarStatus(codigo: number, ativo: boolean): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers })
      .pipe(
        catchError(error => {
          throw this.errorHandler.handle(error);
        })
      );
  }

  adicionar(pessoa: Pessoa): Observable<Pessoa> {
    // TODO: Retirar depois
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<Pessoa>(this.pessoasUrl, JSON.stringify(pessoa), { headers })
      .pipe(
        catchError(error => {
          throw this.errorHandler.handle(error);
        })
      );
  }

  buscarPessoaPorCodigo(codigo: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`)
      .pipe(
        catchError(error => {
          throw this.errorHandler.handle(error);
        })
      );
  }

  atualizar(pessoa: Pessoa): Observable<Pessoa> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.id}`,
      JSON.stringify(pessoa), { headers })
      .pipe(
        catchError(error => {
          throw this.errorHandler.handle(error);
        })
      );
  }

}
