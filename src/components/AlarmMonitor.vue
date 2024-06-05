<script setup>
import { getAlarmInfo } from '@/model/system'
import { ref, watch, reactive, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  projectId: {
    type: String,
    required: true
  }
})
const state = reactive({
  alarmInfo: [],
  timer: null
})

onMounted(() => {
  clearTimeout(state.timer)
  updateData()
})
onBeforeUnmount(() => {
  clearTimeout(state.timer)
})

watch(props.projectId, val => {})

const initData = val => {
  getAlarmInfo(val, res => {
    state.alarmInfo = res
  })
}
const updateData = () => {
  initData(props.projectId)
  state.timer = setTimeout(updateData, 1000)
}
</script>

<template>
  <div class="alarm-monitor-wrapper">
    <div class="alarm-monitor-title">{{'告警数据监测'}}</div>
    <div class="basic-info">
      <el-scrollbar height="300px">
        <el-table :data="state.alarmInfo" height="300" style="width:100%;" size="small" stripe>
          <el-table-column prop="source" label="来源" width="80" />
          <el-table-column prop="name" label="对象" width="60" />
          <el-table-column prop="time" label="发生时间" width="80" />
          <el-table-column prop="type" label="告警类型" width="60" />
          <el-table-column prop="content" label="告警内容" width="50" />
        </el-table>
      </el-scrollbar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.alarm-monitor-wrapper {
  width: 100%;
  padding: 0 12px 12px 12px;
  background: var(--vt-c-content-bg);
  .alarm-monitor-title {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 2.5em;
    font-weight: 700;
    color: var(--vt-c-white);
  }
  .basic-info {
    width: 100%;
  }
  :deep(.el-table .el-table__body td .cell) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  :deep(.el-table .el-table__row .el-table__cell:nth-child(3) .cell) {
    overflow: auto;
    text-overflow: clip;
    white-space: wrap;
  }
}
</style>
