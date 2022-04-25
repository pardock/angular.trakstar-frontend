import { Component, OnInit } from '@angular/core';
import Product from './interfaces/Product';
import { ApiServiceService } from './services/api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  products: Product[] = []
  showTable = true;
  product: Product = { name: '', price : 0, active: true }
  
  constructor(private apiService: ApiServiceService){}

  async ngOnInit(): Promise<void> {
    this.products = await this.apiService.getProducts();
  }

  async deleteProduct(product: Product){
    await this.apiService.deleteProduct(product.id)
    this.products = await this.apiService.getProducts();
  }

  async createProduct(event: any){
    this.product = { id: undefined, name: '', price : 0, active: true }
    this.showTable = false;
  }

  async updateProduct(product: Product){
    this.product = product;
    this.showTable = false;
  }

  async refreshData(event: any){
    this.products = await this.apiService.getProducts();
    this.showTable = true
  }
}
