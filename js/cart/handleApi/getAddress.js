const province = document.getElementById("validationProvince")
const districts = document.getElementById("validationDistricts")
const wards = document.getElementById("validationWards")
const numberHome = document.getElementById("validationAddress")
const codeAddress = {
    codeProvince: -1,
    codeDistrict: -1,
}


function getDistrictsByProvinceID(data) {
    const districts = data.filter(item => {
        return item.province_code === codeAddress.codeProvince
    })
    renderSelectAddress('validationDistricts', districts)
}


function getWardsByDistrictsID(data) {
    const wards = data.filter(item => {
        return item.district_code === codeAddress.codeDistrict
    })
    renderSelectAddress('validationWards', wards)
}

function renderSelectAddress(element, data) {
    const selector = document.getElementById(element)
    const html = data.map(item => {
        return `<option data-id="${item.code}" value="${item.name}">${item.name}</option>`
    })
    selector.innerHTML += html.join('')

}

function handleGetProvice(data) {
    renderSelectAddress('validationProvince', data)
}


province.onchange = function () {
    if (districts.getAttribute("disabled") !== null) {
        districts.removeAttribute("disabled")
    }
    codeAddress.codeProvince = parseInt(province.querySelector('option:checked').getAttribute("data-id"))
    districts.innerHTML = `<option selected disabled value="">--Chọn Huyện/Quận--</option>`
    wards.innerHTML = `<option selected disabled value="">--Chọn Xã/Phường--</option>`
    if (wards.getAttribute("disabled") === null) {
        wards.setAttribute("disabled", "disabled")
    }
    if (numberHome.getAttribute("disabled") === null) {
        numberHome.setAttribute("disabled", "disabled")
    }

    app.getAddress("d",getDistrictsByProvinceID)
}

districts.onchange = function () {
    wards.removeAttribute("disabled")
    codeAddress.codeDistrict = parseInt(districts.querySelector('option:checked').getAttribute("data-id"))
    app.getAddress("w",getWardsByDistrictsID)

}

wards.onchange = function () {
    numberHome.removeAttribute("disabled")
}

app.getAddress("p",handleGetProvice)


