<template>
  <div class="main-container">
    <!-- 顶部栏 -->
    <div class="header">
      <div class="logo">
        <span class="logo-title">图标</span>
        <span class="logo-desc">名字</span>
      </div>
      <div class="header-menu">
        <el-link>首页</el-link>
        <el-link>生成界面</el-link>
        <el-link>关于我们</el-link>
        <el-button type="primary" size="small" class="subscribe-btn">订阅计划</el-button>
        <el-avatar icon="el-icon-user-solid" size="small" class="avatar"/>
      </div>
    </div>
    <div class="content">
      <!-- 左侧栏 -->
      <div class="left-panel">
        <el-card class="section">
          <div class="label">提示词</div>
          <el-input
            v-model="prompt"
            placeholder="所输入内容将作为图像描述，生成结果将基于描述"
            maxlength="75"
            show-word-limit
          />
        </el-card>
        <el-card class="section">
          <div class="label">视角类型</div>
          <el-select v-model="viewType" placeholder="平面图" style="width: 100%;">
            <el-option label="平面图" value="平面图"></el-option>
            <el-option label="侧视图" value="侧视图"></el-option>
          </el-select>
        </el-card>
        <el-card class="section">
          <div class="label">风格类别</div>
          <el-select v-model="styleType" placeholder="选择" style="width: 100%;">
            <el-option label="透明" value="透明"></el-option>
            <el-option label="写实" value="写实"></el-option>
          </el-select>
        </el-card>
        <el-card class="section">
          <div class="label">上传底图</div>
          <el-upload
            class="upload-demo"
            action="#"
            :show-file-list="false"
          >
            <el-button size="small" type="primary">+</el-button>
          </el-upload>
          <div style="margin-top: 10px;">
            <span>控制程度</span>
            <el-slider v-model="controlValue" :min="0" :max="10" style="width: 100px;"></el-slider>
          </div>
          <div style="margin-top: 10px;">
            <span>材质固定</span>
            <el-slider v-model="materialValue" :min="0" :max="10" style="width: 100px;"></el-slider>
          </div>
        </el-card>
        <el-card class="section">
          <div class="label">风格迁移</div>
          <el-switch v-model="styleTransfer"></el-switch>
          <el-upload
            class="upload-demo"
            action="#"
            :show-file-list="false"
            style="margin-top: 10px;"
          >
            <el-button size="small" type="primary">+</el-button>
          </el-upload>
        </el-card>
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
        <div class="generate-row">
          <el-button type="primary" @click="generate" class="generate-btn">点击生成</el-button>
          <div class="task-count">
            <span>生成图片数量</span>
            <el-slider v-model="taskCount" :min="1" :max="10" style="width: 100px; margin: 0 10px;"></el-slider>
            <span>{{ taskCount }}</span>
          </div>
        </div>
        <div class="download-row">
          <el-button @click="download('jpg')">JPG下载</el-button>
          <el-button @click="download('psd')">PSD下载</el-button>
        </div>
        <!-- 气泡提示示例 -->
        <el-popover
          v-model="showTip"
          placement="top"
          width="200"
          trigger="manual"
        >
          <div>{{ tipText }}</div>
        </el-popover>
      </div>
      <!-- 右侧栏 -->
      <div class="right-panel">
        <div class="section">
          <div class="label">语义分割元素
            <el-switch v-model="semanticSwitch" style="float: right;"></el-switch>
          </div>
          <div class="semantic-tools">
            <el-button-group>
              <el-button icon="el-icon-edit" size="mini"></el-button>
              <el-button icon="el-icon-brush" size="mini"></el-button>
              <el-button icon="el-icon-upload" size="mini">上传语义分割图</el-button>
            </el-button-group>
            <el-button type="primary" size="mini" style="margin-left: 10px;">保存</el-button>
          </div>
          <el-card class="semantic-list" style="margin-top: 10px;">
            <el-tag type="success" style="margin-bottom: 5px;">水井</el-tag>
          </el-card>
        </div>
        <el-card class="section">
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
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      prompt: '',
      viewType: '',
      styleType: '',
      controlValue: 5,
      materialValue: 5,
      styleTransfer: false,
      imageUrl: '',
      taskCount: 5,
      semanticSwitch: false,
      showTip: false,
      tipText: '这里是气泡提示内容'
    }
  },
  methods: {
    generate() {
      this.$message.success('点击了生成按钮！');
      this.showTip = true;
      this.tipText = '图片生成中...';
      setTimeout(() => {
        this.showTip = false;
      }, 2000);
    },
    download(type) {
      this.$message.success(`点击了${type.toUpperCase()}下载`);
    }
  }
}
</script>

<style scoped>
.main-container {
  background: #f5f6fa;
  min-height: 100vh;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 40px 0 40px;
  background: #fff;
  border-bottom: 1px solid #eee;
}
.logo-title {
  font-size: 22px;
  font-weight: bold;
  border-bottom: 2px solid #233a5b;
  margin-right: 8px;
}
.logo-desc {
  color: #888;
  font-size: 14px;
}
.header-menu {
  display: flex;
  align-items: center;
  gap: 18px;
}
.subscribe-btn {
  margin-left: 18px;
}
.avatar {
  margin-left: 18px;
}
.content {
  display: flex;
  padding: 30px 40px;
}
.left-panel, .right-panel {
  width: 30%;
  min-width: 220px;
  padding:0 30px;
}
.center-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 30px;
}
.section {
  margin-bottom: 24px;
}
.label {
  font-size: 15px;
  color: #233a5b;
  margin-bottom: 10px;
  font-weight: bold;
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
.generate-row {
  margin-top: 30px;
  display: flex;
  align-items: center;
}
.generate-btn {
  width: 200px;
  background: #b6f7fa;
  color: #333;
}
.task-count {
  margin-left: 20px;
  display: flex;
  align-items: center;
}
.download-row {
  margin-top: 18px;
  display: flex;
  gap: 16px;
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
.semantic-tools {
  margin-top: 8px;
  display: flex;
  align-items: center;
}
.semantic-list {
  min-height: 60px;
}
</style> 