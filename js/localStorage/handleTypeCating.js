function handleTypeCatingSP(data) {
    return {
        id: parseInt(data.id),
        name: data.name.toString(),
        price: parseInt(data.price),
        soLuong: parseInt(data.soLuong),
        image: data.image.toString(),
    }

}
function handleTypeCatingCard(data) {
    return {
        idSP: parseInt(data.idSP),
        quantity: parseInt(data.quantity)
    }

}







