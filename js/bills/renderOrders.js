const renderOrders = orders => {
    const listOrdersBlock = document.querySelector('.shopping-bills__table');

    getOrders(render)

    function render(data) {
        if (data.length > 0) {
            const htmls = orders.map(function (item) {
                const stringID = `'${item.id}'`
                totalPrice = parseInt(item.totalPrice)
                const formatTotalPrice = new Intl.NumberFormat('en', { style: 'decimal' }).format(totalPrice);
                return `
                    <tr class="order-item order-item-${item.id} table-card__row">
                        <td scope="row">
        
                            <div>
                                <div>${item.id}</div>
                                <div class=" bill__detail-wrap">
                                    <div class="text-primary me-1 position-relative">
                                    <div class="d-flex flex-row align-items-center" onclick="handleClickDetail(${stringID})">
                                         <div class="text-primary me-1">Details</div>
                                         <div class="bill__detail-icon">
                                            <div class="bill__detail-icon--up bill__detail-icon--up-${item.id}">
                                                <i class="fa-solid fa-caret-up"></i>
                                            </div>
                                            <div class="bill__detail-icon--down bill__detail-icon--down-${item.id}">
                                                <i class="fa-solid fa-caret-down"></i>
                                            </div>
                                         </div>
                                         
                                    </div>
                                    <div class="bill__detail bill__detail-${item.id}">
                                        <table class="table table_bill-details-${item.id}">
                                            <thead>
                                                <tr>
                                                    <th scope="col" class="col-3 text-start">Product name</th>
                                                    <th scope="col" class="col-3 text-center">Quantity</th>
                                                    <th scope="col" class="col-3 text-center">Subtotal</th>
                                                    <th scope="col" class="col-3 text-center">Total</th>
                                                </tr>
                                            </thead>
                                            
                                        </table>
                                    </div>
                                    </div>
                                </div>
                                   
                                   
                            </div>
        
                        </td>
                        <td>
                            ${item.fullName}
                        </td>
                        <td>
                            ${item.date}
                        </td>
                        <td>${item.itemNum}</td>
                        <td>${item.totalQuantity}</td>
                        <td> $${formatTotalPrice}</td>
                        <td>
                            <button class="btn btn-outline-danger" onclick="handleDeleteOrders(${stringID})">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                        </td>
                    </tr>
                `;
            });
            listOrdersBlock.innerHTML += htmls.join('');
        }
        else
            listOrdersBlock.innerHTML = `<h1 class="text-center">There are no bills!</h1>`

    }
}


function handleClickDetail(id) {
    const billDetail = document.querySelector('.bill__detail-' + id)
    const billDetailIconUp = document.querySelector('.bill__detail-icon--up-' + id)
    const billDetailIconDown = document.querySelector('.bill__detail-icon--down-' + id)
    const listBillDetailIconUp = document.querySelectorAll('.bill__detail-icon--up')
    const listBillDetailIconDown = document.querySelectorAll('.bill__detail-icon--down')

    let isToggle = billDetail.classList.contains("d-block")
    const listBillDetail = document.querySelectorAll('.bill__detail')
    Array.from(listBillDetail).map(function (item, index) {
        const getItem = item.classList.contains("d-block")
        if (getItem) {
            item.classList.remove("d-block")
            listBillDetailIconDown[index].style.display = "block"
            listBillDetailIconUp[index].style.display = "none"
        }
        else {
            billDetailIconUp.style.display = "none"
            billDetailIconDown.style.display = "block"
        }
    })

    if (!isToggle) {
        billDetail.classList.add("d-block")
        billDetailIconUp.style.display = "block"
        billDetailIconDown.style.display = "none"
        getOrders(renderCardDetail)
        function renderCardDetail(orders) {
            const details = orders.filter(order => order.id === id)
            const arrCard = details[0].card
            const html = arrCard.map(item => {
                const formatPriceCart = new Intl.NumberFormat('en', { style: 'decimal' }).format(item.price);
                const formatTotalPriceCart = new Intl.NumberFormat('en', { style: 'decimal' }).format(item.price * item.quantity);
                return `
            <tr class="table-card__row bill__detail__list-card-${id}">
            <td scope="row">
                <div class="card-wrap">
                    <img class="shopping-cart__img" src="${item.image}" alt="${item.name}">
                    <div class="cart-text">
                        <div class="shopping-card__title">${item.name}</div>
                    </div>
                </div>
            </td>
            <td>
                <div class="flex__item--center">
                        <input type="text" value="${item.quantity}" class="cart__quantity-count" disabled="">
                    </div>
                </div>
            </td>
            <td>
                <div class="flex__item--center">$${formatPriceCart}</div>
            </td>
            <td>
                <div class="flex__item--center shopping-cart__item-total-1">$${formatTotalPriceCart}</div>

            </td>
            
            </tr>
            `
            })
            const tableBillDetails = document.querySelector('.table_bill-details-' + id)
            const isRender = document.querySelector('.bill__detail__list-card-' + id)
            if (!isRender)
                tableBillDetails.innerHTML += html.join('')

        }
    }
    else {
        billDetail.classList.remove("d-block")
        billDetailIconUp.style.display = "none"
        billDetailIconDown.style.display = "block"

    }
}



getOrders(renderOrders);

