import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as fs from 'fs'


@Injectable()
export class ScrapperService {
    async getDataViaPuppeteer() {
        const URL = 'https://bkdelivery.co.id/menus/cheese-burger-favorit/'
        const browser = await puppeteer.launch({
            headless: false
        });
        const page = await browser.newPage();
        await page.goto(URL, {
            waitUntil: 'networkidle2'
        });

        const results = await page.evaluate(() => {
            // Get layout and count menu
            const layout = document.querySelector('body > div.content-block > div > div.item-lists > div.columns')
            // const menuCount = layout.childElementCount
            
            if (layout) {
                const menuElements = layout.querySelectorAll('div.two-column');
                const menuData = [];
                let idCounter = 1;
              
                menuElements.forEach((div) => {
                  const menu = div.querySelector('a');
              
                  // cek 
                  if (menu) {
                    const link = menu.getAttribute('href');
                    const title = div.querySelector('h4')?.textContent || '';
                    const promo = div.querySelector('.price')?.textContent || '';
                    const price = div.querySelector('.original')?.textContent || promo;
                    const imageUrl = div.querySelector('img')?.getAttribute('src') || '';
              
                    // Push data dengan id yang telah dihitung sebelumnya
                    menuData.push({
                      id: idCounter.toString(),
                      link: link,
                      title: title,
                      promo: promo,
                      price: price,
                      img: imageUrl,
                    });
              
                    // Tambahkan counter id untuk menu selanjutnya
                    idCounter++;
                  }
                });
                
                console.log('Data via puppeteer : ', menuData);
                return menuData;
              } else {
                console.log('Layout tidak ditemukan');
                return [];
              }
        })
        console.log(
            'Data via puppeteer : ', results
        )

        // save to json
        fs.writeFile('menus.json', JSON.stringify(results), (err) => {
          if (err) throw err
          console.log('file saved')
        })

        await browser.close()
        return results

        // return 'my scrapper service is working 🚀';

    }
}
