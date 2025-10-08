import { IProduct, TOrder } from "../../types";
import { Api } from "../base/Api";

export class ProductApi extends Api{


  getAllProducts(): Promise<IProduct[]> {
    return this.get<IProduct[]>('/product/')
    
  }

  postOrder(data: Partial<TOrder>): Promise<TOrder> {
    return this.post<TOrder>('/order/', data)
  }
}
