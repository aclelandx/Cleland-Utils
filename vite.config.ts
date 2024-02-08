import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), svgLoader()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@types": path.resolve(__dirname, "./src/types"),
			"@enums": path.resolve(__dirname, "./src/enums"),
			"@utilities": path.resolve(__dirname, "./src/utilities"),
		},
	},
});
