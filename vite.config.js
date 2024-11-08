// 引入必要的模組和插件
import { defineConfig } from 'vite'; // Vite 的核心函數，用於定義配置
import { ViteEjsPlugin } from 'vite-plugin-ejs'; // EJS 模板插件
import { fileURLToPath } from 'node:url'; // 用於將 URL 轉換為文件路徑
import path from 'node:path'; // Node.js 的路徑處理模組
import { glob } from 'glob'; // 用於文件匹配的工具
import liveReload from 'vite-plugin-live-reload'; // 實時重載插件

// 自定義插件：移動輸出文件
function moveOutputPlugin() {
  return {
    name: 'move-output', // 插件名稱
    enforce: 'post', // 在構建後期執行
    apply: 'build', // 僅在構建時應用
    async generateBundle(options, bundle) {
      // 遍歷所有輸出的文件
      for (const fileName in bundle) {
        // 如果文件名以 'pages/' 開頭
        if (fileName.startsWith('pages/')) {
          // 去掉 'pages/' 前綴
          const newFileName = fileName.slice('pages/'.length);
          // 更新文件名
          bundle[fileName].fileName = newFileName;
        }
      }
    },
  };
}

// 導出 Vite 配置
export default defineConfig({
  // 設置基礎路徑，通常用於部署到子目錄
  base: '/netmet/',

  // 配置插件
  plugins: [
    // 實時重載插件，監視 EJS 和 HTML 文件的變化
    liveReload(['./layout/**/*.ejs', './pages/**/*.ejs', './pages/**/*.html']),
    // EJS 插件，用於處理 EJS 模板
    ViteEjsPlugin(),
    // 自定義的輸出處理插件
    moveOutputPlugin(),
  ],

  // 開發伺服器配置
  server: {
    // 設置啟動開發伺服器時自動打開的頁面
    open: 'pages/index.html',
  },

  // 構建配置
  build: {
    // Rollup 特定選項
    rollupOptions: {
      // 配置入口文件
      input: Object.fromEntries(
        glob
          // 使用 glob 匹配 'pages' 目錄下所有的 HTML 文件
          .sync('pages/**/*.html')
          // 將匹配到的文件轉換為入口配置
          .map((file) => [
            // 生成相對於 'pages' 目錄的路徑，並去掉副檔名
            path.relative('pages', file.slice(0, file.length - path.extname(file).length)),
            // 將文件路徑轉換為 URL
            fileURLToPath(new URL(file, import.meta.url)),
          ])
      ),

      // 配置輸出選項
      output: {
        // 入口 JS 文件的命名方式
        entryFileNames: 'assets/[name]-[hash].js',
        // 非入口 JS 文件（如動態導入的模組）的命名方式
        chunkFileNames: 'assets/[name]-[hash].js',
        // 其他資源文件（如 CSS、圖片等）的命名方式
        assetFileNames: 'assets/[name]-[hash].[ext]'
        // 在以上配置中：
        // [name] 代表原始文件名
        // [hash] 是基於文件內容生成的唯一雜湊值
        // [ext] 是文件的副檔名（僅用於 assetFileNames）
        //
        // 這種配置可以確保：
        // 1. 當文件內容變更時，文件名會改變，強制瀏覽器重新下載新版本
        // 2. 內容未變更的文件會保持相同的文件名，允許瀏覽器使用快取版本
      }
    },
    // 設置構建輸出目錄
    outDir: 'dist',
  },
});