import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Product from 'src/app/interfaces/Product';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})
export class FormProductComponent implements OnInit {
  @Input()
  product: Product = { name: '', price: 0, active: true };

  @Output()
  refreshEvent = new EventEmitter();

  formProduct: FormGroup = new FormGroup({});

  constructor(private apiService: ApiServiceService) { }

  ngOnInit(): void {
    this.formProduct = new FormGroup({
      id: new FormControl(this.id),
      name: new FormControl(this.name, [
        Validators.required,
      ]),
      price: new FormControl(this.price, [
        Validators.required,
        Validators.pattern(/^[0-9]*\.[0-9]{2}$/)
      ])
    })

    this.formProduct.setValue({ id: this.product.id || 0 , name: this.product.name, price : this.product.price })
  }

  async submitForm(){
    const payload: Product = { name: this.name?.value, price: this.price?.value, id: this.id?.value, active: true } 
    if(payload.id === 0){
      await this.apiService.saveProduct(payload);
    } else {
      await this.apiService.updateProduct(payload)
    }

    this.refreshEvent.emit('refresh')
  }

  get name() { return this.formProduct.get('name'); }

  get price() { return this.formProduct.get('price'); }

  get id() { return this.formProduct.get('id'); }

}
