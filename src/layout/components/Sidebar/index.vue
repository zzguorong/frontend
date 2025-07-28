<template>
  <div :class="{ 'has-logo': showLogo }" class="sidebar-wrapper">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu" :collapse="isCollapse" :background-color="variables.menuBg"
        :text-color="variables.menuText" :unique-opened="false" :active-text-color="variables.menuActiveText"
        :collapse-transition="false" mode="vertical" class="top-fixed-menu">
        <sidebar-item v-for="route in topRoutes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
    <!-- 底部区域容器 -->
    <div class="bottom-section">
      <!-- 底部固定菜单 -->
      <el-menu v-if="bottomRoutes.length" :default-active="activeMenu" :collapse="isCollapse"
        :background-color="variables.menuBg" :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText" :collapse-transition="false" mode="vertical"
        class="bottom-fixed-menu">
        <sidebar-item v-for="route in bottomRoutes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>

      <!-- 退出按钮 - 始终显示在底部菜单下方 -->
      <div class="logout-item" @click="handleLogout">
        <div class="icon-wrapper">
          <svg-icon icon-class="loginout" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import variables from "@/styles/variables.scss";
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
      return this.$router.options.routes;
    },
    // 新增：顶部与底部路由列表 ,跳转首页放在了顶部导航栏目
    topRoutes() {
      return this.routes.filter(
        (r) =>
          r.path !== "/" && // 过滤掉 dashboard 父路由
          !(r.meta && r.meta.fixedBottom)
      );
    },
    bottomRoutes() {
      return this.routes.filter((r) => r.meta && r.meta.fixedBottom);
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
  methods: {
    handleLogout() {
      this.$store.dispatch("user/logout").then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>
<style scoped lang="scss">
@import "~@/styles/variables.scss";

.sidebar-wrapper {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;

  /* 统一给侧边栏图标加灰色边框 */
  ::v-deep .svg-icon>use {
    border-radius: 50%;
    box-sizing: content-box;
  }
}

.el-scrollbar {
  flex: 1 1 auto;
  /* 为底部区域留出空间：3个底部菜单项 + 1个logout按钮 = 4 * 56px */
  padding-bottom: 224px;
}

.top-fixed-menu {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 11;
  width: 100%;
}

/* 底部区域容器 */
.bottom-section {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  z-index: 10;
}

.bottom-fixed-menu {
  width: 100%;
  border: none;
  /* 高度根据内部菜单项自动撑开 */
}

.logout-item {
  // 作为菜单项样式，排列在底部菜单下方
  width: 100%;
  height: 56px;
  line-height: 56px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  cursor: pointer;
  background: transparent;
  position: relative;
  padding-left: 12px;

  /* 图标容器样式 */
  .icon-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    box-sizing: border-box;
    margin-right: 5px;
    position: relative;

    ::v-deep .svg-icon {
      fill: #000 !important;
      color: #000 !important;
      position: absolute;
      top: 6px;
      left: -8px;
      width: 18px !important;
      height: 18px !important;
      margin: 0 !important;
      line-height: 1 !important;
    }

    ::v-deep .svg-icon.is-active {
      background: #000;
      color: #fff !important;
      fill: #fff !important;
      stroke: #fff !important;
    }

    &:active {

      ::v-deep .svg-icon,
      ::v-deep .svg-icon>use,
      ::v-deep .svg-icon path {
        color: #fff !important;
        fill: #fff !important;
        stroke: #fff !important;
      }
    }

    &:hover {
      background-color: #000 !important;

      .icon-wrapper {
        background-color: #000 !important;
      }

      ::v-deep .svg-icon,
      ::v-deep .svg-icon>use,
      ::v-deep .svg-icon path {
        color: #fff !important;
        fill: #fff !important;
        stroke: #fff !important;
      }
    }
  }

  /* 图标样式 */

}


/* 禁用 icon-wrapper 内图标的悬浮背景色 */
.icon-wrapper:hover .svg-icon,
.icon-wrapper:hover .svg-icon>use,
.icon-wrapper:hover .svg-icon path {
  background: none !important;
  background-color: transparent !important;
}

/* 菜单项悬浮时 icon-wrapper 背景变灰 */
::v-deep .el-menu-item:hover .icon-wrapper,
::v-deep .el-submenu__title:hover .icon-wrapper {
  background-color: #000 !important;
}

::v-deep .el-menu-item.is-active .icon-wrapper,
::v-deep .el-submenu__title.is-active .icon-wrapper {
  background-color: #666 !important;
}

/* 侧边栏折叠时，让圆框本身在菜单宽度中居中 */
::v-deep .el-menu--collapse .icon-wrapper {
  margin-left: auto !important;
  margin-right: auto !important;
}

/* 让菜单项内容居中显示，使圆框在菜单项中居中 */
::v-deep .el-menu-item {
  display: flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
  height: 50px !important;
}

/* 折叠状态下菜单项居中 */
::v-deep .el-menu--collapse .el-menu-item {
  justify-content: center !important;
}

/* 子菜单标题也居中 */
::v-deep .el-menu--collapse .el-submenu__title {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
</style>
