<script setup>
import { getBatteryInfo } from '@/model/system'
import { ref, watch, reactive, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  projectId: {
    type: String,
    required: true
  }
})
const state = reactive({
  batteryInfo: {
    net: '',
    vol: '',
    pow: '',
    cur: ''
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
  state.batteryInfo = getBatteryInfo(val)
}
</script>

<template>
  <div class="battery-monitor-wrapper">
    <div class="battery-title">{{'电表数据监视'}}</div>
    <div class="basic-info">
      <div class="box">
        <div class="b-title">{{'上网电量'}}</div>
        <div class="b-content">
          {{state.batteryInfo.net}}
          <span class="unit">{{'kW'}}</span>
        </div>
      </div>
      <div class="box right-align">
        <div class="b-title">{{'电压'}}</div>
        <div class="b-content">
          {{state.batteryInfo.vol}}
          <span class="unit">{{'kV'}}</span>
        </div>
      </div>
      <div class="box">
        <div class="b-title">{{'实时功率'}}</div>
        <div class="b-content">
          {{state.batteryInfo.pow}}
          <span class="unit">{{'kWh'}}</span>
        </div>
      </div>
      <div class="box right-align">
        <div class="b-title">{{'电流'}}</div>
        <div class="b-content">
          {{state.batteryInfo.cur}}
          <span class="unit">{{'A'}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.battery-monitor-wrapper {
  width: 100%;
  padding: 0 12px 12px 12px;
  background: var(--vt-c-content-bg);
  .battery-title {
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  .box {
    width: 50%;
    height: 60px;
    color: var(--vt-c-white);
    margin-top: 12px;
    background: var(--vt-c-content2-bg);
    padding: 8px;
    .b-title {
      font-size: 1em;
      font-weight: 400;
    }
    .b-content {
      font-size: 1.5em;
      font-weight: 700;
      .unit {
        font-size: 0.5em;
        font-weight: 400;
      }
    }
  }
  .right-align {
    text-align: right;
  }
}
</style>
