/**
 * postcss.config.demo.js
 *
 * PostCSS 配置 Demo（与 webpack.config.demo.js 配套学习使用）。
 * 本项目实际使用 Vite，此文件仅供参考。
 *
 * PostCSS 是一个 CSS 处理工具，通过插件对 CSS 做各种转换。
 * webpack 中通过 postcss-loader 调用它。
 */

module.exports = {
  plugins: [
    // ── autoprefixer ────────────────────────────────────────────────────────
    // 根据 browserslist 配置自动添加浏览器厂商前缀
    // 例如：transform: rotate(45deg)
    //  →  -webkit-transform: rotate(45deg);
    //     transform: rotate(45deg);
    require('autoprefixer'),

    // ── postcss-preset-env ──────────────────────────────────────────────────
    // 让你使用现代 CSS 特性，自动转换为目标浏览器能理解的语法
    // 类似 Babel 对 JS 做的事
    require('postcss-preset-env')({
      // stage 0~4，数字越小特性越新、越不稳定
      // stage 3：候选推荐，浏览器已开始实现，相对稳定
      stage: 3,
      features: {
        'nesting-rules': true,  // 支持 CSS 嵌套语法（类似 SCSS）
      },
    }),

    // ── cssnano（生产环境压缩）──────────────────────────────────────────────
    // 通常由 CssMinimizerPlugin 调用，也可以在这里配置
    // process.env.NODE_ENV === 'production' && require('cssnano')({
    //   preset: ['default', {
    //     discardComments: { removeAll: true },
    //   }],
    // }),

  ].filter(Boolean),
}
