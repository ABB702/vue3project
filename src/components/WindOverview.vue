<script setup>
import { getWindOverviewInfo } from '@/model/system'
import { ref, watch, reactive, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  projectId: {
    type: String,
    required: true
  }
})
const state = reactive({
  windInfo: {
    averageWind: '',
    noErrorTime: '',
    errorTimes: '',
    installCapacity: '',
    activePower: '',
    reactivePower: '',
    totalActivePower: '',
    energyAvailability: '',
    timeAvailability: '',
    totalElectricity: '',
    dayElect: '',
    monthElect: '',
    yearElect: ''
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
  state.windInfo = getWindOverviewInfo(val)
}
</script>

<template>
  <div class="wind-overview-wrapper">
    <div class="wind-title">
      <p>{{$t('windOverview.overview')}}</p>
      <p>
        {{$t('windOverview.status')}}
        <span style="color:green">{{$t('windOverview.online')}}</span>
      </p>
    </div>
    <div class="wind-content">
      <div class="box1">
        <span class="iconfont icon-xihuan"></span>
        <div class="box-content">
          <div class="line1">
            {{state.windInfo.averageWind}}
            <span class="unit">{{'m/s'}}</span>
          </div>
          <div class="line2">{{$t('windOverview.averageSpeed')}}</div>
        </div>
      </div>
      <div class="box1">
        <span class="iconfont icon-xihuan"></span>
        <div class="box-content">
          <div class="line1">
            {{state.windInfo.noErrorTime}}
            <span class="unit">{{'h'}}</span>
          </div>
          <div class="line2">{{$t('windOverview.noErrTime')}}</div>
        </div>
      </div>
      <div class="box1">
        <span class="iconfont icon-xihuan"></span>
        <div class="box-content">
          <div class="line1">
            {{state.windInfo.errorTimes}}
            <span class="unit">{{' '}}</span>
          </div>
          <div class="line2">{{$t('windOverview.errTimes')}}</div>
        </div>
      </div>
      <div class="box2">
        <div class="box-content">
          <div class="line1">
            {{state.windInfo.installCapacity}}
            <span class="unit">{{'MW'}}</span>
          </div>
          <div class="line2">{{$t('windOverview.installCapacity')}}</div>
        </div>
      </div>
      <div class="box2">
        <div class="box-content">
          <div class="line1">
            {{state.windInfo.activePower}}
            <span class="unit">{{'kW'}}</span>
          </div>
          <div class="line2">{{$t('windOverview.activePower')}}</div>
        </div>
      </div>
      <div class="box2">
        <div class="box-content">
          <div class="line1">
            {{state.windInfo.reactivePower}}
            <span class="unit">{{'kVar'}}</span>
          </div>
          <div class="line2">{{$t('windOverview.reactivePower')}}</div>
        </div>
      </div>
      <div class="box3">
        <div class="box-content">
          <div class="line1">{{state.windInfo.totalActivePower}}</div>
          <div class="line2">{{$t('windOverview.totalActivePower')}}</div>
          <div class="line2">{{'万kWh'}}</div>
        </div>
      </div>
      <div class="box2">
        <div class="box-content">
          <div class="line1">
            {{state.windInfo.energyAvailability}}
            <span class="unit">{{'%'}}</span>
          </div>
          <div class="line2">{{$t('windOverview.energyAva')}}</div>
        </div>
      </div>
      <div class="box2">
        <div class="box-content">
          <div class="line1">
            {{state.windInfo.timeAvailability}}
            <span class="unit">{{'%'}}</span>
          </div>
          <div class="line2">{{$t('windOverview.timeAva')}}</div>
        </div>
      </div>
      <div class="box2">
        <div class="box-content">
          <div class="line1">
            {{state.windInfo.totalElectricity}}
            <span class="unit">{{'GWh'}}</span>
          </div>
          <div class="line2">{{$t('windOverview.totalElect')}}</div>
        </div>
      </div>
      <div class="box1">
        <span class="iconfont icon-xihuan"></span>
        <div class="box-content">
          <div class="line1">
            {{state.windInfo.dayElect}}
            <span class="unit">{{'万kWh'}}</span>
          </div>
          <div class="line2">{{$t('windOverview.dayElect')}}</div>
        </div>
      </div>
      <div class="box1">
        <span class="iconfont icon-xihuan"></span>
        <div class="box-content">
          <div class="line1">
            {{state.windInfo.monthElect}}
            <span class="unit">{{'万kWh'}}</span>
          </div>
          <div class="line2">{{$t('windOverview.monthElect')}}</div>
        </div>
      </div>
      <div class="box1">
        <span class="iconfont icon-xihuan"></span>
        <div class="box-content">
          <div class="line1">
            {{state.windInfo.yearElect}}
            <span class="unit">{{'万kWh'}}</span>
          </div>
          <div class="line2">{{$t('windOverview.yearElect')}}</div>
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
      font-size: 0.5em;
    }
  }
  .wind-content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0 12px 0;
    .box1 {
      width: 100px;
      height: 80px;
      margin-right: 5px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
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
    .box2 {
      width: 80px;
      height: 80px;
      .box-content {
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
    .box3 {
      width: 100px;
      height: 80px;
      border: 4px solid var(--vt-c-white-soft);
      border-radius: 50%;
      .box-content {
        color: var(--vt-c-white);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;
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
