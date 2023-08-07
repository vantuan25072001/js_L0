const cartNumber = document.querySelector('.nav__count')
function getbyidSP() {
    const listSP = app.getData(keyLocalStorageListSP, handleTypeCatingSP)
    const listCartSP = app.getData(keyLocalStorageItemCart, handleTypeCatingCard)

    if (listSP && listCartSP) {
        let mergedArray = listCartSP.map(item1 => {
            let item2 = listSP.find(item2 => item2.id === item1.idSP);
            return item2 ? { ...item1, ...item2 } : null;
        });
        return mergedArray
    }
    else
        return null
}

function handleDeleteCart(id) {
    const cartElement = document.querySelector('.shopping-card__item' + id)
    if (confirm("Bạn chắc chắn xóa?")) {
        const listCard = app.getData(keyLocalStorageItemCart , handleTypeCatingCard)
        const newListCard = listCard.filter(item => item.idSP !== id)
        app.saveData(keyLocalStorageItemCart, newListCard, handleTypeCatingCard)
        if (cartElement) {
            cartElement.remove()
            cartNumber.innerHTML = app.sumArr(newListCard, 'ProductTotal')
        }
        else {
            showItemCart()
        }
    }
}

function handleQuantitySub(id) {
    const fullAttrCart = getbyidSP()
    const quantityCount = document.querySelector('.quantity-count-' + id)
    let quantityCountValue = parseInt(quantityCount.value)
    const getElement = fullAttrCart.filter(item => item.idSP === id)
    quantityCountValue--
    if (quantityCountValue > 0) {
        quantityCount.value = quantityCountValue
        fullAttrCart.map(item => {
            if (item.idSP === id)
                return item.quantity = quantityCountValue
        })

        let totalPrice = app.sumArr(fullAttrCart, 'PriceTotal')
        const formatTotalCart = new Intl.NumberFormat('en', { style: 'decimal' }).format(totalPrice);
        const totalElement = document.querySelector('.list-shopping-cart__total')
        totalElement.innerHTML = "Total: $" + formatTotalCart
        const totalItemElement = document.querySelector('.shopping-cart__item-total-' + id)
        let formatTotalItemPrice = new Intl.NumberFormat('en', { style: 'decimal' }).format(quantityCountValue * getElement[0].price);
        totalItemElement.innerHTML = "$" + formatTotalItemPrice
        cartNumber.innerHTML = fullAttrCart.length
        app.saveData(keyLocalStorageItemCart, fullAttrCart,handleTypeCatingCard )
    }

}

function handleQuantityAdd(id) {
    const fullAttrCart = getbyidSP()
    const quantityCount = document.querySelector('.quantity-count-' + id)
    let quantityCountValue = parseInt(quantityCount.value)
    const getElement = fullAttrCart.filter(item => item.idSP === id)
    if (getElement[0].soLuong > quantityCountValue) {
        quantityCountValue++
        quantityCount.value = quantityCountValue
        fullAttrCart.map(item => {
            if (item.idSP === id)
                return item.quantity = quantityCountValue
        })

        let totalPrice = app.sumArr(fullAttrCart, 'PriceTotal')
        const formatTotalCart = new Intl.NumberFormat('en', { style: 'decimal' }).format(totalPrice);
        const totalElement = document.querySelector('.list-shopping-cart__total')
        totalElement.innerHTML = "Total: $" + formatTotalCart
        const totalItemElement = document.querySelector('.shopping-cart__item-total-' + id)
        let formatTotalItemPrice = new Intl.NumberFormat('en', { style: 'decimal' }).format(quantityCountValue * getElement[0].price);
        totalItemElement.innerHTML = "$" + formatTotalItemPrice
        cartNumber.innerHTML = fullAttrCart.length
        app.saveData(keyLocalStorageItemCart, fullAttrCart, handleTypeCatingCard)
    }


}

function handleInputQuantity(id) {
    const fullAttrCart = getbyidSP()
    const quantityCount = document.querySelector('.quantity-count-' + id)
    if (quantityCount.value.trim() !== "") {
        let quantityCountValue = parseInt(quantityCount.value)
        const getElement = fullAttrCart.filter(item => item.idSP === id)
        if (quantityCountValue > getElement[0].soLuong) {
            alert("Vui lòng kiểm tra số lượng của mặt hàng!")
            quantityCount.value = getElement[0].quantity
        }
        else {
            fullAttrCart.map(item => {
                if (item.idSP === id)
                    return item.quantity = quantityCountValue
            })
            let totalPrice = app.sumArr(fullAttrCart, 'PriceTotal')
            const formatTotalCart = new Intl.NumberFormat('en', { style: 'decimal' }).format(totalPrice);
            const totalElement = document.querySelector('.list-shopping-cart__total')
            totalElement.innerHTML = "Total: $" + formatTotalCart
            const totalItemElement = document.querySelector('.shopping-cart__item-total-' + id)
            let formatTotalItemPrice = new Intl.NumberFormat('en', { style: 'decimal' }).format(quantityCountValue * getElement[0].price);
            totalItemElement.innerHTML = "$" + formatTotalItemPrice
            cartNumber.innerHTML = fullAttrCart.length
            app.saveData(keyLocalStorageItemCart, fullAttrCart, handleTypeCatingCard)
        }
    }
}


function showItemCart() {
    const listShoppingCart = document.querySelector('.list-shopping-cart')
    const fullAttrCart = getbyidSP()
    if (!fullAttrCart || fullAttrCart.length === 0) {
        cartNumber.style.display = "none"
        listShoppingCart.innerHTML = `
        <img class="list-shopping-cart__emty-cart-img" src="./assets/img/empty-cart.png" alt="">   
        <button type="button" class="btn btn-outline-danger back-to-shopping btn-lg">
            <i class="fa-solid fa-arrow-left"></i>
            <div class="back-to-shopping-title">Back To Shopping</div>
        </button>`
        backToShopping()
    }
    else {
        let total = app.sumArr(fullAttrCart, 'PriceTotal')
        let formatTotal = new Intl.NumberFormat('en', { style: 'decimal' }).format(total);
        listShoppingCart.innerHTML = `
        <table class="table shopping-cart-table">
            <thead>
                <tr>
                    <th scope="col" class="col-6 shopping-cart-table__heading">Product name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Subtotal</th>
                    <th scope="col">Total</th>
                    <th scope="col">Clear cart</th>
                </tr>
            </thead>
        </table>
        <div class="list-shopping-cart__total">
            Total: $${formatTotal}
        </div>
        <div class="list-shopping-cart__btn">
            <button type="button" class="btn btn-outline-danger back-to-shopping btn-lg">
                <i class="fa-solid fa-arrow-left"></i>
                <div class="back-to-shopping-title">Back To Shopping</div>
            </button>
            <button type="button" class="btn btn-success btn-lg shopping-cart__btn-buy">Mua</button>
        </div>`
        listShoppingCart.innerHTML += `<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
                                            <div class="toast-container toast-container__list-shopping-cart">
                                                
                                            </div>
                                      </div>`

        function handleRenderItemCart(item, index) {
            let price = item.price
            let formatPrice = new Intl.NumberFormat('en', { style: 'decimal' }).format(price);
            let totalItemPrice = item.quantity * item.price;
            let formatTotalItemPrice = new Intl.NumberFormat('en', { style: 'decimal' }).format(totalItemPrice);
            let id = parseInt(item.idSP)

            return `<tr class="table-card__row shopping-card__item-${id}">
            <td scope="row">
                <div class="card-wrap">
                    <img class="shopping-cart__img" src="${item.image}" alt="${item.name}">
                    <div class="cart-text">
                        <div class="shopping-card__title">${item.name}</div>
                        <div class="card__quantity">Quantity: ${item.soLuong}</div>
                    </div>
                </div>
            </td>
            <td>
                <div class="flex__item--center">

                    <div class="wrap-cart__quantity">
                        <div onclick="handleQuantitySub(${id})" class="cart__quantity-sub"><i class="fa-solid fa-minus"></i></div>
                        <input type="number" value="${item.quantity}" class="cart__quantity-count quantity-count-${id}" oninput="handleInputQuantity(${id})">
                        <div onclick="handleQuantityAdd(${id})" class="cart__quantity-add"><i class="fa-solid fa-plus"></i></div>
                    </div>
                </div>
            </td>
            <td>
                <div class="flex__item--center">$${formatPrice}</div>
            </td>
            <td>
                <div class="flex__item--center shopping-cart__item-total-${id}">$${formatTotalItemPrice}</div>

            </td>
            <td>
                <div class="flex__item--center">
                    <button class="btn btn-outline-danger" onclick="handleDeleteCart(${id})">
                <i class="fa-solid fa-xmark"></i>
                     </button>
                </div>

            </td>
        </tr>`
        }

        cartNumber.innerHTML = fullAttrCart.length
        cartNumber.style.display = "flex"
        const cartTable = document.querySelector('.shopping-cart-table')
        const showItemCart = fullAttrCart.map(handleRenderItemCart)
        cartTable.innerHTML += showItemCart.join('')
        handleClickBuy()
        backToShopping()
    }
}

showItemCart()
