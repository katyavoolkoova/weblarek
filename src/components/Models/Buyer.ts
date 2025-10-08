export type TPayment = "card" | "cash" | "";

export class Buyer {
  protected payment: TPayment | "" = "";
  protected address: string | "" = "";
  protected phone: string | "" = "";
  protected email: string | "" = "";

  constructor() {}

  saveData(
    field: "payment" | "address" | "phone" | "email",
    value: string | TPayment
  ): void {
    if (field === "payment" && typeof value === "string") {
      this.payment = value as TPayment;
    } else if (field === "address" && typeof value === "string") {
      this.address = value;
    } else if (field === "phone" && typeof value === "string") {
      this.phone = value;
    } else if (field === "email" && typeof value === "string") {
      this.email = value;
    }
  }
  getData() {
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
  }

  validateData(): { errors: string[] } {
    const errors: string[] = [];

    if (!this.payment) errors.push("Вид оплаты не указан");
    if (!this.address) errors.push("Адрес не указан");
    if (!this.phone) errors.push("Телефон не указан");
    if (!this.email) errors.push("Email не указан");

    return {
      errors,
    };
  }
}
