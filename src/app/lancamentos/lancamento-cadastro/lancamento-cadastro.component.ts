import { FormControl } from '@angular/forms';
import { Lancamento } from './../../core/model';
import { PessoaService } from './../../pessoas/pessoa.service';
import { map } from 'rxjs/operators';
import { CategoriaService } from './../../categorias/categoria.service';
import { Component, OnInit } from '@angular/core';

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
    private pessoaService: PessoaService
  ) { }

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  salvar(form: FormControl) {
    console.log(this.lancamento);
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
