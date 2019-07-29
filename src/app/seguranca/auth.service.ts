import { ErrorHandlerService } from './../core/error-handler.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) { }

  login(usuario: string, senha: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      "Authorization": 'Basic YW5ndWxhcjpAbmd1bEByMA=='
    });

    const body = `username=${usuario}&password=${senha}&grant_type=password`;
    return this.http.post(this.oauthTokenUrl, body, { headers })
      .pipe(
        catchError(error => {
          console.log(this.errorHandler.handle(error));
          throw this.errorHandler.handle(error);
        })
      );
  }
}
