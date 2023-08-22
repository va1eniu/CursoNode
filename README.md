    # Documentación HIRING PROYECT valentina-perez-fonseca

    ## Contenido de el curso Sección 2 Node.js

    - [Operaciones de Archivos](#operaciones-de-archivos)
    - [Configuración del Servidor](#configuración-del-servidor)
    - [Rutas](#rutas)
    - [Página de Vista General](#página-de-vista-general)
    - [Página de Producto](#página-de-producto)
    - [API](#api)
    - [Página 404](#página-404)

    ## Operaciones de Archivos

    realize operaciones básicas de lectura y escritura de archivos utilizando el módulo `fs` de Node.js. Por ejemplo, para leer contenido de archivos de texto y archivos JSON, así como para escribir contenido en archivos.

    ```javascript

    const fs = require('fs');

    // Lectura y Escritura de Archivos de Texto
    const textIn = fs.readFileSync('./txt/txt.txt', 'utf-8');
    const textOut = `Este es el contenido del archivo txt: ${textIn}.\nCreado el ${Date.now()}`;
    fs.writeFileSync('./txt/nuevo-archivo.txt', textOut);

    // Lectura de Datos JSON
    const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
    const dataObj = JSON.parse(data);

    Configuración del Servidor

    un servidor web básico utilizando el módulo http de Node.js. El servidor escucha en el puerto 8000 para recibir solicitudes entrantes y responde a diferentes rutas.

    const http = require('http');

    const server = http.createServer((req, res) => {
    // Manejo de solicitudes y respuestas
    });

    server.listen(8000, '127.0.0.1', () => {
    console.log('Escuchando solicitudes en el puerto 8000');
    });


    Rutas
    En esta sección, describo las diferentes rutas manejadas por el servidor y cómo se procesan las solicitudes correspondientes.

    const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overwiew.html`, 'utf-8');
    const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
    const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

    Página de overview
    La página de vista general muestra una lista de tarjetas de productos generadas a partir de datos en un archivo JSON. Se reemplaza un marcador en la plantilla HTML con el contenido generado dinámicamente.

    //OVERVIEW
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {
        'Content-type': 'text/html',
        });

        const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join('');
        const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);

        //PRODUCT PAGE
    }

    Página de Productos
    La página de producto muestra los detalles de un producto específico según el parámetro de consulta id.

    else if (pathname === '/product') {
        res.writeHead(200, {
        'Content-type': 'text/html',
        });

        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
    }

    API
    La ruta API devuelve todos los datos JSON como respuesta en formato JSON.

    else if (pathname === '/api') {
        fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
        const productData = JSON.parse(data);
        res.writeHead(200, {
            'Content-type': 'application/json',
        });
        res.end(data);
        });
    }

    Página 404
    Si la ruta solicitada no se encuentra, se muestra una página personalizada de error 404.

    //NOT FOUND
    else {
        res.writeHead(404, {
        'content-type': 'text/html',
        'my-owm-header': 'hello word',
        });
        res.end('<h1> page not found!</h1>');
    }

    ```
