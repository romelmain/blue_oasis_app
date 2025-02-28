import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'blue_oasis_app';
  path: Array<String>;
  constructor(private router: Router) {
    if (localStorage.getItem('token')) {
      console.log('Hay Token');
      this.path = [''];
    } else {
      console.log('No hay Token');
      this.path = ['/login'];
    }
    this.router.navigate(this.path);
  }
}
