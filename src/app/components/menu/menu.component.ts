import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import Menu from '../../models/Menu';
import HeaderMenu from '../../models/HeaderMenu';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  headerMenu: HeaderMenu;
  menu: Array<Menu>;
  constructor(private menuService: MenuService) {
    this.headerMenu = {
      role: '',
      username: '',
      menu: [],
    };
    this.menu = [];
    this.getMenu();
  }

  getMenu() {
    this.menuService.getMenu().subscribe({
      next: (data) => {
        this.headerMenu = data;
        this.menu = data.menu;
        this.prueba();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  prueba() {
    console.log(this.headerMenu);
    console.log(this.menu);
  }
}
