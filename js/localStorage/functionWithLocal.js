function getData(key) {
    if (key === keyLocalStorageListSP) {
        if (localStorage.getItem(key) !== null) {
            const getListData = JSON.parse(localStorage.getItem(key)).map(handleTypeCatingSP)
            return getListData
        }
        else return null
    }
    else {
        if (localStorage.getItem(key) !== null) {
            const getListData = JSON.parse(localStorage.getItem(key)).map(handleTypeCatingCard)
            return getListData
        }
        else return null
    }
}

function saveData(key, data) {
    if (localStorage.getItem(key) === null) {
        if (key === keyLocalStorageListSP) {
            const postListData = data.map(handleTypeCatingSP)
            localStorage.setItem(key, JSON.stringify(postListData))
        }
        else {
            const postListData = data.map(handleTypeCatingCard)
            localStorage.setItem(key, JSON.stringify(postListData))
        }
    }
    else {
        if (key === keyLocalStorageListSP) {
            const postListData = data.map(handleTypeCatingSP)
            localStorage.setItem(key, JSON.stringify(postListData))
        }
        else {
            const postListData = data.map(handleTypeCatingCard)
            localStorage.setItem(key, JSON.stringify(postListData))
        }
    }
}

