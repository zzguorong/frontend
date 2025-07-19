<template>
  <div class="about-us">
    <div class="about-us-content">关于我们</div>
    <div class="about-us-title">
      <img src="@/assets/images/weixin.jpg" alt="" />
    </div>
    <div class="about-us-text">请使用微信扫描二维码</div>
    <div class="about-us-detail">
      <div class="about-us-detail-item">
        GAIA 是一款面向未来的 AI
        图像与空间智能平台，专为城市设计师与建筑空间领域的专业人士打造。平台由
        深石（深圳）智能科技有限公司开发，致力于通过人工智能推动设计流程革新，提升效率，释放创意潜能。
      </div>
      <div class="about-us-detail-item">
        GAIA
        以“精准生成、简易操作”为核心理念，为用户提供高质量的图像创作与视觉表达支持。平台正在构建一套贯穿方案推演、效果图生成与三维表达的智能工作流，助力空间设计迈向更高效、更开放、更可持续的未来。
      </div>
      <div class="about-us-detail-item">
        我们相信，技术的价值在于服务创造力。GAIA 将持续探索 AI
        与城市空间设计的融合边界，成为设计者灵感实现的有力工具与长期伙伴。
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.about-us {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 50px);
  .about-us-title {
    margin-top: 40px;
    border: 1px solid #ccc;
    img {
      width: 150px;
      height: 150px;
    }
  }
  .about-us-content {
    text-align: center;
    font-size: 18px;
    margin-top: 80px;
  }
  .about-us-text {
    text-align: center;
    font-size: 12px;
    margin-top: 5px;
  }
  .about-us-detail {
    font-size: 14px;
    margin-top: 20px;
    line-height: 24px;
    width: 620px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>
