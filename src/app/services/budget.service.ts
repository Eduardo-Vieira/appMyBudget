import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';


export interface IProucts {
  productName: string,
  amount: number,
  price: number,
  subPrice: number
}

export interface IBudget {
  id: number,
  date: string,
  clientName: string,
  products: Array<IProucts>,
  totalPrice: number
}

export class BudgetModel implements IBudget {
  id: number = 0;
  date: string = '';
  clientName: string = '';
  products: Array<ProuctsModel> = [];
  totalPrice: number = 0;
}

export class ProuctsModel implements IProucts {
  productName: string = '';
  amount: number = 0;
  price: number = 0;
  subPrice: number = 0;

}

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private tableName: string = 'budget';
  private tableProduct: string = 'product';
  private tableClient: string = 'client';

  items: Array<BudgetModel> = [];

  constructor(private db: LocalStorageService) {
    this.getStorage();
  }

  generationBudgetId(): number {
    let budget_index = this.db.getItem('budget_index');
    let id = 1;
    if (budget_index != null) {
      id = Number.parseInt(budget_index) + 1;
    }
    this.db.setItem('budget_index', id.toString());
    return id;
  }

  updateBudget(budget: BudgetModel, id: number) {
    this.items.forEach(e => {
      if (e.id == id) {
        e = budget
      }
    })
    this.saveStorage();
  }

  savebudget(budget: BudgetModel): number {
    budget.id = this.generationBudgetId();
    budget.date = new Date().toISOString();

    this.items.push(budget);
    this.saveStorage();
    return budget.id;
  }

  saveStorage() {
    this.db.setItem(this.tableName, JSON.stringify(this.items));
  }

  getStorage() {
    const table = this.db.getItem(this.tableName);
    if (table != null) {
      this.items = JSON.parse(table);
    }
  }

  getBudget(id: number): BudgetModel | undefined {
    this.getStorage();
    return this.items.find((obj) => { return obj.id == id });
  }

  removeItem(id: number) {
    this.items = this.items.filter((_, index) => (index != id));
    this.db.setItem(this.tableName, JSON.stringify(this.items));
  }

  getProduct(): Array<String> {
    const table = this.db.getItem(this.tableProduct);
    if (table == null) {
      return [];
    }
    return JSON.parse(table);
  }

  getClient(): Array<String> {
    const table = this.db.getItem(this.tableClient);
    if (table == null) {
      return [];
    }
    return JSON.parse(table);
  }

}
