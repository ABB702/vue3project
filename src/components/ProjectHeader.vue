<script setup>
import { getProjectName, getUserName, getDevName } from '@/model/system'
import { ref, watch, reactive, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps(['projectId', 'mode'])
const state = reactive({
  titleName: '',
  userName: '',
  currentTime1: '',
  currentTime2: '',
  currentTime3: ''
})

onMounted(() => {
  initData()
})
onBeforeUnmount(() => {
  clearTimeout(updateTime)
})

watch(props.projectId, val => {
  getProjectName(val, res => {
    state.titleName = res
  })
})

const initData = () => {
  if (props.mode === 'dev') {
    getDevName(props.projectId, res => {
      state.titleName = res
    })
  } else {
    getProjectName(props.projectId, res => {
      state.titleName = res
    })
  }
  getUserName(props.projectId, res => {
    state.userName = res
  })
  clearTimeout(updateTime)
  updateTime()
}
const updateTime = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  const day = now
    .getDate()
    .toString()
    .padStart(2, '0')
  const days = ['日', '一', '二', '三', '四', '五', '六']
  state.currentTime1 = now.toLocaleTimeString()
  state.currentTime2 = `${year}-${month}-${day}`
  state.currentTime3 = '星期' + days[now.getDay()]
  setTimeout(updateTime, 1000)
}
</script>

<template>
  <div class="project-header-wrapper">
    <div class="blank"></div>
    <div class="project-title">{{state.titleName}}</div>
    <div class="basic-info">
      <div class="time-p1">{{state.currentTime1}}</div>
      <div class="time-p2">
        {{state.currentTime2}}
        <br />
        {{state.currentTime3}}
      </div>
      <div class="user-p1">{{state.userName}}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.project-header-wrapper {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--vt-c-content-bg);
}
.project-title {
  font-size: 3em;
  font-weight: 700;
  color: var(--vt-c-white);
}
.basic-info {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: var(--vt-c-white);
  margin-right: 30px;
  height: 50px;
  > div {
    height: 100%;
  }
  .time-p1 {
    font-size: 1.5em;
    padding-right: 10px;
    margin-right: 10px;
    border-right: 2px solid var(--vt-c-white-mute);
  }
  .time-p2 {
    font-size: 1.2em;
    padding-right: 10px;
    margin-right: 10px;
    border-right: 2px solid var(--vt-c-white-mute);
  }
  .user-p1 {
    font-size: 1.2em;
  }
}
</style>
