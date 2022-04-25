import { Component, Input, Output, EventEmitter } from '@angular/core';
import Product from 'src/app/interfaces/Product';

@Component({
  selector: 'app-table-render',
  templateUrl: './table-render.component.html',
  styleUrls: ['./table-render.component.css']
})
export class TableRenderComponent {

  @Input()
  products: Product[] = [];

  @Output()
  deleteEvent = new EventEmitter<Product>();

  @Output()
  createEvent = new EventEmitter();

  @Output()
  updateEvent = new EventEmitter<Product>();

  constructor() { }

  deleteProduct(item: Product){
    this.deleteEvent.emit(item);
  }

  updateProduct(item: Product){
    this.updateEvent.emit(item)
  }

  createProduct(){
    this.createEvent.emit()
  }

}
