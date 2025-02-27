import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'blue_oasis_app';
  constructor(private router: Router) {
    if (localStorage.getItem('token')) {
      console.log('Hay Token');
      this.router.navigate(['']);
    } else {
      console.log('No hay Token');
      this.router.navigate(['/login']);
    }
  }
}
