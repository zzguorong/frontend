<template>
  <div>
    <!-- 关于GAIAIHubs 部分 -->
    <section class="section about-gaiaihubs">
      <div class="content animate-on-scroll first">
        <h2>关于GAIAIHubs</h2>
        <p>GAIAHubs 是由 深石（深圳）智能科技有限公司 打造的AI 驱动空间设计与图像智能平台，专为城市规划师、建筑师、景观设计师及空间创意工作者服务。平台融合生成式
          AI、图像语义分割技术与三维视觉计算，提供从概念推演、方案生成到方案落地的全设计流程支持。
        </p>
      </div>
    </section>

    <!-- 技术赋能设计革新 部分 -->
    <section class="section tech-empower">
      <div class="content animate-on-scroll first">
        <h2 class="title">技术赋能设计革新</h2>
        <div class="card-container">
          <div class="card">
            <h3>AI生成与多维表达</h3>
            <p>支持从草图、文本到高精度效果图的智能生成，也将推出Image-to-Video、 Image-to-3D，帮助设计师快速可视化灵感，缩短方案迭代周期。</p>
          </div>
          <div class="card">
            <h3>语义驱动的智能分割</h3>
            <p>基于语义分割技术（Semantic Segmentation），精准识别并解构设计要素（如建筑、景观、道路），支持用户通过工具编辑优化，实现 “所想即所得”
              的交互体验。并突破性的增设psd格式下载途径对分割图像内容进行分层处理。
            </p>
          </div>
          <div class="card">
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
      <div class="content animate-on-scroll first">
        <h2 style="line-height: 57px;">核心理念：</h2>
        <h2 style="line-height: 57px;">精准 · 开放 · 进化</h2>
        <div style="width: 980px;">
          <p>
            ●精准生成：依托空间感知算法，确保 AI 输出符合专业设计规范与尺度逻辑。
          </p>
          <p>●开放生态：支持与主流工具链无缝对接，构建从 AI 创作到工程落地的闭环。</p>
          <p>●持续进化：通过用户反馈与数据迭代，不断拓展 AI 在设计分析、
            可持续性评估等场景的深度应用。</p>
        </div>

      </div>
    </section>

    <!-- 愿景与承诺 部分 -->
    <section class="section vision-promise">
      <div class="content animate-on-scroll first">
        <h2>愿景与承诺</h2>
        <p style="margin-bottom: 12vw;">GAIAHubs 不仅是生图工具，更是城市规划、建筑建造、空间交互、景观室内等领域设计者的 “数字共创伙伴”。我们相信，AI 的终极价值在于
          “释放人类的创造力”而非替代我们设计工作本身。未来，我们将持续探索 AI 与空间智能的融合边界，推动相关领域的设计业务向更高效、更包容、更具想象力的方向发展。
        </p>
        <h2>技术为笔，设计无界</h2>
      </div>
    </section>


    <!-- 加入我们 部分 -->
    <section class="section join-us no-padding">
      <div class="content animate-on-scroll first" style="max-width:unset;padding:0; height: 100vh;">
        <div class="first" style="    max-width: 1380px; margin-bottom: 38vh;">
          <h2>加入我们</h2>
          <p>在GAIAHubs，我们相信AI与设计的融合将重塑未来空间。如果你热爱技术创新，痴迷于探索AIGC、3D生成与智能设计的无限可能，欢迎加入我们的团队，一起打造下一代空间智能平台！
          </p>
          <p>投递邮箱：<a href="mailto:hr@gaiaihubs.com">career@gaiass.com</a></p>
        </div>
        <div class="join-us-img">
          <div class="join-us-text">
            <p style="font-size: 3.77vw;color: #fff;">
              联系我们
            </p>
            <p style="color: #fff;">
              邮箱：contact@gaiass.com
            </p>
            <div class="about-us-code">
              <div class="about-us-title">
                <img src="@/assets/images/weixin.jpg" alt="" />
              </div>
              <div class="about-us-title">
                <img src="@/assets/images/weixin.jpg" alt="" />
              </div>
            </div>
            <p style="color: #fff;">地址：深圳市南山区粤海街道高新区社区科技南八路2号豪威科技大厦1564
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
    }
  },
  mounted() {
    // 创建IntersectionObserver实例来检测元素是否进入视口中间
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // 当元素进入视口中间时添加动画类
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          // 动画完成后停止观察该元素，确保动画只执行一次
          this.observer.unobserve(entry.target);
        }
      });
    }, {
      // 根元素为视口
      root: null,
      // 视口边缘的偏移量，使动画在元素到达中间时触发
      rootMargin: '0px 0px -50% 0px',
      // 阈值为0表示元素一进入调整后的视口就触发
      threshold: 0
    });

    // 获取所有需要添加动画的元素并开始观察
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
      this.observer.observe(el);
    });
  },
  beforeDestroy() {
    // 组件销毁前停止观察
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
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

.section {
  width: 100%;
  height: 100vh;
  /* 一屏高度 */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  scroll-snap-align: start;
}

.content {
  max-width: 1380px;
  width: 100%;
  /* background-color: rgba(255, 255, 255, 0.8); */
  padding: 40px;
  border-radius: 8px;
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */

  h2 {
    font-size: 3.77vw;
    margin-bottom: 61px;
    color: #333;
    line-height: 101px;
    font-family: 'Source Han Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
    font-weight: 400;
  }

  p {
    font-size: 1.5vw;
    line-height: 1.6;
    color: #666;
    margin-bottom: 16px;
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

// 动画相关样式
.animate-on-scroll {
  opacity: 0;
  /* 初始状态透明 */
  transform: translateY(40px);
  /* 初始位置向下偏移更多，增强动画效果 */
  transition: opacity 1s ease-out, transform 1s ease-out;
  /* 稍长的动画时间 */
}

.animate-on-scroll.animated {
  opacity: 1;
  /* 动画后完全可见 */
  transform: translateY(0);
  /* 动画后回到正常位置 */
}

// 各部分背景色
.about-gaiaihubs {
  /* background-color: #f9f9f9; */
}

.tech-empower {

  /* background-color: #f0f0f0; */
  .card-container {
    display: flex;
    justify-content: space-between;

    .card {
      height: 313px;
      flex: 1;
      margin-right: 20px;
      /* background-color: #fff; */
      padding: 39px 44px;
      border-radius: 4px;
      /* box-shadow: 0 0 5px rgba(0, 0, 0, 0.05); */
      box-shadow: 5px 5px 6px 0px rgba(0, 0, 0, 0.4);
      border: 5px solid rgba(108, 108, 108, 1);
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;

      h3 {
        margin-bottom: 10px;
        color: #333;
      }

      p {
        font-size: 18px;

      }
    }

    .card:last-child {
      margin-right: 0;
    }
  }
}

.join-us {
  .join-us-img {
    width: 100%;
    height: 46vh;
    position: absolute;
    bottom: 0;
    left: 0;

    img {
      width: 100%;
      height: 100%;
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

    .about-us-code {
      display: flex;
      justify-content: center;
      gap: 19px;
      margin-bottom: 16px;
    }


    .about-us-title {
      margin-top: 40px;
      border: 1px solid #ccc;

      img {
        width: 150px;
        height: 150px;
      }
    }
  }
}

.contact-us {

  .social-icons {
    a {
      margin-right: 10px;
      color: #333;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}</style>
