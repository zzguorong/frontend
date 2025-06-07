<template>
  <div class="main-container">
    <!-- 左侧栏 -->
    <div class="left-panel">
      <div class="section">
        <div class="label">提示词</div>
        <el-input
          v-model="prompt"
          placeholder="输入提示词"
          maxlength="75"
          show-word-limit
        />
        <div style="margin: 10px 0;">
          <el-select v-model="presetPrompt" placeholder="预设提示词" style="width: 100px;">
            <el-option label="渲染" value="渲染"></el-option>
            <el-option label="风格" value="风格"></el-option>
          </el-select>
        </div>
      </div>
      <div class="section">
        <div class="label">上传参考图</div>
        <el-upload
          class="upload-demo"
          action="#"
          :show-file-list="false"
        >
          <el-button size="small" type="primary">+</el-button>
        </el-upload>
        <el-slider v-model="referenceValue" :min="0" :max="10" style="width: 120px; margin-top: 10px;"></el-slider>
      </div>
      <div class="section">
        <div class="label">风格模板</div>
        <el-card style="width: 100px;">Lora</el-card>
      </div>
      <div class="section">
        <div class="label">视角</div>
        <el-select v-model="view" placeholder="平面图" style="width: 120px;">
          <el-option label="平面图" value="平面图"></el-option>
          <el-option label="侧视图" value="侧视图"></el-option>
        </el-select>
      </div>
    </div>
    <!-- 中间内容 -->
    <div class="center-panel">
      <div class="image-preview">
        <img v-if="imageUrl" :src="imageUrl" alt="预览图" style="max-width:100%; max-height:100%; opacity:0.5;" />
        <div v-else style="color:#bbb;">图片预览区</div>
      </div>
      <div class="preview-thumbs">
        <div v-for="n in 5" :key="n" class="thumb"></div>
      </div>
      <div style="margin-top: 30px; display: flex; align-items: center;">
        <el-button type="primary" @click="generate" style="width: 200px; background: #b6f7fa; color: #333;">生成</el-button>
        <div style="margin-left: 20px; display: flex; align-items: center;">
          <span>总可执行任务数量</span>
          <el-slider v-model="taskCount" :min="1" :max="10" style="width: 100px; margin: 0 10px;"></el-slider>
          <span>{{ taskCount }}</span>
        </div>
      </div>
    </div>
    <!-- 右侧栏 -->
    <div class="right-panel">
      <el-button type="danger" style="margin-bottom: 20px; width: 80px;">返回</el-button>
      <div class="section">
        <div class="label">历史记录</div>
        <div class="history-list">
          <el-card v-for="item in 4" :key="item" class="history-card">
            <div style="height: 60px; background: #eaf6fa; border-radius: 8px;"></div>
            <div style="display: flex; justify-content: flex-end; margin-top: 5px;">
              <el-button icon="el-icon-star-off" size="mini" circle></el-button>
              <el-button icon="el-icon-delete" size="mini" circle></el-button>
            </div>
          </el-card>
        </div>
      </div>
      <div class="section">
        <div class="label">材质固定</div>
        <el-slider v-model="materialValue" :min="0" :max="10" style="width: 120px;"></el-slider>
      </div>
      <div class="section">
        <div class="label">风格迁移</div>
        <el-upload
          class="upload-demo"
          action="#"
          :show-file-list="false"
        >
          <el-button size="small" type="primary">+</el-button>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      prompt: '',
      presetPrompt: '',
      referenceValue: 5,
      view: '',
      imageUrl: '', // 预览图
      taskCount: 5,
      materialValue: 5
    }
  },
  methods: {
    generate() {
      this.$message.success('点击了生成按钮！')
    }
  }
}
</script>

<style scoped>
.main-container {
  display: flex;
  height: 100vh;
  background: #fafafa;
}
.left-panel, .right-panel {
  width: 30%;
  min-width: 220px;
  padding: 30px 20px 0 20px;
  box-sizing: border-box;
}
.center-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.section {
  margin-bottom: 30px;
}
.label {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}
.image-preview {
  width: 600px;
  height: 400px;
  background: #f5f5f5;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px #eee;
}
.preview-thumbs {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
.thumb {
  width: 60px;
  height: 40px;
  background: #d6eaf8;
  border-radius: 8px;
  margin: 0 8px;
  opacity: 0.5;
}
.history-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 10px;
}
.history-card {
  padding: 8px;
  min-height: 90px;
}
</style> 