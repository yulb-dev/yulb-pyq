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
            return uni.request({ ...options, ...argArray[0], url });
        }
    }
    return new Proxy(() => { }, headler)
}

const discoverPage = createRequest({ url: '/discoverPage' })
const Login = createRequest({ url: '/login' })
const mySelf = createRequest({ url: '/mySelf' })
const Registered = createRequest({ url: '/registered' })
const Details = createRequest({ url: '/details' })
const PersonalSpace = createRequest({ url: '/personalSpace' })
const DiscoverPage = createRequest({ url: '/discoverPage' })

export { discoverPage, Login, mySelf, Registered, Details, PersonalSpace, DiscoverPage }