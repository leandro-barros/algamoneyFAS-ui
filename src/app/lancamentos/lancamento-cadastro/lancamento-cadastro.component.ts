import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    console.log(this.route.snapshot.params['codigo']);
    this.title.setTitle('Novo Lançamento');
    const codigoLancamento = this.route.snapshot.params['codigo'];
    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  get editando() {
    return Boolean(this.lancamento.id);
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .subscribe(lancamento => {
        this.lancamento = lancamento;
        this.atualizarTituloEdicao();
      });
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
      .subscribe(lancamentoAdicionado => {
        this.toasty.success('Lancamento adicionado com sucesso !');

        // form.reset();
        // this.lancamento = new Lancamento();
        // this.router.navigate(['/lancamentos']);
        this.router.navigate(['/lancamentos', lancamentoAdicionado.id]);
      });
  }

  atualizarLancamento(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento)
      .subscribe(lancamento => {
        this.lancamento = lancamento;
        this.toasty.success('Lançamento alterado com sucesso!');
        this.atualizarTituloEdicao();
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

  novo(form: FormControl) {
    form.reset();
    // Executar a função após um milisegundo
    setTimeout(function() {
      // O this mão estar referenciando a variável lancamento,
      // pois estar dentro desta função com o método bind() referencia;
      this.lancamento = new Lancamento();
    }.bind(this), 1);
    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
  }

}
