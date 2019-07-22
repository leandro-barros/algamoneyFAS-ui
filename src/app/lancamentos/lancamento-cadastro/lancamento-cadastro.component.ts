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

  pessoas = [
    { label: 'João da silva', value: 1 },
    { label: 'Sebastião Souza', value: 2 },
    { label: 'Leandro Barros', value: 3 }
  ];

  constructor(
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {
    this.carregarCategorias();
  }

  carregarCategorias() {
    return this.categoriaService.listaCategorias()
      .subscribe(categorias => {
        this.categorias = categorias.map(c => {
          return { label: c.nome, value: c.id };
        });
      });
  }

}
