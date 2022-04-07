import {
	createSSRApp
} from "vue";
import { createPinia } from 'pinia'
import App from "./App.vue";
export function createApp() {
	const app = createSSRApp(App);
	app.use(createPinia())
	uni.getSystemInfo({
		success({ screenHeight, windowHeight, statusBarHeight }) {
			app.provide('windowHeight', windowHeight)
			app.provide('statusBarHeight', statusBarHeight)
			app.config.globalProperties.$statusBarHeight = statusBarHeight
			app.config.globalProperties.$formatTime = function (ctime) {
				const date = new Date(ctime)
				const time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
				return time
			}
		}
	})

	return {
		app,
	};
}
