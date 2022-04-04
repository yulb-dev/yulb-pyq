export function getCardList() {
    return uni.request({
        url: '/home/cardList',
        data: {
            page: 1
        },
    });
}

export function getUserMessage(id) {
    return uni.request({
        url: '/home/userMessage',
        data: {
            id
        },
    });
}

export function isRefresh() {
    return uni.request({
        url: '/home/isRefresh',
    });
}


