const fs = require('fs');
const htpp = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate.js');

//FILES

/* const textIn = fs.readFileSync('./txt/txt.txt', 'utf-8')
console.log(textIn);

const textOut = `this is the text in the txt document : ${textIn}./nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/Ñ', textOut)

console.log('file Written');

fs.readFile('./txt/start.txt', 'utf-8', (err, data)=>{
    console.log(data);
}) */

//SERVER

const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overwiew.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slug = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slug);

const server = htpp.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //OVERVIEW
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });

    const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join('');
    const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);

    //PRODUCT PAGE
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });

    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    //API
  } else if (pathname === '/api') {
    fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
      const productData = JSON.parse(data);
      res.writeHead(200, {
        'Content-type': 'application/json',
      });
      res.end(data);
    });
  }

  //NOT FOUND
  else {
    res.writeHead(404, {
      'content-type': 'text/html',
      'my-owm-header': 'hello word',
    });
    res.end('<h1> page not found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('listening to request on port 8000');
});
