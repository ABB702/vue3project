# vue-project

## 项目运行环境

node：v20.14.0

Npm: 10.7.0

@vue/cli：4.4.6

## 项目运行

```sh
npm install
npm run dev
```

## 项目目录结构

```js
root
|-- language       // 多语言文件
|-- mock           // mockjs后台请求模拟数据
|-- public         // 公共资源目录，包含图标文件等
|-- assets         // 样式公共文件
|-- images         // 图片
|-- model					 // 请求拼接
|-- router         // 路由
|-- store          // 全局状态管理
|-- views          // 页面管理
		|-- Home.vue   // 风机概览页
		|-- About.vue  // 单风机页面
|-- components     // 组件管理
		|-- icons      // svg图标组件
		|-- AlarmMonitor...
|-- eslintrc.cjs   // eslint设置
|-- prettierrc.json // 格式化设置
|-- package.json
|-- vite.config.js
```

## 核心技术点

#### 总体架构

- vue3 + vite 提高编译速度
- scss样式 可读性及可扩展性更好；base文件设置调色板，方便全局颜色修改及后续可能的主题切换需求；main文件兼容样式设置；flex布局，屏幕兼容性更好
- axios+mockjs 进行数据模拟，数据可进行编程random设置
- prettier + eslint  便于多人协作时风格统一
- vue-i18n 协助多语言设置
- 多个图标方案，icontfont class设置图标 + svg标签绘制图标，性能优于直接使用图片且可维护性更好，体积更小
- 视图及组件颗粒度更小，数据由projectId和devId进行沟通，方便复用
- 组件数据均由initData进行初始化，请求参数均自上而下地传递，数据更新更方便

#### 秒级刷新技术点

1. 鉴于需要使用mock数据，采用更直观的轮询方案。

2. 只刷新可视范围及缓存区的数据，减轻后台查询压力。

   > 可通过设置`window.__LOG__ = true`来显示当前正在实时更新的设备，鉴于内存隐患，默认关闭

3. 考虑到dom较多，未进入可视区则不对设备进行加载。以设备id为key，配合vue的diff逻辑，减轻dom更新压力

4. 离开页面/切换tab对dom资源及定时器进行清空，防止长时间持有内存

   

#### 风险点

1. axios第三方库存在固有bug，会有轻微内存溢出情况，所以一般轮询方案一般使用10s+地间隔，秒级一般会使用websocket
2. 可视区是通过px计算得出，在滚动较多后会出现偏移（当前在1000台风机以下无问题），后续可考虑对样式进行更精确的设置，可避免此问题
3. 项目基于大屏场景进行设计，虽然做了一定兼容处理，但对mac/windows/各种分辨率的屏幕/不同浏览器 未做进一步测试，可能会有不符合预期的样式出现



