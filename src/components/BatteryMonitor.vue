<script setup>
import { getBatteryInfo } from '@/model/system'
import { reactive, onMounted, watch } from 'vue'

const props = defineProps({ projectId: { type: String, required: true } })
const state = reactive({
  batteryInfo: { net: '', vol: '', pow: '', cur: '' }
})

onMounted(() => initData(props.projectId))
watch(() => props.projectId, val => initData(val))
const initData = val => { state.batteryInfo = getBatteryInfo(val) }
</script>

<template>
  <section class="battery-monitor" aria-label="电表数据监视">
    <header class="bm-header">
      <h2 class="section-heading">电表数据监视</h2>
    </header>

    <div class="bm-grid">
      <div class="bm-item" aria-label="上网电量">
        <div class="bm-icon bm-icon--sky" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
          </svg>
        </div>
        <div class="bm-data">
          <span class="bm-label">上网电量</span>
          <span class="bm-val">{{ state.batteryInfo.net }}<span class="bm-unit">kW</span></span>
        </div>
      </div>

      <div class="bm-item" aria-label="电压">
        <div class="bm-icon bm-icon--amber" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
        </div>
        <div class="bm-data">
          <span class="bm-label">电压</span>
          <span class="bm-val">{{ state.batteryInfo.vol }}<span class="bm-unit">kV</span></span>
        </div>
      </div>

      <div class="bm-item" aria-label="实时功率">
        <div class="bm-icon bm-icon--violet" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
        </div>
        <div class="bm-data">
          <span class="bm-label">实时功率</span>
          <span class="bm-val">{{ state.batteryInfo.pow }}<span class="bm-unit">kWh</span></span>
        </div>
      </div>

      <div class="bm-item" aria-label="电流">
        <div class="bm-icon bm-icon--green" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          </svg>
        </div>
        <div class="bm-data">
          <span class="bm-label">电流</span>
          <span class="bm-val">{{ state.batteryInfo.cur }}<span class="bm-unit">A</span></span>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.battery-monitor {
  padding: 12px 14px;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
}

.bm-header {
  margin-bottom: 10px;
}

.bm-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.bm-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-md);
  transition: background var(--transition-fast);

  &:hover {
    background: var(--glass-bg-hover);
  }
}

.bm-icon {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  flex-shrink: 0;

  &--sky    { background: rgba(34, 211, 238, 0.12); color: var(--cyan-400);      border: 1px solid rgba(34, 211, 238, 0.18); }
  &--amber  { background: rgba(251, 191, 36, 0.12); color: var(--color-warning); border: 1px solid rgba(251, 191, 36, 0.18); }
  &--violet { background: rgba(139, 92, 246, 0.12); color: var(--color-violet);  border: 1px solid rgba(139, 92, 246, 0.18); }
  &--green  { background: rgba(74, 222, 128, 0.12); color: var(--color-online);  border: 1px solid rgba(74, 222, 128, 0.18); }
}

.bm-data {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.bm-label {
  font-size: 10px;
  color: var(--color-text-muted);
  white-space: nowrap;
}

.bm-val {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text-primary);
  font-variant-numeric: tabular-nums;
  line-height: 1.1;
  white-space: nowrap;
}

.bm-unit {
  font-family: var(--font-body);
  font-size: 9px;
  font-weight: 400;
  color: var(--color-text-muted);
  margin-left: 2px;
}
</style>
