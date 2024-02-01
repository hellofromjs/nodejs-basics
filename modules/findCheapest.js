module.exports = (products) => {
    cheapestIndex = 0

    for (let i = 0; i < products.length; i++) {
        if (products[i].price < products[cheapestIndex].price)
        {
            cheapestIndex = i
        }
        
        return products[i]
    }
}
