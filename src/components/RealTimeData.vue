<script setup>
import { getRealTimeData } from '@/model/system'
import { ref, watch, reactive, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  devId: {
    type: String,
    required: true
  }
})
const state = reactive({
  realTimeData: []
})

onMounted(() => {
  initData(props.devId)
})
onBeforeUnmount(() => {})

watch(props.devId, val => {
  initData(val)
})

const initData = val => {
  state.realTimeData = getRealTimeData(val)
}
</script>

<template>
  <div class="real-time-data-wrapper">
    <div class="real-time-data-title">
      <p>{{'实时数据'}}</p>
      <p>
        <el-button type="primary" link>{{'更多 >'}}</el-button>
      </p>
    </div>
    <div class="basic-info">
      <el-scrollbar height="300px">
        <el-table :data="state.realTimeData" height="300" style="width:100%;" size="small" stripe>
          <el-table-column prop="type" label="类型" width="70" />
          <el-table-column prop="errcode" label="故障码" width="60" />
          <el-table-column prop="errname" label="故障名称" width="80" />
          <el-table-column prop="time" label="触发时间" />
        </el-table>
      </el-scrollbar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.real-time-data-wrapper {
  width: 100%;
  padding: 0 12px 12px 12px;
  background: var(--vt-c-content-bg);
  .real-time-data-title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p:first-child {
      font-size: 2.5em;
      font-weight: 700;
      color: var(--vt-c-white);
    }
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
