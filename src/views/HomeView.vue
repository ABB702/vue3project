<script setup>
import { ref, watch, reactive } from 'vue'
// import TheWelcome from '../components/TheWelcome.vue'
import ProjectHeader from '../components/ProjectHeader.vue'
import WindOverview from '../components/WindOverview.vue'
import EnergyWatch from '../components/EnergyWatch.vue'
import SportsDataMonitor from '../components/SportsDataMonitor.vue'
import WindStatusMonitor from '../components/WindStatusMonitor.vue'
import BatteryMonitor from '../components/BatteryMonitor.vue'
import AlarmMonitor from '../components/AlarmMonitor.vue'
const state = reactive({
  projectId: '0'
})
const changeProject = val => {
  state.projectId = val
}
</script>

<template>
  <main>
    <project-header :project-id="state.projectId" mode="project" @change-project="changeProject"></project-header>
    <wind-overview :project-id="state.projectId"></wind-overview>
    <div class="content-3-column">
      <div class="left">
        <energy-watch :project-id="state.projectId"></energy-watch>
        <sports-data-monitor :project-id="state.projectId"></sports-data-monitor>
      </div>
      <div class="mid">
        <wind-status-monitor :project-id="state.projectId"></wind-status-monitor>
      </div>
      <div class="right">
        <battery-monitor :project-id="state.projectId"></battery-monitor>
        <alarm-monitor :project-id="state.projectId"></alarm-monitor>
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
