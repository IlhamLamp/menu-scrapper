import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';


@Injectable()
export class ScrapperService {
    async getDataViaPuppeteer() {
        const URL = 'https://gofood.co.id/en/jakarta/restaurant/rawon-sempol-jalan-merdeka-b447945e-aba3-4cd3-9523-6d4b4fdaf6df'
        const browser = await puppeteer.launch({
            headless: false
        });
        const page = await browser.newPage();
        await page.goto(URL, {
            waitUntil: 'networkidle2'
        });

        const results = await page.evaluate(() => {
            // Get layout and count menu
            const menuData = []
            const layout = document.querySelector('#section--1 > div')
            const menuCount = layout.childElementCount

            // 
            if(layout){
                for(let i=1; i<=menuCount; i++) {
                    const menu = layout.querySelector(`div:nth-child(${i})`)

                    // Get Image Link
                    const image = menu.textContent
                    const regex = /<img[^>]*src="([^"]+)"/i;
                    const match = image.match(regex)

                    if (menu) {
                        // Extract data from menu element and save it to the 'data' array
                        const title = menu.querySelector('h3')?.textContent || '';
                        const description = menu.querySelector('p')?.textContent || '';
                        const priceElements = menu.querySelectorAll('span');
                        const promo = priceElements[0]?.textContent || '';
                        const price = priceElements[1]?.textContent || '';
                        // const imageUrl = menu.querySelector('img')?.getAttribute('src') || '';
                        const imageUrl = match ? match[1] : null;

                        // push
                        menuData.push({
                            id: i.toString(),
                            title: title,
                            description: description,
                            promo: promo,
                            price: price,
                            img: imageUrl,
                        })
                    } else {
                        console.log(`Menu (${i}) tidak ditemukan`)
                    }
                }
            }

            return menuData

        })
        console.log(
            'Data via puppeteer : ', results
        )

        await browser.close()
        return results

        // return 'my scrapper service is working 🚀';

    }
}
