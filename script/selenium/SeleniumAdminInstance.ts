import {Builder, By, until, WebDriver, logging} from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';

export class SeleniumAdminInstance {
    private driver: WebDriver;


    private isInGame: boolean = false;

    constructor() {
    }

    public async buildDriver() {
        this.isInGame = false;
        let builder = new Builder().forBrowser('chrome');
        let chromeOptions = new chrome.Options();
        //chromeOptions.addArguments("user-data-dir=/Users/hill/Desktop/chromeTest"); // cache
        // chromeOptions.addArguments('--headless'); // no ui

        // record log
        this.driver = builder
            .setChromeOptions(chromeOptions)
            .setCapability('goog:loggingPrefs', {'browser': 'ALL'})
            .build()
    }

    public async getJdb() {
        await this.driver.get('https://test-report.zestplay.co/')
    }

    public async login() {
        console.log('viclogin')
        const userIdPath = By.xpath("//*[@id=\"account\"]")
        await this.driver.wait(until.elementLocated(userIdPath), 5000).then(el => {
            el.sendKeys("admin");
        });
        const passwordPath = By.xpath("//*[@id=\"password\"]")
        await this.driver.wait(until.elementLocated(passwordPath), 3000).then(el => {
            el.sendKeys("aaaa1234");
        });

        const loginButton = By.xpath("//*[@id=\"root\"]/div/div/div/div/form/div/div[4]/button")
        await this.driver.wait(until.elementLocated(loginButton), 3000).then(el => {
            el.click();
        });
    }

    public async verifyName() {
            console.log('verifyName')
        try {
        await this.driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div/header/div[2]/div[1]/button/span[2]')), 5000);
            const loginNameElement = await this.driver.findElement(By.xpath('//*[@id="root"]/div/div/header/div[2]/div[1]/button/span[2]'));
            const loginName = await loginNameElement.getText();
            console.log('登入名稱:', loginName);

            if (loginName !== 'ADMI') {
                throw new Error('ADMIN登入名稱錯誤');
            }

        } catch (error) {
            console.error('驗證失敗：', error);
        }
    }

    public quit() {
        if (this.driver && this.driver.quit)
            this.driver.quit();
    }
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}