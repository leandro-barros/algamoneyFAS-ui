import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) { }

  pesquisar(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    });
    return this.http.get<any[]>(`${this.lancamentosUrl}?resumo`, { headers })
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
