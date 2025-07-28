<template>
  <!-- 第一版：默认顶栏 -->
  <header v-if="!$route.meta.hideHeader" class="top-nav-bar">
    <!-- 左侧 logo -->
    <div class="logo" @click="goHome">
      <img src="../../assets/images/logo.png" alt="Logo">
    </div>
    <!-- 右侧订阅计划按钮 -->
    <button class="subscribe-btn" @click="goSubscribe">订阅计划</button>
  </header>
  <!-- 第二版：简化版/替代顶栏 -->
  <header v-else class="simple-header">
    <!-- 左侧 logo -->
    <div class="logo" @click="goHome">
      <img src="../../assets/images/dashorard-logo.png" alt="Logo">

    </div>
    <div class="header-actions-container">
      <div class="header-action-wrapper">
        <el-button size="large" class="action-btn" @click.native.prevent="handleLogin">
          LOG IN
        </el-button>
      </div>
      <div class="header-action-wrapper">
        <el-button type="primary" size="large" class="action-btn" @click.native.prevent="handleGenerate">TRY
          GAIA
        </el-button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TopNavBar',
  methods: {
    goHome() {
      this.$router.push({ name: 'Dashboard' });
    },
    goSubscribe() {
      this.$router.push({ name: 'SubscriptionInterface' });
    },
    handleLogin() {
      this.$router.push('/login');
    },
    handleGenerate() {
      this.$router.push('/generate');
    }
  }

};
</script>

<style lang="scss" scoped>
.top-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  /* 确保导航在最上层 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #e5e5e5;
  box-sizing: border-box;
}

.logo,
.logo img {
  height: 40px;
  cursor: pointer;
}

.subscribe-btn {
  background: #000;
  color: #fff;
  padding: 8px 30px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
}

.subscribe-btn:hover {
  background: #333;
}

.simple-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  /* 确保导航在最上层 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;

  box-sizing: border-box;
  padding: 35px 65px 0 3vw;

.header-actions-container{
  display: flex;
}

  .header-action-wrapper {
    display: flex;
    justify-content: center;

    .action-btn {
      width: fit-content;
            height: 40px;
            line-height: 13px;
            border-radius: 25px;
            font-size: 28px;
            padding: 0 38px 0 38px;

    }
  }
}
::v-deep .el-button {
  background:unset;
  border: unset;
  width: 100px;
  color: #000;
}

::v-deep .el-button--primary {
  background: #000 !important;
  border-color: #000 !important;
  width: 200px;
  color: #fff;
}
</style>
