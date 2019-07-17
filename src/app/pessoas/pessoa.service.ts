import { map } from 'rxjs/operators';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

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

  constructor(private http: HttpClient) { }

  pesquisar(filtro: PessoaFiltro): Observable<any> {
    let params = new HttpParams();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    });

    params = params.append('size', filtro.itensPorPagina.toString());
    params = params.append('page', filtro.pagina.toString());
    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any[]>(`${this.pessoasUrl}?`, { headers, params: params })
      .pipe(
        map(response => {
          const pessoas = response['content'];
          const totalPages = response['totalElements'];
          const resultado = {
            pessoas,
            total: totalPages
          };
          return resultado;
        })
      );
  }

  listarTodasPessoas(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    });

    return this.http.get<any[]>(`${this.pessoasUrl}`, { headers })
      .pipe(
        map(response => response['content'])
      );
  }
}
