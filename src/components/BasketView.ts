
import { createElement, ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/Events";

export interface IBasketContent {
  items: HTMLElement[];
  total: number;
}

export class BasketView<IBasketContent> extends Component<IBasketContent> {
  protected listContainer: HTMLElement;
  protected priceContainer: HTMLElement;
  protected orderButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.listContainer = ensureElement<HTMLElement>(
      ".basket__list",
      this.container
    );
    this.priceContainer = ensureElement<HTMLElement>(
      ".basket__price",
      this.container
    );
    this.orderButton = ensureElement<HTMLButtonElement>(
      ".basket__button",
      this.container
    );

    this.orderButton.addEventListener("click", () => {
      this.events.emit("order:open");
    });
  }

  set items(items: HTMLElement[]) {
    if (items.length) {
      this.listContainer.replaceChildren(...items);
    } else {
      this.listContainer.replaceChildren(
        createElement<HTMLParagraphElement>("p", {
          textContent: "Корзина пуста",
        })
      );
    }
  }

  set price(price: number) {
    this.priceContainer.textContent = `${price} синапсов`;
  }

  setCanBuy(isEmpty: boolean) {
    this.orderButton.disabled = isEmpty;
    this.orderButton.classList.toggle("button_disabled", isEmpty);
  }
}
