<template>
  <div class="slider-wrapper">
    <div
      class="slider"
      ref="slider"
      @mousedown="startDrag"
      @click="onTrackClick"
    >
      <div
        class="slider-bar"
        :style="{ width: computedPercentage + '%' }"
      ></div>
      <div
        class="slider-dot"
        :style="{ left: computedPercentage + '%' }"
      ></div>
    </div>
    <span class="slider-value">{{ percentage }}</span>
  </div>
</template>

<script>
export default {
  name: 'DraggableProgress',
  props: {
    percentage: {
      type: Number,
      default: 0 // 0-10
    },
    range: {
      type: Number,
      default: 0 // 0-10
    },
  },
  data() {
    return {
      dragging: false
    }
  },
  computed: {
    computedPercentage() {
      if(this.range===5){
        return Math.min(100, Math.max(1, (this.percentage /5) * 100))
      }
      // 将刻度 0-10 映射到 0-100%
      return Math.min(100, Math.max(0, (this.percentage / 10) * 100))
    }
  },
  mounted() {
    document.addEventListener('mousemove', this.onDrag)
    document.addEventListener('mouseup', this.stopDrag)
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.onDrag)
    document.removeEventListener('mouseup', this.stopDrag)
  },
  methods: {
    startDrag(e) {
      this.dragging = true
      this.updateByEvent(e)
      e.preventDefault()
    },
    onDrag(e) {
      if (!this.dragging) return
      this.updateByEvent(e)
    },
    stopDrag() {
      this.dragging = false
    },
    onTrackClick(e) {
      // 若不是拖动中的 mouseup，再次计算
      if (!this.dragging) this.updateByEvent(e)
    },
    updateByEvent(e) {
      const track = this.$refs.slider
      const rect = track.getBoundingClientRect()
      const offset = Math.min(Math.max(0, e.clientX - rect.left), rect.width)
      const percent = offset / rect.width // 0-1
      // 根据不同 range 计算刻度值
      let value
      if (this.range === 5) {
        // 1-5 的整数范围（最小为 1，最大为 5）
        value = Math.max(1, Math.round(percent * 5))
      } else {
        // 默认 0-10
        value = Math.round(percent * 10)
      }
      this.$emit('update:percentage', value)
    }
  }
}
</script>

<style scoped>
.slider-wrapper {
  display: flex;
  align-items: center;
  width:150px;
  border-radius:2px;
  gap: 8px;
}

.slider {
  position: relative;
  width: 150px;
  height: 3px;
  background: #e4e4e4;
  cursor: pointer;
  user-select: none;
  border-radius:2px;
}

.slider-bar {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: #000;
  border-radius:2px;
}

.slider-dot {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #fff;
  border:1px solid #000;
  pointer-events: none;
}

.slider-value {
  font-size: 12px;
  color: #000;
  min-width: 14px;
  text-align: center;
}
</style>
