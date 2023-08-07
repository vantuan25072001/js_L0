if (!app.getData(keyLocalStorageListSP)) {
    app.saveData(keyLocalStorageListSP, listData, handleTypeCatingSP)
    renderHomeProduct()
}
else (
    renderHomeProduct()
)

function renderHomeProduct() {
    const listProducts = document.querySelector('.list-card')
    function productHander(product, index) {
        const price = product.price
        const formatPrice = new Intl.NumberFormat('en', { style: 'decimal' }).format(price);
        return ` 
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div class="card" style="width: 18rem;">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <div class="cart-btn">
                            <i data-id="${product.id}" class="cart-btn-icon fa-solid fa-cart-shopping"></i>
                        </div>
                        <h5 class="card-title">${product.name}</h5>
                        <div class="cart-price-quantity">
                            <div class="cart-price">$${formatPrice}</div>
                            <div class="cart quantity">Quantity: ${product.soLuong}</div>
                        </div>
                    </div>
                </div>
                
            </div>`
    }

    const showProducts = app.getData(keyLocalStorageListSP, handleTypeCatingSP).map(productHander)
    listProducts.innerHTML = showProducts.join('')
    const toast = `<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
                        <div class="toast-container toast-container__list-cart">
                            
                        </div>
                    </div>`
    listProducts.innerHTML += toast

}
renderHomeProduct()