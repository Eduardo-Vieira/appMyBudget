import { Component } from '@angular/core';
import { faList, faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BudgetModel, BudgetService } from '../../services/budget.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss'
})
export class BudgetComponent {
  iRemove = faTrash;
  iEdit = faPenToSquare;
  iDetail = faList;
  iPlus = faPlus;
  
  isEdit: boolean = false;
  indexEdit: number = 0;
  
  items: Array<BudgetModel> = [];

  constructor(private budget: BudgetService, private router: Router) { }

  ngOnInit(): void {
    this.update();
  }

  update() {
    this.budget.getStorage();
    this.items = this.budget.items;
  }

  addItem() {
    this.router.navigateByUrl('budget/new-budget');
  }
  
  detailItem(id: number) {
    this.router.navigateByUrl('budget/budget-detail/'+id);
  }
  
  editItem(id: number) {}

  removeItem(id: number) {
    this.budget.removeItem(id);
    this.update();
  }
}
