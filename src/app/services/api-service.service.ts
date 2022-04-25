import { Injectable } from '@angular/core';
import Axios from 'axios';
import { environment } from 'src/environments/environment';
import Product from '../interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  constructor() { }

  async getProducts(): Promise<Product[]> {
    const { data: res } = await Axios.get(`${environment.api}/api/products`);
    return res.data.map((r: any) => {
      const tranform: Product = {
        id: r.id,
        name: r.name,
        price: r.price,
        active: r.active
      };
      return tranform;
    })
  }

  async saveProduct(product: Product): Promise<void> {
    await Axios.post(`${environment.api}/api/products`, { name: product.name, price: product.price });
  }

  async updateProduct(product: Product): Promise<void> {
    await Axios.put(`${environment.api}/api/products/${product.id}`, { name: product.name, price: product.price })
  }

  async deleteProduct(id?: number): Promise<void>{
    await Axios.delete(`${environment.api}/api/products/${id}`)
  }
}
