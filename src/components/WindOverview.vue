<script setup>
import { getWindOverviewInfo } from '@/model/system'
import { reactive, onMounted, watch } from 'vue'

const props = defineProps({
  projectId: { type: String, required: true }
})

const state = reactive({
  windInfo: {
    averageWind: '', noErrorTime: '', errorTimes: '',
    installCapacity: '', activePower: '', reactivePower: '',
    totalActivePower: '', energyAvailability: '', timeAvailability: '',
    totalElectricity: '', dayElect: '', monthElect: '', yearElect: ''
  }
})

onMounted(() => initData(props.projectId))
watch(() => props.projectId, val => initData(val))

const initData = val => { state.windInfo = getWindOverviewInfo(val) }
</script>

<template>
  <section class="wind-overview" aria-label="风场概况数据">
    <!-- Section header -->
    <header class="wo-header">
      <h2 class="section-heading">{{ $t('windOverview.overview') }}</h2>
      <div class="wo-status" role="status" aria-live="polite" aria-atomic="true">
        <span class="wo-status-dot" aria-hidden="true"></span>
        <span>{{ $t('windOverview.status') }}</span>
        <strong class="wo-status-val">{{ $t('windOverview.online') }}</strong>
      </div>
    </header>

    <!-- Metrics grid -->
    <div class="wo-grid">
      <!-- Group A: operational metrics (with icon) -->
      <div class="wo-item wo-item--featured" aria-label="平均风速">
        <div class="wo-icon wo-icon--sky" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
          </svg>
        </div>
        <div class="wo-data">
          <span class="wo-val">{{ state.windInfo.averageWind }}<span class="wo-unit">m/s</span></span>
          <span class="wo-label">{{ $t('windOverview.averageSpeed') }}</span>
        </div>
      </div>

      <div class="wo-item wo-item--featured" aria-label="无故障运行时长">
        <div class="wo-icon wo-icon--green" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
        </div>
        <div class="wo-data">
          <span class="wo-val">{{ state.windInfo.noErrorTime }}<span class="wo-unit">h</span></span>
          <span class="wo-label">{{ $t('windOverview.noErrTime') }}</span>
        </div>
      </div>

      <div class="wo-item wo-item--featured" aria-label="故障次数">
        <div class="wo-icon wo-icon--red" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>
        <div class="wo-data">
          <span class="wo-val">{{ state.windInfo.errorTimes }}</span>
          <span class="wo-label">{{ $t('windOverview.errTimes') }}</span>
        </div>
      </div>

      <!-- Divider -->
      <div class="wo-divider" aria-hidden="true"></div>

      <!-- Group B: power metrics -->
      <div class="wo-item" aria-label="装机容量">
        <span class="wo-val">{{ state.windInfo.installCapacity }}<span class="wo-unit">MW</span></span>
        <span class="wo-label">{{ $t('windOverview.installCapacity') }}</span>
      </div>

      <div class="wo-item" aria-label="有功功率">
        <span class="wo-val">{{ state.windInfo.activePower }}<span class="wo-unit">kW</span></span>
        <span class="wo-label">{{ $t('windOverview.activePower') }}</span>
      </div>

      <div class="wo-item" aria-label="无功功率">
        <span class="wo-val">{{ state.windInfo.reactivePower }}<span class="wo-unit">kVar</span></span>
        <span class="wo-label">{{ $t('windOverview.reactivePower') }}</span>
      </div>

      <!-- Total active power: accent ring -->
      <div class="wo-item wo-item--ring" aria-label="总发电量">
        <span class="wo-val wo-val--lg">{{ state.windInfo.totalActivePower }}</span>
        <span class="wo-label">{{ $t('windOverview.totalActivePower') }}</span>
        <span class="wo-unit-below">万kWh</span>
      </div>

      <div class="wo-item" aria-label="能量可用率">
        <span class="wo-val">{{ state.windInfo.energyAvailability }}<span class="wo-unit">%</span></span>
        <span class="wo-label">{{ $t('windOverview.energyAva') }}</span>
      </div>

      <div class="wo-item" aria-label="时间可用率">
        <span class="wo-val">{{ state.windInfo.timeAvailability }}<span class="wo-unit">%</span></span>
        <span class="wo-label">{{ $t('windOverview.timeAva') }}</span>
      </div>

      <div class="wo-item" aria-label="总发电量GWh">
        <span class="wo-val">{{ state.windInfo.totalElectricity }}<span class="wo-unit">GWh</span></span>
        <span class="wo-label">{{ $t('windOverview.totalElect') }}</span>
      </div>

      <!-- Divider -->
      <div class="wo-divider" aria-hidden="true"></div>

      <!-- Group C: period electricity -->
      <div class="wo-item wo-item--featured" aria-label="日发电量">
        <div class="wo-icon wo-icon--amber" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        </div>
        <div class="wo-data">
          <span class="wo-val">{{ state.windInfo.dayElect }}<span class="wo-unit">万kWh</span></span>
          <span class="wo-label">{{ $t('windOverview.dayElect') }}</span>
        </div>
      </div>

      <div class="wo-item wo-item--featured" aria-label="月发电量">
        <div class="wo-icon wo-icon--violet" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
        </div>
        <div class="wo-data">
          <span class="wo-val">{{ state.windInfo.monthElect }}<span class="wo-unit">万kWh</span></span>
          <span class="wo-label">{{ $t('windOverview.monthElect') }}</span>
        </div>
      </div>

      <div class="wo-item wo-item--featured" aria-label="年发电量">
        <div class="wo-icon wo-icon--primary" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
          </svg>
        </div>
        <div class="wo-data">
          <span class="wo-val">{{ state.windInfo.yearElect }}<span class="wo-unit">万kWh</span></span>
          <span class="wo-label">{{ $t('windOverview.yearElect') }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.wind-overview {
  margin: 0 0 10px;
  padding: 12px 16px;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
}

/* Header */
.wo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.wo-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--color-text-muted);
}

.wo-status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-online);
  box-shadow: 0 0 6px var(--color-online-glow);
  animation: pulse-online 3s ease-in-out infinite;
}

.wo-status-val {
  color: var(--color-online);
  font-weight: 600;
}

/* Grid */
.wo-grid {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: nowrap;
  overflow-x: auto;
}

.wo-divider {
  width: 1px;
  height: 40px;
  background: var(--color-divider);
  flex-shrink: 0;
  margin: 0 6px;
}

/* Metric item */
.wo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 72px;
  padding: 6px 8px;
  text-align: center;
  flex-shrink: 0;

  /* Featured: row layout with icon */
  &--featured {
    flex-direction: row;
    align-items: center;
    gap: 8px;
    min-width: 108px;
    padding: 6px 10px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--color-divider);
    border-radius: var(--radius-md);
  }

  /* Ring item */
  &--ring {
    width: 76px;
    height: 76px;
    border-radius: 50%;
    border: 2px solid rgba(56, 189, 248, 0.25);
    box-shadow: 0 0 12px rgba(56, 189, 248, 0.10);
    flex-shrink: 0;
    min-width: unset;
    padding: 0;
    gap: 0;
  }
}

.wo-icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  flex-shrink: 0;

  &--sky     { background: rgba(34, 211, 238, 0.12); color: var(--cyan-400);      border: 1px solid rgba(34, 211, 238, 0.20); }
  &--green   { background: rgba(74, 222, 128, 0.12); color: var(--color-online);  border: 1px solid rgba(74, 222, 128, 0.20); }
  &--red     { background: rgba(248, 113, 113, 0.12);color: var(--color-error);   border: 1px solid rgba(248, 113, 113, 0.20); }
  &--amber   { background: rgba(251, 191, 36, 0.12); color: var(--color-warning); border: 1px solid rgba(251, 191, 36, 0.20); }
  &--violet  { background: rgba(139, 92, 246, 0.12); color: var(--color-violet);  border: 1px solid rgba(139, 92, 246, 0.20); }
  &--primary { background: rgba(56, 189, 248, 0.12); color: var(--color-primary); border: 1px solid rgba(56, 189, 248, 0.20); }
}

.wo-data {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.wo-val {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;

  &--lg {
    font-size: 1.1rem;
  }
}

.wo-unit {
  font-family: var(--font-body);
  font-size: 9px;
  font-weight: 400;
  color: var(--color-text-muted);
  margin-left: 2px;
}

.wo-unit-below {
  font-size: 9px;
  color: var(--color-text-muted);
  margin-top: 1px;
}

.wo-label {
  font-size: 10px;
  color: var(--color-text-muted);
  margin-top: 2px;
  white-space: nowrap;

  .wo-item--featured & {
    margin-top: 1px;
  }
}

/* Pulse animation shared */
@keyframes pulse-online {
  0%, 100% { box-shadow: 0 0 6px var(--color-online-glow); }
  50%       { box-shadow: 0 0 10px rgba(74, 222, 128, 0.50); }
}

@media (prefers-reduced-motion: reduce) {
  .wo-status-dot { animation: none; }
}
</style>
