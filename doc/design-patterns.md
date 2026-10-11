# 设计模式笔记

## 一、工厂模式

### 1. 简单工厂

根据参数决定创建哪种对象，适合类型少且稳定的场景。

```js
class Dog { speak() { return 'Woof' } }
class Cat { speak() { return 'Meow' } }

function createAnimal(type) {
    if (type === 'dog') return new Dog()
    if (type === 'cat') return new Cat()
    throw new Error('Unknown type')
}

const a = createAnimal('dog')
a.speak() // 'Woof'
```

**缺点**：每加一种类型都要改工厂函数，违反开闭原则。

---

### 2. 工厂方法

把"创建哪种对象"推迟到子类，父类只定义接口。扩展时只需新增子类，不改原有代码。

```js
class AnimalFactory {
    createAnimal() { throw new Error('implement me') }
    makeSound() {
        const animal = this.createAnimal()
        return animal.speak()
    }
}

class DogFactory extends AnimalFactory {
    createAnimal() { return new Dog() }
}

class CatFactory extends AnimalFactory {
    createAnimal() { return new Cat() }
}

new DogFactory().makeSound() // 'Woof'
new CatFactory().makeSound() // 'Meow'
```

---

### 3. 抽象工厂

创建一组相关对象（产品族），保证同族对象一起使用，切换时只换工厂。

```js
class DarkButton  { render() { return '■ Dark Button' } }
class DarkInput   { render() { return '▌ Dark Input'  } }
class LightButton { render() { return '□ Light Button' } }
class LightInput  { render() { return '▷ Light Input'  } }

class DarkThemeFactory {
    createButton() { return new DarkButton() }
    createInput()  { return new DarkInput()  }
}

class LightThemeFactory {
    createButton() { return new LightButton() }
    createInput()  { return new LightInput()  }
}

function buildUI(factory) {
    const btn = factory.createButton()
    const inp = factory.createInput()
    return `${btn.render()} + ${inp.render()}`
}

buildUI(new DarkThemeFactory())  // '■ Dark Button + ▌ Dark Input'
buildUI(new LightThemeFactory()) // '□ Light Button + ▷ Light Input'
```

---

### 三种工厂对比

| | 简单工厂 | 工厂方法 | 抽象工厂 |
|---|---|---|---|
| 创建对象种类 | 一种 | 一种 | 多种（产品族）|
| 扩展方式 | 改工厂函数 | 加子类 | 加工厂子类 |
| 复杂度 | 低 | 中 | 高 |
| 适用场景 | 类型少且稳定 | 单一产品扩展 | 多产品族切换 |

---

## 二、单例模式

### 方法1：模块导出（日常首选）

JS 模块天然单例，文件只执行一次。

```js
// store.js
class Store {
    constructor() { this.data = {} }
    set(key, val) { this.data[key] = val }
    get(key) { return this.data[key] }
}

export default new Store()
```

---

### 方法2：闭包缓存

```js
const createSingleton = (() => {
    let instance = null
    class Store {
        constructor() { this.data = {} }
    }
    return () => {
        if (!instance) instance = new Store()
        return instance
    }
})()

const s1 = createSingleton()
const s2 = createSingleton()
s1 === s2 // true
```

**Q：为什么要用 IIFE？不用立即执行，闭包还成立么？**

闭包还成立，但 `instance` 会被重置，单例失效。
`let instance = null` 是声明语句，每次调用外层函数都会执行这行，`instance` 就被重置一次。
IIFE 保证外层函数只执行一次，`instance` 只初始化一次，之后永久活在闭包里。

**Q：`createSingleton` 拿到的是 `instance` 还是内部函数？**

拿到的是内部函数 `() => { if (!instance) instance = new Store(); return instance }`。
IIFE 执行完 `return` 出来的是什么，`createSingleton` 就是什么。调用 `createSingleton()` 才返回实例。

**Q：加了 `destroy` 还是闭包么？**

还是闭包，而且是更典型的写法。闭包的判断标准只有一个：函数是否引用了外部作用域的变量，跟变量能不能被修改无关。

```js
const { getInstance, destroy } = (() => {
    let instance = null
    class Store { constructor() { this.data = {} } }
    return {
        getInstance: () => {
            if (!instance) instance = new Store()
            return instance
        },
        destroy: () => {
            instance = null  // 解除对 Store 实例的引用，GC 可回收实例
        }
    }
})()
```

**Q：调 `destroy` 可以释放内存么？**

部分释放：
- `instance` 指向的 Store 实例：`destroy` 后外部无引用则 GC 可回收 ✓
- 闭包作用域本身（变量槽 + 两个函数）：只要外部还持有 `getInstance`/`destroy`，就不会释放 ✗

`destroy` 的意义是重置单例状态，让下次 `getInstance()` 创建新实例，顺带允许旧实例被 GC。

---

### 方法3：静态方法

```js
class Store {
    static #instance = null

    constructor() {
        // 守卫：堵死直接 new 绕过单例的路
        if (Store.#instance) {
            throw new Error('请使用 Store.getInstance()')
        }
        // 关键：constructor 里自己赋值，防止绕过 getInstance 直接 new
        Store.#instance = this
        this.data = {}
    }

    static getInstance() {
        if (!Store.#instance) {
            Store.#instance = new Store()
        }
        return Store.#instance
    }
}

// 使用
const s1 = Store.getInstance()
const s2 = Store.getInstance()
s1 === s2   // true

new Store() // Error: 请使用 Store.getInstance()
```

**Q：`static` 和 `#` 分别是什么含义？**

- `static`：属性属于类本身，不属于实例。所有实例共享同一份，通过类名访问（`Store.#instance`）。对单例来说必须是 `static`，否则要先 `new` 才能拿到实例，根本拦不住。
- `#`：私有字段，类外部访问直接报语法错误（编译期报错，不是运行时）。防止外部篡改 `instance`，保证安全性。

两者缺一不可：`static` 保证唯一性，`#` 保证安全性。

**Q：为什么说方法3有隐患？没调 `getInstance` 怎么会创建新实例？**

因为 `Store` 类是公开的，任何人都可以直接 `new Store()` 绕过 `getInstance`，语法上完全合法，JS 不会阻止。加构造函数守卫就是把"要用 `getInstance`"这个隐性约定变成强制报错。

**Q：守卫只在 `#instance` 非 null 时才报错，那没调过 `getInstance` 直接 `new` 两次会怎样？**

如果 constructor 里不自己给 `#instance` 赋值，直接 `new` 永远不会更新 `#instance`，它一直是 `null`，守卫永远不触发，单例被破坏。所以必须在 constructor 里加 `Store.#instance = this`，第一次 `new` 执行完后 `#instance` 就有值了，第二次再 `new` 守卫才能拦住。

---

### 四种单例对比

| 写法 | 适用场景 |
|---|---|
| 模块导出实例 | 日常首选，简单直接 |
| 闭包缓存 | 需要懒加载，不想暴露类本身 |
| 静态方法 | 面向对象风格，需要显式控制 |
| Proxy 拦截 | 希望保留 `new` 语法又强制单例 |
