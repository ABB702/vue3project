<script setup>
import { getSportsInfo } from '@/model/system'
import { ref, watch, reactive, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  projectId: {
    type: String,
    required: true
  }
})
const state = reactive({
  sportsInfo: [
    {
      value: '',
      unit: '',
      description: ''
    }
  ]
})

onMounted(() => {
  initData(props.projectId)
})
onBeforeUnmount(() => {})

watch(props.projectId, val => {
  initData(val)
})

const initData = val => {
  state.sportsInfo = getSportsInfo(val)
}
</script>

<template>
  <div class="sports-data-monitor-wrapper">
    <div class="sports-title">
      <p>{{'运动数据监视'}}</p>
      <p>
        <el-button type="primary" link>{{'更多 >'}}</el-button>
      </p>
    </div>
    <div class="basic-info">
      <div class="box" v-for="(item, index) in state.sportsInfo" :key="index">
        <div class="line1">
          <span>{{item.value}}</span>
          <span>{{item.unit}}</span>
        </div>
        <div class="line2">{{item.description}}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sports-data-monitor-wrapper {
  width: 100%;
  padding: 0 12px 12px 12px;
  background: var(--vt-c-content-bg);
  .sports-title {
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
  .box {
    width: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: var(--vt-c-white);
    .line1 {
      font-size: 1.5em;
      font-weight: 700;
      .unit {
        font-size: 0.5em;
        font-weight: 400;
      }
    }
  }
}
</style>
