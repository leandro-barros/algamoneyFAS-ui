import { ErrorHandlerService } from './../core/error-handler.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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
    private errorHandler: ErrorHandlerService
  ) {
    this.carregartoken();
  }

  login(usuario: string, senha: string): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      "Authorization": 'Basic YW5ndWxhcjpAbmd1bEByMA=='
    });

    const body = `username=${usuario}&password=${senha}&grant_type=password`;
    return this.http.post<any>(this.oauthTokenUrl, body, { headers })
      .pipe(
        map(response => {
          this.armazenarToken(response.access_token);
          return response;
        }),
        catchError(error => {
          throw this.errorHandler.handle(error);
        })
      );
  }

  // login(usuario: string, senha: string): Promise<void> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     "Authorization": 'Basic YW5ndWxhcjpAbmd1bEByMA=='
  //   });

  //   const body = `username=${usuario}&password=${senha}&grant_type=password`;

  //   return this.http.post<any>(this.oauthTokenUrl, body, { headers })
  //     .toPromise()
  //     .then(response => {
  //       console.log(response);
  //       this.armazenarToken(response.access_token);
  //     })
  //     .catch(response => {
  //       console.log(response);
  //     });
  // }

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
