<script setup>
import { getProjectName, getUserName, getDevName } from '@/model/system'
import { reactive, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps(['projectId', 'mode'])
const state = reactive({
  titleName: '',
  userName: '',
  currentTime1: '',
  currentTime2: '',
  currentTime3: ''
})

let _timer = null

onMounted(() => {
  initData()
})

onBeforeUnmount(() => {
  clearTimeout(_timer)
})

watch(() => props.projectId, val => {
  if (props.mode === 'dev') {
    getDevName(val, res => { state.titleName = res })
  } else {
    getProjectName(val, res => { state.titleName = res })
  }
})

const initData = () => {
  if (props.mode === 'dev') {
    getDevName(props.projectId, res => { state.titleName = res })
  } else {
    getProjectName(props.projectId, res => { state.titleName = res })
  }
  getUserName(props.projectId, res => { state.userName = res })
  tick()
}

const tick = () => {
  const now  = new Date()
  const days = ['日', '一', '二', '三', '四', '五', '六']
  const pad  = n => String(n).padStart(2, '0')
  state.currentTime1 = now.toLocaleTimeString('zh-CN', { hour12: false })
  state.currentTime2 = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
  state.currentTime3 = '星期' + days[now.getDay()]
  _timer = setTimeout(tick, 1000)
}
</script>

<template>
  <header class="project-header">
    <!-- Left: title -->
    <div class="ph-left">
      <div class="ph-title-mark" aria-hidden="true"></div>
      <h1 class="ph-title">{{ state.titleName }}</h1>
    </div>

    <!-- Right: datetime + user -->
    <div class="ph-right" aria-live="polite" aria-atomic="true">
      <div class="ph-time">
        <span class="ph-hms">{{ state.currentTime1 }}</span>
        <span class="ph-sep" aria-hidden="true"></span>
        <span class="ph-date">{{ state.currentTime2 }}</span>
        <span class="ph-week">{{ state.currentTime3 }}</span>
      </div>
      <div class="ph-user" :title="state.userName">
        <div class="ph-avatar" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <span class="ph-username">{{ state.userName }}</span>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.project-header {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background: rgba(30, 41, 59, 0.55);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--glass-border);
  flex-shrink: 0;
}

/* Title */
.ph-left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.ph-title-mark {
  width: 3px;
  height: 20px;
  background: linear-gradient(to bottom, var(--color-primary), var(--color-violet));
  border-radius: var(--radius-full);
  flex-shrink: 0;
}

.ph-title {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: 0.06em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Right cluster */
.ph-right {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
}

.ph-time {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ph-hms {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-primary);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.04em;
}

.ph-sep {
  width: 1px;
  height: 18px;
  background: var(--color-divider);
}

.ph-date {
  font-family: var(--font-heading);
  font-size: 12px;
  color: var(--color-text-secondary);
  font-variant-numeric: tabular-nums;
}

.ph-week {
  font-size: 12px;
  color: var(--color-text-muted);
}

/* User chip */
.ph-user {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 4px 10px 4px 6px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-full);
}

.ph-avatar {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.20);
  border-radius: 50%;
  color: var(--color-primary);
}

.ph-username {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-secondary);
  white-space: nowrap;
}
</style>
