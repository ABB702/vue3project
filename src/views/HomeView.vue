<script setup>
import { reactive } from 'vue'
import ProjectHeader from '../components/ProjectHeader.vue'
import WindOverview from '../components/WindOverview.vue'
import EnergyWatch from '../components/EnergyWatch.vue'
import SportsDataMonitor from '../components/SportsDataMonitor.vue'
import WindStatusMonitor from '../components/WindStatusMonitor.vue'
import BatteryMonitor from '../components/BatteryMonitor.vue'
import AlarmMonitor from '../components/AlarmMonitor.vue'

const state = reactive({ projectId: '0' })
const changeProject = val => { state.projectId = val }
</script>

<template>
  <main class="home-view">
    <!-- Top header bar -->
    <project-header
      :project-id="state.projectId"
      mode="project"
      @change-project="changeProject"
    />

    <!-- Wind overview strip -->
    <wind-overview :project-id="state.projectId" />

    <!-- Three-column content -->
    <div class="three-col">
      <!-- Left column -->
      <div class="col col--left">
        <energy-watch :project-id="state.projectId" />
        <sports-data-monitor :project-id="state.projectId" />
      </div>

      <!-- Center column (wider) -->
      <div class="col col--mid">
        <wind-status-monitor :project-id="state.projectId" />
      </div>

      <!-- Right column -->
      <div class="col col--right">
        <battery-monitor :project-id="state.projectId" />
        <alarm-monitor :project-id="state.projectId" />
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.home-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 0 12px;
}

.three-col {
  flex: 1;
  display: flex;
  gap: 10px;
  padding: 0 12px;
  min-height: 0;
  margin-top: 0;
}

.col {
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow-y: auto;

  &--left  { flex: 0 0 280px; }
  &--mid   { flex: 1; }
  &--right { flex: 0 0 280px; }
}
</style>
