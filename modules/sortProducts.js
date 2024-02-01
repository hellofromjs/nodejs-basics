module.exports = (products, order) => {
    if (order == 'asc')
    {
        products.sort((a,b) => a.price - b.price);
    } else {
        products.sort((a,b) => b.price - a.price);
    }
}