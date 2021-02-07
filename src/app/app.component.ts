import { Component } from '@angular/core';

@Component({
  template: `
    <router-outlet></router-outlet>
    <app-modal></app-modal>
  `,
  selector: 'app-root',
})
export class AppComponent {}
