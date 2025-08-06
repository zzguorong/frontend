<template>
  <div class="homepage-container">
    <!-- Hero Section - 主要内容区域 -->
    <section class="hero-section" role="banner">
      <div class="hero-content">
        <header class="hero-text">
          <h1 class="main-title">GAIAHubs: Spatial AIGC</h1>
          <h2 class="subtitle">空间的想象，AI来实现</h2>
          <p class="description">草图，生图，语义分割一站式生成支持PSD分层</p>
          <p class="description">
            覆盖鸟瞰、人视、平面、室内，重塑你的图像工作流
          </p>
        </header>

        <nav class="cta-section" role="navigation" aria-label="主要操作">
          <el-button
            type="primary"
            size="large"
            class="cta-button"
            aria-label="开始使用GAIAHubs创作空间设计"
            @click="handleStartCreate"
          >
            开始创作
          </el-button>
        </nav>
      </div>
    </section>

    <!-- Footer Section - 页脚信息 -->
    <footer class="footer-section" role="contentinfo">
      <div class="footer-content">
        <!-- 公司信息区域 -->
        <div class="company-info">
          <img
            src="@/assets/images/dashorard-logo-white.png"
            alt="GAIAHubs Logo - 专业空间AI工具平台"
            class="company-logo"
            width="501"
            height="84"
          >
          <p class="company-description">
            GAIAHubs 是空间领域的AI工具平台，集成 AIGC
            生成、语义分割与智能识别功能，助力高效完成设计草图、空间分析与图像处理，提升设计师与团队的创作效率。
          </p>
          <address class="copyright-info">
            <p>©2025 深石（深圳）智能科技有限公司版权所有</p>
            <p>粤ICP备 2025438620号</p>
          </address>
        </div>

        <!-- 功能链接区域 -->
        <div class="footer-links">
          <!-- 核心功能 -->
          <div class="link-column">
            <h3>核心功能</h3>
            <ul>
              <li>
                <a
                  href="#"
                  aria-label="了解PSD下载和语义分割功能"
                >PSD下载+语义分割</a>
              </li>
              <li>
                <a
                  href="#"
                  aria-label="了解多种输入方式生成功能"
                >支持草图/关键词/模型图生成</a>
              </li>
              <li>
                <a href="#" aria-label="了解多视角场景覆盖">多视角场景覆盖</a>
              </li>
              <li>
                <a href="#" aria-label="了解云端生成功能">快速响应云端生成</a>
              </li>
            </ul>
          </div>

          <!-- 逐步开放功能 -->
          <div class="link-column">
            <h3>逐步开放</h3>
            <ul>
              <li>
                <a href="#" aria-label="即将推出的图转视频功能">图转视频</a>
              </li>
              <li>
                <a
                  href="#"
                  aria-label="即将推出的AI跨生态设计功能"
                >AI跨生态设计</a>
              </li>
              <li>
                <a href="#" aria-label="即将推出的图转3D模型功能">图转3D模型</a>
              </li>
            </ul>
          </div>

          <!-- 关于我们 & 安全 -->
          <div class="link-column">
            <h3>关于我们 & 安全</h3>
            <ul>
              <li><a href="/aboutUs" aria-label="了解关于我们">关于我们</a></li>
              <li>
                <a href="/privacyPolicy" aria-label="查看隐私政策">隐私政策</a>
              </li>
              <li>
                <a href="/termOfservice" aria-label="查看用户协议">用户协议</a>
              </li>
            </ul>
          </div>

          <!-- 联系方式与公司地址 -->
          <div class="link-column">
            <h3>联系方式</h3>
            <ul>
              <li>
                <a
                  href="mailto:contact@gaiass.com"
                  aria-label="发送邮件到contact@gaiass.com"
                >
                  contact@gaiass.com
                </a>
              </li>
            </ul>

            <h4>联系电话</h4>
            <ul>
              <li>
                <a href="tel:+8618680308101" aria-label="拨打联系电话">
                  +86-186 8030 8101
                </a>
              </li>
            </ul>

            <h4>公司地址</h4>
            <address>
              深圳市南山区粤海街道海德社区科技南八路2号豪威科技大厦15B4
            </address>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Homepage',
  metaInfo: {
    title: 'GAIAHubs - 空间AI工具平台 | Spatial AIGC生成平台',
    titleTemplate: '%s',
    meta: [
      {
        name: 'description',
        content:
          'GAIAHubs是专业的空间AI工具平台，提供草图生图、语义分割、PSD分层等AIGC功能，覆盖鸟瞰、人视、平面、室内多种视角，重塑您的图像工作流程。'
      },
      {
        name: 'keywords',
        content:
          'GAIAHubs, 空间AI, AIGC, 图像生成, 语义分割, PSD分层, 草图生图, 建筑设计, 室内设计, 空间设计'
      },
      {
        property: 'og:title',
        content: 'GAIAHubs - 空间AI工具平台 | Spatial AIGC生成平台'
      },
      {
        property: 'og:description',
        content:
          'GAIAHubs是专业的空间AI工具平台，提供草图生图、语义分割、PSD分层等AIGC功能，覆盖鸟瞰、人视、平面、室内多种视角，重塑您的图像工作流程。'
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        name: 'robots',
        content: 'index, follow'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0'
      }
    ],
    link: [
      {
        rel: 'canonical',
        href: 'https://gaiahubs.com'
      }
    ]
  },
  computed: {
    ...mapGetters(['name'])
  },
  methods: {
    handleStartCreate() {
      this.$router.push('/generate');
    }
  }
};
</script>

<style lang="scss" scoped>
// 字体定义
@font-face {
  font-family: "Lora";
  src: url("~@/assets/fonts/Lora-Bold.woff2") format("woff2"),
    url("~@/assets/fonts/Lora-Bold.woff") format("woff"),
    url("~@/assets/fonts/Lora-Bold.ttf") format("truetype");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

// 全局容器
.homepage-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

// Hero Section 样式
.hero-section {
  height: 100vh;
  background: url("~@/assets/images/dashboard-1.jpg") no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  // 添加遮罩层提高文本可读性
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 900px;
  padding: 0 20px;
}

.hero-text {
  margin-bottom: 40px;
}

.main-title {
  font-family: "Lora", "Noto Serif SC", serif;
  font-size: clamp(36px, 5vw, 72px);
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 20px 0;
  line-height: 1.2;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  letter-spacing: -0.02em;
}

.subtitle {
  font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: clamp(24px, 3vw, 48px);
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 24px 0;
  line-height: 1.3;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}

.description {
  font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: clamp(16px, 1.5vw, 20px);
  font-weight: 400;
  color: #e0e0e0;
  margin: 0 0 12px 0;
  line-height: 1.6;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

.cta-section {
  margin-top: 60px;
}

.cta-button {
  font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 1.5vw;
  font-weight: 500;
  height: 50px;
  padding: 0 100px;
  border-radius: 25px;
  background: #ffffff;
  color: #000000;
  border: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-width: 320px;

  &:hover {
    background: #f5f5f5;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
}

// Footer Section 样式
.footer-section {
  background: #1a1a1a;
  color: #ffffff;
  padding: 60px 0 40px;
}

.footer-content {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 60px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 120px;
  align-items: start;
  justify-content: space-between;
}

.company-info {
  .company-logo {
    width: clamp(200px, 20vw, 300px);
    height: auto;
    margin-bottom: 9px;
  }

  .company-description {
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    line-height: 1.7;
    color: #cccccc;
    margin-bottom: 20px;
    max-width: 400px;
  }

  .copyright-info {
    font-style: normal;

    p {
      font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-size: 12px;
      color: #999999;
      margin: 0 0 8px 0;
      line-height: 1.5;
    }
  }
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 60px;
  justify-content: space-between;
}

.link-column {
  h3 {
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 16px 0;
    line-height: 1.4;
  }

  h4 {
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    margin: 24px 0 12px 0;
    line-height: 1.4;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 12px;

      a {
        font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial,
          sans-serif;
        font-size: 14px;
        color: #cccccc;
        text-decoration: none;
        line-height: 1.5;
        transition: color 0.2s ease;

        &:hover {
          color: #ffffff;
          text-decoration: underline;
        }

        &:focus {
          outline: 2px solid #ffffff;
          outline-offset: 2px;
        }
      }
    }
  }

  address {
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-style: normal;
    color: #cccccc;
    line-height: 1.6;
    margin-top: 8px;
    /* white-space: nowrap; */
    text-overflow: ellipsis;
    width: 22vw;

    @media (max-width: 768px) {
      font-size: 13px; // 调整字体大小
      text-align: center; // 居中显示
      white-space: normal; // 允许换行
      overflow: visible; // 取消溢出隐藏
      margin-top: 12px; // 增加间距
      white-space: pre-wrap;
    }

    @media (max-width: 480px) {
      font-size: 12px; // 更小屏幕进一步调整字体大小
      margin-top: 16px; // 增加间距
      white-space: pre-wrap;
    }
  }
}

// 响应式设计
@media (max-width: 1024px) {
  .hero-section {
    /* min-height: 60vh; */
    background-attachment: scroll;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }

  .company-info {
    .company-description {
      max-width: 100%;
    }
  }

  .footer-links {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .hero-section {
    /* min-height: 50vh; */
    padding: 40px 0;
  }

  .hero-content {
    padding: 0 16px;
  }

  .hero-text {
    margin-bottom: 32px;
  }

  .cta-section {
    margin-top: 32px;
  }

  .cta-button {
    height: 48px;
    padding: 0 32px;
    font-size: 16px;
  }

  .footer-section {
    padding: 40px 0 30px;
  }

  .footer-content {
    padding: 0 16px;
    gap: 32px;
  }

  .footer-links {
    grid-template-columns: 1fr;
    gap: 24px;
    text-align: left;
  }

  .link-column {
    h3 {
      font-size: 15px;
      margin-bottom: 12px;
    }

    ul li {
      margin-bottom: 10px;

      a {
        font-size: 13px;
      }
    }
  }
}

@media (max-width: 480px) {
  .hero-section {
    /* min-height: 40vh; */
    padding: 30px 0;
  }

  .hero-text {
    margin-bottom: 24px;
  }

  .cta-section {
    margin-top: 24px;
  }

  .cta-button {
    height: 44px;
    padding: 0 28px;
    font-size: 15px;
    border-radius: 22px;
  }

  .footer-section {
    padding: 32px 0 24px;
  }

  .company-info {
    .company-logo {
      margin-bottom: 20px;
    }

    .company-description {
      font-size: 13px;
      margin-bottom: 24px;
    }

    .copyright-info p {
      font-size: 11px;
    }
  }
}

// 打印样式优化
@media print {
  .hero-section {
    background: none;
    color: #000000;
    /* min-height: auto; */

    &::before {
      display: none;
    }
  }

  .main-title,
  .subtitle,
  .description {
    color: #000000;
    text-shadow: none;
  }

  .cta-button {
    display: none;
  }

  .footer-section {
    background: none;
    color: #000000;
  }
}

// 高对比度模式支持
@media (prefers-contrast: high) {
  .hero-section::before {
    background: rgba(0, 0, 0, 0.6);
  }

  .description {
    color: #ffffff;
  }

  .cta-button {
    border: 2px solid #333333;
  }
}

// 减少动画模式支持
@media (prefers-reduced-motion: reduce) {
  .cta-button,
  .link-column a {
    transition: none;
  }

  .hero-section {
    background-attachment: scroll;
  }
}
</style>
