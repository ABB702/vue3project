<script setup>
import { getEnergyInfo } from '@/model/system'
import { reactive, onMounted, watch } from 'vue'

const props = defineProps({ projectId: { type: String, required: true } })
const state = reactive({
  energyInfo: {
    curActivePower1: '', curActivePower2: '', curActivePercent: '',
    curReactivePower1: '', curReactivePower2: '', curReactivePercent: ''
  }
})

onMounted(() => initData(props.projectId))
watch(() => props.projectId, val => initData(val))
const initData = val => { state.energyInfo = getEnergyInfo(val) }
</script>

<template>
  <section class="energy-watch" aria-label="能管系统监测">
    <header class="ew-header">
      <h2 class="section-heading">能管系统监测</h2>
    </header>

    <div class="ew-rows">
      <!-- Active power row -->
      <div class="ew-row" aria-label="有功功率监测">
        <div class="ew-row-label">
          <span class="ew-tag ew-tag--sky">有功</span>
        </div>
        <div class="ew-metrics">
          <div class="ew-metric" aria-label="当前有功值">
            <span class="ew-val">{{ state.energyInfo.curActivePower1 }}<span class="ew-unit">MW</span></span>
            <span class="ew-desc">当前有功值</span>
          </div>
          <div class="ew-sep" aria-hidden="true"></div>
          <div class="ew-metric" aria-label="当前有功调度值">
            <span class="ew-val">{{ state.energyInfo.curActivePower2 }}<span class="ew-unit">MW</span></span>
            <span class="ew-desc">调度值</span>
          </div>
          <div class="ew-sep" aria-hidden="true"></div>
          <div class="ew-metric ew-metric--accent" aria-label="有功跟踪准确度">
            <span class="ew-val ew-val--pct">{{ state.energyInfo.curActivePercent }}<span class="ew-unit">%</span></span>
            <span class="ew-desc">跟踪准确度</span>
          </div>
        </div>
      </div>

      <!-- Reactive power row -->
      <div class="ew-row" aria-label="无功功率监测">
        <div class="ew-row-label">
          <span class="ew-tag ew-tag--violet">无功</span>
        </div>
        <div class="ew-metrics">
          <div class="ew-metric" aria-label="当前无功值">
            <span class="ew-val">{{ state.energyInfo.curReactivePower1 }}<span class="ew-unit">MW</span></span>
            <span class="ew-desc">当前无功值</span>
          </div>
          <div class="ew-sep" aria-hidden="true"></div>
          <div class="ew-metric" aria-label="当前无功调度值">
            <span class="ew-val">{{ state.energyInfo.curReactivePower2 }}<span class="ew-unit">MW</span></span>
            <span class="ew-desc">调度值</span>
          </div>
          <div class="ew-sep" aria-hidden="true"></div>
          <div class="ew-metric ew-metric--accent" aria-label="无功跟踪准确度">
            <span class="ew-val ew-val--pct">{{ state.energyInfo.curReactivePercent }}<span class="ew-unit">%</span></span>
            <span class="ew-desc">跟踪准确度</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.energy-watch {
  padding: 12px 14px;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  margin-bottom: 10px;
}

.ew-header {
  margin-bottom: 10px;
}

.ew-rows {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ew-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-md);
}

.ew-row-label {
  flex-shrink: 0;
}

.ew-tag {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 3px 8px;
  border-radius: var(--radius-full);

  &--sky    { background: rgba(34, 211, 238, 0.12); color: var(--cyan-400);     border: 1px solid rgba(34, 211, 238, 0.25); }
  &--violet { background: rgba(139, 92, 246, 0.12); color: var(--color-violet); border: 1px solid rgba(139, 92, 246, 0.25); }
}

.ew-metrics {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0;
}

.ew-sep {
  width: 1px;
  height: 26px;
  background: var(--color-divider);
  flex-shrink: 0;
  margin: 0 10px;
}

.ew-metric {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
  flex: 1;

  &--accent .ew-val { color: var(--color-accent); }
}

.ew-val {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-text-primary);
  font-variant-numeric: tabular-nums;
  line-height: 1.1;
  white-space: nowrap;

  &--pct { color: var(--color-accent); }
}

.ew-unit {
  font-family: var(--font-body);
  font-size: 9px;
  font-weight: 400;
  color: var(--color-text-muted);
  margin-left: 2px;
}

.ew-desc {
  font-size: 10px;
  color: var(--color-text-muted);
  margin-top: 2px;
  white-space: nowrap;
}
</style>
