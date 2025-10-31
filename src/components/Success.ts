import { ISuccessActions } from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";

export class Success extends Component<ISuccessActions> {
    protected closeButton: HTMLButtonElement;
    protected descriptionElement: HTMLElement;

    constructor(container: HTMLElement, actions?: ISuccessActions) {
        super(container);

        this.closeButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);
        this.descriptionElement = ensureElement<HTMLElement>('.order-success__description', this.container);

        if (actions?.onClick) {
            this.closeButton.addEventListener('click', actions.onClick)
        }
    }

    set description(value: number ) {
        this.descriptionElement.textContent = `Списано ${value} синапсов`;
    }
}