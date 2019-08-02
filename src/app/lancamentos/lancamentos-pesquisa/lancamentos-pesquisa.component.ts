import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { AuthService } from './../../seguranca/auth.service';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {
  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];

  @ViewChild('tabela') grid;

  constructor(
    private lancamentoService: LancamentoService,
    private confirmation: ConfirmationService,
    private auth: AuthService,
    private toasty: ToastyService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de lançamentos');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .subscribe(resultado => {
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado.lancamentos;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir ?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.id)
      .subscribe(() => {
        this.grid.first = 0;
        this.pesquisar();
        this.toasty.success('Lançamento excluído com sucesso !');
      });
  }

  // excluir(lancamento: any) {
  //   this.lancamentoService.excluir(lancamento.id)
  //     .then(() => {
  //       // this.grid.first = 0;
  //       if (this.grid.first === 0) {
  //         this.pesquisar();
  //       } else {
  //         this.grid.first = 0;
  //       }
  //       // verificar se precisa deste método
  //       // this.pesquisar();
  //       this.toasty.success('Lançamento excluído com sucesso !');
  //     })
  //     .catch(error => this.errorHandler.handle(error));
  // }
}
