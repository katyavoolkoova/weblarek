import { IProduct, TOrder } from "../../types";
import { Api } from "../base/Api";

export class ProductApi extends Api {
  getAllProducts(): Promise<{ items: IProduct[]; total: number }> {
    return this.get<{ items: IProduct[]; total: number }>("/product/");
  }

  postOrder(data: Partial<TOrder>): Promise<TOrder> {
    return this.post<TOrder>("/order/", data);
  }
}
