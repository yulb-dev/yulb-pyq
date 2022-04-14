import {
	createSSRApp
} from "vue";
import { createPinia } from 'pinia'
import { ref, provide } from 'vue'
import App from "./App.vue";

export function createApp() {
	const app = createSSRApp(App);
	app.use(createPinia())
	uni.getSystemInfo({
		success({ screenHeight, windowHeight, statusBarHeight }) {
			app.provide('windowHeight', windowHeight)
			app.provide('statusBarHeight', statusBarHeight)
			const data = {}
			app.provide('Release', data)

			const ModifiedarticleId = ref('')
			app.provide('ModifiedarticleId', ModifiedarticleId)

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
