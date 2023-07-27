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
