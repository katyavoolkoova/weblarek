import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Basket {
  protected products: IProduct[] = [];

  constructor(protected events: IEvents) {
    this.products = [];
    this.events = events;
  }

  getProducts(): IProduct[] {
    return this.products;
  }

  addProduct(product: IProduct): void {
    this.products.push(product);
    this.events.emit("basket:changed");
  }

  deleteProduct(id: string) {
    this.products = this.products.filter((products) => products.id !== id);
    this.events.emit("basket:changed");
  }

  clear(): void {
    this.products = [];
    this.events.emit("basket:changed");
  }

  getFullPrice(): number {
    return this.products.reduce(
      (sum, product) => sum + (product.price || 0),
      0
    );
  }

  getProductCount(): number {
    return this.products.length;
  }

  hasProductById(id: string): boolean {
    return this.products.some((product) => product.id === id);
  }
}
