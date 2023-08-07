function OrderInfor(id, date, itemNum, totalQuantity, totalPrice, card, fullName, email, tel, address, message) {
    this.id = id
    this.date = date
    this.itemNum = itemNum
    this.totalQuantity = totalQuantity
    this.totalPrice = totalPrice
    this.card = card
    this.fullName = fullName
    this.email = email
    this.tel = tel
    this.address = address
    this.message = message
}

Validator({
    form: '#buy-validation',
    formGroupSelector: '.form-group',
    errorSelector: '.invalid-feedback',
    rules: [
        Validator.isRequired('#validationSurname'),
        Validator.isRequired('#validationLastname'),
        Validator.isRequired('#validationEmail'),
        Validator.isRequired('#validationTel'),
        Validator.isRequired('#validationAddress'),
        Validator.isName('#validationSurname'),
        Validator.isName('#validationLastname'),
        Validator.isEmail('#validationEmail'),
        Validator.isTel('#validationTel')
    ],
    onSubmit: function (data) {
        //call API
        const orderID = generateId(6)
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const formattedDate = `${day}/${month}/${year}`
        const arrCards = getbyidSP()
        const itemNums = arrCards.length
        const totalQuantity = app.sumArr(arrCards, 'ProductTotal')
        const totalPrice = app.sumArr(arrCards, 'PriceTotal')
        const modal = document.querySelector('.modal')
        const removeToastAddCart = document.querySelector('.toast-container__list-cart')
        removeToastAddCart.style.display = "none"
        const order = new OrderInfor(
            orderID,
            formattedDate,
            itemNums,
            totalQuantity,
            totalPrice,
            arrCards,
            data.fullName,
            data.email,
            data.tel,
            data.address,
            data.message
        )

        modal.classList.remove('active')
        const toast = `<div class="toast bg-success" role="alert" aria-live="assertive" aria-atomic="true">
                            <div class="d-flex">
                                <div class="toast-body text-white">
                                Mua hàng thành công!
                                </div>
                                <button type="button" class="btn-close me-2 m-auto btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                            </div>
                         </div>`
        const errorToast = `<div class="toast bg-danger" role="alert" aria-live="assertive" aria-atomic="true">
                         <div class="d-flex">
                             <div class="toast-body text-white">
                             Mua hàng thất bại! Vui lòng kiểm tra lại!
                             </div>
                             <button type="button" class="btn-close me-2 m-auto btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                         </div>
                      </div>`

        if (!responseApiBill) {
            showToast(errorToast, "list-shopping-cart")
        }
        else {

            showToast(toast, "list-shopping-cart")

            const arrSPs = app.getData(keyLocalStorageListSP, handleTypeCatingSP)
            arrSPs.map(arrSP => {
                arrCards.forEach(arrCard => {
                    if (arrCard.idSP === arrSP.id) {
                        arrSP.soLuong -= arrCard.quantity
                    }
                })

            })
            app.saveData(keyLocalStorageListSP, arrSPs, handleTypeCatingSP)
            app.saveData(keyLocalStorageItemCart, [])
            setTimeout(function () {
                createOrder(order)
                getOrders(renderOrders);
            }, 1000)
        }


    }
})


