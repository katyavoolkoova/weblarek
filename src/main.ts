import { Basket } from "./components/Models/Basket";
import { Buyer, TPayment } from "./components/Models/Buyer";
import { Products } from "./components/Models/Products";
import { ProductApi } from "./components/Models/ProductApi";
import "./scss/styles.scss";
import { API_URL } from "./utils/constants";
import { CardCatalog } from "./components/CardCatalog";
import { ensureElement, cloneTemplate } from "./utils/utils";
import { EventEmitter } from "./components/base/Events";
import { CardPreview } from "./components/CardPreview";
import { Gallery } from "./components/Gallery";
import { Modal } from "./components/Modal";
import { Header } from "./components/Header";
import { BasketView } from "./components/BasketView";
import { IProduct } from "./types";
import { Success } from "./components/Success";
import { CardBasket } from "./components/CardBasket";
import { PaymentForm } from "./components/forms/PaymentForm";
import { ContactsForm } from "./components/forms/ContactsForm";

const api = new ProductApi(API_URL);

const events = new EventEmitter();
const productsModel = new Products(events);
const basketModel = new Basket(events);
const modal = new Modal(
  ensureElement<HTMLDivElement>("#modal-container"),
  events
);
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>("#card-catalog");
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>("#card-preview");
const contactsTemplate = ensureElement<HTMLTemplateElement>("#contacts");
const orderTemplate = ensureElement<HTMLTemplateElement>("#order");
const basketView = new BasketView(cloneTemplate("#basket"), events);
const header = new Header(events, ensureElement<HTMLElement>(".header"));
const paymentForm = new PaymentForm(cloneTemplate(orderTemplate), events);
const contactsForm = new ContactsForm(cloneTemplate(contactsTemplate), events);
const buyerModel = new Buyer(events);
const gallery = new Gallery(ensureElement<HTMLElement>(".gallery"));
const success = new Success(cloneTemplate("#success"), {
  onClick: () => {
    modal.close();
  },
});

api
  .getAllProducts()
  .then((data) => {
    productsModel.saveProducts(data.items);
    console.log(data.items);
  })
  .catch((err) => {
    console.error(err);
  });

events.on("catalog:changed", () => {
  const itemCards = productsModel.getProducts().map((item) => {
    const card = new CardCatalog(cloneTemplate(cardCatalogTemplate), {
      onClick: () => events.emit("card:select", item),
    });

    return card.render(item);
  });

  gallery.render({ catalog: itemCards });
});

events.on("card:select", (item: IProduct) => {
  productsModel.saveSelectedProduct(item);
});

events.on("card:selected", (item: IProduct) => {
  const inBasket = basketModel.hasProductById(item.id);
  const previewCard = new CardPreview(cloneTemplate(cardPreviewTemplate), {
    onClick: () => events.emit("item:clicked", item),
  });
  modal.content = previewCard.render({
    title: item.title,
    price: item.price,
    image: item.image,
    category: item.category,
    description: item.description,
  });
  previewCard.setCanAddToBasket(inBasket, item.price);
  modal.open();
});

events.on("item:clicked", (item: IProduct) => {
  const inBasket = basketModel.hasProductById(item.id);
  if (inBasket) {
    basketModel.deleteProduct(item.id);
  } else if (item.price !== null) {
    basketModel.addProduct(item);
  }
  modal.close();
});

events.on("basket:changed", () => {
  header.counter = basketModel.getProductCount();
  const basketItems = basketModel.getProducts().map((item, index) => {
    const cardBasket = new CardBasket(cloneTemplate("#card-basket"), events);
    return cardBasket.render({
      id: item.id,
      title: item.title,
      price: item.price,
      index: index + 1,
    });
  });
  basketView.items = basketItems;
  basketView.price = basketModel.getFullPrice() || 0;
  const isEmpty = basketModel.getProductCount() === 0;
  basketView.setCanBuy(isEmpty);
});

events.on("basket:open", () => {
  const isEmpty = basketModel.getProductCount() === 0;
  basketView.setCanBuy(isEmpty);
  modal.content = basketView.render();
  modal.open();
});

events.on("basket:remove", (data: { id: string }) => {
  basketModel.deleteProduct(data.id);
});

events.on("order:changed", (data: { field: string; value: string }) => {
  if (data.field === "payment") {
    buyerModel.savePayment(data.value as TPayment);
  } else if (data.field === "address") {
    buyerModel.saveAddress(data.value);
  }
});

events.on("contacts:changed", (data: { field: string; value: string }) => {
  if (data.field === "email") {
    buyerModel.saveEmail(data.value);
  } else if (data.field === "phone") {
    buyerModel.savePhone(data.value);
  }
});

events.on("buyer:changed", (data: { field: string }) => {
  const validation = buyerModel.validation();
  const buyerData = buyerModel.getData();
  if (data.field === "payment" || data.field === "address") {
    if (paymentForm) {
      paymentForm.payment = buyerData.payment;
      paymentForm.address = buyerData.address;

      const paymentValid = !validation.payment && !validation.address;
      paymentForm.valid = paymentValid;
      const errors = [validation.payment, validation.address].filter(Boolean);
      paymentForm.errors = errors;
    }
  }
  if (data.field === "phone" || data.field === "email") {
    if (contactsForm) {
      contactsForm.email = buyerData.email;
      contactsForm.phone = buyerData.phone;

      const contactsValid = !validation.email && !validation.phone;
      contactsForm.valid = contactsValid;
      const errors = [validation.email, validation.phone].filter(Boolean);
      contactsForm.errors = errors;
    }
  }
});

events.on("order:open", () => {
  modal.content = paymentForm.render();
  events.emit("buyer:changed", { field: "all" });
});

events.on("order:submit", () => {
  modal.content = contactsForm.render();
  events.emit("buyer:changed", { field: "all" });
});

events.on("contacts:submit", () => {
  const orderData = {
    ...buyerModel.getData(),
    items: basketModel.getProducts().map((item) => item.id),
    total: basketModel.getFullPrice(),
  };

  api
    .postOrder(orderData)
    .then(() => {
      success.description = basketModel.getFullPrice();
      modal.content = success.render();

      buyerModel.clearData();
      basketModel.clear();
    })
    .catch((error) => {
      console.error("Ошибка при оформлении заказа:", error);
    });
});
