import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
// import { URLSearchParams } from '@angular/http';
import { map } from 'rxjs/operators';


export interface LancamentoFiltro {
  descricao: string;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: LancamentoFiltro): Observable<any> {
    const params = new URLSearchParams();
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    });
    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }
    return this.http.get<any[]>(`${this.lancamentosUrl}?resumo`, { headers, search: params })
    .pipe(
      map(res => res ['content'])
    );
  }

  // pesquisar(): Promise<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type':  'application/json',
  //     'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
  //   });
  //   // headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

  //   return this.http.get(`${this.lancamentosUrl}?resumo`, { headers })
  //     .toPromise()
  //     .then(response => response);
  // }
}
