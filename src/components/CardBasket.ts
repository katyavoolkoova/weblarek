import { ensureElement } from "../utils/utils";
import { IEvents } from "./base/Events";
import { Card } from "./Card";

export type TCardCart = {
  index?: number;
  id?: string;
};

export class CardBasket extends Card<TCardCart> {
  protected indexElement: HTMLElement;
  protected deleteButton: HTMLButtonElement;
  protected itemId?: string;

  constructor(container: HTMLButtonElement, protected events: IEvents) {
    super(container);

    this.indexElement = ensureElement<HTMLElement>(
      ".basket__item-index",
      this.container
    );
    this.deleteButton = ensureElement<HTMLButtonElement>(
      ".basket__item-delete",
      this.container
    );

    this.deleteButton.addEventListener("click", () => {
      if (this.itemId) {
        this.events.emit("basket:remove", { id: this.itemId });
      }
    });
  }

  set index(value: number) {
    this.indexElement.textContent = String(value);
  }

  set id(value: string) {
    this.itemId = value;
  }
}
