<script setup>
import { ref, watch, reactive, onMounted, onBeforeUnmount } from 'vue'
import { getBoxInfo } from '../model/system'

const props = defineProps({
  devId: {
    type: String,
    required: true
  }
})
const state = reactive({
  boxInfo: [
    {
      value: '',
      description: ''
    }
  ]
})

onMounted(() => {
  initData(props.devId)
})
onBeforeUnmount(() => {})

watch(props.devId, val => {
  initData(val)
})

const initData = val => {
  state.boxInfo = getBoxInfo(val)
}
</script>

<template>
  <div class="box-watch-wrapper">
    <div class="box-title">
      <p>{{'箱变数据'}}</p>
      <p>
        <el-button type="primary" link>{{'更多 >'}}</el-button>
      </p>
    </div>
    <div class="basic-info">
      <div class="box" v-for="(item, index) in state.boxInfo" :key="index">
        <div class="line1">
          <span>{{item.value}}</span>
        </div>
        <div class="line2">{{item.description}}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box-watch-wrapper {
  width: 100%;
  padding: 0 12px 12px 12px;
  background: var(--vt-c-content-bg);
  .box-title {
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
    width: 33%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: var(--vt-c-white);
    .line1 {
      font-size: 1.5em;
      font-weight: 700;
    }
    .line2 {
      font-size: 0.8em;
    }
  }
}
</style>
