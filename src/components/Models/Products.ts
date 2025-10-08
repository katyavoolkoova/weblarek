import { IProduct } from "../../types";

export class Products {
  protected products: IProduct[] = [];
  protected selectedProduct: IProduct | null = null;

  constructor() {}

  saveProducts(products: IProduct[]) {
    this.products = products;
  }
  getProducts(): IProduct[] {
    return this.products;
  }
  getProductById(id: string): IProduct | undefined {
    return this.products.find((product) => product.id === id);
  }
  saveSelectedProduct(product: IProduct): void {
    this.selectedProduct = product;               
  }
  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}
               