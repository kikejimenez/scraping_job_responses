// load in puppeteer
const puppeteer = require('puppeteer')

// this wrapper means immediately execute this code
async function scrape(args) {

    var url = args.url
    var pdf_file = args.pdf
    var text_file = args.text

    // create a new browser instance
    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });

    // wrapper to catch errors
    try {


        // create a page inside the browser
        const page = await browser.newPage()

        // navigate to a website
        await page.goto(url)


        // generate a pdf of the page and save it to
        // this folder/pdfs/page1.pdf
        await page.pdf({ path: pdf_file })

        // grab contents data
        let contents = await page.evaluate(() => document.body.textContent);

        // log the data for testing purposes
        //console.log(JSON.stringify(contents, null, 2))


        // save the data as file
        const fs = require('fs')

        fs.writeFile(
            text_file,
            contents, // optional params to format it nicely
            (err) => err ? console.error('Data not written!', err) : console.log('Data written!')
        )

        // all done, close this browser

    } catch (error) {
        // if something goes wrong
        // display the error message in console
        console.log(error)
    }
    finally {
        await browser.close()
    }
}

exports.scrape = scrape