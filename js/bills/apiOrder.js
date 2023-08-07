const ordersApi = 'http://localhost:3000/orders';
let responseApiBill = false
async function getOrders(callback) {
    try {
        const response = await fetch(ordersApi);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        responseApiBill = true
        callback(data)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function createOrder(dataArr) {
    try {
        const options = {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataArr)
        };
        const response = await fetch(ordersApi, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function deleteOrder(id) {
    try {
        const options = {
            method: "delete",
            headers: {
                'Content-Type': 'application/json'
            },
    
        };
        const response = await fetch(ordersApi + '/' + id, options)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const handleDeleteOrders = id => {
    if (confirm("Bạn chắc chắn xóa đơn hàng này chứ?")) {
        getOrders(getOrderID)
        function getOrderID(orders) {
            const orderID = orders.filter(order => order.id === id)
            const arrCards = orderID[0].card
            const orderItem = document.querySelector('.order-item-' + id)
            if (orderItem) {
                orderItem.remove()
                const arrSPs = app.getData(keyLocalStorageListSP, handleTypeCatingSP)
                arrSPs.map(arrSP => {
                    arrCards.forEach(arrCard => {
                        if (arrCard.idSP === arrSP.id) {
                            arrSP.soLuong += arrCard.quantity
                        }
                    })

                })

                app.saveData(keyLocalStorageListSP, arrSPs, handleTypeCatingSP)
                renderHomeProduct()
                deleteOrder(id)
            }

        }
    }
}

