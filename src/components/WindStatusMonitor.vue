<script setup>
import { getWindStatus } from '@/model/system'
import { ref, watch, reactive, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { debounce } from 'lodash'
import { getCurrentInstance } from 'vue'

const ins = getCurrentInstance()
const props = defineProps({
  projectId: {
    type: String,
    required: true
  }
})
const CACHE_CARD = 12
const TIME_WAIT = 1000
const STATUS_MAP = {
  0: {
    style: 'green',
    des: '准备启动'
  },
  1: {
    style: 'red',
    des: '故障停机'
  }
}
const state = reactive({
  windList: [],
  curMode: 'card',
  viewStartIndex: 0,
  viewEndIndex: 20,
  timer: null
})

onMounted(() => {
  clearTimeout(state.timer)
  updateData()
})
onBeforeUnmount(() => {
  clearTimeout(state.timer)
})

watch(props.projectId, val => {})

const initData = debounce((val, refresh = true, s = 0, e = 20) => {
  // 默认刷新前20条,滚动后更新刷新范围
  if (state.viewStartIndex !== s) state.viewStartIndex = s
  if (state.viewEndIndex !== e) state.viewEndIndex = e
  if (window.__LOG__) console.log('refreshing number: ', s, e)
  if (refresh) {
    getWindStatus(val, s, e, res => {
      state.windList = res
    })
  } else {
    getWindStatus(val, s, e, res => {
      state.windList.splice(s, res.length, ...res)
    })
  }
}, 100)

const updateData = () => {
  initData(props.projectId, false, state.viewStartIndex, state.viewEndIndex)
  state.timer = setTimeout(updateData, TIME_WAIT)
}

const changeMode = mode => {
  if (state.curMode === mode) return
  state.curMode = mode
  initData(props.projectId, true, 0, 20)
}
const handleScroll = el => {
  // 12个cache可同时适配2种模式
  let viewStartIndex = Math.floor(el.scrollTop / 130) * 3
  let viewEndIndex = viewStartIndex + CACHE_CARD
  viewStartIndex = viewStartIndex - 3 > 0 ? viewStartIndex - 3 : 0
  viewEndIndex = viewEndIndex + CACHE_CARD
  initData(props.projectId, false, viewStartIndex, viewEndIndex)
}

const router = useRouter()

const go2dev = devId => {
  ins.proxy.$eventBus.emit('router-change', 'about')
  router.push({ name: 'about', params: { devId: devId } })
}
</script>

<template>
  <div class="wind-status-monitor-wrapper">
    <div class="wind-title">
      <span>{{'风机状态监视'}}</span>
      <div class="options">
        <el-button
          :type="state.curMode === 'card' ? 'primary' : 'default'"
          @click="changeMode('card')"
        >{{'矩阵模式'}}</el-button>
        <el-button
          :type="state.curMode === 'list' ? 'primary' : 'default'"
          @click="changeMode('list')"
        >{{'列表模式'}}</el-button>
      </div>
    </div>
    <div class="wind-content">
      <div v-if="state.curMode === 'card'">
        <el-scrollbar height="500px" @scroll="handleScroll">
          <div
            class="card-box"
            v-for="(item, index) in state.windList"
            :key="index"
            @click="go2dev(item.devId)"
          >
            <div class="card-title">
              <div>{{item.name}}</div>
              <div :class="STATUS_MAP[item.status].style">{{STATUS_MAP[item.status].des}}</div>
              <div>{{item.speed}}</div>
            </div>
            <div class="card-content">
              <span class="iconfont icon-xihuan"></span>
              <div style="margin-left: 10px">
                <div class="line">
                  <span>{{'有功功率：'}}</span>
                  <span>{{item.activePower}}</span>
                </div>
                <div class="line">
                  <span>{{'无功功率：'}}</span>
                  <span>{{item.reactivePower}}</span>
                </div>
                <div class="line">
                  <span>{{'风机型号：'}}</span>
                  <span>{{item.type}}</span>
                </div>
              </div>
            </div>
          </div>
          <!--数量兼容-->
          <div style="width:165px;margin-right:10px"></div>
          <div style="width:165px;margin-right:10px"></div>
          <div style="width:165px;margin-right:10px"></div>
          <div style="width:165px;margin-right:10px"></div>
        </el-scrollbar>
      </div>
      <div v-if="state.curMode === 'list'">
        <el-scrollbar height="500px" @scroll="handleScroll">
          <div class="list-item" v-for="(item, index) in state.windList" :key="index">
            <div class="list-title">
              <div>{{item.name}}</div>
              <div :class="STATUS_MAP[item.status].style">{{STATUS_MAP[item.status].des}}</div>
              <div>{{item.speed}}</div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wind-status-monitor-wrapper {
  width: 100%;
  padding: 0 12px 12px 12px;
  background: var(--vt-c-content-bg);
  .wind-title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > span {
      font-size: 2.5em;
      font-weight: 700;
      color: var(--vt-c-white);
    }
  }
  .wind-content {
    width: 100%;
    height: 500px;
    padding: 0 2px 2px 22px;
    :deep(.el-scrollbar__view) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-start;
    }
    .card-box {
      width: 165px;
      height: 120px;
      margin-right: 10px;
      margin-top: 10px;
      border: 1px solid var(--vt-c-white-mute);
      cursor: pointer;
      .card-title {
        padding: 0 4px 0 4px;
        background: var(--vt-c-content3-bg);
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--vt-c-white);
        > div {
          font-weight: 700;
        }
        .green {
          font-weight: 400;
          color: var(--vt-c-green);
        }
        .red {
          font-weight: 400;
          color: var(--vt-c-red);
        }
      }
      .card-content {
        padding: 4px;
        color: var(--vt-c-white-soft);
        display: flex;
        justify-content: center;
        align-items: center;
        .gray-text {
          color: var(--vt-c-black-mute);
        }
      }
    }
    .list-item {
      width: 100%;
      height: 36px;
      margin-top: 4px;
      background: var(--vt-c-content2-bg);
      .list-title {
        height: 100%;
        padding: 0 4px 0 4px;
        background: var(--vt-c-content3-bg);
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--vt-c-white);
        > div {
          font-weight: 700;
        }
        > div:nth-child(2) {
          margin-right: 300px;
        }
        .green {
          font-weight: 400;
          color: var(--vt-c-green);
        }
        .red {
          font-weight: 400;
          color: var(--vt-c-red);
        }
      }
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
      .line1 {
        font-size: 1.5em;
        font-weight: 700;
        .unit {
          font-size: 0.5em;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
