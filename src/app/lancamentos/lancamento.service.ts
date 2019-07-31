import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import * as moment from 'moment';

import { Lancamento } from './../core/model';
import { ErrorHandlerService } from './../core/error-handler.service';

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
    return this.http.get<any[]>(`${this.lancamentosUrl}?resumo`, { params: params })
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

  excluir(codigo: number): Observable<any> {
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`)
      .pipe(
        catchError((err) => {
          throw this.errorHandler.handle(err);
        })
      );
  }

  adicionar(lancamento: Lancamento): Observable<Lancamento> {
    // TODO: Retirar depois
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<Lancamento>(this.lancamentosUrl, JSON.stringify(lancamento), { headers })
      .pipe(
        catchError(error => {
          throw this.errorHandler.handle(error);
        })
      );
  }

  atualizar(lancamento: Lancamento): Observable<Lancamento> {
     // TODO: Retirar depois
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.id}`,
      JSON.stringify(lancamento), { headers })
      .pipe(
        map(response => {
          const lancamentoAlterado = response;
          this.converterStringsParaDatas([lancamentoAlterado]);
          return lancamentoAlterado;
        }),
        catchError(error => {
          throw this.errorHandler.handle(error);
        })
      );
  }

  buscarPorCodigo(codigo: number): Observable<Lancamento> {
    return this.http.get<Lancamento>(`${this.lancamentosUrl}/${codigo}`)
      .pipe(
        map(response => {
          const lancamento = response;
          this.converterStringsParaDatas([lancamento]);
          return lancamento;
        }),
        catchError(error => {
          throw this.errorHandler.handle(error);
        })
      );
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento,
        'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento,
          'YYYY-MM-DD').toDate();
      }
    }
  }

}
