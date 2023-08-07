Array.prototype.totalProducts = function () {
    return this.reduce(function (total, product) {
        return total + product.quantity;
    }, 0);
};

Array.prototype.totalPrice = function () {
    return this.reduce(function (total, product) {
        return total + (product.price * product.quantity);
    }, 0);
};

function cartTotal(data) {
    let totalProducts = data.totalProducts()
    let totalPrice = data.totalPrice()
    let cartTotal = new Map();
    
    cartTotal.set('ProductTotal', totalProducts);
    cartTotal.set('PriceTotal', totalPrice);
    return cartTotal

}