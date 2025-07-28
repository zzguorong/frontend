<template>
  <div class="scroll-container">
    <!-- 第一屏 -->
    <section class="fullscreen-section">
      <!-- 背景图 -->
      <div class="fullscreen-text title-main">GAIAHubs: Spatial AIGC</div>
      <div class="fullscreen-text subtitle">空间的想象，AI来实现</div>
      <div class="fullscreen-text description">草图，生图，语义分割一站式生成支持PSD分层

      </div>
      <div class="fullscreen-text description">覆盖鸟瞰、人视、平面、室内，重塑你的图像工作流</div>
      <!-- 按钮 -->
      <div class="generate-btn-wrapper">
        <el-button size="large" class="generate-btn" @click.native.prevent="handleGenerate">
          开始创作
        </el-button>
      </div>
    </section>

    <!-- 第二屏 -->
    <section class="normal-section">
      <div class="section-content no-gap">
        <!-- 左图 -->
        <div class="image-block-left">
          <div class="image-text">
            <div class="title">鸟瞰图</div>
            <div class="title">人视图</div>
            <div class="title">平面图</div>
            <div class="title">室内图</div>
          </div>
        </div>

        <!-- 右图 -->
        <div class="image-block-right" />
      </div>
    </section>

    <!-- 第三屏 -->
    <section class="normal-section">
      <div class="section-content no-gap">
        <!-- 左图 -->
        <div class="image-block-3-left">
          <div class="core-functions">
            <h2 class="title">核心功能</h2>
            <ul class="function-list">
              <li class="function-item">
                <h3 class="item-title">
                  <div class="item-title-text">
                    PSD下载 + 语义分割
                  </div>
                </h3>
                <p class="item-desc">可后期编辑，支持专业制图</p>
              </li>
              <li class="function-item">
                <h3 class="item-title">支持草图 / 关键词 / 模型图生成</h3>
                <p class="item-desc">多方式嵌入，适配不同工作流</p>
              </li>
              <li class="function-item">
                <h3 class="item-title">多视角场景覆盖</h3>
                <p class="item-desc">鸟瞰、人视、室内、平面一网打尽</p>
              </li>
              <li class="function-item">
                <h3 class="item-title">快速响应云端生成</h3>
                <p class="item-desc">不限设备，无需安装</p>
              </li>
            </ul>
          </div>
        </div>

        <!-- 右图 -->
        <div class="image-block-3-right" />
      </div>
    </section>

    <!-- 第四屏 -->
    <section class="normal-section">
      <div class="section-content no-gap full-section">
        <!-- 上半部分：三项功能 -->
        <div class="image-block-4-left">
          <div class="features-row">
            <div class="feature-item">
              <div class="icon-wrapper"><svg-icon icon-class="imageToVideo" class="icon" /></div>
              <div class="title">图转视频</div>
              <div class="desc">一张图转换成动态视频效果，身临其境</div>
            </div>
            <div class="feature-item">
              <div class="icon-wrapper"><svg-icon icon-class="AIdialogue" class="icon" /></div>

              <div class="title">AI对话式设计</div>
              <div class="desc">输入项目意图，和AI共同探索方案思路、风格方向</div>
            </div>
            <div class="feature-item">
              <div class="icon-wrapper"><svg-icon icon-class="AImodeling" class="icon" /></div>

              <div class="title">图转3D模型</div>
              <div class="desc">一张图生成可编辑的3D模型，反向捕捉空间关系</div>
            </div>
          </div>
        </div>

        <!-- 下半部分：页脚 -->
        <div class="image-block-4-right">
          <div class="footer-info">
            <img class="logo" src="@/assets/images/dashorard-logo-white.png">
            <p class="desc">
              GAIAHubs 是空间领域的AI工具平台，集成 AIGC 生成、语义分割与智能识别功能，助力高效完成设计草图、空间分析与图像处理，提升设计师与团队的创作效率。
            </p>
            <p class="contact">电子邮箱：contact@gaiass.com</p>
            <p class="address">公司地址：深圳市南山区粤海街道高新区社区科技南八路2号豪威科技大厦15F</p>

          </div>
          <p class="copyright">©2025 深石（深圳）智能科技有限公司版权所有</p>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name'])
  },
  methods: {
    handleGenerate() {
      this.$router.push('/generate');
    }
  }
};
</script>

<style lang="scss" scoped>
/* 禁止页面所有文字选中，鼠标光标显示普通箭头 */
* {
  user-select: none !important;
  /* 禁止选中 */
  cursor: default !important;
  /* 光标为默认箭头 */
}

.scroll-container {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory; // 开启纵向滚动吸附，强制吸附
  scroll-behavior: smooth; // 平滑滚动（非必须）

  /* 隐藏滚动条 */
  -ms-overflow-style: none;
  /* IE/Edge */
  scrollbar-width: none;
  /* Firefox */
}

.scroll-container::-webkit-scrollbar {
  display: none;
  /* Chrome Safari */
}

section {
  height: 100vh;
  scroll-snap-align: start; // 每一屏幕吸附到顶部对齐
  position: relative; // 每屏占满整个视口高度
}

/* 第一屏 */

.fullscreen-section {
  background: url('~@/assets/images/dashboard-1.jpg') no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15vw;

  .fullscreen-text {
    color: #fff;
  }

  .title-main {
    font-size: 72px;
    color: #fff;
    font-family: 'Lora', serif;
    font-weight: 700;
    line-height: 101px
  }

  .subtitle {
    margin-top: 3vw;
    margin-bottom: 22px;
    font-size: 48px;
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: bold;
    line-height: 68px
  }

  .description {
    font-size: 20px;
    margin-bottom: 10px;
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: bold;
    line-height: 28px
  }

  .generate-btn-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 11vw;

    .generate-btn {
      height: 60px;
      line-height: 13px;
      border-radius: 25px;
      font-size: 28px;
      padding: 0 38px 0 38px;

    }
  }

  ::v-deep .el-button {
    background: #fff !important;
    width: 475px;
    color: #000;
  }
}

.normal-section {
  position: relative;
  height: 100vh;
  /* background: #000; */
}

.section-content.no-gap {
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 100px 80px 50px 50px;
  box-sizing: border-box;
}

.image-block-left {
  height: 100%;
  background: url('~@/assets/images/002.jpg') no-repeat center center;
  background-size: cover;
  width: 130px;

  .image-text {

    color: #fff;
    font-size: 28px;

    writing-mode: vertical-rl;
    /* 从上到下，从右到左 */
    text-orientation: upright;
    /* 每个字符直立显示（推荐） */
    display: flex;
    padding-bottom: 80px;

    height: 100%;
    justify-content: space-evenly;
    width: 100%;
    align-items: anchor-center;
    font-family: 'Lora', serif;
    font-weight: 700;

    .title {
      border-right: 5px solid #fff;
      padding: 10px;
    }
  }
}

.image-block-right {
  height: 100%;
  background: url('~@/assets/images/dashboard-2.jpg') no-repeat center center;
  background-size: cover;
  width: 100%;
}

.image-block-3-left {
  height: 100%;
  background: url('~@/assets/images/003.jpg') no-repeat center center;
  background-size: cover;
  width: 30.5vw;

  .core-functions {
    color: #fff;
    text-align: center;
    padding: 0 4.5;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .title {
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 56px;
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: bold;
  }

  .function-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .function-item {
    margin-bottom: 40px;
    border-top: 2px solid #ccc;
    /* padding: 40px 87px; */
  }

  .function-item:first-child {
    border-top: none;
  }

  .item-title {
    font-size: 28px;
    margin-bottom: 5px;
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 500;
    color: rgba(239, 239, 239, 1);

    .item-title-text {
      width: fit-content;
      text-align: center;
      margin: 0 auto;
      border-bottom: 5px solid rgba(255, 255, 255, 1);
    }
  }

  .item-title:first-child {
    border-top: none;
  }

  .item-desc {
    font-size: 20px;
    color: rgba(206, 206, 206, 1);
  }

}

.image-block-3-right {
  height: 100%;
  background: url('~@/assets/images/dashboard-3.jpg') no-repeat center center;
  background-size: cover;
  flex: 1;
}

img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

/* 第四屏 */
.full-section {
  padding: 0 !important;
  flex-direction: column;

  .image-block-4-left {
    width: 100%;
    height: 69vh;
    background: url('~@/assets/images/dashboard-1.jpg') no-repeat center center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;

    .features-row {
      display: flex;
      justify-content: space-around;
      width: 100%;

      padding: 0 40px;

      .feature-item {
        text-align: center;
        display: flex
;
    flex-direction: column;
    justify-content: center;
    align-items: center;

.icon-wrapper{
  width: 100px;
height: 100px;
background-color: #fff;
display: flex
;
    justify-content: center;
    align-items: center;
    border-radius: 20px;

}
        .icon {
          width: 80px;
          height: 65px;
        }

        .title {
          font-size: 22px;
          font-weight: bold;
          /* margin-bottom: 12px; */
          color: #fff;
          height: 53px;
    line-height: 50px;
    margin-top: 20px;
        }

        .desc {
          font-size: 16px;
          line-height: 24px;
          color: rgba(255, 255, 255, 0.85);
        }
      }
    }
  }

  .image-block-4-right {
    width: 100%;
    background: #1a1a1a;
    padding: 3.5vh 4vw;
    color: #fff;
    flex: 1;

    .footer-info {
      font-size: 14px;
      line-height: 22px;

      .logo {
        margin-bottom: 18px;
        width: 26vw;
    /* height: 7vh; */
      }

      .desc {
        margin-bottom: 22px;
        color: #ffff;
      }

      .contact,
      .address {
        color: #fff;
        margin-bottom: 4px;
      }

    }
    .copyright{
        text-align: center !important;
        color: #fff;
        margin-bottom: 4px;
      }
  }

}
</style>
