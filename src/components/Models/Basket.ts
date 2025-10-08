import { IProduct } from "../../types";

export class Basket {
  protected products: IProduct[] = [];
  

  constructor() {}

  getProducts(): IProduct[] {
    return this.products;
  }

  addProduct(product: IProduct): void {
    this.products.push(product);
  }

  deleteProduct(product: IProduct): void {
    this.products = this.products.filter(p => p.id !== product.id);
  }

  clear(): void {
    this.products = [];
  }

  getFullPrice(): number {
    
    return this.products.reduce((sum, product) =>  sum + (product.price ?? 0), 0);
  }

  getProductCount(): number {
    return this.products.length;
  }

  hasProductById(id: string): boolean {
    return this.products.some((product) => product.id === id);
  }
}
