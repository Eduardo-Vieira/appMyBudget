import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

import { faBook, faBoxArchive, faUsers } from '@fortawesome/free-solid-svg-icons';
import { MenuComponent } from "./components/menu/menu.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'Meus Orçamentos';

  menulist = [
    { icon: faUsers, name: 'Clientes', url: '/client', active: false },
    { icon: faBoxArchive, name: 'Produtos', url: '/product', active: true },
    { icon: faBook, name: 'Orçamentos', url: '/budget', active: false }
  ]

}
