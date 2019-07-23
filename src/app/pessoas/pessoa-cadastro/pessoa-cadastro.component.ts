import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ToastyService } from 'ng2-toasty';

import { Pessoa } from './../../core/model';
import { PessoaService } from './../pessoa.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private toasty: ToastyService
  ) { }

  ngOnInit() {
  }

  salvar(form: FormControl) {
    return this.pessoaService.adicionar(this.pessoa)
      .subscribe(() => {
        this.toasty.success('Pessoa adicionada com sucesso !');
        form.reset();

        this.pessoa = new Pessoa();
      });
  }

}
