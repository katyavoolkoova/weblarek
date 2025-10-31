export type ApiPostMethods = "POST" | "PUT" | "DELETE";

import type { TPayment } from "../components/Models/Buyer";

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods
  ): Promise<T>;
}

export interface IProduct {
  title: string;
  id: string;
  description: string;
  image: string;
  category: string;
  price: number | null;
  index: number;
}

export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}

export type TOrder = {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
};

export interface ICard extends IProduct {
  buttonText: string;
  itemCount: number | string;
}

export interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export interface ISuccessActions {
  onClick: () => void;
}

export interface IProductResponse {
  total: number;
  items: IProduct[];
}

export interface IErrors {
  payment?: string;
  email?: string;
  phone?: string;
  address?: string;
}
