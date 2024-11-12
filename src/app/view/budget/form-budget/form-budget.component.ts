import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BudgetModel, BudgetService, ProuctsModel } from '../../../services/budget.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-budget',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-budget.component.html',
  styleUrl: './form-budget.component.scss'
})
export class FormBudgetComponent implements OnInit{
  
  formBudget = new BudgetModel();
  
  clients: Array<String> = [];

  constructor(private budget:BudgetService, private router: Router) { }
  
  ngOnInit(): void {
    this.clients = this.budget.getClient();
  }

  save() {
    const id = this.budget.savebudget(this.formBudget);
    this.router.navigateByUrl('budget/budget-detail/'+id);
  }
}
