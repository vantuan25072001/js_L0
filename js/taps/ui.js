const taps = document.querySelectorAll('.nav__list-item')
const panes = document.querySelectorAll('.body__list-item')
const tapActive = document.querySelector('.nav__list-item.active')
const line = document.querySelector('.navbar-nav .line')

line.style.left = tapActive.offsetLeft + 'px';
line.style.width = tapActive.offsetWidth + 'px';

taps.forEach((tap, index) => {
    const pane = panes[index] 
    tap.onclick = function () {
        
        line.style.left = this.offsetLeft + 'px';
        line.style.width = this.offsetWidth + 'px';
        
        document.querySelector('.nav__list-item.active').classList.remove('active')
        document.querySelector('.body__list-item.active').classList.remove('active')
        
        this.classList.add('active')
        pane.classList.add('active')
    }
});

function backToShopping() {
    const backToShoppingBtns = document.querySelectorAll('.back-to-shopping')
    backToShoppingBtns.forEach(backToShoppingBtn => {
        backToShoppingBtn.onclick = function() {
            line.style.left = taps[0].offsetLeft + 'px';
            line.style.width = taps[0].offsetWidth + 'px';
            document.querySelector('.nav__list-item.active').classList.remove('active')
            document.querySelector('.body__list-item.active').classList.remove('active')
            taps[0].classList.add('active')
            panes[0].classList.add('active')
        }
    
    })

}


backToShopping()

function showToast(toast,element) {
    const toastContainer = document.querySelector(".toast-container__"+ element)
    toastContainer.innerHTML = toast
    const toastElList = [].slice.call(document.querySelectorAll('.toast'))
    const toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl)
    })
    toastList.forEach(toast => toast.show())
}



