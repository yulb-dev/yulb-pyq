import {
	createSSRApp
} from "vue";
import App from "./App.vue";
export function createApp() {
	const app = createSSRApp(App);
	uni.getSystemInfo({
		success({ screenHeight, windowHeight, statusBarHeight }) {
			app.provide('windowHeight', windowHeight)
			app.provide('statusBarHeight', statusBarHeight)
		}
	})

	return {
		app,
	};
}
