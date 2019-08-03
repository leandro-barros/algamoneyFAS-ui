import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nao-autorizado',
  template: `
    <div class="container">
      <h1 class="text-center">Acesso Negado!</h1>
    </div>
  `,
  styles: []
})
export class NaoAutorizadongComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
