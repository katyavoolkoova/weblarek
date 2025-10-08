import { Basket } from "./components/Models/Basket";
import { Buyer } from "./components/Models/Buyer";
import { Products } from "./components/Models/Products";
import { ProductApi } from "./components/Models/ProductApi";
import "./scss/styles.scss";
import { API_URL } from "./utils/constants";
import { apiProducts } from "./utils/data";

const productsModel = new Products();

productsModel.saveProducts(apiProducts.items);
console.log("Массив товаров из каталога: ", productsModel.getProducts());
console.log(
  "Товар из каталога: ",
  productsModel.getProductById("854cef69-976d-4c2a-a18c-2aa45046c390")
);

productsModel.saveSelectedProduct(apiProducts.items[1]);
console.log("Выбранный продукт: ", productsModel.getSelectedProduct());

const basketModel = new Basket();

basketModel.addProduct(apiProducts.items[0]);
basketModel.addProduct(apiProducts.items[3]);
console.log("Выбранные товары: ", basketModel.getProducts());
console.log(
  "Товар ",
  basketModel.hasProductById("854cef69-976d-4c2a-a18c-2aa45046c390"),
  " в наличии"
);
console.log(
  "Товар ",
  basketModel.hasProductById("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"),
  " не в наличии"
);
console.log("Кол-во товаров: ", basketModel.getProductCount());
console.log("Общая стоимость товаров: ", basketModel.getFullPrice());

basketModel.deleteProduct(apiProducts.items[0]);
console.log("Товар ", basketModel.getProducts(), " удален");

basketModel.clear();
console.log("Корзина пуста ", basketModel.getProducts());

const buyerModel = new Buyer();
buyerModel.saveData("payment", "card");
buyerModel.saveData("address", "poiuy");
console.log("Данные покупателя: ", buyerModel.getData());
console.log("Валидация: ", buyerModel.validateData());

buyerModel.clearData();
console.log("данные очищены: ", buyerModel.getData());



const api = new ProductApi(API_URL);

api
  .getAllProducts()
  .then((products) => {
    productsModel.saveProducts(products)
    console.log(productsModel)
  })
  .catch((err) => {
    console.error(err)
});
