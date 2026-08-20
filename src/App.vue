<template>
  <div class="app-shell">
    <!-- Sidebar Navigation -->
    <nav class="sidebar" aria-label="主导航">
      <!-- Logo mark -->
      <div class="sidebar-brand">
        <div class="brand-icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
        </div>
      </div>

      <!-- Nav items -->
      <div class="sidebar-nav">
        <router-link
          v-for="(item, index) in state.menuList"
          :key="index"
          :to="item.path"
          class="nav-item"
          :class="{ 'nav-item--active': index === state.activePage }"
          :aria-label="item.name"
          :title="item.name"
          @click="changeActive(index)"
        >
          <!-- Wind Farm icon -->
          <span class="nav-icon" aria-hidden="true">
            <svg v-if="index === 0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="2"/>
              <path d="M12 10V4"/>
              <path d="M14.2 13.1L19 10"/>
              <path d="M9.8 13.1L5 10"/>
              <path d="M12 14v6"/>
            </svg>
            <!-- Turbine detail icon -->
            <svg v-else-if="index === 1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2"/>
              <path d="M8 21h8"/>
              <path d="M12 17v4"/>
              <path d="M7 8h4"/>
              <path d="M7 11h4"/>
              <path d="M13 8h4v4h-4z"/>
            </svg>
            <!-- Generic icon -->
            <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
            </svg>
          </span>
          <span class="nav-label">{{ item.name }}</span>
          <!-- Active indicator -->
          <span class="nav-active-bar" aria-hidden="true"></span>
        </router-link>
      </div>

      <!-- Bottom decorative element -->
      <div class="sidebar-footer" aria-hidden="true">
        <div class="sidebar-dot"></div>
        <div class="sidebar-dot sidebar-dot--dim"></div>
        <div class="sidebar-dot sidebar-dot--dim"></div>
      </div>
    </nav>

    <!-- Main content area -->
    <div class="main-area">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { reactive, onMounted, getCurrentInstance } from 'vue'
import { getMenu } from '@/model/system'

const state = reactive({
  menuList: [],
  activePage: 0
})

const ins = getCurrentInstance()

onMounted(async () => {
  await getMenu({ userId: 1 }, res => {
    state.menuList = res
  })
  ins.proxy.$eventBus.on('router-change', () => {
    state.activePage = 1
  })
})

const changeActive = index => {
  state.activePage = index
}
</script>

<style lang="scss" scoped>
/* ── Shell layout ── */
.app-shell {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: var(--color-background);
  background-image:
    radial-gradient(ellipse 80% 60% at 50% 0%, rgba(56, 189, 248, 0.06) 0%, transparent 60%),
    radial-gradient(ellipse 40% 40% at 10% 80%, rgba(139, 92, 246, 0.05) 0%, transparent 50%);
}

/* ── Sidebar ── */
.sidebar {
  width: 68px;
  height: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 var(--space-4);
  background: rgba(8, 14, 26, 0.80);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-right: 1px solid var(--color-border-subtle);
  position: relative;
  z-index: 10;

  /* Subtle top-to-bottom gradient line on the right edge */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: -1px;
    width: 1px;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(56, 189, 248, 0.35) 30%,
      rgba(139, 92, 246, 0.25) 70%,
      transparent 100%
    );
  }
}

/* ── Brand mark ── */
.sidebar-brand {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-bottom: 1px solid var(--color-divider);
  margin-bottom: var(--space-3);
}

.brand-icon {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(139, 92, 246, 0.15));
  border: 1px solid rgba(56, 189, 248, 0.25);
  border-radius: var(--radius-md);
  color: var(--color-primary);
}

/* ── Nav items ── */
.sidebar-nav {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  padding: 0 var(--space-2);
  overflow-y: auto;
  overflow-x: hidden;
}

.nav-item {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: var(--space-2) var(--space-1);
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  text-decoration: none;
  cursor: pointer;
  transition: color var(--transition-fast), background var(--transition-fast);
  min-height: 52px;

  &:hover {
    color: var(--color-text-secondary);
    background: var(--glass-bg-hover);
  }

  &--active {
    color: var(--color-primary);
    background: rgba(56, 189, 248, 0.08);

    .nav-active-bar {
      opacity: 1;
      transform: scaleY(1);
    }

    .nav-icon svg {
      filter: drop-shadow(0 0 4px rgba(56, 189, 248, 0.50));
    }
  }
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}

.nav-label {
  font-family: var(--font-body);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.04em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 56px;
  text-align: center;
}

/* Active side accent bar */
.nav-active-bar {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%) scaleY(0);
  width: 2px;
  height: 24px;
  background: linear-gradient(to bottom, var(--color-primary), var(--color-violet));
  border-radius: 0 var(--radius-full) var(--radius-full) 0;
  opacity: 0;
  transition: opacity var(--transition-base), transform var(--transition-base);
}

/* ── Sidebar footer dots ── */
.sidebar-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding-bottom: var(--space-2);
}

.sidebar-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--color-primary);

  &--dim {
    background: var(--color-text-muted);
    opacity: 0.4;
  }
}

/* ── Main area ── */
.main-area {
  flex: 1;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
</style>
