<template>
  <header class="top-nav-bar">
    <!-- 左侧 logo -->
    <div class="logo" @click="goHome">
  <img src="../../assets/images/logo.png" alt="Logo" />
</div>
    <!-- 右侧订阅计划按钮 -->
    <button class="subscribe-btn" @click="goSubscribe">订阅计划</button>
  </header>
</template>

<script>
export default {
  name: "TopNavBar",
  methods: {
    goHome() {
    this.$router.push({ name: 'Dashboard' });
    },
    goSubscribe(){
      this.$router.push({ name: 'SubscriptionInterface' });
    }
  }
 
};
</script>

<style scoped>
.top-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000; /* 确保导航在最上层 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #e5e5e5;
  box-sizing: border-box;
}

.logo , .logo img {
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
</style>
