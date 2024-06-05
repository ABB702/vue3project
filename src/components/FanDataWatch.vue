<script setup>
import { getFanDataWatchInfo } from '@/model/system'
import { ref, watch, reactive, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  devId: {
    type: String,
    required: true
  }
})
const state = reactive({
  fanDataInfo: {
    speed1: '',
    speed30: '',
    speed10: '',
    direct1: '',
    direct10: '',
    direct30: '',
    temp1: '',
    temp2: '',
    temp3: ''
  }
})

onMounted(() => {
  initData(props.devId)
})
onBeforeUnmount(() => {})

watch(props.devId, val => {
  initData(val)
})

const initData = val => {
  state.fanDataInfo = getFanDataWatchInfo(val)
}
</script>

<template>
  <div class="wind-overview-wrapper">
    <div class="wind-title">
      <p>{{'数据监视'}}</p>
      <p>
        <el-button type="primary" size="small">{{'风能数据'}}</el-button>
        <el-button type="primary" size="small">{{'转速数据'}}</el-button>
        <el-button type="primary" size="small">{{'温度数据'}}</el-button>
        <el-button type="primary" size="small">{{'偏航数据'}}</el-button>
        <el-button type="primary" size="small">{{'震动数据'}}</el-button>
      </p>
    </div>
    <div class="wind-content">
      <div class="box1">
        <span class="iconfont icon-xihuan"></span>
        <div class="box-content">
          <div class="line1">
            <span class="label">{{'风速1s'}}</span>
            {{state.fanDataInfo.speed1}}
            <span class="unit">{{'m/s'}}</span>
          </div>
          <div class="line1">
            <span class="label">{{'风速30s'}}</span>
            {{state.fanDataInfo.speed30}}
            <span class="unit">{{'m/s'}}</span>
          </div>
          <div class="line1">
            <span class="label">{{'风速10min'}}</span>
            {{state.fanDataInfo.speed10}}
            <span class="unit">{{'m/s'}}</span>
          </div>
        </div>
      </div>
      <div class="box1">
        <span class="iconfont icon-xihuan"></span>
        <div class="box-content">
          <div class="line1">
            <span class="label">{{'风向1s'}}</span>
            {{state.fanDataInfo.direct1}}
            <span class="unit">{{'方'}}</span>
          </div>
          <div class="line1">
            <span class="label">{{'风向10s'}}</span>
            {{state.fanDataInfo.direct10}}
            <span class="unit">{{'方'}}</span>
          </div>
          <div class="line1">
            <span class="label">{{'风速30s'}}</span>
            {{state.fanDataInfo.direct30}}
            <span class="unit">{{'方'}}</span>
          </div>
        </div>
      </div>
      <div class="box1">
        <span class="iconfont icon-xihuan"></span>
        <div class="box-content">
          <div class="line1">
            <span class="label">{{'环境温度'}}</span>
            {{state.fanDataInfo.temp1}}
            <span class="unit">{{'度'}}</span>
          </div>
          <div class="line1">
            <span class="label">{{'环境湿度'}}</span>
            {{state.fanDataInfo.temp2}}
            <span class="unit">{{''}}</span>
          </div>
          <div class="line1">
            <span class="label">{{'环境气压'}}</span>
            {{state.fanDataInfo.temp3}}
            <span class="unit">{{'kPa'}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wind-overview-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin-top: 24px;
  padding: 0 12px 0 12px;
  background: var(--vt-c-content-bg);
  .wind-title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 2.5em;
    color: var(--vt-c-white);
    > p:first-child {
      font-weight: 700;
    }
    > p:nth-child(2) {
      font-size: 0.8em;
    }
  }
  .wind-content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0 12px 0;
    .box1 {
      width: 180px;
      height: 80px;
      margin-right: 5px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      background: var(--vt-c-content2-bg);
      > span {
        font-size: 1.5em;
        color: var(--vt-c-white);
      }
      .box-content {
        margin-left: 8px;
        color: var(--vt-c-white);
        .line1 {
          font-size: 1.5em;
          font-weight: 700;
          .unit {
            font-size: 0.5em;
            font-weight: 400;
          }
          .label {
            font-size: 0.6em;
            font-weight: 400;
          }
        }
      }
    }
  }
}
</style>
