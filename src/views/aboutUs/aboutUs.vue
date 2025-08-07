<template>
  <div class="page-container">
    <!-- 关于GAIAIHubs 部分 -->
    <section class="section about-gaiaihubs">
      <div class="content first">
        <h2 class="animate-element" data-delay="0">关于GAIAIHubs</h2>
        <p class="animate-element" data-delay="0.2">GAIAHubs 是由 深石（深圳）智能科技有限公司 打造的AI 驱动空间设计与图像智能平台，专为城市规划师、建筑师、景观设计师及空间创意工作者服务。平台融合生成式
          AI、图像语义分割技术与三维视觉计算，提供从概念推演、方案生成到方案落地的全设计流程支持。
        </p>
      </div>
    </section>

    <!-- 技术赋能设计革新 部分 -->
    <section class="section tech-empower">
      <div class="content first">
        <h2 class="title animate-element" data-delay="0">技术赋能设计革新</h2>
        <div class="card-container">
          <div class="card animate-element" data-delay="0.2">
            <h3>AI生成与多维表达</h3>
            <p>支持从草图、文本到高精度效果图的智能生成，也将推出Image-to-Video、 Image-to-3D，帮助设计师快速可视化灵感，缩短方案迭代周期。</p>
          </div>
          <div class="card animate-element" data-delay="0.4">
            <h3>语义驱动的智能分割</h3>
            <p>基于语义分割技术（Semantic Segmentation），精准识别并解构设计要素（如建筑、景观、道路），支持用户通过工具编辑优化，实现 "所想即所得"
              的交互体验。并突破性的增设psd格式下载途径对分割图像内容进行分层处理。
            </p>
          </div>
          <div class="card animate-element" data-delay="0.6">
            <h3>AI 协同工作流：
            </h3>
            <p> 集成 多模态 AI 对话系统，允许设计师通过对话式交互（文本/语音）调用工具、调整参数或获取设计建议，将复杂操作简化为自然沟通，让技术真正服务于创意直觉。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心理念 部分 -->
    <section class="section core-values">
      <div class="content first">
        <h2 class="animate-element" data-delay="0" style="line-height: 57px;">核心理念：</h2>
        <h2 class="animate-element" data-delay="0.2" style="line-height: 57px;">精准 · 开放 · 进化</h2>
        <div class="animate-element" data-delay="0.4">
          <p class="animate-element" data-delay="0.6">
            ●精准生成：依托空间感知算法，确保 AI 输出符合专业设计规范与尺度逻辑。
          </p>
          <p class="animate-element" data-delay="0.8">●开放生态：支持与主流工具链无缝对接，构建从 AI 创作到工程落地的闭环。</p>
          <p class="animate-element" data-delay="1.0">●持续进化：通过用户反馈与数据迭代，不断拓展 AI 在设计分析、
            可持续性评估等场景的深度应用。</p>
        </div>
      </div>
    </section>

    <!-- 愿景与承诺 部分 -->
    <section class="section vision-promise">
      <div class="content first">
        <h2 class="animate-element" data-delay="0">愿景与承诺</h2>
        <p class="animate-element" data-delay="0.2" style="margin-bottom: 12vw;">GAIAHubs 不仅是生图工具，更是城市规划、建筑建造、空间交互、景观室内等领域设计者的 "数字共创伙伴"。我们相信，AI 的终极价值在于
          "释放人类的创造力"而非替代我们设计工作本身。未来，我们将持续探索 AI 与空间智能的融合边界，推动相关领域的设计业务向更高效、更包容、更具想象力的方向发展。
        </p>
        <h2 class="animate-element" data-delay="0.4">技术为笔，设计无界</h2>
      </div>
    </section>

    <!-- 加入我们 部分 -->
    <section class="section join-us no-padding">
      <div class="content first" style="max-width:unset;padding:0; height: 100vh;">
        <div class="first" style=" max-width: 1380px; margin-bottom: 38vh;">
          <h2 class="animate-element" data-delay="0">加入我们</h2>
          <p class="animate-element" data-delay="0.2">在GAIAHubs，我们相信AI与设计的融合将重塑未来空间。如果你热爱技术创新，痴迷于探索AIGC、3D生成与智能设计的无限可能，欢迎加入我们的团队，一起打造下一代空间智能平台！
          </p>
          <p class="animate-element" data-delay="0.4">投递邮箱：<a href="mailto:hr@gaiaihubs.com">career@gaiass.com</a></p>
        </div>
        <div class="join-us-img">
          <div class="join-us-text">
            <p style="font-size: 1.5vw;color: #fff;">
              联系我们
            </p>
            <p style="color: #fff;font-size: 1vw;">
              邮箱：contact@gaiass.com
            </p>
            <div class="about-us-code">
              <div class="about-us-title">
                <img src="@/assets/images/weixin.jpg" alt="">
              </div>
            </div>
            <p style="color: #fff;font-size: 1vw;">地址：深圳市南山区粤海街道高新区社区科技南八路2号豪威科技大厦1564
            </p>
          </div>
          <img src="../../assets/images/aboutus-footer.jpg" alt="加入我们">
        </div>
      </div>
    </section>

  </div>
</template>

<script>
export default {
  name: 'GaiaHubsSection',
  data() {
    return {
      observer: null
    };
  },
  mounted() {
    // 创建IntersectionObserver实例来检测元素是否进入视口
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // 当元素进入视口时添加动画类
        if (entry.isIntersecting) {
          // 获取该section内所有需要动画的元素
          const animatedElements = entry.target.querySelectorAll('.animate-element');

          animatedElements.forEach((element, index) => {
            // 获取延迟时间，如果没有设置则使用索引 * 0.2
            const delay = parseFloat(element.dataset.delay) || (index * 0.2);

            // 设置延迟执行动画
            setTimeout(() => {
              element.classList.add('animated');
            }, delay * 1000);
          });

          // 动画开始后停止观察该section，确保动画只执行一次
          this.observer.unobserve(entry.target);
        }
      });
    }, {
      // 根元素为视口
      root: null,
      // 当元素50%进入视口时触发
      rootMargin: '0px 0px -20% 0px',
      // 阈值
      threshold: 0.3
    });

    // 获取所有section并开始观察
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
      // 跳过join-us-img区域，不需要动画效果
      if (!section.classList.contains('join-us-img')) {
        this.observer.observe(section);
      }
    });
  },
  beforeDestroy() {
    // 组件销毁前停止观察
    if (this.observer) {
      this.observer.disconnect();
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

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  background-color: #FFFFFF;
}

// 页面容器 - 支持长页滚动
.page-container {
  overflow-x: hidden;
  scroll-behavior: smooth;
  background-color: #FFFFFF;
}

.section {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  scroll-snap-align: start;

  // 响应式设计
  @media (max-width: 768px) {
    padding: 40px 15px;
    min-height: auto;
  }

  @media (max-width: 480px) {
    padding: 30px 10px;
  }
}

.content {
  max-width: 1380px;
  width: 100%;
  padding: 40px;
  border-radius: 8px;

  // 响应式设计
  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 15px;
  }

  h2 {
    font-size: 3.77vw;
    margin-bottom: 61px;
    color: #333;
    line-height: 101px;
    font-family: 'Source Han Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
    font-weight: 400;

    // 响应式字体
    @media (max-width: 768px) {
      font-size: 5vw;
      line-height: 1.2;
      margin-bottom: 30px;
    }

    @media (max-width: 480px) {
      font-size: 6vw;
      margin-bottom: 20px;
    }
  }

  p {
    font-size: 1.5vw;
    line-height: 1.6;
    color: #000;
    margin-bottom: 16px;

    // 响应式字体
    @media (max-width: 768px) {
      font-size: 16px;
      line-height: 1.5;
    }

    @media (max-width: 480px) {
      font-size: 14px;
    }
  }

  ul {
    list-style: inside;
    margin-bottom: 16px;

    li {
      margin-bottom: 8px;
      color: #666;
    }
  }
}

.first {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.no-padding {
  padding: 0;
}

// 新的动画系统
.animate-element {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);

  &.animated {
    opacity: 1;
    transform: translateY(0);
  }
}

// 各部分样式
.about-gaiaihubs {
  /* background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); */
}

.tech-empower {
  /* background: linear-gradient(135deg, #ffffff 0%, #f1f3f4 100%); */

  .card-container {
    display: flex;
    justify-content: space-between;
    gap: 20px;

    // 响应式布局
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 15px;
    }

    .card {
      height: 313px;
      flex: 1;
      padding: 39px 44px;
      border-radius: 20px;
      box-shadow: 5px 5px 6px 0px rgba(0, 0, 0, 0.4);
      border: 5px solid rgba(108, 108, 108, 1);
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      background: #ffffff;

      // 响应式设计
      @media (max-width: 768px) {
        height: auto;
        min-height: 250px;
        padding: 25px 20px;
      }

      @media (max-width: 480px) {
        padding: 20px 15px;
        min-height: 200px;
      }

      h3 {
        margin-bottom: 10px;
        color: #333;
        font-size: 1.2em;
        text-align: center;

        @media (max-width: 480px) {
          font-size: 1.1em;
        }
      }

      p {
        font-size: 18px;
        text-align: center;

        @media (max-width: 768px) {
          font-size: 16px;
        }

        @media (max-width: 480px) {
          font-size: 14px;
        }
      }
    }
  }
}

.core-values {
  /* background: linear-gradient(135deg, #f1f3f4 0%, #ffffff 100%); */

  .content {
    @media (max-width: 768px) {
      div[style*="width: 980px"] {
        width: 100% !important;
      }
    }
  }
}

.vision-promise {
  /* background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%); */
}

.join-us {

  .join-us-img {
    width: 100%;
    height: 40vh;
    position: absolute;
    bottom: 0;
    left: 0;

    @media (max-width: 768px) {
      height: 40vh;
    }

    @media (max-width: 480px) {
      height: 35vh;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .join-us-text {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: #FFFFFF;
    height: 100%;
    z-index: 2;

    p {
      margin-bottom: 15px;
      text-align: center;

      &:first-child {
        font-size: 3.77vw;

        @media (max-width: 768px) {
          font-size: 5vw;
        }

        @media (max-width: 480px) {
          font-size: 6vw;
        }
      }
    }

    .about-us-code {
      display: flex;
      justify-content: center;
      gap: 19px;
      margin: 20px 0;

      @media (max-width: 480px) {
        gap: 10px;
      }
    }

    .about-us-title {
      /* border: 1px solid #ccc; */

      img {
        width: 150px;
        height: 150px;

        @media (max-width: 768px) {
          width: 120px;
          height: 120px;
        }

        @media (max-width: 480px) {
          width: 100px;
          height: 100px;
        }
      }
    }
  }
}

// 性能优化：减少重绘
.animate-element {
  will-change: transform, opacity;

  &.animated {
    will-change: auto;
  }
}

// 预加载优化
@media (prefers-reduced-motion: reduce) {
  .animate-element {
    transition: none;

    &.animated {
      opacity: 1;
      transform: none;
    }
  }
}
</style>
