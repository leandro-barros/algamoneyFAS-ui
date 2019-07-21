import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/components/common/api';

import { PessoaService, PessoaFiltro } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  @ViewChild('tabela') grid;

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];

  constructor(
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService
  ) { }

  ngOnInit() {
    // this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    return this.pessoaService.pesquisar(this.filtro)
      .subscribe(resultado => {
        this.totalRegistros = resultado.total;
        this.pessoas = resultado.pessoas;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir ?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.id)
      .subscribe(() => {
        this.grid.first = 0;
        this.pesquisar();
        this.toasty.success('Pessoa excluído com sucesso !');
      });
  }

  alterarStatus(pessoa: any) {
    const novoStatus = !pessoa.ativo;
    this.pessoaService.mudarStatus(pessoa.id, novoStatus)
      .subscribe(() => {
        const acao = novoStatus ? 'Ativada' : 'Desativada';

        pessoa.ativo = novoStatus;
        this.toasty.success(`Pessoa ${acao} com sucesso !`);
      });
  }
}
