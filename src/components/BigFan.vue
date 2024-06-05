<script setup>
import { getFanInfo } from '@/model/system'
import { ref, watch, reactive, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  devId: {
    type: String,
    required: true
  }
})
const state = reactive({
  fanInfo: {
    speed: '',
    acpower: '',
    reacpower: '',
    angle: '',
    align: '',
    vertical: ''
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
  state.fanInfo = getFanInfo(val)
}
</script>

<template>
  <div class="big-fan-wrapper">
    <div class="blank"></div>
    <div class="real">
      <div class="a-pic">
        <span class="iconfont icon-xihuan"></span>
      </div>
      <div class="bottom-wrap">
        <div class="bottom-box">
          <p>{{'塔筒左右振动'}}</p>
          <p>
            {{state.fanInfo.align}}
            <span>{{'g'}}</span>
          </p>
        </div>
        <div class="bottom-box">
          <p>{{'塔筒前后振动'}}</p>
          <p>
            {{state.fanInfo.vertical}}
            <span>{{'g'}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="real">
      <div class="right-wrap">
        <div class="right-box">
          <p>
            {{state.fanInfo.speed}}
            <span>{{'m/s'}}</span>
          </p>
          <p>{{'风速'}}</p>
        </div>
        <div class="right-box">
          <p>
            {{state.fanInfo.acpower}}
            <span>{{'KW'}}</span>
          </p>
          <p>{{'有功功率'}}</p>
        </div>
        <div class="right-box">
          <p>
            {{state.fanInfo.reacpower}}
            <span>{{'kVar'}}</span>
          </p>
          <p>{{'无功功率'}}</p>
        </div>
        <div class="right-box">
          <p>
            {{state.fanInfo.angle}}
            <span>{{'度'}}</span>
          </p>
          <p>{{'变桨角度'}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.big-fan-wrapper {
  width: 100%;
  height: 300px;
  padding: 0 12px 12px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .blank {
    width: 200px;
  }
  .real {
    width: 200px;
    height: 288px;
    .a-pic {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 200px;
      height: 200px;
      span {
        font-size: 40px;
        font-weight: 700;
        color: var(--vt-c-white);
      }
    }
    .bottom-wrap {
      display: flex;
      justify-content: space-between;
      .bottom-box {
        padding: 8px;
        background: var(--vt-c-content2-bg);
        color: var(--vt-c-white);
        text-align: center;
        p:first-child {
          font-size: 0.8em;
        }
        p:nth-child(2) {
          margin-top: 4px;
          font-size: 1.2em;
          font-weight: 700;
          span {
            font-size: 0.5em;
            font-weight: 400;
          }
        }
      }
    }
    .right-wrap {
      width: 100%;
      height: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .right-box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        color: var(--vt-c-white);
        background: var(--vt-c-content2-bg);
        margin-top: 4px;
        > p:nth-child(1) {
          font-size: 1.2em;
          font-weight: 700;
          span {
            font-size: 0.5em;
            font-weight: 400;
          }
        }
        p:nth-child(2) {
          margin-left: 12px;
          font-size: 0.8em;
        }
      }
    }
  }
}
</style>
