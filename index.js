const { log } = require('console');
const fs = require('fs')

const htpp = require('http')
const url = require('url')

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

const replaceTemplate  = (temp, product)=>{
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName)
    output = output.replace(/{%IMAGE%}/g, product.image)
    output = output.replace(/{%PRICE%}/g, product.price)
    output = output.replace(/{%FROM%}/g, product.from)
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients)
    output = output.replace(/{%QUANTITY%}/g, product.quantity)
    output = output.replace(/{%DESCRIPTION%}/g, product.image)
    output = output.replace(/{%ID%}/g, product.id)
    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not_organic')
       return output
     
    
}

const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overwiew.html`, 'utf-8', )
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8', )
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8', )

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8', )
const dataObj    = JSON.parse(data);

const server = htpp.createServer((req,res)=>{
    const pathName = req.url;

    //OVERVIEW
   if (pathName === '/'|| pathName === '/overview') {
    res.end(templateOverview)
    res.writeHead(200, {
        'content-type': 'text/html'
       })

       const cardsHtml = dataObj.map(el =>  replaceTemplate(tempCard, el))
       console.log(cardsHtml);

    //PRODUCT PAGE
   } else if(pathName === '/product'){
    res.end('hola')

    //API
   }else if(pathName === '/api'){

    fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data)=>{
        const productData = JSON.parse(data);
       res.writeHead(200, {
        'content-type': 'application/json'
       })
        res.end(data)
    })
   }

   //NOT FOUND
   else{
    res.writeHead(404,{
        'content-type': 'text/html',
        'my-owm-header':'hello word'
    })
    res.end('<h1> page not found!</h1>')
   }
})

server.listen(8000, '127.0.0.1', ()=>{
    console.log('listening to request on port 8000');
})