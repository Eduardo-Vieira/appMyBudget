import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBook, faBoxArchive, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FontAwesomeModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'Meus Orçamentos';

  menu = [
    { icon: faUsers, name: 'Clientes', url: '/client', class: 'menu-item' },
    { icon: faBoxArchive, name: 'Produtos', url: '/product', class: 'menu-item active' },
    { icon: faBook, name: 'Orçamentos', url: '/budget', class: 'menu-item' }
  ]

  constructor(private router: Router) { }

  navigation(index: number, r: string) {
    this.router.navigateByUrl(r);
    this.setActive(index);
  }

  setActive(index: number) {
    this.menu.forEach((e, i) => {
      if (i == index) {
        e.class = 'menu-item active';
      } else {
        e.class = 'menu-item';
      }
    })
  }
}
