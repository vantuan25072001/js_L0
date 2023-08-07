function handleClickBuy() {
    const modal = document.querySelector('.modal')
    const buy = document.querySelector('.shopping-cart__btn-buy')
    const cancelModal = document.querySelector('.cancle-modal')
    const closeModal = document.querySelector('.btn-close')

    buy.onclick = function () {
        modal.classList.add('active')
        
    }
    closeModal.onclick = function () {
        modal.classList.remove('active')
    }
    cancelModal.onclick = function () {
        modal.classList.remove('active')

    }
}