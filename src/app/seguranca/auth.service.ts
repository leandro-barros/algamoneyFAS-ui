import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
// import { map, catchError } from 'rxjs/operators';

import { ErrorHandlerService } from './../core/error-handler.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayLoad: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private errorHandler: ErrorHandlerService,
  ) {
    this.carregartoken();
  }

  // login(usuario: string, senha: string): Observable<void> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     "Authorization": 'Basic YW5ndWxhcjpAbmd1bEByMA=='
  //   });

  //   const body = `username=${usuario}&password=${senha}&grant_type=password`;
  //   return this.http.post<any>(this.oauthTokenUrl, body, { headers })
  //     .pipe(
  //       map(response => {
  //         this.armazenarToken(response.access_token);
  //         return response;
  //       }),
  //       catchError(response => {
  //         if (response.status === 400) {
  //           if (response.error === 'invalid_grant') {
  //             return Promise.reject('Usuário ou senha inválida!');
  //           }
  //         }
  //         return Promise.reject(response);
  //       })
  //     );
  // }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      "Authorization": 'Basic YW5ndWxhcjpAbmd1bEByMA=='
    });

    const body = `username=${usuario}&password=${senha}&grant_type=password`;
    return this.http.post<any>(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        // console.log(response);
        this.armazenarToken(response.access_token);
      })
      .catch(response => {
        if (response.status === 400) {
          // if (response.error === 'invalid_grant') {
          return Promise.reject('Usuário ou senha inválida!');
          // }
        }

        return Promise.reject(response);
      });
  }

  obterNovoAccessToken(): Promise<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      "Authorization": 'Basic YW5ndWxhcjpAbmd1bEByMA=='
    });
    const body = 'grant_type=refresh_token';
    return this.http.post<any>(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response.access_token);
        console.log('Novo Access token criado');
        return Promise.resolve(null);
      })
      .catch(response => {
        console.log('Erro ao criar Access token', response);
        return Promise.resolve(null);
      });
  }

  isAccessTokenInvalid() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temPermissao(permissao: string) {
    return this.jwtPayLoad && this.jwtPayLoad.authorities.includes(permissao);
  }

  armazenarToken(token: string) {
    this.jwtPayLoad = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  carregartoken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.armazenarToken(token);
    }
  }
  // admin@algamoney.com
}
