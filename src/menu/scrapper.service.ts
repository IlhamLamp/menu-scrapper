import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
// import * as fs from 'fs'


@Injectable()
export class ScrapperService {

    async getMenuByCategories(link: string) {
        const URL = `https://bkdelivery.co.id${link}`
        const browser = await puppeteer.launch({
            headless: true
        });
        const page = await browser.newPage();
        await page.goto(URL, {
            waitUntil: 'networkidle2'
        });

        const results = await page.evaluate(() => {
            // Get layout and count menu
            const layout = document.querySelector('body > div.content-block > div > div.item-lists > div.columns')
            
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
              
                    // Push data
                    menuData.push({
                      id: idCounter.toString(),
                      link: link,
                      title: title,
                      promo: promo,
                      price: price,
                      img: imageUrl,
                    });
              
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
        // fs.writeFile('menus.json', JSON.stringify(results), (err) => {
        //   if (err) throw err
        //   console.log('file saved')
        // })

        await browser.close()
        return results
    }

    async getAllCategory() {
        const URL = 'https://bkdelivery.co.id/menus/'
        const browser = await puppeteer.launch({
            headless: true
        })

        const page = await browser.newPage()
        await page.goto(URL, {
            waitUntil: 'networkidle2'
        })

        const results = await page.evaluate(() => {
            // get layout
            const layout = document.querySelector('body > div.content-block > div > div.item-categories > div > div')

            if (layout) {
                const categories = layout.querySelectorAll('div.categories-box')
                const categoriesData = [];
                let i = 1;

                categories.forEach((div) => {
                    const c = div.querySelector('a');
                    // check
                    if (c) {
                        const link = c.getAttribute('href');
                        const rawTitle = c.querySelector('h3')?.textContent || '';
                        const title = rawTitle.trim()
                        // push data
                        categoriesData.push({
                            id: i.toString(),
                            link: link,
                            title: title,
                        });
                        i++;
                    }
                });
                console.log('Cat data: ', categoriesData);
                return categoriesData;
            } else {
                console.log('Layout tidak ditemukan!')
                return []
            }
        })

        console.log(
            'Data via puppeteer : ', results
        )

        await browser.close()
        return results
    }

}
