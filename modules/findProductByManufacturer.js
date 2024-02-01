module.exports = (products, text) => {
    const results = []
    for (const product of products) {
        if (product.from.toLowerCase() === text.toLowerCase()) {
            
            results.push(product)
        }
    }
    return results
}