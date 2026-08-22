/**
 * webpack.config.demo.js
 *
 * 这是一份用于学习的 webpack 5 配置 Demo，不会影响本项目的实际构建。
 * 本项目使用 Vite，此文件仅供参考学习。
 *
 * 涵盖内容：
 *   1.  mode         模式
 *   2.  entry        入口
 *   3.  output       输出
 *   4.  devtool      Source Map
 *   5.  resolve      模块解析
 *   6.  module.rules Loaders（JS/CSS/SCSS/Less/图片/字体/媒体）
 *   7.  plugins      插件
 *   8.  optimization 代码分割与压缩
 *   9.  devServer    开发服务器
 *   10. performance  性能提示
 *   11. cache        持久化缓存
 *   12. stats        构建输出详细度
 *   13. externals    外部依赖
 */

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const webpack = require('webpack')

// 通过环境变量区分开发 / 生产
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  // ─────────────────────────────────────────────────────────────────────────
  // 1. 模式 Mode
  //
  //    development : 开启调试功能，不压缩代码，构建速度快
  //    production  : 自动启用 tree-shaking、作用域提升、代码压缩等优化
  //    none        : 不应用任何内置默认优化
  // ─────────────────────────────────────────────────────────────────────────
  mode: isDev ? 'development' : 'production',

  // ─────────────────────────────────────────────────────────────────────────
  // 2. 入口 Entry
  //
  //    webpack 从入口开始递归分析依赖，构建依赖图（Dependency Graph）。
  //
  //    单入口（字符串）：
  //      entry: './src/index.js'
  //
  //    多入口（对象）：key 就是 chunk 名，可在 output.filename 中用 [name] 引用。
  //    适用于多页应用（MPA）或需要独立拆包的场景。
  // ─────────────────────────────────────────────────────────────────────────
  entry: {
    main: './src/index.js',       // 主入口
    // admin: './src/admin.js',   // 后台管理入口（MPA 示例）
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. 输出 Output
  // ─────────────────────────────────────────────────────────────────────────
  output: {
    // 输出目录，必须是绝对路径
    path: path.resolve(__dirname, 'dist'),

    // 主 chunk 文件名
    // [name]        → chunk 名（来自 entry 的 key）
    // [contenthash] → 基于文件内容生成的哈希，内容不变则哈希不变
    //                 利于浏览器长期缓存（Cache-Control: max-age=31536000）
    filename: isDev
      ? 'js/[name].bundle.js'
      : 'js/[name].[contenthash:8].bundle.js',

    // 异步 chunk 文件名（动态 import() 产生的 chunk）
    chunkFilename: isDev
      ? 'js/[name].chunk.js'
      : 'js/[name].[contenthash:8].chunk.js',

    // Asset Modules 输出文件名（图片、字体等）
    assetModuleFilename: 'assets/[hash:8][ext][query]',

    // 所有资源的公共路径前缀
    // 部署到 CDN 时改为 CDN 地址，例如 'https://cdn.example.com/'
    // 开发时通常为 '/'
    publicPath: '/',

    // webpack 5 内置清理，每次构建前清空 output.path
    // 替代了旧版常用的 CleanWebpackPlugin
    clean: true,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. Source Map（devtool）
  //
  //    开发推荐：cheap-module-source-map
  //      - cheap  : 只映射到行，不映射列（速度更快）
  //      - module : 能映射到 loader 处理前的源码（如 babel 转换前的 ES6）
  //
  //    生产推荐：false 或 hidden-source-map
  //      - false            : 不生成 source map，不暴露源码
  //      - hidden-source-map: 生成 source map 但不在 bundle 中引用，
  //                           可上传到错误监控平台（Sentry 等）
  //
  //    其他常见值：
  //      eval-cheap-module-source-map — 重建最快，适合大项目开发
  //      source-map                   — 最完整，构建最慢
  // ─────────────────────────────────────────────────────────────────────────
  devtool: isDev ? 'cheap-module-source-map' : false,

  // ─────────────────────────────────────────────────────────────────────────
  // 5. 模块解析 Resolve
  // ─────────────────────────────────────────────────────────────────────────
  resolve: {
    // 省略文件扩展名时的解析顺序（靠前的优先）
    // 注意：扩展名列表不宜过长，影响解析性能
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.json'],

    // 路径别名，避免 '../../../utils' 这样的相对路径
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@styles': path.resolve(__dirname, 'src/styles'),
    },

    // 模块查找目录（默认只有 node_modules）
    // 加入 src 后，可以直接 import 'utils/xxx' 而不需要 '@/utils/xxx'
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],

    // 解析包时优先使用的字段（package.json 中）
    // 'browser' 优先用于前端，'main' 用于 Node.js
    mainFields: ['browser', 'module', 'main'],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 6. Loaders（module.rules）
  //
  //    webpack 本身只理解 JS 和 JSON。
  //    Loader 负责把其他类型的文件转换为 webpack 能处理的模块。
  //
  //    执行顺序：rules 数组从上到下匹配，use 数组从右往左执行。
  //    例如 use: ['style-loader', 'css-loader'] 
  //    实际执行：css-loader → style-loader
  // ─────────────────────────────────────────────────────────────────────────
  module: {
    rules: [

      // ── 6.1 JavaScript / JSX / TypeScript ──────────────────────────────
      // babel-loader：将现代 JS/TS/JSX 转换为目标浏览器能运行的代码
      {
        test: /\.[jt]sx?$/,           // 匹配 .js .jsx .ts .tsx
        exclude: /node_modules/,      // 不处理第三方包，加速构建
        use: {
          loader: 'babel-loader',
          options: {
            // 开启缓存：未改变的文件直接读缓存，加速重复构建
            cacheDirectory: true,
            presets: [
              [
                '@babel/preset-env',
                {
                  // 按 browserslist 中定义的目标浏览器自动转换语法
                  // 'usage' 模式：只注入代码中实际用到的 polyfill
                  useBuiltIns: 'usage',
                  corejs: 3,
                },
              ],
              '@babel/preset-react',        // 支持 JSX（React 项目需要）
              '@babel/preset-typescript',   // 支持 TypeScript（TS 项目需要）
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties', // 类属性语法支持
              '@babel/plugin-transform-runtime',          // 避免 helper 重复注入
            ],
          },
        },
      },

      // ── 6.2 CSS ─────────────────────────────────────────────────────────
      {
        test: /\.css$/,
        use: [
          // 生产环境：MiniCssExtractPlugin.loader 提取为独立 .css 文件
          // 开发环境：style-loader 将 CSS 注入 <style> 标签，支持 HMR
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // importLoaders: n 表示在 css-loader 之前还有 n 个 loader 处理
              importLoaders: 1,
              // 开启 CSS Modules（按需启用，开启后 className 会被哈希化）
              // modules: {
              //   auto: true,                              // 只对 .module.css 开启
              //   localIdentName: '[name]__[local]--[hash:5]',
              // },
            },
          },
          // postcss-loader：添加浏览器前缀、处理现代 CSS 语法等
          // 需要配合 postcss.config.js 使用
          'postcss-loader',
        ],
      },

      // ── 6.3 SCSS / SASS ──────────────────────────────────────────────────
      {
        test: /\.s[ac]ss$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 3 }, // 前面有 postcss + sass 两个 loader
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              // 全局注入变量/mixin 文件，所有 .scss 文件无需手动 @import
              additionalData: `@import "@/styles/variables.scss";`,
            },
          },
        ],
      },

      // ── 6.4 Less ─────────────────────────────────────────────────────────
      {
        test: /\.less$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              // 注入全局 Less 变量（常用于 antd 主题定制）
              lessOptions: {
                modifyVars: {
                  '@primary-color': '#1890ff',
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },

      // ── 6.5 图片（webpack 5 Asset Modules）───────────────────────────────
      //
      //    webpack 5 新增了 Asset Modules，不再需要 file-loader / url-loader。
      //
      //    四种类型：
      //      asset/resource : 始终输出为独立文件（等同于 file-loader）
      //      asset/inline   : 始终转为 base64 Data URL（等同于 url-loader limit=Infinity）
      //      asset/source   : 将内容作为字符串注入（等同于 raw-loader）
      //      asset          : 自动选择，根据 parser.dataUrlCondition.maxSize 决定
      {
        test: /\.(png|jpe?g|gif|webp|avif)$/,
        type: 'asset',                  // 自动选择
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,          // < 8KB → base64 内联；>= 8KB → 独立文件
          },
        },
        generator: {
          filename: 'images/[hash:8][ext]',
        },
      },

      // SVG 单独处理（通常不内联，保留为文件便于缓存）
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash:8][ext]',
        },
        // 如果需要将 SVG 作为 React 组件使用，改用 @svgr/webpack：
        // use: ['@svgr/webpack'],
      },

      // ── 6.6 字体 ─────────────────────────────────────────────────────────
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        type: 'asset/resource',         // 字体文件始终输出为独立文件
        generator: {
          filename: 'fonts/[hash:8][ext]',
        },
      },

      // ── 6.7 媒体文件 ─────────────────────────────────────────────────────
      {
        test: /\.(mp4|webm|mp3|wav|ogg|flac)$/,
        type: 'asset/resource',
        generator: {
          filename: 'media/[hash:8][ext]',
        },
      },

      // ── 6.8 原始文本（如 .txt .md .glsl 着色器等）────────────────────────
      {
        test: /\.(txt|md|glsl|vert|frag)$/,
        type: 'asset/source',           // 内容作为字符串导入
      },

    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 7. 插件 Plugins
  //
  //    Loader 只能转换单个文件，Plugin 可以介入 webpack 整个编译生命周期，
  //    做 Loader 做不到的事：HTML 生成、CSS 提取、环境变量注入、包分析等。
  // ─────────────────────────────────────────────────────────────────────────
  plugins: [

    // ── 7.1 生成 HTML 并自动注入打包后的 JS/CSS ──────────────────────────
    new HtmlWebpackPlugin({
      template: './public/index.html',  // 以此文件为模板
      filename: 'index.html',
      chunks: ['runtime', 'vendors', 'main'], // 只注入这些 chunk
      // 生产环境压缩 HTML
      minify: !isDev && {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),

    // 多入口时，每个页面单独一个 HtmlWebpackPlugin 实例
    // new HtmlWebpackPlugin({
    //   template: './public/admin.html',
    //   filename: 'admin.html',
    //   chunks: ['runtime', 'vendors', 'admin'],
    // }),

    // ── 7.2 提取 CSS 为独立文件（生产环境）──────────────────────────────
    // 开发环境用 style-loader 注入 <style>，生产才提取为 .css 文件
    !isDev && new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].chunk.css',
    }),

    // ── 7.3 定义编译时常量（代码中可直接使用，不需要 import）───────────
    // 注意：字符串值需要用 JSON.stringify 包裹
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __DEV__: JSON.stringify(isDev),
      __APP_VERSION__: JSON.stringify(require('./package.json').version),
      __API_BASE__: JSON.stringify(
        isDev ? 'http://localhost:8080' : 'https://api.example.com'
      ),
    }),

    // ── 7.4 自动提供全局变量（无需 import，webpack 自动注入）────────────
    // 使用场景：项目大量使用 lodash，不想每个文件都 import
    new webpack.ProvidePlugin({
      // _: 'lodash',           // 全局 _ 自动引入 lodash（整个包）
      // _merge: ['lodash', 'merge'],  // 按需引入 lodash 的具体方法
      // $: 'jquery',
    }),

    // ── 7.5 忽略指定模块（减小包体积）───────────────────────────────────
    // 典型场景：moment.js 默认打包全部 locale（约 300KB），这里只保留中文
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),

    // ── 7.6 Bundle 分析（按需开启，构建后自动打开可视化报告）────────────
    // 运行：ANALYZE=true npm run build
    process.env.ANALYZE && new BundleAnalyzerPlugin({
      analyzerMode: 'server',   // 启动本地服务展示报告
      openAnalyzer: true,
    }),

  ].filter(Boolean), // 过滤掉条件表达式产生的 false / undefined

  // ─────────────────────────────────────────────────────────────────────────
  // 8. 优化 Optimization
  //
  //    production 模式下 webpack 会自动开启很多优化，
  //    这里显式配置以便学习和按需调整。
  // ─────────────────────────────────────────────────────────────────────────
  optimization: {
    minimize: !isDev,
    minimizer: [

      // ── 8.1 JS 压缩（webpack 5 默认使用 TerserPlugin）────────────────
      new TerserPlugin({
        parallel: true,           // 多进程并行压缩，加速构建
        terserOptions: {
          compress: {
            drop_console: !isDev, // 生产环境删除所有 console.log
            drop_debugger: true,
            pure_funcs: ['console.info', 'console.debug'], // 删除指定函数调用
          },
          format: {
            comments: false,      // 不保留注释
          },
          mangle: true,           // 变量名混淆，减小体积
        },
        extractComments: false,   // 不生成单独的 LICENSE.txt 文件
      }),

      // ── 8.2 CSS 压缩 ─────────────────────────────────────────────────
      new CssMinimizerPlugin({
        parallel: true,
      }),

    ],

    // ── 8.3 代码分割（splitChunks）────────────────────────────────────
    //
    //    核心思想：
    //      1. 将不常变化的第三方库单独打包（vendors），利用浏览器缓存
    //      2. 将多处复用的公共代码提取为 common chunk，避免重复打包
    //      3. 大型库（如 echarts、element-plus）单独打包
    splitChunks: {
      chunks: 'all',         // 对同步 + 异步 chunk 都做分割（推荐）
      minSize: 20000,        // chunk 至少 20KB 才分割（避免产生过多小文件）
      minChunks: 1,          // 被至少 1 个 chunk 引用才考虑分割
      maxAsyncRequests: 30,  // 按需加载时最大并行请求数
      maxInitialRequests: 30,// 入口点初始化时最大并行请求数

      cacheGroups: {
        // 所有来自 node_modules 的代码打入 vendors chunk
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,            // 优先级，数字越大越先匹配
        },

        // element-plus / antd 这类大型 UI 库单独打包
        // 这样业务代码变化时，UI 库的 hash 不会改变
        elementPlus: {
          test: /[\\/]node_modules[\\/]element-plus[\\/]/,
          name: 'element-plus',
          chunks: 'all',
          priority: 20,            // 高于 vendors，先匹配这条
        },

        // 被 2 个及以上 chunk 引用的公共模块单独打包
        common: {
          name: 'common',
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true, // 复用已有 chunk，不重复打包
        },
      },
    },

    // ── 8.4 Runtime chunk ─────────────────────────────────────────────
    //
    //    webpack 运行时代码（记录 chunk 之间的映射关系）单独打包。
    //    作用：业务代码变化时，vendors 的 contenthash 不会被污染，
    //    浏览器仍然可以命中 vendors 的缓存。
    runtimeChunk: {
      name: 'runtime',
    },

    // ── 8.5 模块 ID 生成策略 ─────────────────────────────────────────
    //
    //    deterministic：基于模块路径生成稳定的数字 ID
    //    好处：新增/删除模块不会导致其他模块 ID 变化，保持 hash 稳定
    moduleIds: 'deterministic',
    chunkIds: 'deterministic',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 9. 开发服务器 DevServer
  //    仅在运行 webpack serve / webpack-dev-server 时生效
  // ─────────────────────────────────────────────────────────────────────────
  devServer: {
    host: 'localhost',
    port: 3000,
    open: true,               // 启动后自动打开浏览器

    // 热模块替换（HMR）：修改代码后局部更新，不刷新整个页面
    hot: true,

    // gzip 压缩响应，加快传输（开发环境可选）
    compress: true,

    // HTML5 History API 路由支持
    // 所有 404 请求都返回 index.html，让前端路由接管
    historyApiFallback: true,

    // 静态文件目录（直接提供，不经过 webpack 处理）
    static: {
      directory: path.resolve(__dirname, 'public'),
      publicPath: '/',
    },

    // ── 代理配置（解决开发时的跨域问题）────────────────────────────────
    proxy: {
      // 所有 /api 开头的请求转发到后端服务器
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,              // 修改请求头中的 Host
        // pathRewrite: { '^/api': '' }, // 转发时去掉 /api 前缀
      },
      // WebSocket 代理
      '/ws': {
        target: 'ws://localhost:8080',
        ws: true,
      },
    },

    // 自定义响应头
    headers: {
      'Access-Control-Allow-Origin': '*',
    },

    // 客户端配置
    client: {
      // 编译出错时在浏览器页面显示遮罩提示
      overlay: {
        errors: true,
        warnings: false,
      },
      // 在浏览器标题栏/控制台显示编译进度
      progress: true,
    },

    // 监听文件变化配置
    watchFiles: {
      paths: ['src/**/*', 'public/**/*'],
      options: {
        usePolling: false, // 在某些文件系统（如 WSL、Docker）下需要设为 true
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 10. 性能提示 Performance
  // ─────────────────────────────────────────────────────────────────────────
  performance: {
    // 超过阈值时的行为
    // 'warning' : 打印警告，不中断构建（推荐生产使用）
    // 'error'   : 抛出错误，中断构建
    // false     : 关闭提示
    hints: isDev ? false : 'warning',

    // 单个输出文件大小上限（字节）
    maxAssetSize: 512 * 1024,       // 512 KB

    // 入口点所有资源总大小上限
    maxEntrypointSize: 512 * 1024,  // 512 KB
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 11. 持久化缓存 Cache（webpack 5 新特性）
  //
  //    第一次构建后将编译结果缓存到磁盘，
  //    后续构建时未修改的模块直接读缓存，大幅提升构建速度。
  //    一般能将二次构建速度提升 60%~90%。
  // ─────────────────────────────────────────────────────────────────────────
  cache: {
    type: 'filesystem',             // 持久化到磁盘（默认位置 node_modules/.cache/webpack）
    cacheDirectory: path.resolve(__dirname, '.webpack-cache'),
    buildDependencies: {
      // 以下文件发生变化时，使整个缓存失效
      config: [
        __filename,                 // webpack.config.js 本身
        path.resolve(__dirname, 'babel.config.js'),
        path.resolve(__dirname, 'postcss.config.js'),
      ],
    },
    // 缓存版本标识，更改此字段可强制使所有缓存失效
    version: '1.0.0',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 12. 构建输出详细度 Stats
  //
  //    preset 快捷选项：
  //      'normal'         : 标准输出
  //      'minimal'        : 只显示关键信息
  //      'errors-warnings': 只显示错误和警告
  //      'errors-only'    : 只显示错误
  //      'verbose'        : 显示全部信息
  //      'none'           : 不输出任何信息
  // ─────────────────────────────────────────────────────────────────────────
  stats: {
    assets: true,         // 显示输出的文件列表
    modules: false,       // 不显示模块详情（太多了）
    chunks: false,        // 不显示 chunk 详情
    children: false,      // 不显示子编译信息
    entrypoints: true,    // 显示入口点信息
    warnings: true,       // 显示警告
    errors: true,         // 显示错误
    errorDetails: true,   // 显示错误详情
    colors: true,         // 彩色输出
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 13. 外部依赖 Externals
  //
  //    告诉 webpack 某些包不打入 bundle，运行时从外部（全局变量）获取。
  //    典型场景：通过 CDN 引入的库（在 HTML 中用 <script> 标签引入）。
  //
  //    优点：减小 bundle 体积，利用 CDN 缓存加速加载
  //    缺点：需要手动维护 CDN 链接和版本
  // ─────────────────────────────────────────────────────────────────────────
  externals: {
    // HTML 中通过 CDN 引入：<script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
    // 代码中仍然 import React from 'react'，webpack 不打包，运行时用全局变量 React
    // 'react': 'React',
    // 'react-dom': 'ReactDOM',
    // 'vue': 'Vue',
    // 'lodash': '_',
  },
}
