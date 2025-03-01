import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import Menu from '../../models/Menu';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  menu: Menu;
  items: Array<String>;
  constructor(private menuService: MenuService) {
    this.menu = {
      role: '',
      username: '',
      authorities: [],
    };
    this.items = [''];
    this.getMenu();
  }

  getMenu() {
    this.menuService.getMenu().subscribe({
      next: (data) => {
        this.menu = data;
        this.items = data.authorities;
        this.prueba();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  prueba() {
    console.log(this.menu);
    console.log(this.items);
  }
}
