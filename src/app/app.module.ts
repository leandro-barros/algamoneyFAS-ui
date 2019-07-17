import { CoreModule } from './core/core.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ToastyModule } from 'ng2-toasty';

import { AppComponent } from './app.component';
import { PessoasModule } from './pessoas/pessoas.module';
import { HttpClientModule } from '@angular/common/http';
import { LancamentoService } from './lancamentos/lancamento.service';
import { PessoaService } from './pessoas/pessoa.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    ToastyModule.forRoot(),

    CoreModule,
    LancamentosModule,
    PessoasModule,
    HttpClientModule
    ],
  providers: [
    LancamentoService,
    PessoaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
