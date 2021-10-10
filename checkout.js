
const puppeteer = require('puppeteer');
const pptr = require('puppeteer-core');





 const rand_url = "https://shopee.com.my/POKKA-Matcha-Milk-Tea-500ml-i.28838940.12416344510"
 //const rand_url = "https://shopee.com.my/CHEESE-BOMB-CHEESE-POP-(combo-set)-sos-keju-cheese-sedap-murah-*FREE-GIFT-i.165548608.5877700148"
//const rand_url = "https://shopee.com.my/-Max-2-bottles-per-person-Sambal-Nyet-Berapi-by-Khairulaming-i.364740282.9305935179"

async function initBrowser(){
    const browser = await puppeteer.launch({
        headless:false,
        executablePath: "C:\\Users\\Lenovo 110\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe",
        userDataDir: `C:\\Users\\Lenovo 110\\AppData\\Local\\Google\\Chrome\\User Data`, 
        defaultViewport: null,
        args: ['--user-data-dir=C:\\Users\\Lenovo 110\\AppData\\Local\\Google\\Chrome\\User Data','--start-maximized']
      });

    

    var [page] = await browser.pages();

    await page.goto(rand_url);

    await page.setViewport({
        width: 1920,
        height: 1080 ,
        deviceScaleFactor: 1,
      });
      
    return page;
}

async function addToCart(page){

    await page.setDefaultTimeout(10000)
    await page.setDefaultNavigationTimeout(20000)

    let div_selector_to_remove= "._2IJN-0";
    await page.evaluate((sel) => {
    var elements = document.querySelectorAll(sel);
    for(var i=0; i< elements.length; i++){
        elements[i].parentNode.removeChild(elements[i]);
    }
    }, div_selector_to_remove)

    const [button] = await page.$x("//button[contains(., 'buy now')]");
    // console.log(button)
    if (button) {
        await button.click();
    }
    // await page.click("button[class='btn btn-solid-primary btn--l _3Kiuzg']", {waitUntil: 'domcontentloaded'})
    await page.waitFor(5000);
    // await page.screenshot({ path: 'tests.png', fullPage: true })
    const [button1] = await page.$x("//button[contains(., 'check out')]");
    if (button1) {
        await button1.click();
    }
    
    // await page.screenshot({ path: 'tests.png', fullPage: true })
    
    try{
        await page.waitFor(3000);
        await page.waitForSelector('button[class~="product-variation"]');
        await page.click('button[class~="product-variation"]');
    }catch(err){
        console.log('element didnt load')
    }
    



    // const [button2] = await page.$x("//button[contains(., 'Place Order')]");
    // if (button2) {
    //     await button2.click();
    // }


    // const [button3] = await page.$x("//button[contains(., 'Pay')]");
    // if (button3) {
    //     await button3.click();
    // }
}



async function checkout(){
    const page = await initBrowser();
    await addToCart(page)
   
}

checkout();