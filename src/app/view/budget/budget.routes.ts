import { Routes } from "@angular/router";
import { BudgetComponent } from "./budget.component";
import { FormBudgetComponent } from "./form-budget/form-budget.component";
import { BudgetDetailComponent } from "./budget-detail/budget-detail.component";

export const BUDGET_ROUTES: Routes = [
    { path: '', component: BudgetComponent },
    { path: 'new-budget', component: FormBudgetComponent },
    { path: 'budget-detail/:id', component: BudgetDetailComponent }
]