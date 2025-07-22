<template>
  <div v-if="visible" class="global-mask">
    <div class="content">
      <div class="spinner"></div>
      <div class="text">{{ text }}</div>
    </div>
  </div>
</template>


<script>
export default {
  name: "GlobalMask",
  data() {
    return {
      visible: false,
      text: "加载中...",
    };
  },
  watch: {
    visible(newMode){
console.log(newMode,'newMode')
    }
  },
  methods: {
    show(message = "加载中...") {
      this.text = message;
      this.visible = true;
    },
    hide() {
      this.visible = false;
      console.log(this.visible);
    },
    updateText(newText) {
      if (this.visible) {
        this.text = newText;
      }
    },
  },
};
</script>

<style scoped>
/* 样式不变 */
.global-mask {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2147483647; /* 最大值 */
  pointer-events: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  user-select: none;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

.text {
  font-size: 16px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
