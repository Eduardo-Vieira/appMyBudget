import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  
  iRemove = faTrash;
  iEdit = faPenToSquare;

  private tableName: string = 'product';
  inputName: string = '';

  items: Array<string> = [];

  isEdit: boolean = false;
  indexEdit: number = 0;

  constructor(private db: LocalStorageService) { }

  ngOnInit(): void {
      const tableData = this.db.getItem(this.tableName);
      if (tableData != null) {
      this.items = JSON.parse(tableData);
      }
  }

  cancel() {
    this.indexEdit = 0;
    this.isEdit = false;
    this.inputName = '';
  }

  updateItem() {
    this.items[this.indexEdit] = this.inputName;
    this.updateDb();
    this.cancel();
  }

  editItem(ix: number) {
    this.inputName = this.items[ix];
    this.indexEdit = ix;
    this.isEdit = true;
  }

  addItem() {
    if (this.inputName.length > 0) {
      this.items.push(this.inputName);
      this.updateDb();
      this.inputName = '';
    }
  }

  updateDb() {
    this.db.setItem(this.tableName, JSON.stringify(this.items));
  }

  removeItem(ix: number) {
    this.items = this.items.filter((_, index) => (index != ix) );
    this.db.setItem(this.tableName, JSON.stringify(this.items));
  }
}
