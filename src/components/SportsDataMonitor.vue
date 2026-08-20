<script setup>
import { getSportsInfo } from '@/model/system'
import { reactive, onMounted, watch } from 'vue'

const props = defineProps({ projectId: { type: String, required: true } })
const state = reactive({
  sportsInfo: [{ value: '', unit: '', description: '' }]
})

onMounted(() => initData(props.projectId))
watch(() => props.projectId, val => initData(val))
const initData = val => { state.sportsInfo = getSportsInfo(val) }
</script>

<template>
  <section class="sports-monitor" aria-label="运动数据监视">
    <header class="sm-header">
      <h2 class="section-heading">运动数据监视</h2>
      <el-button type="primary" link size="small" class="sm-more">
        更多
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-left:3px">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </el-button>
    </header>

    <div class="sm-grid">
      <div
        v-for="(item, index) in state.sportsInfo"
        :key="index"
        class="sm-item"
        :aria-label="`${item.description}: ${item.value} ${item.unit}`"
      >
        <span class="sm-val">{{ item.value }}<span class="sm-unit">{{ item.unit }}</span></span>
        <span class="sm-desc">{{ item.description }}</span>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.sports-monitor {
  padding: 12px 14px;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  margin-top: 10px;
}

.sm-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.sm-more {
  font-size: 11px !important;
  color: var(--color-text-muted) !important;
  padding: 0 !important;
  display: flex;
  align-items: center;

  &:hover {
    color: var(--color-primary) !important;
  }
}

.sm-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.sm-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 8px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-md);
  text-align: center;
  transition: background var(--transition-fast), border-color var(--transition-fast);

  &:hover {
    background: var(--glass-bg-hover);
    border-color: rgba(56, 189, 248, 0.15);
  }
}

.sm-val {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-primary);
  font-variant-numeric: tabular-nums;
  line-height: 1.1;
}

.sm-unit {
  font-family: var(--font-body);
  font-size: 9px;
  font-weight: 400;
  color: var(--color-text-muted);
  margin-left: 2px;
}

.sm-desc {
  font-size: 10px;
  color: var(--color-text-muted);
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
</style>
