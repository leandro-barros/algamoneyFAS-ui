import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
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
    private toasty: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    // console.log(this.route.snapshot.params['codigo']);
    this.title.setTitle('Nova Pessoa');
    const codigoPessoa = this.route.snapshot.params['codigo'];
    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }

  get editando() {
    return Boolean(this.pessoa.id);
  }

  carregarPessoa(codigo: number) {
    return this.pessoaService.buscarPessoaPorCodigo(codigo)
    .subscribe(pessoa => {
      this.pessoa = pessoa;
      this.atualizarTituloEdicao();
    });
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa();
    } else {
      this.adicionarPessoa(form);
    }
  }

  atualizarPessoa() {
    return this.pessoaService.atualizar(this.pessoa)
    .subscribe(pessoa => {
      this.pessoa = pessoa;
      this.toasty.success('Pessoa alterada com sucesso !');
      this.atualizarTituloEdicao();
    });
  }

  adicionarPessoa(form: FormControl) {
    return this.pessoaService.adicionar(this.pessoa)
      .subscribe(pessoa => {
        this.toasty.success('Pessoa adicionada com sucesso !');
        form.reset();

        // this.pessoa = new Pessoa();
        this.router.navigate(['/pessoas', pessoa.id]);
      });
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }

  nova(form: FormControl) {
    form.reset();
    // Executar a função após um milisegundo
    setTimeout(function() {
      // O this mão estar referenciando a variável lancamento,
      // pois estar dentro desta função com o método bind() referencia;
      this.pessoa = new Pessoa();
    }.bind(this), 1);
    this.router.navigate(['pessoas/nova']);
  }

}
