<script setup>
import { getSigWindOverviewInfo } from '@/model/system'
import { ref, watch, reactive, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  devId: {
    type: String,
    required: true
  }
})
const state = reactive({
  windInfo: []
})

onMounted(() => {
  initData(props.devId)
})
onBeforeUnmount(() => {})

watch(props.devId, val => {
  initData(val)
})

const initData = val => {
  state.windInfo = getSigWindOverviewInfo(val)
}
</script>

<template>
  <div class="wind-overview-wrapper">
    <div class="wind-content">
      <div class="box1" v-for="(item, index) in state.windInfo" :key="index">
        <span class="iconfont icon-xihuan"></span>
        <div class="box-content">
          <div class="line1">
            {{item.value}}
            <span class="unit">{{item.unit}}</span>
          </div>
          <div class="line2">{{item.des}}</div>
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
  .wind-content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0 12px 0;
    .box1 {
      width: 200px;
      height: 80px;
      margin-right: 5px;
      display: flex;
      justify-content: center;
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
        }
        .line2 {
          font-size: 1em;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
