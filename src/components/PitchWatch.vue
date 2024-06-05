<script setup>
import { getPitchInfo } from '@/model/system'
import { ref, watch, reactive, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  devId: {
    type: String,
    required: true
  }
})
const state = reactive({
  pitchInfo: {
    angle1: '',
    angle2: '',
    angle3: '',
    speed1: '',
    speed2: '',
    speed3: '',
    pangle1: '',
    pangle2: '',
    pangle3: ''
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
  state.pitchInfo = getPitchInfo(val)
}
</script>

<template>
  <div class="pitch-watch-wrapper">
    <div class="pitch-title">
      <p>{{'变桨数据'}}</p>
      <p>
        <el-button type="primary" link>{{'更多 >'}}</el-button>
      </p>
    </div>
    <div class="basic-info">
      <div class="basic-line">
        <span class="iconfont icon-xihuan"></span>
        <div class="box">
          <div class="line1">{{state.pitchInfo.angle1}}</div>
          <div class="line2">{{'桨角1'}}</div>
        </div>
        <div class="box">
          <div class="line1">{{state.pitchInfo.angle2}}</div>
          <div class="line2">{{'桨角2'}}</div>
        </div>
        <div class="box">
          <div class="line1">{{state.pitchInfo.angle3}}</div>
          <div class="line2">{{'桨角3'}}</div>
        </div>
      </div>
      <div class="basic-line">
        <span class="iconfont icon-xihuan"></span>
        <div class="box">
          <div class="line1">{{state.pitchInfo.speed1}}</div>
          <div class="line2">{{'速度1'}}</div>
        </div>
        <div class="box">
          <div class="line1">{{state.pitchInfo.speed2}}</div>
          <div class="line2">{{'速度2'}}</div>
        </div>
        <div class="box">
          <div class="line1">{{state.pitchInfo.speed3}}</div>
          <div class="line2">{{'速度3'}}</div>
        </div>
      </div>
      <div class="basic-line">
        <span class="iconfont icon-xihuan"></span>
        <div class="box">
          <div class="line1">{{state.pitchInfo.pangle1}}</div>
          <div class="line2">{{'桨叶1角度给定'}}</div>
        </div>
        <div class="box">
          <div class="line1">{{state.pitchInfo.pangle2}}</div>
          <div class="line2">{{'桨叶3角度给定'}}</div>
        </div>
        <div class="box">
          <div class="line1">{{state.pitchInfo.pangle3}}</div>
          <div class="line2">{{'桨叶3角度给定'}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pitch-watch-wrapper {
  width: 100%;
  padding: 0 12px 12px 12px;
  background: var(--vt-c-content-bg);
  .pitch-title {
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
      width: 70px;
      .line1 {
        font-size: 1.5em;
        font-weight: 700;
      }
      .line2 {
        font-size: 0.8em;
      }
    }
  }
}
</style>
