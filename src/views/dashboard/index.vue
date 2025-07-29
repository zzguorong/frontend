<template>
  <div class="scroll-container">
    <!-- 第一屏 - Hero Section -->
    <section class="fullscreen-section" role="banner">
      <header class="hero-content">
        <!-- SEO优化：使用h1作为主标题 -->
        <h1 class="fullscreen-text title-main">GAIAHubs: Spatial AIGC</h1>
        <h2 class="fullscreen-text subtitle">空间的想象，AI来实现</h2>
        <p class="fullscreen-text description">
          草图，生图，语义分割一站式生成支持PSD分层
        </p>
        <p class="fullscreen-text description">
          覆盖鸟瞰、人视、平面、室内，重塑你的图像工作流
        </p>
        <!-- 按钮 -->
        <nav class="generate-btn-wrapper" role="navigation" aria-label="主要操作">
          <el-button
            size="large"
            class="generate-btn"
            aria-label="开始使用GAIAHubs创作空间设计"
            @click.native.prevent="handleGenerate"
          >
            开始创作
          </el-button>
        </nav>
      </header>
    </section>

    <!-- 第二屏 - 空间类型展示 -->
    <section class="normal-section" role="main" aria-labelledby="spatial-types">
      <div class="section-content no-gap">
        <!-- 左侧导航 -->
        <aside class="image-block-left" role="complementary">
          <nav class="image-text" aria-label="空间类型选择">
            <h3 id="spatial-types" class="visually-hidden">空间设计类型</h3>
            <button
              type="button"
              class="title"
              :class="{ active: activeImage === 'birdview' }"
              role="tab"
              tabindex="0"
              :aria-selected="activeImage === 'birdview'"
              :aria-label="`选择鸟瞰图设计 - ${getImageTypeLabel('birdview')}`"
              @mouseover="changeImage('birdview')"
              @focus="changeImage('birdview')"
              @keydown.enter="changeImage('birdview')"
            >
              鸟瞰图
            </button>
            <button
              type="button"
              class="title"
              :class="{ active: activeImage === 'eyeview' }"
              role="tab"
              tabindex="0"
              :aria-selected="activeImage === 'eyeview'"
              :aria-label="`选择人视图设计 - ${getImageTypeLabel('eyeview')}`"
              @mouseover="changeImage('eyeview')"
              @focus="changeImage('eyeview')"
              @keydown.enter="changeImage('eyeview')"
            >
              人视图
            </button>
            <button
              type="button"
              class="title"
              :class="{ active: activeImage === 'planview' }"
              role="tab"
              tabindex="0"
              :aria-selected="activeImage === 'planview'"
              :aria-label="`选择平面图设计 - ${getImageTypeLabel('planview')}`"
              @mouseover="changeImage('planview')"
              @focus="changeImage('planview')"
              @keydown.enter="changeImage('planview')"
            >
              平面图
            </button>
            <button
              type="button"
              class="title"
              :class="{ active: activeImage === 'indoor' }"
              role="tab"
              tabindex="0"
              :aria-selected="activeImage === 'indoor'"
              :aria-label="`选择室内图设计 - ${getImageTypeLabel('indoor')}`"
              @mouseover="changeImage('indoor')"
              @focus="changeImage('indoor')"
              @keydown.enter="changeImage('indoor')"
            >
              室内图
            </button>
          </nav>
        </aside>

        <!-- 右侧展示图片 -->
        <div
          class="image-block-right"
          :class="activeImage"
          role="img"
          :aria-label="`GAIAHubs ${getImageTypeLabel(activeImage)}案例展示`"
        />
      </div>
    </section>

    <!-- 第三屏 - 核心功能展示 -->
    <section class="normal-section" role="main" aria-labelledby="core-functions">
      <div class="section-content no-gap">
        <!-- 左侧功能介绍 -->
        <aside class="image-block-3-left" role="complementary">
          <div class="core-functions">
            <h2 id="core-functions" class="title">核心功能</h2>
            <ul class="function-list" role="tablist" aria-label="核心功能列表">
              <li class="function-item" role="presentation">
                <button
                  type="button"
                  role="tab"
                  tabindex="0"
                  :aria-selected="currentView === 'psd_segmentation'"
                  @mouseover="changeView('psd_segmentation')"
                  @focus="changeView('psd_segmentation')"
                  @keydown.enter="changeView('psd_segmentation')"
                >
                  <h3 class="item-title" :class="{ active: currentView === 'psd_segmentation' }">
                    PSD下载 + 语义分割
                  </h3>
                  <p class="item-desc">可后期编辑，支持专业制图</p>
                </button>
              </li>
              <li class="function-item" role="presentation">
                <button
                  type="button"
                  role="tab"
                  tabindex="0"
                  :aria-selected="currentView === 'sketch_generate'"
                  @mouseover="changeView('sketch_generate')"
                  @focus="changeView('sketch_generate')"
                  @keydown.enter="changeView('sketch_generate')"
                >
                  <h3 class="item-title" :class="{ active: currentView === 'sketch_generate' }">
                    支持草图 / 关键词 / 模型图生成
                  </h3>
                  <p class="item-desc">多方式嵌入，适配不同工作流</p>
                </button>
              </li>
              <li class="function-item" role="presentation">
                <button
                  type="button"
                  role="tab"
                  tabindex="0"
                  :aria-selected="currentView === 'multi_view_scene'"
                  @mouseover="changeView('multi_view_scene')"
                  @focus="changeView('multi_view_scene')"
                  @keydown.enter="changeView('multi_view_scene')"
                >
                  <h3 class="item-title" :class="{ active: currentView === 'multi_view_scene' }">
                    多视角场景覆盖
                  </h3>
                  <p class="item-desc">鸟瞰、人视、室内、平面一网打尽</p>
                </button>
              </li>
              <li class="function-item" role="presentation">
                <button
                  type="button"
                  role="tab"
                  tabindex="0"
                  :aria-selected="currentView === 'cloud_generate'"
                  @mouseover="changeView('cloud_generate')"
                  @focus="changeView('cloud_generate')"
                  @keydown.enter="changeView('cloud_generate')"
                >
                  <h3 class="item-title" :class="{ active: currentView === 'cloud_generate' }">
                    快速响应云端生成
                  </h3>
                  <p class="item-desc">不限设备，无需安装</p>
                </button>
              </li>
            </ul>
          </div>
        </aside>

        <!-- 右侧功能演示图 -->
        <div
          class="image-block-3-right"
          :class="currentView"
          role="img"
          :aria-label="`GAIAHubs ${getFunctionLabel(currentView)}功能演示`"
        />
      </div>
    </section>

    <!-- 第四屏 - 扩展功能与联系方式 -->
    <section class="normal-section">
      <div class="section-content no-gap full-section">
        <!-- 上半部分：扩展功能 -->
        <div class="image-block-4-left">
          <div class="features-row">
            <article class="feature-item">
              <div class="icon-wrapper" aria-hidden="true">
                <svg-icon icon-class="imageToVideo" class="icon" />
              </div>
              <h3 class="title">图转视频</h3>
              <p class="desc">一张图转换成动态视频效果，身临其境</p>
            </article>
            <article class="feature-item">
              <div class="icon-wrapper" aria-hidden="true">
                <svg-icon icon-class="AIdialogue" class="icon" />
              </div>
              <h3 class="title">AI对话式设计</h3>
              <p class="desc">输入项目意图，和AI共同探索方案思路、风格方向</p>
            </article>
            <article class="feature-item">
              <div class="icon-wrapper" aria-hidden="true">
                <svg-icon icon-class="AImodeling" class="icon" />
              </div>
              <h3 class="title">图转3D模型</h3>
              <p class="desc">一张图生成可编辑的3D模型，反向捕捉空间关系</p>
            </article>
          </div>
        </div>

        <!-- 下半部分：页脚信息 -->
        <footer class="image-block-4-right" role="contentinfo">
          <div class="footer-info">
            <img
              class="logo"
              src="@/assets/images/dashorard-logo-white.png"
              alt="GAIAHubs - 专业空间AI工具平台Logo"
              width="501"
              height="84"
            >
            <p class="desc">
              GAIAHubs 是空间领域的AI工具平台，集成 AIGC 生成、语义分割与智能识别功能，助力高效完成设计草图、空间分析与图像处理，提升设计师与团队的创作效率。
            </p>
            <address class="contact-info">
              <p class="contact">
                电子邮箱：<a href="mailto:contact@gaiass.com" rel="noopener">contact@gaiass.com</a>
              </p>
              <p class="address">
                公司地址：深圳市南山区粤海街道高新区社区科技南八路2号豪威科技大厦15F
              </p>
            </address>
          </div>
          <p class="copyright">©2025 深石（深圳）智能科技有限公司版权所有</p>
        </footer>
      </div>
    </section>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Dashboard',
  data() {
    return {
      activeImage: 'birdview',
      currentView: 'psd_segmentation'
    };
  },
  computed: {
    ...mapGetters(['name'])
  },
  methods: {
    handleGenerate() {
      this.$router.push('/generate');
    },
    // 第二屏
    changeImage(type) {
      this.activeImage = type;
    },
    // 第三屏
    changeView(type) {
      this.currentView = type;
    },

    // SEO优化：为生成类型提供友好的标签
    getImageTypeLabel(type) {
      const typeMap = {
        'sketch_generate': '草图生成',
        'cloud_generate': '点云生成',
        'psd_segmentation': '图像分割',
        'indoor': '室内空间',
        'outdoor': '室外场景',
        'birdview': '俯视图',
        'eyeview': '透视图',
        'planview': '平面图'
      };
      return typeMap[type] || '智能设计';
    },

    // SEO优化：为功能视图提供友好的标签
    getFunctionLabel(view) {
      const functionMap = {
        'indoor': '室内设计',
        'birdview': '鸟瞰设计',
        'eyeview': '透视设计',
        'planview': '平面设计',
        'psd_segmentation': 'PSD分层',
        'sketch_generate': '草图生成',
        'multi_view_scene': '多视角场景',
        'cloud_generate': '云端生成'
      };
      return functionMap[view] || '空间设计';
    }
  }
};
</script>

<style lang="scss" scoped>

@font-face {
    font-family: 'Lora';
    src: url('~@/assets/fonts/Lora-Bold.woff2') format('woff2'),
        url('~@/assets/fonts/Lora-Bold.woff') format('woff'),
        url('~@/assets/fonts/Lora-Bold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
}

/* SEO优化：隐藏视觉元素但保持可访问性 */
.visually-hidden {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

/* 禁止页面所有文字选中，鼠标光标显示普通箭头 */
* {
  user-select: none !important;
  /* 禁止选中 */
  cursor: default !important;
  /* 光标为默认箭头 */
}

/* SEO优化：确保按钮元素正常显示 */
button.title {
  background: none;
  border: none;
  color: inherit;
  font: inherit;
  text-align: inherit;
  cursor: pointer !important;
  display: block;
}

/* SEO优化：功能按钮样式 */
.function-item button {
  background: none;
  border: none;
  color: inherit;
  font: inherit;
  text-align: inherit;
  cursor: pointer !important;
  width: 100%;
  display: block;
  padding: 0;
}

/* SEO优化：联系信息样式 */
.contact-info {
  font-style: normal;
}

.contact-info a {
  color: inherit;
  text-decoration: none;
}

.contact-info a:hover {
  text-decoration: underline;
}

/* 第一屏优化 */
.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.scroll-container {
  height: 100vh;
  overflow-y: scroll;
  /*  开启纵向滚动吸附，强制吸附 */
  scroll-snap-type: y mandatory;
  /* 平滑滚动（非必须） */
  scroll-behavior: smooth;
  will-change: scroll-position;
  transform: translateZ(0);

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
  /*  每一屏幕吸附到顶部对齐 */
  scroll-snap-align: start;
  /* 每屏占满整个视口高度 */
  position: relative;
}

/* 第一屏 */

.fullscreen-section {
  background: url('~@/assets/images/dashboard-1.jpg') no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
    justify-content: center;

  .fullscreen-text {
    color: #fff;
  }

  .title-main {
    font-size: 72px;
    color: #fff;
    font-family: 'Lora', "Noto Serif SC", serif;
    font-weight: bold;
    line-height: 101px
  }

  .subtitle {
    margin-top: 3vw;
    margin-bottom: 22px;
    font-size: 3.01vw;;
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: bold;
    line-height: 68px
  }

  .description {
    font-size: 1.05vw;
    margin-top: 0;
    margin-bottom: 10px;
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: bold;
    line-height: 1.45vw
  }

  .generate-btn-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 11vw;

    .generate-btn {
      height: 60px;
      line-height: 13px;
      border-radius: 25px;
      font-size: 1.45vw;
      padding: 0 38px 0 38px;
      cursor: pointer ! important;
    }
     .generate-btn:hover {
      background-color: #000 !important;
      color: #fff !important;
      border:none !important;
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
  padding: 8.5vh 4vw 4vh 2.5vw;
  box-sizing: border-box;
}

/* 第二屏 */
.image-block-left {
  height: 100%;
  background: url('~@/assets/images/002.jpg') no-repeat center center;
  background-size: cover;
  width: 130px;

  .image-text {
    color: #fff;
    font-size: 1.45vw;
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
    font-family: 'Lora', "Noto Serif SC", serif;
    font-weight: bold;

    .title {
      padding: 10px;
      border-right: 5px solid transparent;
      /* 初始透明 */
      transition: border-right 0.3s ease;
      /* 平滑过渡 */
    }

    /* 悬停样式 */
    .title:hover,
    .title.active {
      border-right: 5px solid #fff;
    }
  }
}

.image-block-right {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
  transition: background-image 0.5s ease-in-out;
}

/* 四张图 */
.image-block-right.birdview {
  background-image: url('~@/assets/images/birdview.jpg');
}

.image-block-right.eyeview {
  background-image: url('~@/assets/images/eyeview.jpg');
}

.image-block-right.planview {
  background-image: url('~@/assets/images/planview.jpg');
}

.image-block-right.indoor {
  background-image: url('~@/assets/images/indoor.jpg');
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
    font-size: 3.01vw;;
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
    margin-bottom: 3vh;
    padding-top: 3vh;
    border-top: 2px solid #ccc;
    /* padding: 40px 87px; */
  }

  .function-item:first-child {
    border-top: none;
  }

  .item-title {
    font-size: 1.45vw;
    margin-bottom: 5px;
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 500;
    color: rgba(239, 239, 239, 1);
    width: fit-content;
    text-align: center;
    margin: 0 auto;
    /* 初始透明 */
    border-bottom: 5px solid transparent;
    /* 平滑过渡 */
    transition: border-bottom 0.3s ease;
  }

  .item-title.active,
  .item-title:hover {
    border-bottom: 5px solid rgba(255, 255, 255, 1);
  }
}

.item-title:first-child {
  border-top: none;
}

.item-desc {
  font-size: 1.05vw;
  color: rgba(206, 206, 206, 1);
}

.image-block-3-right {
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: background-image 0.5s ease-in-out;
  flex: 1;
}

.image-block-3-right.psd_segmentation {
  background-image: url('~@/assets/images/psd_segmentation.jpg');
}

.image-block-3-right.sketch_generate {
  background-image: url('~@/assets/images/sketch_generate.jpg');
}

.image-block-3-right.multi_view_scene {
  background-image: url('~@/assets/images/multi_view_scene.jpg');
}

.image-block-3-right.cloud_generate {
  background-image: url('~@/assets/images/cloud_generate.jpg');
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
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .icon-wrapper {
          width: 5.3vw;
          height: 9vh;
          background-color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 1.05vw;

        }

        .icon {
          width: 4vw;
          height: 6vh;

        }

        .title {
          font-size: 22px;
          font-weight: bold;
          color: #fff;
          height: 53px;
          line-height: 50px;
          margin-top: 1.05vw;
          margin-bottom: 0
        }

        .desc {
          font-size: 16px;
          line-height: 24px;
          color: rgba(255, 255, 255, 0.85);
          margin-top: 0;
          margin-bottom: 0
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

    .copyright {
      text-align: center !important;
      color: #fff;
      margin-bottom: 4px;
    }
  }

}</style>
