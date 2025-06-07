<template>
  <div class="generate-show">
    <!-- 顶部栏 -->
    <div class="header">
      <span class="logo">图标</span>
      <div class="step-bar">
        <el-steps :active="2" finish-status="success" simple>
          <el-step title="2025-06-01-A新建追加项目"></el-step>
        </el-steps>
        <div class="user-info">
          <span>微信用户ID:142865652</span>
          <el-button type="primary" size="small">订设计单</el-button>
          <el-avatar icon="el-icon-user"></el-avatar>
        </div>
      </div>
    </div>

    <div class="main-content">
      <!-- 左侧大图区域 -->
      <div class="main-image">
        <img :src="mainImage" class="image" />
        <div class="image-nav">
          <el-button icon="el-icon-arrow-left" @click="prevImage" circle></el-button>
          <el-button icon="el-icon-arrow-right" @click="nextImage" circle></el-button>
        </div>
        <el-button class="to-bg-btn" type="primary" @click="transferToBg">传输到底图</el-button>
      </div>

      <!-- 右侧参数栏 -->
      <div class="side-panel">
        <!-- 图片列表 -->
        <div class="image-list">
          <div class="list-title">画廊</div>
          <el-scrollbar style="height: 400px;">
            <div v-for="(img, idx) in imageList" :key="idx" class="img-item">
              <img :src="img" />
              <el-button icon="el-icon-delete" @click="removeImage(idx)" circle size="mini"></el-button>
            </div>
            <div class="img-item date-label">2025-06-01</div>
          </el-scrollbar>
        </div>

        <!-- 生成参数 -->
        <div class="params-panel">
          <div class="params-title">生成参数</div>
          <el-form :model="params" label-width="80px" size="mini">
            <el-form-item label="提示词">
              <el-input type="textarea" v-model="params.prompt" :rows="2"></el-input>
            </el-form-item>
            <el-form-item label="基础模型">
              <el-button size="mini">人脸模型</el-button>
              <el-button size="mini">XXX</el-button>
              <el-button size="mini">XXX</el-button>
            </el-form-item>
            <el-form-item label="参考模型权重">
              <el-input-number v-model="params.refModelWeight" :min="1" :max="10"></el-input-number>
            </el-form-item>
            <el-form-item label="参考材质权重">
              <el-input-number v-model="params.refMaterialWeight" :min="1" :max="10"></el-input-number>
            </el-form-item>
            <el-form-item label="底图模型权重">
              <el-input-number v-model="params.bgModelWeight" :min="1" :max="10"></el-input-number>
            </el-form-item>
            <el-form-item label="底图材质权重">
              <el-input-number v-model="params.bgMaterialWeight" :min="1" :max="10"></el-input-number>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveParams">保留参数</el-button>
            </el-form-item>
          </el-form>
        </div>

        <!-- 语义分割元素 -->
        <div class="semantic-panel">
          <div class="params-title">语义分割元素</div>
          <div class="semantic-box">
            <div>线稿图</div>
            <div class="semantic-img"></div>
          </div>
          <div class="semantic-box">
            <div>语义分割图</div>
            <div class="semantic-img"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GenerateShow",
  data() {
    return {
      mainImage: "https://img.zcool.cn/community/01b6c95d7b2e5fa801216518a6e7e2.jpg", // 示例图片
      imageList: [
        "https://img.zcool.cn/community/01b6c95d7b2e5fa801216518a6e7e2.jpg",
        "https://img.zcool.cn/community/01b6c95d7b2e5fa801216518a6e7e2.jpg",
        "https://img.zcool.cn/community/01b6c95d7b2e5fa801216518a6e7e2.jpg"
      ],
      params: {
        prompt: "现代的人大场景，整洁明亮，牙科椅，茶色墙，宽敞的灯光，流行设计，自然光，整洁，整齐，白色，反光，口腔科，明亮，牙科设备，开放布局，玻璃窗户",
        refModelWeight: 5,
        refMaterialWeight: 8,
        bgModelWeight: 5,
        bgMaterialWeight: 8
      }
    };
  },
  methods: {
    prevImage() {
      // 切换上一张图片
    },
    nextImage() {
      // 切换下一张图片
    },
    transferToBg() {
      this.$message.success("已传输到底图！");
    },
    removeImage(idx) {
      this.imageList.splice(idx, 1);
    },
    saveParams() {
      this.$message.success("参数已保存！");
    }
  }
};
</script>

<style scoped>
.generate-show {
  background: #f6f6f6;
  min-height: 100vh;
  padding: 40px 0 0 0;
}
.header {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 16px 40px;
  border-radius: 6px;
  margin: 0 40px 24px 40px;
  justify-content: space-between;
}
.logo {
  font-size: 24px;
  font-weight: bold;
  margin-right: 40px;
}
.step-bar {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}
.main-content {
  display: flex;
  margin: 0 40px;
}
.main-image {
  flex: 2;
  background: #fff;
  border-radius: 6px;
  margin-right: 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 600px;
}
.main-image .image {
  width: 90%;
  height: 400px;
  object-fit: cover;
  opacity: 0.5;
  border-radius: 6px;
  margin-top: 32px;
}
.image-nav {
  position: absolute;
  left: 50%;
  bottom: 80px;
  transform: translateX(-50%);
  display: flex;
  gap: 16px;
}
.to-bg-btn {
  margin: 40px auto 0 auto;
  display: block;
  width: 180px;
  font-size: 18px;
  font-weight: bold;
}
.side-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.image-list {
  width:25%;
  background: #fff;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 8px;
}
.list-title {
  font-weight: bold;
  margin-bottom: 8px;
}
.img-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  position: relative;
}
.img-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 8px;
  background: #f0f0f0;
}
.img-item .el-button {
  position: absolute;
  right: 0;
  top: 0;
}
.img-item.date-label {
  font-size: 14px;
  color: #333;
  margin: 8px 0;
  justify-content: flex-start;
}
.params-panel {
  width:75%;
  background: #fff;
  border-radius: 6px;
  padding: 12px;
}
.params-title {
  font-weight: bold;
  margin-bottom: 8px;
}
.semantic-panel {
  background: #fff;
  border-radius: 6px;
  padding: 12px;
  margin-top: 8px;
}
.semantic-box {
  margin-bottom: 12px;
}
.semantic-img {
  width: 80px;
  height: 60px;
  background: #f0f0f0;
  border-radius: 4px;
  margin-top: 4px;
}
</style>