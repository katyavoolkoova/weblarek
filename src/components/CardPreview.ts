import { ICardActions, IProduct } from "../types";
import { CDN_URL } from "../utils/constants";
import { ensureElement } from "../utils/utils";
import { Card } from "./Card";



export type TPreviewCard = Pick<IProduct, 'image' | 'category' | 'description'>;

export class CardPreview extends Card<TPreviewCard> {
  protected textElement: HTMLElement;
  protected cardButton: HTMLButtonElement;
  protected imageElement: HTMLImageElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.textElement = ensureElement<HTMLElement>(
      ".card__text",
      this.container
    );
    this.cardButton = ensureElement<HTMLButtonElement>(
      ".card__button",
      this.container
    );

     this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);

    if (actions?.onClick) {
      this.cardButton.addEventListener("click", actions.onClick);
    }
  }

  set text(value: string) {
    this.cardButton.textContent = value;
  }

  set disabled(value: boolean) {
    this.cardButton.disabled = value;
    this.cardButton.classList.toggle("button_disabled", value);
  }

  set image(src: string) {
      this.setImage(
        this.imageElement,
        CDN_URL + src.slice(0, -3) + "png",
        this.title
      );
    }

  setCanAddToBasket(isInBasket: boolean, price: number | null) {
    if (price === null) {
      this.text = "Недоступно";
      this.disabled = true;
    } else if (isInBasket) {
      this.text = "Удалить из корзины";
      this.disabled = false;
    }
  }
}
