
<template>
  <div class="wrapper">
    <div class="menu-wrapper">
      <div
        class="menu-item"
        v-for="(item,index) in state.menuList"
        :key="index"
        @click="changeActive(index)"
      >
        <router-link :to="item.path">
          <div class="menu-unit" :class="{'menu-unit-active': index==state.activePage}">
            <span
              class="iconfont icon-xiaoxi-zhihui menu-sys-icon"
              v-show="index!=state.activePage"
            ></span>
            <span class="iconfont icon-xihuan menu-sys-icon" v-show="index==state.activePage"></span>
            <div class="menu-text">{{ item.name }}</div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="content-wrapper">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { reactive, onMounted, computed, getCurrentInstance } from 'vue'
import { getMenu } from '@/model/system'

const state = reactive({
  menuList: [],
  activePage: 0
})

onMounted(() => {
  init()
})
const ins = getCurrentInstance()
const init = async () => {
  // showLoadingToast({ message: '加载中...', forbidClick: true });
  const data = await getMenu({ userId: 1 }, res => {
    state.menuList = res
  })

  const handleGlobalEvent = menu => {
    state.activePage = 1
  }
  ins.proxy.$eventBus.on('router-change', handleGlobalEvent)
  // closeToast()
}

const changeActive = index => {
  console.log('feature-log-2', index)
  state.activePage = index
}
</script>>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-image: url('./images/bg.jpeg');
  background-size: cover;
}
.menu-wrapper {
  width: 100px;
  height: 300px;
  background: var(--vt-c-content2-bg);
  a {
    text-decoration: none;
  }
  .menu-item:first-child {
    margin-top: 10px;
  }
  .menu-item {
    width: 100%;
    height: 50px;
    margin-bottom: 10px;
    .menu-unit {
      color: var(--vt-c-white);
      background: var(--vt-c-content2-bg);
    }
    .menu-unit-active {
      color: var(--vt-c-red);
      background: var(--vt-c-content2-bg);
    }
  }
}
.content-wrapper {
  width: calc(100% - 100px);
  height: 100%;
  padding: 8px;
}
</style>
