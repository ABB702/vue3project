<script setup>
import { ref, watch, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ProjectHeader from '../components/ProjectHeader.vue'
import SigWindOverview from '../components/SigWindOverview.vue'
import PitchWatch from '../components/PitchWatch.vue'
import BoxWatch from '../components/BoxWatch.vue'
import BigFan from '../components/BigFan.vue'
import FanDataWatch from '../components/FanDataWatch.vue'
import RealTimeData from '../components/RealTimeData.vue'
import ElectricityData from '../components/ElectricityData.vue'

const state = reactive({
  devId: '0'
})

const route = useRoute()

onMounted(() => {
  state.devId = route.params.devId || '0'
})
const changeProject = val => {
  state.devId = val
}
</script>

<template>
  <main>
    <project-header :project-id="state.devId" :mode="'dev'" @change-project="changeProject"></project-header>
    <sig-wind-overview :dev-id="state.devId"></sig-wind-overview>
    <div class="content-3-column">
      <div class="left">
        <pitch-watch :dev-id="state.devId"></pitch-watch>
        <box-watch :dev-id="state.devId"></box-watch>
      </div>
      <div class="mid">
        <big-fan :dev-id="state.devId"></big-fan>
        <fan-data-watch :dev-id="state.devId"></fan-data-watch>
      </div>
      <div class="right">
        <real-time-data :dev-id="state.devId"></real-time-data>
        <electricity-data :dev-id="state.devId"></electricity-data>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.content-3-column {
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 12px;

  .left {
    flex: 1 1 auto;
    width: 300px;
  }
  .mid {
    flex: 1 1 auto;
    width: 600px;
    margin-left: 8px;
  }
  .right {
    flex: 1 1 auto;
    width: 300px;
    margin-left: 8px;
  }
}
</style>>
