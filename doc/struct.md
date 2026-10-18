数据响应式
vue2 getset
vue3 ref reactive
什么时候丢失响应式
解构和assign配合

布局响应式
viewport元标签
flex布局
rem、vw

computed 如何实现缓存 (依赖脏检查、lazy effect)

为什么 Vue 3 用 Reflect(对象 getter 里面的 this 指向代理对象,配合 receiver

vue23区别
响应式、diff、组合式选项式、ts重写、treeshaking、根节点、v-model数量
Vue3 用 ES Module 重构，**API 全部拆成独立导出，未用到的 API 打包会被删掉；Vue2 不支持 tree-shaking**。

手写promiseall
如果allsettled，不reject，finally统一reslove
```
function myPromiseAll(promises) {
    return new Promise((resolve, reject) => {
        let arr = Array.from(promises)
        if (!arr.length) return resolve([])
        let cnt = 0
        let res = Array(arr.length)
        arr.forEach((p,index)=> {
            Promise.resolve(p).then(val => {
                res[index] = val
                cnt++
                if (cnt === arr.length) resolve(res)
            }).catch(err=> {
                reject(err)
            })
        })
    })
}
```