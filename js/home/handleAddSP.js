const arr = [];

function addSP(id) {
  let idSP = parseInt(id);
  const gioHang = {
    idSP: idSP,
    quantity: 1,
  };
  const toast = `<div class="toast bg-success" role="alert" aria-live="assertive" aria-atomic="true">
                        <div class="d-flex">
                            <div class="toast-body text-white">
                            Thêm vào giỏ hàng số lượng x 1.
                        </div>
                            <button type="button" class="btn-close me-2 m-auto btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                    </div>`;
  if (!app.getData(keyLocalStorageItemCart)) {
    showToast(toast, "list-cart");
    arr.push(gioHang);
    app.saveData(keyLocalStorageItemCart, arr, handleTypeCatingCard);
  } else {
    const listCartItemsStorage = app.getData(
      keyLocalStorageItemCart,
      handleTypeCatingCard
    );
    const listSPItemsStorage = app.getData(
      keyLocalStorageListSP,
      handleTypeCatingSP
    );
    const itemSP = listSPItemsStorage.find((item) => item.id === idSP);
    const indexItem = listCartItemsStorage.indexOf(
      listCartItemsStorage.find((item) => item.idSP === idSP)
    );
    if (itemSP.soLuong > 0) {
      if (indexItem < 0) {
        showToast(toast, "list-cart");
        listCartItemsStorage.push(gioHang);
        app.saveData(
          keyLocalStorageItemCart,
          listCartItemsStorage,
          handleTypeCatingCard
        );
      } else {
        const arrCart = getbyidSP();
        const item = arrCart.find((item) => item.idSP === idSP);
        const quantity = (listCartItemsStorage[indexItem].quantity += 1);
        if (quantity <= item.soLuong) {
          const toast = `<div class="toast bg-success" role="alert" aria-live="assertive" aria-atomic="true">
                        <div class="d-flex">
                            <div class="toast-body text-white">
                            Thêm vào giỏ hàng số lượng x ${quantity}.
                        </div>
                            <button type="button" class="btn-close me-2 m-auto btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                    </div>`;
          showToast(toast, "list-cart");
          app.saveData(
            keyLocalStorageItemCart,
            listCartItemsStorage,
            handleTypeCatingCard
          );
        } else {
          alert(
            "Số lượng của sản phẩm trong giỏ hàng đã vượt số lượng của sản phẩm!"
          );
        }
      }
    } else {
      alert("Sản phẩm đã bán hết, vui lòng chọn sản phẩm khác!");
    }
  }
}

function handleClickAddSP(e) {
  let productId = e.target.getAttribute("data-id");
  addSP(productId);
  getbyidSP();
  showItemCart();
}

const choosenSPs = document.querySelectorAll(".cart-btn-icon");
choosenSPs.forEach((choosenSP) => {
  choosenSP.addEventListener("click", handleClickAddSP);
});
