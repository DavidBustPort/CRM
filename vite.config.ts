import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(( { command } ) => {
	return {
		plugins: [vue()],
		base: command === 'serve' ? '/' : './',
		resolve: {
			alias: [
				{ find: '@', replacement: resolve(__dirname, './src/') }
			]
		},
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern-compiler',
					quietDeps: true,
					silenceDeprecations: [
						'import',
						'color-functions',
						'global-builtin'
					]
				}
			}
		}
	}
})
