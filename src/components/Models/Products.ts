import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Products {
  protected products: IProduct[] = [];
  protected selectedProduct: IProduct | null = null;

  constructor(protected events: IEvents) {
    this.products = [];
  }

  saveProducts(products: IProduct[]) {
    this.products = products;
    this.events.emit("catalog:changed");
  }
  getProducts(): IProduct[] {
    return this.products;
  }
  getProductById(id: string): IProduct | undefined {
    return this.products.find((product) => product.id === id);
  }
  saveSelectedProduct(product: IProduct): void {
    this.selectedProduct = product;
    this.events.emit("card:selected", product);
  }
  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}
