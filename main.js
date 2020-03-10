const scrape = require("./scrape").scrape;
var argv = require('minimist')(process.argv.slice(2));

var src_file = argv.src
var pdf_dir = argv.pdf
var text_dir = argv.txt

function make_args(url) {

    filename = url.split('//').slice(-1)[0]
        .replace(/[.-/]/g, '_')

    return {
        url: url,
        pdf: pdf_dir + filename + '.pdf',
        text: text_dir + filename + '.txt'
    }
}

var fs = require("fs");
var text = fs.readFileSync(src_file).toString('utf-8');
var textByLine = text.split("\n")


void (() => {
    try {
        for (const url of textByLine) {

            console.log(`Processing URL: ${url}`);
            scrape(make_args(url));
        }
    } catch (e) {
        console.log(e);
    }
})();
