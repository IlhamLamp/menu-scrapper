# Web Scrapping API with NestJS & Puppeteer

This is a web scrapping project using NestJS to fetch data from a website and expose it as an API endpoint. Case study from [Burger King Menus](https://bkdelivery.co.id/menus/).

## Installation
```bash
$ git clone https://github.com/IlhamLamp/menu-scrapper.git
$ cd menu-scrapper
$ npm install
```

## Usage
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```
The server will run at `http://localhost:3000`.

## API Endpoints

### GET /menus

This endpoint will fetch the scraped data from the website and return it in JSON format.

Example Response:

```json
[
  {
    "id": "1",
    "link": "/menus/kings-chicken-rasa-baru/",
    "title": "King's Chicken [ Rasa Baru ]"
  },
  {
    "id": "2",
    "link": "/menus/special-menu/",
    "title": "Special Menu"
  },
  // Other data
]
```

### GET /menus/:categoryId

This endpoint will fetch the scraped data from the website and return it in JSON format.

Example Response:

```json
[
  {
    "id": "1",
    "link": "https://bkdelivery.co.id/products/appexc-bbqbfrsh/6452/",
    "title": "App Exc BBQ Beef Rasher",
    "promo": "Rp. 23,182",
    "price": "35,909",
    "img": "https://media-order.bkdelivery.co.id/thumb/product_photo/2023/3/20/98mmiliweaesnsyqgrqz6m_product_list.jpg"
  },
  {
    "id": "2",
    "link": "https://bkdelivery.co.id/products/8-pcs-ayam/7236/",
    "title": "8 pcs Ayam",
    "promo": "Rp. 100,000",
    "price": "145,455",
    "img": "https://media-order.bkdelivery.co.id/thumb/product_photo/2023/3/20/trqkoqzxm32tkxjvpsw2he_product_list.jpg"
  },
  // Other data
]
```

## Contribution

You can contribute to this project by submitting pull requests for bug fixes or additional features.

## License

This project is licensed under the [MIT licensed](LICENSE).