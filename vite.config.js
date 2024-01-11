import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(
  {
    plugins: [vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: '0.0.0.0',
      proxy: {
        // 使用 "/api" 作为前缀的请求将被转发到下面的目标
        '/read-file': {
          target: 'http://localhost:3001/read-file', // 目标服务器
          changeOrigin: true, // 需要虚拟主机站点
          rewrite: (path) => path.replace(/^\/read-file/, '') // 重写请求路径
        },
        '/write-file': {
          target: 'http://localhost:3001/write-file', // 目标服务器
          changeOrigin: true, // 需要虚拟主机站点
          rewrite: (path) => path.replace(/^\/write-file/, '') // 重写请求路径
        }
      }
    }
  }
)
