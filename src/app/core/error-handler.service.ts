import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { NotAuthenticatedError } from './../seguranca/money-http';

import { ToastyService } from 'ng2-toasty';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private toasty: ToastyService,
    private router: Router
  ) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if (errorResponse instanceof NotAuthenticatedError) {
      msg = 'Sua sessão expirou!';
      this.router.navigate(['/login']);
    } else if (errorResponse instanceof HttpErrorResponse && errorResponse.status >= 400 && errorResponse.status <= 499) {
      msg = 'Ocorreu um erro ao processar a sua solicitação';

      if (errorResponse.status === 403) {
        msg = 'Você não tem permissão para executar esta ação';
      }

      try {
        msg = errorResponse.error[0].mensagemUsuario;
      } catch (e) { }

      console.error('Ocorreu um erro', errorResponse);
    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Ocorreu um erro', errorResponse);
    }
    this.toasty.error(msg);
  }
}
