1.函数执行过程中，this被确定后不可变更

默认绑定
var name = 'abb'
function person() {
    return this.name
}
console.log(person()) // abb
非严格模式由于在全局调用，因此this绑定到了window，严格模式下绑到undefined

隐式绑定
function test() {
    console.log(this.x)
}
var obj = {
    x: 1,
    y: test
}
obj.y() // 1
var obj2 = {
    x: 1,
    y: {
        fn: test
    }
}
obj2.y.fn() // undefined
this指向了上一级对象，也仅指向上一级
注意，如果是f1 = obj.y; f1();那么由于裸调用，还是undefined

new绑定
this指向实例对象

箭头函数
在原型上添加方法、绑定事件监听时，别用箭头函数

手写new
function myNew(constructor, ...args) {
  // 1. 创建空对象
  const obj = {};
  // 2. 绑定原型：obj.__proto__ = 构造函数的prototype
  Object.setPrototypeOf(obj, constructor.prototype);
  // 3. 执行构造函数，this指向obj，传入参数
  const result = constructor.apply(obj, args);
  // 4. 判断返回值：如果返回引用类型，就返回result，否则返回obj
  return typeof result === 'object' && result !== null ? result : obj;
}

事件模型
捕获-目标-冒泡，dom01,vue的对比

闭包、柯里化
function getarea(width) {
    // 提前存了个width
    return (height) => {
        return width * height
    }
}

深拷贝
function deepClone(target, map = new WeakMap()) {
  if (target === null || typeof target !== 'object') return target
  if (map.has(target)) return map.get(target) // 解决循环引用

  const res = Array.isArray(target) ? [] : {}
  map.set(target, res)

  for (const key in target) {
    if (Object.hasOwn(target, key)) {
      res[key] = deepClone(target[key], map)
    }
  }
  return res
}

for in整对象，for of看可迭代对象

闭包实现缓存

SSO登录 父域名/认证中心/前端localstorage

柯里化
function curry(fn) {
  // 获取原函数参数长度
  const len = fn.length
  return function (...args) {
    // 如果当前收集参数 >= 需要参数，执行原函数
    if(args.length >= len) {
      return fn(...args)
    } else {
      // 参数不够，继续返回新函数，继续收集
      return function (...newArgs) {
        return curry(fn)(...args, ...newArgs)
      }
    }
  }
}

继承
class Parent {
  constructor(name){
    this.name = name
  }
  say(){
    console.log(this.name)
  }
}
class Child extends Parent {
  constructor(name, age){
    super(name) // 等价 Parent.call(this)，必须写在前面
    this.age = age
  }
}
const c = new Child('tom',18)
1. **原型链继承**：子类原型等于父实例。缺点是引用属性共享，不能传参。
2. **借用构造函数**：call 调用父构造。能传参，但拿不到原型方法。
3. **组合继承**：原型链 + call。可以继承实例和原型方法，但父构造执行两次。
4. **寄生组合继承**：`Object.create(Parent.prototype)`，只执行一次父构造，ES5 最优。
5. **ES6 class extends**，是寄生组合继承的语法糖，super 调用父构造，开发最常用。

尾递归，只有safari支持tco优化
function factorial(n, acc = 1) {
  if(n === 1) return acc
  return factorial(n - 1, n * acc) // 最后一步直接返回自身调用，尾递归
}

1. 前端如何处理超过 Number 最大值的数字？

Number 安全整数上限是 `2^53 - 1`（`Number.MAX_SAFE_INTEGER`），超过会丢精度。
- 后端把大数以**字符串**返回，这是最稳的方案。
- 前端用 `BigInt` 做运算，注意不能和 Number 混算，也不能直接 `JSON.stringify`。
- 必须解析原始 JSON 时，用 `json-bigint` 之类的库，避免 `JSON.parse` 先丢精度。

```js
console.log(9007199254740993)        // 9007199254740992，已丢精度
const a = 9007199254740993n          // BigInt 字面量
const b = BigInt('9007199254740993') // 从字符串转，安全
console.log(a + 1n)                  // 9007199254740994n
console.log(a.toString())            // 转字符串展示

// JSON.stringify 不支持 BigInt，需要自定义
JSON.stringify({ id: a }, (k, v) => (typeof v === 'bigint' ? v.toString() : v))
```

2. Canvas 如何判断一个点在图形内？

- 原生 API：先构造路径，再用 `ctx.isPointInPath(x, y)`（填充区域）或 `ctx.isPointInStroke(x, y)`（描边）判断。
- 手动数学判断：矩形比较边界，圆比较距离，多边形用射线法。
- 注意坐标要换算成 canvas 内部坐标，`clientX - rect.left`，高分屏还要乘缩放比。

```js
// 1. 原生 API
ctx.beginPath()
ctx.arc(100, 100, 50, 0, Math.PI * 2)
canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect()
  const x = (e.clientX - rect.left) * (canvas.width / rect.width)
  const y = (e.clientY - rect.top) * (canvas.height / rect.height)
  console.log(ctx.isPointInPath(x, y)) // 点在圆内为 true
})

// 2. 圆
const inCircle = (x, y, cx, cy, r) => (x - cx) ** 2 + (y - cy) ** 2 <= r * r

3. 前端发生错误时，如何定位到发生错误的元素？

- 资源加载错误（img、script、link）：`error` 事件不冒泡，要在**捕获阶段**监听，`e.target` 就是出错元素。
- 运行时 JS 错误：`window.onerror` 只给文件、行、列，没有元素。可以记录最近一次用户交互的 `event.target` 作为线索。
- Vue 3：`app.config.errorHandler` 的第二个参数是出错组件实例，`instance.$el` 即组件根元素。

​```js
// 1. 资源错误，必须捕获阶段
window.addEventListener(
  'error',
  (e) => {
    if (e.target !== window) {
      console.log('资源加载失败的元素：', e.target, e.target.src || e.target.href)
    }
  },
  true
)

// 2. 记录最近交互元素，辅助定位运行时错误
let lastTarget = null
document.addEventListener('click', (e) => (lastTarget = e.target), true)
window.addEventListener('error', (e) => {
  if (e.target === window) {
    console.log(e.message, e.filename, e.lineno, e.colno, '最近交互元素：', lastTarget)
  }
})

// 3. Vue 3
app.config.errorHandler = (err, instance, info) => {
  console.log('出错组件根元素：', instance?.$el, '来源：', info)
}
```

4. window.onerror 能不能捕获到 Promise 错误？

不能。未处理的 Promise reject 不会触发 `window.onerror`，要监听 `unhandledrejection`。
`window.onerror` 也抓不到资源加载错误和跨域脚本的详细信息（只显示 `Script error.`，需要 `crossorigin` 加 CORS 头）。

```js
window.onerror = (msg, src, line, col, err) => {
  console.log('同步错误', msg)
}
window.addEventListener('unhandledrejection', (e) => {
  console.log('Promise 错误', e.reason)
  e.preventDefault() // 阻止控制台默认报错
})

setTimeout(() => { throw new Error('a') })  // onerror 能抓到
Promise.reject(new Error('b'))              // 只有 unhandledrejection 能抓到
async function f() { throw new Error('c') }
f()                                         // 同上，async 函数返回 Promise
```

5. 如何对每个 js 函数的执行实行拦截？

```js
function wrapFunction(fn, hooks = {}) {
  return function (...args) {
    try {
      if (hooks.before) hooks.before(args, fn);
      const result = fn.apply(this, args);
      if (result instanceof Promise) {
        return result
          .then((res) => {
            if (hooks.after) hooks.after(res, args, fn);
            return res;
          })
          .catch((err) => {
            if (hooks.error) hooks.error(err, args, fn);
            throw err;
          });
      }
      if (hooks.after) hooks.after(result, args, fn);
      return result;
    } catch (err) {
      if (hooks.error) hooks.error(err, args, fn);
      throw err;
    }
  };
}

function traceFn(fn) {
  return new Proxy(fn, {
    apply(target, thisArg, args) {
      console.log('proxy拦截调用，入参：', args);
      try {
        const res = Reflect.apply(target, thisArg, args);
        if (res instanceof Promise) {
          return res.catch(e => {
            console.error('promise error', e);
            throw e;
          })
        }
        return res;
      } catch (e) {
        console.error('同步error', e);
        throw e;
      }
    }
  })
}

```

6. 基于 xml 发送 ajax 请求怎么实现？

使用 `XMLHttpRequest`：创建对象、`open`、设置请求头、`send`，再监听 `readyState` 或 `onload`。

```js
function ajax({ method = 'GET', url, data = null, timeout = 5000 }) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url, true) // true 为异步
    xhr.timeout = timeout
    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return // 4 表示请求完成
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText))
      } else {
        reject(new Error('请求失败：' + xhr.status))
      }
    }
    xhr.onerror = () => reject(new Error('网络错误'))
    xhr.ontimeout = () => reject(new Error('请求超时'))

    xhr.send(data ? JSON.stringify(data) : null)
  })
}

ajax({ method: 'POST', url: '/api/getMenu', data: { projectId: 1 } }).then(console.log)
```
7.js实现发布订阅模式
```js
class EventBus {
  constructor() {
    // 存储事件：key事件名，value 回调函数数组
    this.events = {};
  }

  // 订阅 on
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  // 发布触发 emit
  emit(eventName, ...args) {
    const callbacks = this.events[eventName];
    if (!callbacks) return;
    callbacks.forEach(fn => fn(...args));
  }

  // 取消订阅 off
  off(eventName, callback) {
    if (!this.events[eventName]) return;
    this.events[eventName] = this.events[eventName].filter(fn => fn !== callback);
  }

  // 只监听一次 once
  once(eventName, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(eventName, wrapper);
    };
    this.on(eventName, wrapper);
  }
}

// ===== 使用示例 =====
const bus = new EventBus();

// 订阅
function handleMsg(msg) {
  console.log('收到消息：', msg);
}
bus.on('message', handleMsg);

// 发布
bus.emit('message', 'hello pubsub');

// 一次性订阅
bus.once('onceEvent', (v) => console.log('只触发一次', v));
bus.emit('onceEvent', 111);
bus.emit('onceEvent', 222); // 不会执行

// 取消订阅
bus.off('message', handleMsg);
bus.emit('message', 'after off'); // 无输出
```

<meta name="viewport" content="width=device-width, initial-scale=1.0">
@media
