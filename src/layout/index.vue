<template>
  <div :class="classObj" class="app-wrapper">
    <!-- 顶部导航栏 -->
    <!-- 首页、生图页面、我的项目页面增加顶栏 -->
    <div class="fixed-header top-header-wrapper">
      <top-nav-bar @subscribe="goSubscribe" />
    </div>

    <!-- 内容区域 -->
    <div class="content-wrapper">
      <!-- 遮罩（仅在移动端且侧边栏打开时显示） -->
      <div
        v-if="device === 'mobile' && sidebar.opened"
        class="drawer-bg"
        @click="handleClickOutside"
      />
      <!-- 左侧侧边栏 -->
      <sidebar class="sidebar-container" />
      <!-- 主内容 -->
      <div class="main-container">
        <app-main />
      </div>
    </div>
  </div>
</template>

<script>
import { AppMain, Sidebar, TopNavBar } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Sidebar,
    AppMain,
    TopNavBar
  },
  mixins: [ResizeMixin],
  data() {
    return {
      headerHeight: 60 // 与 TopNavBar 高度一致
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    // 点击遮罩层时关闭侧边栏
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    // 订阅按钮跳转
    goSubscribe() {
      this.$router.push({ name: 'SubscribePlan' }) // 根据你的路由改
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

$appHeaderHeight: 60px; // 与 TopNavBar 高度一致

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: #F2F2F2;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

/* 移动端遮罩 */
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 998;
}

/* 顶部导航栏容器 */
.top-header-wrapper {
  width: 100%;
  height: $appHeaderHeight;
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
  z-index: 999;
  line-height: $appHeaderHeight;
}

/* 固定头部 */
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
}

/* 内容区域 */
.content-wrapper {
  display: flex;
  height: 100%;
  padding-top: calc(10px + #{$appHeaderHeight});// 10px + $HeaderHeight; // 留出顶部导航高度
  box-sizing: border-box;
}

/* 左侧侧边栏 */
.sidebar-container {
  height: calc(100vh - #{$appHeaderHeight}); /* 明确高度 */
  position: fixed;
  top: calc(10px + #{$appHeaderHeight});
  left: 0;
  bottom: 0;
  width: $sideBarWidth; // 从 variables.scss 获取
  background-color: #2d3a4b;
  z-index: 100;
  transition: width 0.28s;
}

/* 主内容 */
.main-container {
  flex: 1;
  margin-left: $sideBarWidth;
  padding: 0 20px 0 20px;
  transition: margin-left 0.28s;
  min-height: calc(100vh - #{$appHeaderHeight} - 20px);
  box-sizing: border-box;
  overflow-y: auto;
}

/* 折叠状态 */
.hideSidebar .main-container {
  margin-left: 54px;
}
.hideSidebar .sidebar-container {
  width: 54px;
}
</style>
