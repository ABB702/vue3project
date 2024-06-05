<script setup>
import { getEnergyInfo } from '@/model/system'
import { ref, watch, reactive, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  projectId: {
    type: String,
    required: true
  }
})
const state = reactive({
  energyInfo: {
    curActivePower1: '',
    curActivePower2: '',
    curActivePercent: '',
    curReactivePower1: '',
    curReactivePower2: '',
    curReactivePercent: ''
  }
})

onMounted(() => {
  initData(props.projectId)
})
onBeforeUnmount(() => {})

watch(props.projectId, val => {
  initData(val)
})

const initData = val => {
  state.energyInfo = getEnergyInfo(val)
}
</script>

<template>
  <div class="energy-watch-wrapper">
    <div class="energy-title">{{'能管系统监测'}}</div>
    <div class="basic-info">
      <div class="basic-line active-area">
        <span class="iconfont icon-xihuan"></span>
        <div class="box">
          <div class="line1">
            {{state.energyInfo.curActivePower1}}
            <span class="unit">{{'MW'}}</span>
          </div>
          <div class="line2">{{'当前有功值'}}</div>
        </div>
        <div class="box">
          <div class="line1">
            {{state.energyInfo.curActivePower2}}
            <span class="unit">{{'MW'}}</span>
          </div>
          <div class="line2">{{'当前有功调度值'}}</div>
        </div>
        <div class="box">
          <div class="line1">
            {{state.energyInfo.curActivePercent}}
            <span class="unit">{{'%'}}</span>
          </div>
          <div class="line2">{{'有功跟踪准确度'}}</div>
        </div>
      </div>
      <div class="basic-line reactive-area">
        <span class="iconfont icon-xihuan"></span>
        <div class="box">
          <div class="line1">
            {{state.energyInfo.curActivePower1}}
            <span class="unit">{{'MW'}}</span>
          </div>
          <div class="line2">{{'当前无功值'}}</div>
        </div>
        <div class="box">
          <div class="line1">
            {{state.energyInfo.curActivePower2}}
            <span class="unit">{{'MW'}}</span>
          </div>
          <div class="line2">{{'当前无功调度值'}}</div>
        </div>
        <div class="box">
          <div class="line1">
            {{state.energyInfo.curActivePercent}}
            <span class="unit">{{'%'}}</span>
          </div>
          <div class="line2">{{'无功跟踪准确度'}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.energy-watch-wrapper {
  width: 100%;
  padding: 0 12px 12px 12px;
  background: var(--vt-c-content-bg);
  .energy-title {
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
  .basic-line {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--vt-c-white);
    background: var(--vt-c-content2-bg);
    padding: 4px;
    + .basic-line {
      margin-top: 8px;
    }
    > span {
      font-size: 1.5em;
      color: var(--vt-c-white);
    }
    .box {
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
}
</style>
