function createRequest(options) {
    let headler = {
        get(target, key) {
            return function (data) {
                let url = data?.url ?? ''
                url = options.url + url
                return uni.request({ ...options, ...data, url, method: key.toUpperCase() });
            }
        },
        apply(target, thisArg, argArray) {
            let url = argArray[0]?.url ?? ''
            url = options.url + url
            return uni.request({ ...options, ...argArray[0] });
        }
    }
    return new Proxy(() => { }, headler)
}

const discoverPage = createRequest({ url: '/discoverPage' })
const Login = createRequest({ url: '/login' })

export { discoverPage, Login }