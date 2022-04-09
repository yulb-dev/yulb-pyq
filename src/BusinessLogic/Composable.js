import { ref, nextTick } from 'vue'

export function useScroll() {

    let timer = null
    let oldScrollTop = 0
    const scrollTop = ref(0)
    const toTopBarIsShow = ref(false)

    function scroll(e) {
        nextTick(() => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                oldScrollTop = e.detail.scrollTop
                toTopBarIsShow.value = e.detail.scrollTop >= 300 ? true : false
            }, 100);
        })
    }
    function toTop() {
        scrollTop.value = oldScrollTop
        nextTick(() => {
            scrollTop.value = 0
        });
    }

    return { scrollTop, toTopBarIsShow, scroll, toTop }
}