import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { TPayment } from "../Models/Buyer";
import { Form } from "./Form";

export class PaymentForm extends Form<TPayment> {
  protected paymentButton: HTMLButtonElement[];
  protected addressInput: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this.paymentButton = Array.from(
      this.container.querySelectorAll("button[name]")
    );
    this.addressInput = /*container.querySelector(
      'input[name="address"]'
    ) as HTMLInputElement;*/ensureElement<HTMLInputElement>('input[name="address"]', this.container);
    this.paymentButton.forEach((button) => {
      button.addEventListener("click", () => {
        events.emit("order:changed", {
          field: "payment",
          value: button.getAttribute("name") || "",
        });
      });
    });

    this.addressInput.addEventListener("input", () => {
      events.emit("order:changed", {
        field: "address",
        value: this.addressInput.value,
      });
    });
  }

  set payment(value: TPayment) {
    /*this.paymentButton.forEach((button) => {
      const isActive = button.name === value;
      button.classList.toggle("button_alt-active", isActive);*/this.paymentButton.forEach(button => {
      button.classList.toggle('button_alt-active', button.getAttribute('name') === value);
    });
  };

  set address(value: string) {
    this.addressInput.value = value;
  }
}
