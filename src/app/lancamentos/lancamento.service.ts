import { ErrorHandlerService } from './../core/error-handler.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import * as moment from 'moment';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) { }

  pesquisar(filtro: LancamentoFiltro): Observable<any> {
    let params = new HttpParams();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    });

    params = params.append('page', filtro.pagina.toString());
    params = params.append('size', filtro.itensPorPagina.toString());
    if (filtro.descricao) {
      params = params.append('descricao', filtro.descricao);
    }
    if (filtro.dataVencimentoInicio) {
      params = params.append('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }
    if (filtro.dataVencimentoFim) {
      params = params.append('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }
    return this.http.get<any[]>(`${this.lancamentosUrl}?resumo`, { headers, params: params })
      .pipe(
        map(res => {
          const lancamentos = res['content'];
          const totaPages = res['totalElements'];
          const resultado = {
            lancamentos,
            total: totaPages
          };
          return resultado;
        }),
        catchError((err) => {
          throw this.errorHandler.handle(err);
        })
      );
  }

  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    });
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }

}
