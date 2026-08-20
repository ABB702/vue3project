<script setup>
import { getAlarmInfo } from '@/model/system'
import { reactive, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  projectId: { type: String, required: true }
})

const state = reactive({
  alarmInfo: [],
  timer: null
})

onMounted(() => {
  clearTimeout(state.timer)
  updateData()
})

onBeforeUnmount(() => clearTimeout(state.timer))

const initData = val => {
  getAlarmInfo(val, res => { state.alarmInfo = res })
}

const updateData = () => {
  initData(props.projectId)
  state.timer = setTimeout(updateData, 1000)
}
</script>

<template>
  <section class="alarm-monitor" aria-label="告警数据监测">
    <header class="am-header">
      <h2 class="section-heading">告警数据监测</h2>
      <span
        class="am-count"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        :aria-label="`共 ${state.alarmInfo.length} 条告警`"
      >
        {{ state.alarmInfo.length }} 条
      </span>
    </header>

    <div class="am-table-wrap">
      <el-scrollbar height="280px">
        <el-table
          :data="state.alarmInfo"
          style="width: 100%"
          size="small"
          stripe
          :show-header="true"
          aria-label="告警数据列表"
        >
          <el-table-column prop="source" label="来源"     min-width="70" />
          <el-table-column prop="name"   label="对象"     min-width="55" />
          <el-table-column prop="time"   label="时间"     min-width="75" />
          <el-table-column prop="type"   label="类型"     min-width="55" />
          <el-table-column prop="content" label="内容"    min-width="80">
            <template #default="{ row }">
              <span class="am-cell-content" :title="row.content">{{ row.content }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.alarm-monitor {
  padding: 12px 14px;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  margin-top: 10px;
}

.am-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.am-count {
  font-family: var(--font-heading);
  font-size: 10px;
  font-weight: 600;
  color: var(--color-text-muted);
  padding: 2px 8px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-full);
}

.am-table-wrap {
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--color-border-subtle);
}

.am-cell-content {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

/* El-table deep overrides scoped to this component */
:deep(.el-table) {
  background: transparent !important;
  --el-table-bg-color: transparent;
  --el-table-tr-bg-color: transparent;
  --el-table-header-bg-color: rgba(30, 41, 59, 0.70);
  --el-table-border-color: transparent;
  --el-table-text-color: var(--color-text-secondary);
  --el-table-header-text-color: var(--color-text-muted);
  --el-table-row-hover-bg-color: rgba(56, 189, 248, 0.06);
  font-size: 11px;
}

:deep(.el-table th.el-table__cell) {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 6px 8px;
  background: rgba(30, 41, 59, 0.70) !important;
  color: var(--color-text-muted) !important;
  border-bottom: 1px solid var(--color-border-subtle) !important;
}

:deep(.el-table td.el-table__cell) {
  padding: 5px 8px;
  border-bottom: 1px solid var(--color-divider) !important;
}

:deep(.el-table--striped .el-table__body tr.el-table__row--striped td) {
  background: rgba(255, 255, 255, 0.015) !important;
}

:deep(.el-table__body tr:hover > td) {
  background: rgba(56, 189, 248, 0.06) !important;
}

:deep(.el-scrollbar__bar) {
  opacity: 0.3;
}
</style>
