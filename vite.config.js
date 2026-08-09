import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        // ★ここを追加：CloudflareのプログラムもViteに直接ビルドさせます
        _worker: './public/_worker.js' 
      },
      output: {
        // ★プログラム名が変わらないように出力ファイル名を固定します
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === '_worker' ? '[name].js' : 'assets/[name]-[hash].js';
        }
      }
    }
  }
})
