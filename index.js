const fs = require('fs')
const http = require('http')
const url = require('url')

const findCheapest = require('./modules/findCheapest')
const sortProducts = require('./modules/sortProducts')
const findProductByName = require('./modules/findProductByName')
const findProductByManufacturer = require('./modules/findProductByManufacturer')

const hostname = 'localhost'
const port = 8888

const products = fs.readFileSync(`${__dirname}/products/products.json`, 'utf-8')
const productsJson = JSON.parse(products)

const server = http.createServer((req, res) => {

    const { query, pathname } = url.parse(req.url, true)

    switch (pathname) {
        case '/':
            res.writeHead(200, {
                'Content-Type': 'text/html',
            })
            res.end('<h1>Hello world</h1>')
            break;
// ------------------------------------------------------------
        case '/api/products/sorted':
            res.writeHead(200, {
                'Content-Type': 'application/json',
            })
            sortProducts(productsJson, query['order'])

            res.end(JSON.stringify(productsJson))
            break;
        case '/api/products/cheapest':
            res.writeHead(200, {
                'Content-Type': 'application/json',
            })
            res.end(JSON.stringify({ cheapest: findCheapest(productsJson) }))
            break;
        case '/api/products/find':

            if (query['name'])
            {
                const prods = findProductByName(productsJson, query['name'])

                if (prods.length === 0)
                {
                    res.writeHead(404, {
                        'Content-Type': 'application/json',
                    })
    
                    res.end(JSON.stringify({ message: 'Products not found' }))
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'application/json',
                    })
    
                    res.end(JSON.stringify(prods))
                }
            } else if (query['from']) {

                const prods = findProductByManufacturer(productsJson, query['from'])

                if (prods.length === 0)
                {
                    res.writeHead(404, {
                        'Content-Type': 'application/json',
                    })
    
                    res.end(JSON.stringify({ message: 'Products not found' }))
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'application/json',
                    })
    
                    res.end(JSON.stringify(prods))
                }
            }
            break;
// ------------------------------------------------------------
        case '/api/product':
            for (const product of productsJson) {
                if (product.id == query.id)
                {
                    res.writeHead(200, {
                        'Content-Type': 'application/json',
                    })

                    res.end(JSON.stringify(product))

                    return
                }
            }

            res.writeHead(404, {
                'Content-Type': 'application/json',
            })

            res.end(JSON.stringify({ message: 'Not found' }))

            break
        default:
            res.writeHead(404, {
                'Content-Type': 'text/html',
                'my-header': 'I like node'
            })
            res.end('<h1>Page not found</h1>')
    }
})

server.listen(port, hostname, () => {
    console.log(`Server is listening on port ${port}`)
})





















// let textFromFile = fs.readFile(`${__dirname}/txt/input.txt`, 'utf-8', (err, data) => {
//     console.log(data)
// })


// const words = textFromFile.split(" ");

// for (const word of words) {
//     if (word.endsWith('es'))
//     {
//         fs.appendFileSync(`${__dirname}/txt/validatedWords.txt`, `${word}\n`)
//     }
// }



// let longWords = words.filter(word => word.length > 8)
// fs.appendFileSync(`${__dirname}/txt/validatedWords.txt`, longWords.join('\n'))
