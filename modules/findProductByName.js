module.exports = (products, text) => {
    const results = []
    for (const product of products) {
        if ((product.productName.toLowerCase()).includes(text.toLowerCase())) {
            
            results.push(product)
        }
    }
    return results
}