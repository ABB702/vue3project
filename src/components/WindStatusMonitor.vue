<script setup>
import { getWindStatus } from '@/model/system'
import { reactive, onMounted, onBeforeUnmount, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { debounce } from 'lodash'

const ins = getCurrentInstance()
const router = useRouter()

const props = defineProps({ projectId: { type: String, required: true } })

const CACHE_CARD = 12
const TIME_WAIT  = 1000

const STATUS_MAP = {
  0: { cls: 'status--ready',   label: '准备启动' },
  1: { cls: 'status--fault',   label: '故障停机' },
  2: { cls: 'status--running', label: '正常运行' }
}

const state = reactive({
  windList: [],
  curMode: 'card',
  viewStartIndex: 0,
  viewEndIndex: 20,
  timer: null
})

onMounted(() => {
  clearTimeout(state.timer)
  updateData()
})

onBeforeUnmount(() => clearTimeout(state.timer))

const initData = debounce((val, refresh = true, s = 0, e = 20) => {
  if (state.viewStartIndex !== s) state.viewStartIndex = s
  if (state.viewEndIndex !== e)   state.viewEndIndex   = e
  if (refresh) {
    getWindStatus(val, s, e, res => { state.windList = res })
  } else {
    getWindStatus(val, s, e, res => { state.windList.splice(s, res.length, ...res) })
  }
}, 100)

const updateData = () => {
  initData(props.projectId, false, state.viewStartIndex, state.viewEndIndex)
  state.timer = setTimeout(updateData, TIME_WAIT)
}

const changeMode = mode => {
  if (state.curMode === mode) return
  state.curMode = mode
  initData(props.projectId, true, 0, 20)
}

const handleScroll = el => {
  let viewStartIndex = Math.floor(el.scrollTop / 130) * 3
  let viewEndIndex   = viewStartIndex + CACHE_CARD
  viewStartIndex = viewStartIndex - 3 > 0 ? viewStartIndex - 3 : 0
  viewEndIndex   = viewEndIndex + CACHE_CARD
  initData(props.projectId, false, viewStartIndex, viewEndIndex)
}

const go2dev = devId => {
  ins.proxy.$eventBus.emit('router-change', 'about')
  router.push({ name: 'about', params: { devId: devId } })
}

const getStatus = status => STATUS_MAP[status] ?? { cls: 'status--offline', label: '离线' }
</script>

<template>
  <section class="wind-status-monitor" aria-label="风机状态监视">
    <!-- Header -->
    <header class="wsm-header">
      <h2 class="section-heading">风机状态监视</h2>
      <div class="wsm-modes" role="group" aria-label="显示模式切换">
        <button
          class="mode-btn"
          :class="{ 'mode-btn--active': state.curMode === 'card' }"
          :aria-pressed="state.curMode === 'card'"
          @click="changeMode('card')"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
          </svg>
          矩阵
        </button>
        <button
          class="mode-btn"
          :class="{ 'mode-btn--active': state.curMode === 'list' }"
          :aria-pressed="state.curMode === 'list'"
          @click="changeMode('list')"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
            <line x1="8" y1="18" x2="21" y2="18"/>
            <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/>
            <line x1="3" y1="18" x2="3.01" y2="18"/>
          </svg>
          列表
        </button>
      </div>
    </header>

    <!-- Card mode -->
    <div v-if="state.curMode === 'card'" class="wsm-body">
      <el-scrollbar height="490px" @scroll="handleScroll">
        <div class="card-grid">
          <article
            v-for="(item, index) in state.windList"
            :key="index"
            class="turbine-card"
            role="button"
            :aria-label="`${item.name}，${getStatus(item.status).label}，风速${item.speed}，点击查看详情`"
            tabindex="0"
            @click="go2dev(item.devId)"
            @keydown.enter="go2dev(item.devId)"
            @keydown.space.prevent="go2dev(item.devId)"
          >
            <!-- Card header -->
            <div class="tc-head">
              <span class="tc-name">{{ item.name }}</span>
              <span
                class="tc-status"
                :class="getStatus(item.status).cls"
                aria-label="运行状态"
              >{{ getStatus(item.status).label }}</span>
            </div>

            <!-- Wind icon + speed -->
            <div class="tc-main">
              <div class="tc-icon-wrap" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="2"/><path d="M12 10V4"/>
                  <path d="M14.2 13.1L19 10"/><path d="M9.8 13.1L5 10"/>
                  <path d="M12 14v6"/>
                </svg>
                <span class="tc-speed">{{ item.speed }}</span>
              </div>

              <div class="tc-metrics">
                <div class="tc-metric">
                  <span class="tc-m-label">有功</span>
                  <span class="tc-m-val">{{ item.activePower }}</span>
                </div>
                <div class="tc-metric">
                  <span class="tc-m-label">无功</span>
                  <span class="tc-m-val">{{ item.reactivePower }}</span>
                </div>
                <div class="tc-metric">
                  <span class="tc-m-label">型号</span>
                  <span class="tc-m-val tc-m-val--dim">{{ item.type }}</span>
                </div>
              </div>
            </div>
          </article>
          <!-- Spacers for flex alignment -->
          <div class="tc-spacer" aria-hidden="true"></div>
          <div class="tc-spacer" aria-hidden="true"></div>
          <div class="tc-spacer" aria-hidden="true"></div>
        </div>
      </el-scrollbar>
    </div>

    <!-- List mode -->
    <div v-if="state.curMode === 'list'" class="wsm-body">
      <el-scrollbar height="490px" @scroll="handleScroll">
        <div class="list-wrap">
          <!-- Table head -->
          <div class="list-head" aria-hidden="true">
            <span class="lh-col lh-col--name">机组名称</span>
            <span class="lh-col">状态</span>
            <span class="lh-col">风速</span>
            <span class="lh-col">有功功率</span>
            <span class="lh-col">无功功率</span>
            <span class="lh-col">型号</span>
          </div>

          <div
            v-for="(item, index) in state.windList"
            :key="index"
            class="list-row"
            role="button"
            :aria-label="`${item.name}，${getStatus(item.status).label}`"
            tabindex="0"
            @click="go2dev(item.devId)"
            @keydown.enter="go2dev(item.devId)"
            @keydown.space.prevent="go2dev(item.devId)"
          >
            <span class="lh-col lh-col--name">
              <span class="lr-pip" :class="getStatus(item.status).cls.replace('status--', 'pip--')" aria-hidden="true"></span>
              {{ item.name }}
            </span>
            <span class="lh-col">
              <span class="lr-badge" :class="getStatus(item.status).cls">{{ getStatus(item.status).label }}</span>
            </span>
            <span class="lh-col lr-val">{{ item.speed }}</span>
            <span class="lh-col lr-val">{{ item.activePower }}</span>
            <span class="lh-col lr-val">{{ item.reactivePower }}</span>
            <span class="lh-col lr-dim">{{ item.type }}</span>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.wind-status-monitor {
  padding: 12px 14px;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
}

/* ── Header ── */
.wsm-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.wsm-modes {
  display: flex;
  gap: 4px;
}

.mode-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  font-family: var(--font-body);
  font-size: 11px;
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background: var(--glass-bg-hover);
    color: var(--color-text-secondary);
  }

  &--active {
    background: rgba(56, 189, 248, 0.10);
    border-color: rgba(56, 189, 248, 0.30);
    color: var(--color-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
}

/* ── Body ── */
.wsm-body {
  :deep(.el-scrollbar__wrap) {
    padding-right: 4px;
  }
}

/* ── Card grid ── */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 2px;
}

.tc-spacer {
  width: 148px;
  height: 0;
}

/* ── Turbine card ── */
.turbine-card {
  width: 148px;
  padding: 8px 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background: var(--glass-bg-hover);
    border-color: rgba(56, 189, 248, 0.22);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
}

.tc-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.tc-name {
  font-family: var(--font-heading);
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  min-width: 0;
  margin-right: 4px;
}

.tc-status {
  font-size: 9px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: var(--radius-full);
  white-space: nowrap;
  flex-shrink: 0;
}

.tc-main {
  display: flex;
  align-items: center;
  gap: 6px;
}

.tc-icon-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  color: var(--color-primary);
  flex-shrink: 0;
}

.tc-speed {
  font-family: var(--font-heading);
  font-size: 9px;
  color: var(--color-text-muted);
  white-space: nowrap;
}

.tc-metrics {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.tc-metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
}

.tc-m-label {
  font-size: 9px;
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.tc-m-val {
  font-family: var(--font-heading);
  font-size: 10px;
  color: var(--color-text-secondary);
  font-variant-numeric: tabular-nums;

  &--dim { color: var(--color-text-muted); font-family: var(--font-body); }
}

/* ── Status classes ── */
.status--ready {
  background: rgba(56, 189, 248, 0.12);
  color: var(--color-primary);
  border: 1px solid rgba(56, 189, 248, 0.20);
}

.status--running {
  background: rgba(74, 222, 128, 0.12);
  color: var(--color-online);
  border: 1px solid rgba(74, 222, 128, 0.20);
}

.status--fault {
  background: rgba(248, 113, 113, 0.12);
  color: var(--color-error);
  border: 1px solid rgba(248, 113, 113, 0.20);
}

.status--offline {
  background: rgba(71, 85, 105, 0.20);
  color: var(--color-text-muted);
  border: 1px solid rgba(71, 85, 105, 0.25);
}

/* ── List view ── */
.list-wrap {
  padding: 2px;
}

.list-head {
  display: flex;
  align-items: center;
  padding: 6px 10px;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  border-bottom: 1px solid var(--color-border-subtle);
  margin-bottom: 4px;
}

.list-row {
  display: flex;
  align-items: center;
  padding: 7px 10px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background var(--transition-fast);

  &:hover {
    background: rgba(56, 189, 248, 0.05);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: -2px;
  }

  + .list-row {
    border-top: 1px solid var(--color-divider);
  }
}

.lh-col {
  flex: 1;
  font-size: 11px;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  gap: 5px;
  min-width: 0;

  &--name {
    flex: 1.5;
  }
}

.lr-pip {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;

  &.pip--ready   { background: var(--color-primary); }
  &.pip--running { background: var(--color-online); }
  &.pip--fault   { background: var(--color-error); }
  &.pip--offline { background: var(--color-text-muted); }
}

.lr-badge {
  font-size: 9px;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: var(--radius-full);
}

.lr-val {
  font-family: var(--font-heading);
  font-variant-numeric: tabular-nums;
  color: var(--color-text-secondary);
}

.lr-dim {
  color: var(--color-text-muted);
  font-size: 10px;
}
</style>
