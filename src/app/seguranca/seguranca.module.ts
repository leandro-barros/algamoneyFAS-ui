import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { JwtModule } from '@auth0/angular-jwt';

import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing.module';

// export function tokenGetter() {
//   return localStorage.getItem('token');
// }

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    FormsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
          return     localStorage.getItem('access_token');},
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: ['http://localhost:8080/oauth/token']
      }
    }),

    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule
  ]
})
export class SegurancaModule { }
