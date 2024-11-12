import { afterNextRender, Component, OnInit } from '@angular/core';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit {

  iRemove = faTrash;
  iEdit = faPenToSquare;

  private tableName: string = 'client';
  inputName: string = '';

  items: Array<string> = [];

  isEdit: boolean = false;
  indexEdit: number = 0;

  constructor(private db: LocalStorageService) { }

  ngOnInit(): void {
    const table = this.db.getItem(this.tableName);
    if (table != null) {
      this.items = JSON.parse(table);
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

  editItem(id: number) {
    this.inputName = this.items[id];
    this.indexEdit = id;
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

  removeItem(id: number) {
    this.items = this.items.filter((_, index) => (index != id));
    this.db.setItem(this.tableName, JSON.stringify(this.items));
  }
}
