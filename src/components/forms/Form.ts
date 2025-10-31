import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export interface IBaseForm {
  valid: boolean;
  errors: string[];
}

export class Form extends Component<IBaseForm> {
  protected formElement: HTMLFormElement;
  protected submitButton: HTMLButtonElement;
  protected errorElement: HTMLElement;

  constructor(container: HTMLFormElement, protected events: IEvents) {
    super(container);

    this.formElement = container;
    this.submitButton = ensureElement<HTMLButtonElement>(
      'button[type="submit"]',
      this.container
    );
    this.errorElement = ensureElement<HTMLElement>(
      ".form__errors",
      this.container
    );

    this.formElement.addEventListener("submit", (evt: Event) => {
      evt.preventDefault();
      if (!this.submitButton.disabled) {
        this.events.emit(`${this.formElement.name}:submit`);
      }
    });
  }

  set valid(value: boolean) {
    this.submitButton.disabled = !value;
    this.submitButton.classList.toggle("button_disabled", !value);
  }

  set errors(value: string[]) {
    if (this.errorElement) {
      this.errorElement.textContent = value.join(", ");
    }
  }
}
