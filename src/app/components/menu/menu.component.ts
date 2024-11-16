import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

export interface IMenu {
   icon: any, 
   name: string, 
   url: string, 
   active: boolean
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
 
  @Input({ required: true }) data!: Array<IMenu>;

  constructor(private router: Router) { }

  navigation(index: number, r: string) {
    this.router.navigateByUrl(r);
    this.setActive(index);
  }

  setActive(index: number) {
    this.data.forEach((e, i) => {
      e.active = i == index; 
    })
  }
}
