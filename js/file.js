const app = (function () {
    return {
        getData(key, handleTypeCating) {
            if (localStorage.getItem(key) !== null) {
                return handleTypeCating ? JSON.parse(localStorage.getItem(key)).map(handleTypeCating) : JSON.parse(localStorage.getItem(key))
            }
        },

        saveData(key, data, handleTypeCating) {
            handleTypeCating ? localStorage.setItem(key, JSON.stringify(data.map(handleTypeCating))) : localStorage.setItem(key, JSON.stringify(data))
        },

        async getAddress(option, callback) {
            await fetch(`https://provinces.open-api.vn/api/${option}`)
                .then(res => res.json())
                .then(callback)
                .catch(error => console.error(error))

        },

        sumArr(arr, options) {
            const isArrNum = arr.some(item => typeof item !== "number")
            if (!isArrNum) {
                let sum = arr.reduce((acc, cur) => {
                    return acc + cur
                }, 0)
                return sum
            }
            else {
                if (options) {
                    if (options === 'ProductTotal') {
                        let sum = arr.reduce(function (total, product) {
                            return total + product.quantity;
                        }, 0);
                        return sum
                    }
                    if (options === 'PriceTotal') {
                        let sum = arr.reduce(function (total, product) {
                            return total + (product.price * product.quantity);
                        }, 0);
                        return sum
                    }
                }
                else return null
            }
        }
    }
})()


