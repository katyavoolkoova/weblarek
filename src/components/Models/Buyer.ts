import { IBuyer } from "../../types";
import { IEvents } from "../base/Events";

export type TPayment = "card" | "cash" | "";

export class Buyer {
  protected payment: TPayment | "" = "";
  protected address: string | "" = "";
  protected phone: string | "" = "";
  protected email: string | "" = "";
  protected events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
    this.payment = "";
    this.address = "";
    this.phone = "";
    this.email = "";
  }

  savePayment(payment: TPayment) {
    this.payment = payment;
    this.events.emit("buyer:changed", { field: "payment" });
  }

  saveAddress(address: string) {
    this.address = address;
    this.events.emit("buyer:changed", { field: "address" });
  }

  saveEmail(email: string) {
    this.email = email;
    this.events.emit("buyer:changed", { field: "email" });
  }

  savePhone(phone: string) {
    this.phone = phone;
    this.events.emit("buyer:changed", { field: "phone" });
  }

  getData(): IBuyer {
    return {
      payment: this.payment,
      address: this.address,
      phone: this.phone,
      email: this.email,
    };
  }

  clearData(): void {
    this.payment = "";
    this.address = "";
    this.phone = "";
    this.email = "";
    this.validation();
  }

  validation(): {
    payment: string;
    address: string;
    email: string;
    phone: string;
  } {
    const errors = {
      payment: "",
      address: "",
      email: "",
      phone: "",
    };

    if (!this.payment.trim()) {
      errors.payment = "Не выбран вид оплаты";
    }
    if (!this.address.trim()) {
      errors.address = "Укажите адрес";
    }

    if (!this.email.trim()) {
      errors.email = "Укажите email";
    }

    if (!this.phone.trim()) {
      errors.phone = "Укажите телефон";
    }

    return errors;
  }
}
