import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { Lancamento } from './../../core/model';
import { PessoaService } from './../../pessoas/pessoa.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log(this.route.snapshot.params['codigo']);
    this.carregarCategorias();
    this.carregarPessoas();
  }

  salvar(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
      .subscribe(() => {
        this.toasty.success('Lancamento adicionado com sucesso !');

        form.reset();
        this.lancamento = new Lancamento();
      });
  }

  carregarCategorias() {
    return this.categoriaService.listaCategorias()
      .subscribe(categorias => {
        this.categorias = categorias.map(c => {
          return { label: c.nome, value: c.id };
        });
      });
  }

  carregarPessoas() {
    return this.pessoaService.listarTodasPessoas()
      .subscribe(pessoas => {
        this.pessoas = pessoas.map(p => {
          return { label: p.nome, value: p.id };
        });
      });
  }

}
