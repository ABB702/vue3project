<script setup>
import { reactive, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const state = reactive({
  currentTime: '',
  currentDate: '',
  currentWeek: '',
  stats: {
    totalProjects: 4,
    onlineDevices: 18,
    totalPower: '128.6',
    todayElect: '3128.4'
  },
  projects: [
    {
      id: '0',
      name: '北方草原风电场',
      location: '内蒙古 · 锡林郭勒',
      status: 'online',
      devices: 5,
      activePower: '32.4',
      windSpeed: '8.2',
      availability: '98.5'
    },
    {
      id: '1',
      name: '东海近海风电场',
      location: '江苏 · 盐城',
      status: 'online',
      devices: 8,
      activePower: '58.7',
      windSpeed: '11.3',
      availability: '96.2'
    },
    {
      id: '2',
      name: '西部山地风电场',
      location: '甘肃 · 酒泉',
      status: 'warning',
      devices: 3,
      activePower: '21.1',
      windSpeed: '6.7',
      availability: '87.4'
    },
    {
      id: '3',
      name: '南部沿海风电场',
      location: '广东 · 汕头',
      status: 'online',
      devices: 6,
      activePower: '16.4',
      windSpeed: '9.5',
      availability: '94.1'
    }
  ],
  alarms: [
    { level: 'warning', content: '北方草原风电场 #03号机组风速过高预警', time: '09:42:13' },
    { level: 'info',    content: '东海近海风电场 例行数据同步完成',        time: '09:38:05' },
    { level: 'error',   content: '西部山地风电场 #02号机组通信中断',        time: '09:31:22' },
    { level: 'info',    content: '南部沿海风电场 日发电量超预期 +12%',      time: '09:15:48' }
  ]
})

let timer = null

const updateTime = () => {
  const now  = new Date()
  const days = ['日', '一', '二', '三', '四', '五', '六']
  state.currentTime = now.toLocaleTimeString('zh-CN', { hour12: false })
  state.currentDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  state.currentWeek = '星期' + days[now.getDay()]
}

const goToProject = id => router.push({ path: '/', query: { projectId: id } })

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <div class="dashboard">
    <!-- ── Header ── -->
    <header class="dash-header">
      <div class="header-left">
        <div class="header-logo" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="2"/>
            <path d="M12 10V4"/><path d="M14.2 13.1L19 10"/><path d="M9.8 13.1L5 10"/>
            <path d="M12 14v6"/>
          </svg>
        </div>
        <div>
          <h1 class="header-title">风力发电综合监控平台</h1>
          <p class="header-subtitle">Wind Power Generation Monitoring System</p>
        </div>
        <!-- Live indicator -->
        <div class="live-badge" aria-label="数据实时更新中">
          <span class="live-dot" aria-hidden="true"></span>
          <span>LIVE</span>
        </div>
      </div>

      <div class="header-right">
        <div class="time-display" aria-live="polite" aria-atomic="true">
          <span class="time-hms">{{ state.currentTime }}</span>
          <span class="time-date">{{ state.currentDate }} &nbsp; {{ state.currentWeek }}</span>
        </div>
      </div>
    </header>

    <!-- ── KPI row ── -->
    <section class="kpi-row" aria-label="关键指标">
      <article class="kpi-card" aria-label="风场总数">
        <div class="kpi-icon kpi-icon--blue" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </div>
        <div class="kpi-body">
          <div class="kpi-value">{{ state.stats.totalProjects }}</div>
          <div class="kpi-label">风场总数</div>
        </div>
        <div class="kpi-trend kpi-trend--neutral">—</div>
      </article>

      <article class="kpi-card" aria-label="在线机组">
        <div class="kpi-icon kpi-icon--green" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="2"/><path d="M12 10V4"/>
            <path d="M14.2 13.1L19 10"/><path d="M9.8 13.1L5 10"/>
            <path d="M12 14v6"/>
          </svg>
        </div>
        <div class="kpi-body">
          <div class="kpi-value kpi-value--green">{{ state.stats.onlineDevices }}</div>
          <div class="kpi-label">在线机组</div>
        </div>
        <div class="kpi-trend kpi-trend--up">↑ 2</div>
      </article>

      <article class="kpi-card" aria-label="当前总功率">
        <div class="kpi-icon kpi-icon--sky" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
        </div>
        <div class="kpi-body">
          <div class="kpi-value">{{ state.stats.totalPower }}<span class="kpi-unit">MW</span></div>
          <div class="kpi-label">当前总功率</div>
        </div>
        <div class="kpi-trend kpi-trend--up">↑ 4.2%</div>
      </article>

      <article class="kpi-card" aria-label="今日发电量">
        <div class="kpi-icon kpi-icon--amber" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2v10M12 22v-2M4.93 4.93l1.41 1.41M19.07 4.93l-1.41 1.41M2 12h2M22 12h-2M4.93 19.07l1.41-1.41M19.07 19.07l-1.41-1.41"/>
            <circle cx="12" cy="12" r="4"/>
          </svg>
        </div>
        <div class="kpi-body">
          <div class="kpi-value">{{ state.stats.todayElect }}<span class="kpi-unit">kWh</span></div>
          <div class="kpi-label">今日发电量</div>
        </div>
        <div class="kpi-trend kpi-trend--up">↑ 12%</div>
      </article>
    </section>

    <!-- ── Main grid ── -->
    <div class="dash-body">
      <!-- Projects panel -->
      <section class="panel panel--projects" aria-label="风场项目列表">
        <header class="panel-header">
          <h2 class="section-heading">
            <span aria-hidden="true"></span>
            风场项目列表
          </h2>
          <span class="panel-count">{{ state.projects.length }} 个风场</span>
        </header>

        <div class="project-grid">
          <article
            v-for="proj in state.projects"
            :key="proj.id"
            class="project-card"
            :class="{ 'project-card--warning': proj.status === 'warning' }"
            role="button"
            :aria-label="`${proj.name}，${proj.status === 'online' ? '状态正常' : '存在告警'}，点击进入监控`"
            tabindex="0"
            @click="goToProject(proj.id)"
            @keydown.enter="goToProject(proj.id)"
            @keydown.space.prevent="goToProject(proj.id)"
          >
            <!-- Card top -->
            <div class="pc-top">
              <div class="pc-name-row">
                <span
                  class="status-pip"
                  :class="proj.status === 'online' ? 'status-pip--online' : 'status-pip--warning'"
                  :aria-label="proj.status === 'online' ? '在线' : '告警'"
                ></span>
                <span class="pc-name">{{ proj.name }}</span>
              </div>
              <span
                class="status-badge"
                :class="proj.status === 'online' ? 'status-badge--online' : 'status-badge--warning'"
                aria-hidden="true"
              >
                {{ proj.status === 'online' ? '正常' : '告警' }}
              </span>
            </div>

            <!-- Location -->
            <div class="pc-location" aria-hidden="true">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              {{ proj.location }}
            </div>

            <!-- Metrics -->
            <div class="pc-metrics" aria-label="监控指标">
              <div class="pm">
                <div class="pm-val">{{ proj.devices }}</div>
                <div class="pm-label">机组数</div>
              </div>
              <div class="pm-sep" aria-hidden="true"></div>
              <div class="pm">
                <div class="pm-val">{{ proj.activePower }}<span class="pm-unit">MW</span></div>
                <div class="pm-label">有功功率</div>
              </div>
              <div class="pm-sep" aria-hidden="true"></div>
              <div class="pm">
                <div class="pm-val">{{ proj.windSpeed }}<span class="pm-unit">m/s</span></div>
                <div class="pm-label">平均风速</div>
              </div>
              <div class="pm-sep" aria-hidden="true"></div>
              <div class="pm">
                <div class="pm-val">{{ proj.availability }}<span class="pm-unit">%</span></div>
                <div class="pm-label">可利用率</div>
              </div>
            </div>

            <!-- CTA -->
            <div class="pc-cta" aria-hidden="true">
              <span>进入监控</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>

            <!-- Hover glow -->
            <div class="pc-glow" aria-hidden="true"></div>
          </article>
        </div>
      </section>

      <!-- Right sidebar -->
      <aside class="sidebar-panel" aria-label="告警与快速入口">
        <!-- Alarm list -->
        <section aria-label="实时告警">
          <h2 class="section-heading">实时告警</h2>
          <div
            class="alarm-list"
            role="log"
            aria-live="polite"
            aria-atomic="false"
            aria-label="告警消息列表"
          >
            <div
              v-for="(alarm, idx) in state.alarms"
              :key="idx"
              class="alarm-item"
              :class="`alarm-item--${alarm.level}`"
              role="listitem"
            >
              <div class="alarm-pip" :class="`alarm-pip--${alarm.level}`" aria-hidden="true"></div>
              <div class="alarm-body">
                <p class="alarm-text">{{ alarm.content }}</p>
                <time class="alarm-time">{{ alarm.time }}</time>
              </div>
            </div>
          </div>
        </section>

        <!-- Quick nav -->
        <section aria-label="快速入口" style="margin-top: 20px;">
          <h2 class="section-heading">快速入口</h2>
          <nav class="quick-nav" aria-label="功能快速跳转">
            <router-link to="/" class="quick-btn">
              <span class="qb-icon" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="2"/><path d="M12 10V4"/>
                  <path d="M14.2 13.1L19 10"/><path d="M9.8 13.1L5 10"/><path d="M12 14v6"/>
                </svg>
              </span>
              <span>风场监视</span>
              <svg class="qb-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </router-link>
            <router-link to="/about" class="quick-btn">
              <span class="qb-icon" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2"/>
                  <path d="M8 21h8"/><path d="M12 17v4"/>
                  <path d="M7 8h4"/><path d="M7 11h4"/><path d="M13 8h4v4h-4z"/>
                </svg>
              </span>
              <span>风机监视</span>
              <svg class="qb-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </router-link>
          </nav>
        </section>
      </aside>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* ── Dashboard shell ── */
.dashboard {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px 16px;
  overflow-y: auto;
  overflow-x: hidden;
}

/* ── Header ── */
.dash-header {
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 64px;
  background: rgba(30, 41, 59, 0.60);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-logo {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(139, 92, 246, 0.15));
  border: 1px solid rgba(56, 189, 248, 0.25);
  border-radius: var(--radius-md);
  color: var(--color-primary);
  flex-shrink: 0;
}

.header-title {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: 0.08em;
  line-height: 1.2;
}

.header-subtitle {
  font-size: 10px;
  color: var(--color-text-muted);
  letter-spacing: 0.06em;
  margin-top: 1px;
}

.live-badge {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 3px 8px;
  background: rgba(34, 197, 94, 0.10);
  border: 1px solid rgba(34, 197, 94, 0.25);
  border-radius: var(--radius-full);
  font-family: var(--font-heading);
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: var(--color-accent);
}

.live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
  animation: pulse-dot 2s ease-in-out infinite;
}

.header-right {
  text-align: right;
}

.time-display {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.time-hms {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: 0.05em;
  font-variant-numeric: tabular-nums;
  line-height: 1.1;
}

.time-date {
  font-size: 11px;
  color: var(--color-text-muted);
  letter-spacing: 0.04em;
}

/* ── KPI row ── */
.kpi-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  flex-shrink: 0;
}

.kpi-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  transition: background var(--transition-fast), border-color var(--transition-fast), transform var(--transition-fast);
  cursor: default;

  &:hover {
    background: var(--glass-bg-hover);
    border-color: rgba(56, 189, 248, 0.18);
    transform: translateY(-1px);
  }
}

.kpi-icon {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  flex-shrink: 0;

  &--blue  { background: rgba(56, 189, 248, 0.12);  color: var(--color-primary);  border: 1px solid rgba(56, 189, 248, 0.20); }
  &--green { background: rgba(74, 222, 128, 0.12);  color: var(--color-online);   border: 1px solid rgba(74, 222, 128, 0.20); }
  &--sky   { background: rgba(34, 211, 238, 0.12);  color: var(--cyan-400);       border: 1px solid rgba(34, 211, 238, 0.20); }
  &--amber { background: rgba(251, 191, 36, 0.12);  color: var(--color-warning);  border: 1px solid rgba(251, 191, 36, 0.20); }
}

.kpi-body {
  flex: 1;
  min-width: 0;
}

.kpi-value {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1;
  font-variant-numeric: tabular-nums;

  &--green { color: var(--color-online); }
}

.kpi-unit {
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 400;
  color: var(--color-text-muted);
  margin-left: 3px;
}

.kpi-label {
  font-size: 11px;
  color: var(--color-text-muted);
  margin-top: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.kpi-trend {
  font-family: var(--font-heading);
  font-size: 10px;
  font-weight: 500;
  padding: 2px 6px;
  border-radius: var(--radius-full);
  flex-shrink: 0;

  &--up      { color: var(--color-accent);  background: rgba(34, 197, 94, 0.12); }
  &--down    { color: var(--color-error);   background: rgba(248, 113, 113, 0.12); }
  &--neutral { color: var(--color-text-muted); background: transparent; }
}

/* ── Dashboard body ── */
.dash-body {
  flex: 1;
  display: flex;
  gap: 12px;
  min-height: 0;
  overflow: hidden;
}

/* ── Projects panel ── */
.panel--projects {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  flex-shrink: 0;
}

.panel-count {
  font-size: 11px;
  color: var(--color-text-muted);
  font-family: var(--font-heading);
  letter-spacing: 0.05em;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  overflow-y: auto;
  padding-bottom: 4px;
}

/* ── Project card ── */
.project-card {
  position: relative;
  overflow: hidden;
  padding: 14px 16px;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  cursor: pointer;
  transition: background var(--transition-base), border-color var(--transition-base), transform var(--transition-base), box-shadow var(--transition-base);

  &:hover {
    background: var(--glass-bg-hover);
    border-color: rgba(56, 189, 248, 0.30);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.50), 0 0 0 1px rgba(56, 189, 248, 0.12);

    .pc-glow {
      opacity: 1;
    }

    .pc-cta {
      color: var(--color-primary);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  &--warning {
    border-color: rgba(251, 191, 36, 0.25);

    &:hover {
      border-color: rgba(251, 191, 36, 0.45);
    }
  }
}

/* Hover background glow */
.pc-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(56, 189, 248, 0.06) 0%, transparent 70%);
  pointer-events: none;
  opacity: 0;
  transition: opacity var(--transition-base);
}

.pc-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.pc-name-row {
  display: flex;
  align-items: center;
  gap: 7px;
}

.status-pip {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;

  &--online {
    background: var(--color-online);
    box-shadow: 0 0 6px var(--color-online-glow);
    animation: pulse-online 3s ease-in-out infinite;
  }

  &--warning {
    background: var(--color-warning);
    box-shadow: 0 0 6px var(--color-warning-glow);
    animation: pulse-warning 1.5s ease-in-out infinite;
  }
}

.pc-name {
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status-badge {
  font-family: var(--font-heading);
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.08em;
  padding: 2px 7px;
  border-radius: var(--radius-full);
  flex-shrink: 0;

  &--online {
    background: rgba(74, 222, 128, 0.12);
    color: var(--color-online);
    border: 1px solid rgba(74, 222, 128, 0.25);
  }

  &--warning {
    background: rgba(251, 191, 36, 0.12);
    color: var(--color-warning);
    border: 1px solid rgba(251, 191, 36, 0.25);
  }
}

.pc-location {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--color-text-muted);
  margin-bottom: 12px;
}

/* Metrics row */
.pc-metrics {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.pm {
  flex: 1;
  text-align: center;

  .pm-val {
    font-family: var(--font-heading);
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-primary);
    line-height: 1.1;
    font-variant-numeric: tabular-nums;
  }

  .pm-unit {
    font-family: var(--font-body);
    font-size: 9px;
    font-weight: 400;
    color: var(--color-text-muted);
    margin-left: 1px;
  }

  .pm-label {
    font-size: 10px;
    color: var(--color-text-muted);
    margin-top: 2px;
    white-space: nowrap;
  }
}

.pm-sep {
  width: 1px;
  height: 28px;
  background: var(--color-divider);
  flex-shrink: 0;
}

/* Enter CTA */
.pc-cta {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  font-size: 11px;
  color: var(--color-text-muted);
  transition: color var(--transition-fast);
}

/* ── Right sidebar ── */
.sidebar-panel {
  width: 260px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

/* ── Alarms ── */
.alarm-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.alarm-item {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  padding: 10px 12px;
  background: var(--glass-bg);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  transition: background var(--transition-fast);

  &:hover {
    background: var(--glass-bg-hover);
  }

  &--warning { border-left: 2px solid var(--color-warning); }
  &--error   { border-left: 2px solid var(--color-error); }
  &--info    { border-left: 2px solid var(--color-info); }
}

.alarm-pip {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-top: 4px;
  flex-shrink: 0;

  &--warning { background: var(--color-warning); box-shadow: 0 0 5px var(--color-warning-glow); }
  &--error   { background: var(--color-error);   box-shadow: 0 0 5px var(--color-error-glow); }
  &--info    { background: var(--color-info);    box-shadow: 0 0 5px var(--color-info-glow); }
}

.alarm-body {
  flex: 1;
  min-width: 0;
}

.alarm-text {
  font-size: 11px;
  color: var(--color-text-secondary);
  line-height: 1.45;
  word-break: break-all;
}

.alarm-time {
  display: block;
  font-family: var(--font-heading);
  font-size: 10px;
  color: var(--color-text-muted);
  margin-top: 3px;
  font-variant-numeric: tabular-nums;
}

/* ── Quick nav ── */
.quick-nav {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.quick-btn {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 11px 14px;
  background: var(--glass-bg);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: 12px;
  font-weight: 500;
  transition: all var(--transition-fast);
  cursor: pointer;

  &:hover {
    background: rgba(56, 189, 248, 0.08);
    border-color: rgba(56, 189, 248, 0.25);
    color: var(--color-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  .qb-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-sm);
    color: var(--color-text-muted);
    flex-shrink: 0;
    transition: color var(--transition-fast), border-color var(--transition-fast);
  }

  &:hover .qb-icon {
    color: var(--color-primary);
    border-color: rgba(56, 189, 248, 0.30);
  }

  .qb-arrow {
    margin-left: auto;
    color: var(--color-text-muted);
    transition: transform var(--transition-fast), color var(--transition-fast);
  }

  &:hover .qb-arrow {
    transform: translateX(2px);
    color: var(--color-primary);
  }
}

/* ── Animations ── */
@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.6; transform: scale(1.3); }
}

@keyframes pulse-online {
  0%, 100% { box-shadow: 0 0 6px var(--color-online-glow); }
  50%       { box-shadow: 0 0 10px rgba(74, 222, 128, 0.50); }
}

@keyframes pulse-warning {
  0%, 100% { opacity: 1; box-shadow: 0 0 6px var(--color-warning-glow); }
  50%       { opacity: 0.5; box-shadow: 0 0 3px var(--color-warning-glow); }
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .live-dot,
  .status-pip--online,
  .status-pip--warning {
    animation: none;
  }

  .project-card,
  .kpi-card,
  .quick-btn,
  .alarm-item {
    transition: none;
  }
}
</style>
