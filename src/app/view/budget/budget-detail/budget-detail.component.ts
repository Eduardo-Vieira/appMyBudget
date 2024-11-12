import { Component, OnInit } from '@angular/core';
import { BudgetModel, BudgetService, ProuctsModel } from '../../../services/budget.service';
import { ActivatedRoute } from '@angular/router';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budget-detail',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './budget-detail.component.html',
  styleUrl: './budget-detail.component.scss'
})
export class BudgetDetailComponent implements OnInit {
  
  budgetModel = new BudgetModel();
  
  productModel = new ProuctsModel();
  
  items: Array<ProuctsModel>= [];

  products: Array<String> = [];

  iRemove = faTrash;
  iEdit = faPenToSquare;
  
  isEdit: boolean = false;
  indexEdit: number = 0;
  
  budgetId!: string;

  constructor(private budget: BudgetService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.budgetId = params.get('id')!;
    });
    let dataBudget = this.budget.getBudget(Number.parseInt(this.budgetId));
    if ( dataBudget != undefined) {
      this.budgetModel = dataBudget
      this.items = this.budgetModel.products;
    }

    this.getProduct();
  }

  getProduct() {
    this.products = this.budget.getProduct();
  }
  
  cancel() {
    this.isEdit = false;
  }
  
  empytProductModel() {
    this.productModel.productName = '';
    this.productModel.amount = 1;
    this.productModel.price = 0;
    this.productModel.subPrice = 0;
  }

  addItem() {
    let product = new ProuctsModel();

    this.productModel.subPrice = this.productModel.amount * this.productModel.price
    
    product.productName = this.productModel.productName
    product.amount = this.productModel.amount
    product.price = this.productModel.price
    product.subPrice = this.productModel.subPrice
   
    this.items.push(product);

    this.budgetModel.products = this.items;
    this.budgetModel.totalPrice = this.sumSubPrice();
    
    this.budget.updateBudget(this.budgetModel, Number.parseInt(this.budgetId));
    this.empytProductModel();
  }
  
  sumSubPrice() {
    let sum = 0;
    this.items.forEach(e => {
      sum = sum + e.subPrice
    })
    return sum;
  }

  updateItem() {
    let product = new ProuctsModel();

    this.productModel.subPrice = this.productModel.amount * this.productModel.price
    
    product.productName = this.productModel.productName
    product.amount = this.productModel.amount
    product.price = this.productModel.price
    product.subPrice = this.productModel.subPrice
    
    this.items[this.indexEdit] = product;
    
    this.budgetModel.products = this.items;
    this.budgetModel.totalPrice = this.sumSubPrice();
    
    this.budget.updateBudget(this.budgetModel, Number.parseInt(this.budgetId));
    this.isEdit = false;
    this.empytProductModel();
  }

  editItem(id: number) {
    
    this.productModel = this.items[id];

    this.isEdit = true;
    this.indexEdit = id;

  }

  removeItem(id: number) {
    
    this.items = this.items.filter((_, index) => (index != id));

    this.budgetModel.products = this.items;
    this.budgetModel.totalPrice = this.sumSubPrice();
    
    this.budget.updateBudget(this.budgetModel, Number.parseInt(this.budgetId));
  }
}
