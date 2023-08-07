async function getProvince() {
    try {
        const response = await fetch('https://provinces.open-api.vn/api/p');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        handleGetProvice(data)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function getDistricts() {
    try {
        const response = await fetch('https://provinces.open-api.vn/api/d');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        getDistrictsByProvinceID(data)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function getWards() {
    try {
        const response = await fetch('https://provinces.open-api.vn/api/w');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        getWardsByDistrictsID(data)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}