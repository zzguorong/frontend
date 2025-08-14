<template>
  <div class="subscription-interface-page">
    <div class="subscription-interface-container">
      <div class="subscription-interface-header">订阅计划&权限</div>
      <div class="subscription-interface-content">
        <el-row :gutter="25">
          <!-- GAIA -->
          <el-col :span="8">
            <div class="subscription-interface-card">
              <div class="subscription-interface-card-title">GAIA</div>
              <div class="subscription-text">GAIA</div>
              <div class="subscription-description">
                为小型团队和独立用户打造
              </div>
              <div class="subscription-price">免费体验</div>
              <div class="subscription-detail">
                为免费用户提供基础服务，进行快速图像创作体验，适合灵感突发、临时提案、概念探索等独立创作者使用。极速生成，快速体验，灵活自由。
              </div>

              <div class="subscription-btn" @click="toGenerate">
                生图界面
              </div>
              <div class="subscription-detail-list">
                <ul>
                  <li>
                    <svg-icon icon-class="check" class="check-icon" />GAIA模型支持
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon" />当日3次图像生成次数
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon" />当日3次语义分割功能使用次数
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon" />服务期内无限语义分割工具包使用次数
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon" />当日3次PNG下载次数
                  </li>
                </ul>
              </div>
            </div>
          </el-col>
          <!-- GAIA Plus -->
          <el-col :span="8">
            <div class="subscription-interface-card">
              <div class="subscription-interface-card-title" style="background: #9a9a9a">
                GAIA Plus
              </div>
              <div class="subscription-text">GAIA Plus</div>
              <div class="subscription-description">
                为专业人士与小型团队打造
              </div>
              <!-- 下拉选择价格周期 -->
              <el-dropdown trigger="click" class="price-dropdown" @command="handlePlusPriceChange">
                <div class="subscription-price price-trigger">
                  <span class="price-amount"><span class="price-amount-symbol">{{ plusPriceDisplay.
                    currency_symbol }}</span><span class="price-amount-number">{{
                    plusPriceDisplay.price
                  }}</span></span>
                  <span class="price-unit">{{ plusPriceDisplay.currency_code }}&nbsp;/{{ plusPriceDisplay.level &&
                    plusPriceDisplay.level.name }}</span>
                  <i class="el-icon-arrow-down price-arrow" />
                </div>
                <el-dropdown-menu slot="dropdown" class="price-dropdown-menu">
                  <el-dropdown-item v-for="item in plusPriceOptions" :key="item.unit" :command="item.id">
                    {{ item.currency_symbol }}&nbsp;{{ item.price }}&nbsp;{{ item.currency_code }}&nbsp;/&nbsp;{{
                      item.level &&
                        item.level.name }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <div class="subscription-detail">
                专为中小团队项目周期优化，服务期内畅享稳定服务、高清输出与参数保留功能。适配方案迭代、阶段呈现与成果整合等全流程，助力团队高效推进设计进度。
              </div>

              <div class="subscription-btn" @click="openPayDialog">
                订阅计划
              </div>
              <div class="subscription-detail-list">
                <ul>
                  <li>
                    <svg-icon icon-class="check" class="check-icon" />GAIA模型支持
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon" />服务期内无限图像生成次数
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon" />服务期内无限语义分割功能使用次数
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon" />服务期内无限语义分割工具包使用次数
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon" />服务期内无限PNG下载次数
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon" />服务期内无限PSD下载次数
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon" />生图排队优先权
                  </li>
                </ul>
              </div>
            </div>
          </el-col>
          <!-- GAIA Business -->
          <el-col :span="8">
            <div class="subscription-interface-card">
              <div class="subscription-interface-card-title" style="background: #000">
                GAIA Business
              </div>
              <div class="subscription-text" style="color: #000">
                GAIA Business
              </div>
              <div class="subscription-description" style="color: #000">
                为专业机构与中大型企业、事务所打造
              </div>
              <div class="subscription-price">咨询客服</div>
              <div class="subscription-detail">
                专为专业事务所和大型机构打造，支持接口接入、成员管理、私有化部署与品牌定制。提供专属技术支持与持续更新服务，满足高级图像生成与系统对接需求。
              </div>
              <div class="subscription-btn" style="background: #000" @click="showContactQr = true">
                咨询客服
              </div>
              <!-- 客服二维码弹窗 -->
              <el-dialog
                :visible.sync="showContactQr"
                width="320px"
                :show-close="true"
                :lock-scroll="false"
                class="contact-qr-dialog"
                title=""
              >
                <div style="display: flex; flex-direction: column; align-items: center; padding: 20px 0;">
                  <!-- 这里替换为你的二维码图片地址 -->
                  <img src="@/assets/images/contact-qr.jpg" alt="客服二维码" style="width: 180px; height: 180px; border-radius: 8px; border: 1px solid #eee;">
                  <div style="margin-top: 18px; font-size: 16px; color: #333;">联系我们</div>
                </div>
              </el-dialog>
              <div class="subscription-detail-list">
                <ul>
                  <li>
                    <svg-icon icon-class="check" class="check-icon" />专人提供企业AI技术培训辅导
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon" />专人提供技术支持
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon" />本地化部署专用服务器
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon" />GAIA模型支持
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon" />服务期内无限图像生成次数
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon" />服务期内无限语义分割功能使用次数
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon" />服务期内无限语义分割工具包使用次数
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon" />服务期内无限PNG下载次数
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon" />服务期内无限PSD下载次数
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon" />服务器内生图排队优先权
                  </li>
                </ul>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- 会员权益 -->
      <div class="subscription-compare-content">
        <div class="subscription-interface-compare">会员权益对比</div>
        <div class="subscription-compare-container">
          <div class="subscription-compare-title temp-block" />
          <div class="subscription-compare-title" style="background: #000">
            GAIA
          </div>
          <!-- <el-col :span="4"
              ><div class="subscription-compare-title" style="background: #000">
                GAIA PLUS/日
              </div></el-col
            > -->

          <div class="subscription-compare-title " style="background: #000">
            GAIA PLUS/周
          </div>
          <div class="subscription-compare-title" style="background: #000">
            GAIA PLUS/月
          </div>
          <div class="subscription-compare-title" style="background: #000">
            GAIA PLUS/年
          </div>
          <div class="subscription-compare-title last" style="background: #000">
            GAIA Business
          </div>
        </div>
        <div class="subscription-compare-content-item">
          <div class="item-title">会员权益</div>
          <div class="item-word">
            <span class="item-word-title">生成次数</span>
            <span class="item-word-item">3次免费生成</span><span class="item-word-item">当周无限</span><span
              class="item-word-item"
            >当月无限</span><span class="item-word-item">无限</span><span
              class="item-word-item last"
            >无限</span>
          </div>
          <div class="item-word">
            <span class="item-word-title">排队优先权</span>
            <span class="item-word-item">/</span><span class="item-word-item">/</span><span
              class="item-word-item"
            >√</span><span class="item-word-item">√</span><span
              class="item-word-item last"
            >√</span>
          </div>
          <div class="item-word">
            <span class="item-word-title">GAIA模型</span>
            <span class="item-word-item">√</span><span class="item-word-item">√</span><span
              class="item-word-item"
            >√</span><span class="item-word-item">√</span><span
              class="item-word-item last"
            >√</span>
          </div>
          <div class="item-word">
            <span class="item-word-title">语义分割功能</span>
            <span class="item-word-item">3次</span><span class="item-word-item">当周无限</span><span
              class="item-word-item"
            >当月无限</span><span class="item-word-item">当年无限</span><span
              class="item-word-item last"
            >无限</span>
          </div>
          <div class="item-word">
            <span class="item-word-title">语义分割工具包</span>
            <span class="item-word-item">无限</span><span class="item-word-item">无限</span><span
              class="item-word-item"
            >无限</span><span class="item-word-item">无限</span><span
              class="item-word-item last"
            >无限</span>
          </div>
          <div class="item-word">
            <span class="item-word-title">PNG下载</span>
            <span class="item-word-item">3次</span><span class="item-word-item">当周无限</span><span
              class="item-word-item"
            >当月无限</span><span class="item-word-item">当年无限</span><span
              class="item-word-item last"
            >无限</span>
          </div>
          <div class="item-word">
            <span class="item-word-title">PSD下载</span>
            <span class="item-word-item">/</span><span class="item-word-item">当周无限</span><span
              class="item-word-item"
            >当月无限</span><span class="item-word-item">当年无限</span><span
              class="item-word-item last"
            >无限</span>
          </div>
          <div class="item-title item-title-last">支持服务</div>
          <div class="item-word">
            <span class="item-word-title">用户培训计划</span>
            <span class="item-word-item">/</span><span class="item-word-item">/</span><span
              class="item-word-item"
            >/</span><span class="item-word-item">√</span><span
              class="item-word-item last"
            >√</span>
          </div>
          <div class="item-word">
            <span class="item-word-title">技术咨询</span>
            <span class="item-word-item">/</span><span class="item-word-item">/</span><span
              class="item-word-item"
            >/</span><span class="item-word-item">√</span><span
              class="item-word-item last"
            >√</span>
          </div>
        </div>
      </div>
      <div class="subscription-contact-customer" @click="toAboutUs"><span>联系专属客服</span></div>
    </div>
    <el-dialog
      :visible.sync="payVisible"
      width="400px"
      :before-close="handlePayClose"
      :show-close="false"
      :lock-scroll="false"
    >
      <div class="pay-dialog-container">
        <div class="plan-container">
          <!-- <div class="pay-dialog-plan">
            <div>当前订阅计划</div>
            <div class="plan-content">
              <div><span>订阅计划名称</span><span>优惠计划</span></div>
              <div><span>到期时间</span><span>2025.06.04</span></div>
            </div>
          </div> -->
          <div class="pay-dialog-plan">
            <div>购买计划</div>
            <div class="plan-content">
              <div><span>订阅计划名称</span><span>{{ payData.membership_name }}</span></div>
              <div><span>到期时间</span><span>{{ payData.membership_end_date }}</span></div>
            </div>
          </div>
        </div>
        <div class="pay-content">
          <!-- <div class="pay-content-item">
            <span class="pay-content-item-title">数量</span><span class="pay-content-item-value">1</span>
          </div> -->
          <div class="pay-content-item">
            <span class="pay-content-item-title">生效时间</span><span
              class="pay-content-item-value"
            >{{ payData.membership_starting_date }}</span>
          </div>
          <div class="pay-content-item">
            <span class="pay-content-item-title">付款方式</span><span class="pay-content-item-value">{{ payData.payment_method }}</span>
          </div>
        </div>
        <div class="pay-content" style="margin-top: 25px">
          <div class="pay-content-item">
            <span class="pay-content-item-title">应付款</span><span
              class="pay-content-item-value"
              style="color: #000; font-size: 20px"
            >{{ payData.currency_symbol }} {{ payData.price }}</span>
          </div>
        </div>
        <div class="pay-btn-container">
          <div class="pay-btn-item" @click="payVisible = false">返回</div>
          <div class="pay-btn-pay" @click="handleQRCodePayAction">扫码支付</div>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="qrcodePayVisible"
      title="微信支付"
      width="400px"
      :before-close="handleQRCodePayClose"
      :show-close="true"
      :lock-scroll="false"
      :destroy-on-close="true"
      @opened="generateQRCode"
    >
      <div class="pay-dialog-content">
        <div class="pay-dialog-body">
          <canvas id="qrCodeCanvas" />
          <span>请使用微信扫码</span>
        </div>
      </div>
      <div slot="footer" class="pay-dialog-footer">
        <div class="footer-left">
          <i class="el-icon-alarm-clock" />
          <span class="desc">支付剩余时间：{{ remainingTimeString }}</span>
        </div>
        <div class="footer-right">
          <div>
            <span>实付金额</span><span>{{ currentPayCurrency }}</span><span>{{ currentPayAmount }}</span>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="yearlyGroupQrVisible"
      width="320px"
      :show-close="true"
      :lock-scroll="false"
      class="contact-qr-dialog"
      title=""
    >
      <div style="display: flex; flex-direction: column; align-items: center; padding: 20px 0;">
        <img src="@/assets/images/yearly-group-qr.png" alt="年费会员群二维码" style="width: 180px; height: 180px; border-radius: 8px; border: 1px solid #eee;">
        <div style="margin-top: 18px; font-size: 16px; color: #333;">扫码进入社群</div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  createOrder,
  getAllMembershipPlans,
  getAllPaymentChannels,
  getOrderDetail,
  getUserOrderInfo,
  previewOrder
} from '@/api/subscription';
import QRCode from 'qrcode';

export default {
  name: 'SubscriptionInterface',
  data() {
    return {
      payVisible: false,
      qrcodePayVisible: false,
      orderNo: null,
      codeUrl: null,
      plusPriceOptions: [],
      plusPriceDisplay: {},
      remainingTime: 0, // 支付剩余时间
      remainingTimeString: '',
      remainingTimeTimer: null, // 定时器
      monitorOrderInterval: null, // 监控订单状态的定时器
      currentPayAmount: 0,
      currentPayCurrency: '',
      paymentChannelId: '', // 支付方式
      showContactQr: false, // 新增：控制二维码弹窗显示
      yearlyGroupQrVisible: false, // 年费会员群二维码弹窗
      orderId: '', // 订单ID
      payData: {} // 预览订单数据
    };
  },
  async created() {
    try {
      // 获取所有会员计划信息
      const { data } = await getAllMembershipPlans();
      const paymentChannelsData = await getAllPaymentChannels();// 获取所有支付渠道列表
      // 筛选出来code = "wechatNative"的数据
      const filteredPaymentData = paymentChannelsData.data.filter(item => item.code === 'wechatNative');
      this.paymentChannelId = filteredPaymentData[0].id;
      // 过滤data里面免费会员的数据
      const filteredData = data.filter(item => item.level.id !== 1);
      this.plusPriceOptions = filteredData;
      this.plusPriceDisplay = filteredData[0];
    } catch (error) {
      console.log();
    }
  },
  destroyed() {
    if (this.remainingTimeTimer) {
      clearInterval(this.remainingTimeTimer);
    }
    if (this.monitorOrderInterval) {
      clearInterval(this.monitorOrderInterval);
    }
  },
  methods: {
    toGenerate() {
      this.$router.push('/generate');
    },
    toAboutUs() {
      this.$router.push('/aboutus');
    },
    handlePayClose() {
      this.payVisible = false;
      this.payData = {};
    },
    handlePlusPriceChange(id) {
      const found = this.plusPriceOptions.find((o) => o.id === id);
      if (found) {
        this.plusPriceDisplay = found;
      }
    },
    // 点击扫码支付
    async handleQRCodePayAction() {
      this.payVisible = false;
      const { data } = await createOrder({
        membership_plan_id: this.plusPriceDisplay.id,
        payment_channel_id: this.paymentChannelId, // 微信支付
        currency_id: this.plusPriceDisplay.currency_id
      });

      // TODO 提交订单获取code_url
      this.orderNo = data.order_no; // 订单No
      this.codeUrl = data.payment_url; // 支付链接
      this.orderId = data.order_id; // 订单ID
      // 设置支付金额和币种
      this.currentPayAmount = data.price;
      this.currentPayCurrency = data.currency;

      // 这里可以添加支付逻辑
      this.qrcodePayVisible = true;
    },
    // 使用qrcode lib生成二维码
    generateQRCode() {
      const canvas = document.getElementById('qrCodeCanvas');
      if (!canvas) return;
      // reset canvas
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      // 创建二维码
      QRCode.toCanvas(canvas, this.codeUrl, {
        width: 150,
        height: 150
      }, function(error) {
        if (error) console.error(error);
        console.log('success!');
      });
      // 启动支付定时器和订单监控
      this.startPaymentTimer();
      this.startMonitorOrder();
    },
    handleQRCodePayClose() {
      this.qrcodePayVisible = false;
      // TODO 处理支付关闭逻辑
      // stop timers
      if (this.remainingTimeTimer) {
        clearInterval(this.remainingTimeTimer);
      }
      if (this.monitorOrderInterval) {
        clearInterval(this.monitorOrderInterval);
      }
      this.remainingTime = 0;
      this.remainingTimeString = '';
      this.orderNo = null;
      this.codeUrl = null;
    },
    startPaymentTimer() {
      this.remainingTime = 60 * 60; // 1小时
      this.remainingTimeTimer = setInterval(() => {
        if (this.remainingTime > 0) {
          this.remainingTime--;
          // 更新支付剩余时间显示
          const hours = String(Math.floor(this.remainingTime / 3600)).padStart(2, '0');
          const minutes = String(Math.floor((this.remainingTime % 3600) / 60)).padStart(2, '0');
          const seconds = String(this.remainingTime % 60).padStart(2, '0');
          this.remainingTimeString = `${hours}:${minutes}:${seconds}`;
        } else {
          clearInterval(this.remainingTimeTimer);
          this.qrcodePayVisible = false; // 支付超时关闭对话框
        }
      }, 1000);
    },
    async startMonitorOrder() {
      this.monitorOrderInterval = setInterval(async() => {
        // TODO: 轮询订单状态
        // 模拟订单状态检查
        try {
          const { data } = await getOrderDetail(this.orderNo);
          if (data.payment_status === 'paid') {
            this.handlePaymentSuccess();
          } else if (data.payment_status === 'failed') {
            this.$message.error('支付失败');
            clearInterval(this.remainingTimeTimer);
            clearInterval(this.monitorOrderInterval);
          }
        } catch (error) {
          if (this.remainingTimeTimer) {
            clearInterval(this.remainingTimeTimer);
          }
          if (this.monitorOrderInterval) {
            clearInterval(this.monitorOrderInterval);
          }
        }
      }, 1000);
    },
    // 假设支付成功后调用
    async handlePaymentSuccess() {
      clearInterval(this.remainingTimeTimer);
      clearInterval(this.monitorOrderInterval);
      this.qrcodePayVisible = false;
      this.$message.success('支付成功！');
      this.currentPayAmount = 0;
      this.currentPayCurrency = '';
      // 获取用户订单信息
      const orderInfo = await getUserOrderInfo(this.orderId); // 获取用户订单信息
      console.log('orderInfo', orderInfo);
      // 年费会员弹群二维码
      if (orderInfo.data.membership_plan.membership_level.id === 4) {
        this.yearlyGroupQrVisible = true;
      } else {
        // 跳转到用户界面
        this.$router.push('/userInterface');
      }
    },
    // 打开弹窗时拉取数据
    async openPayDialog() {
      try {
        const { data } = await previewOrder({
          membership_plan_id: this.plusPriceDisplay.id,
          payment_channel_id: this.paymentChannelId, // 微信支付
          currency_id: this.plusPriceDisplay.currency_id
        });

        this.payData = {
          ...data,
          membership_starting_date: data.membership_starting_date.slice(0, 10),
          membership_end_date: data.membership_end_date.slice(0, 10),
          currency_symbol: data.currency.symbol
        };

        this.payVisible = true;
      } catch (err) {
        this.$message.error('获取支付信息失败');
        console.error(err);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.subscription-interface-page {
  width: 90%;
  margin: 0 auto;
}

.subscription-interface-header {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  margin: 20px 0 40px 0;
  font-size: 18px;
}

.subscription-interface-card {
  width: 100%;
  border: 2px solid #ccc;
  border-radius: 10px;
  padding: 30px 20px 20px 20px;
  position: relative;
  height: 550px;
}

.subscription-interface-card-title {
  position: absolute;
  width: 120px;
  text-align: center;
  font-size: 12px;
  color: #fff;
  background: #cecece;
  padding: 4px 0;
  border-radius: 6px;
  top: -2px;
  left: -2px;
}

.subscription-text {
  font-size: 20px;
}

.subscription-description {
  font-size: 14px;
  text-align: left;
  margin: 10px 0 15px 0;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}

.subscription-detail {
  font-size: 11px;
  line-height: 1.5;
  height: 55px;
  margin: 25px 0;
}

.price-amount-number {
  display: inline-block;
  /* width: 70px; */
  text-align: right;
  font-size: 32px;
  margin-left: 8px;
}

.price-trigger:hover {
  background: #000;

  .price-amount-number {
    color: #fff;
  }

  .price-arrow {
    color: #fff;
  }
}

.subscription-btn {
  font-size: 20px;
  color: #fff;
  background: #000;
  text-align: center;
  padding: 10px 0;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 25px;
}

.subscription-detail-list {
  font-size: 11px;
  margin-top: 30px;

  ul {
    padding: 0;
    margin: 0;
    margin-left: 10px;
    list-style: none;

    li {
      margin-bottom: 6px;

      .check-icon {
        margin-right: 10px;
      }
    }
  }
}

.subscription-interface-compare {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  margin: 30px 0 0px 0;
  font-size: 18px;
}

.subscription-compare-container {
  width: 100%;
  margin: 0px auto;
  display: flex;
  justify-content: space-between;
  /* padding-right: 26px; */
}

.subscription-compare-title {
  margin: 0 !important;
  font-size: 12px;
  color: #fff;
  width: 140px;
  padding: 4px 0;
  border-radius: 15px;
  text-align: center;
  background: transparent;
  margin-bottom: 30px;
}

.last {
  margin-right: 7% !important;
}

.temp-block {
  /* width: 400px; */
  width: 100px;
}

.table-style {
  position: relative;

  .table-theme {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    min-width: 120px;
    height: 20px;
    line-height: 20px;
    color: #fff;
    text-align: center;
    border-radius: 15px;
    padding: 0 12px;
    font-size: 12px;
  }
}

.item-title {
  font-size: 18px;
  padding: 10px 0 10px 0;
  border-bottom: 1px solid #ccc;
}

.item-title-last {
  padding: 24px 0 10px 0;
}

.item-word {
  font-size: 14px;
  padding: 8px 0 3px 0;
  border-bottom: 1px solid #ccc;
  /* gap: 60px; */
  display: flex;
  justify-content: space-between;
  /* gap: 120px; */
  align-items: center;

  .item-word-item {
    /* width: 300px; */
    text-align: center;
    font-size: 12px;
    width: 140px;
  }

  .last {
    margin-right: 7%;
  }
}

.item-word-title {
  display: inline-block;
  /* width: 400px; */
  width: 100px;
}

.subscription-compare-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0 80px 0;
}

.plan-container {
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 0 35px 10px 35px;
  border-bottom: 1px solid #ccc;
}

.subscription-contact-customer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
}

.subscription-contact-customer span {
  display: inline-block;
  width: 210px;
  height: 35px;
  background: #000;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  border-radius: 30px;
  text-align: center;
  line-height: 35px;
  letter-spacing: 2px;
}

.pay-dialog-container {
  padding: 0;
}

::v-deep.subscription-interface-page .el-dialog__body {
  padding: 0 !important;
}

.plan-content {
  background: #666;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px 15px;
  border-radius: 10px;
  margin-top: 12px;
  font-size: 12px;
}

.plan-content div {
  display: flex;
  justify-content: space-between;
}

.pay-content {
  margin-top: 15px;
  padding: 0 35px 10px 35px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .pay-content-item {
    display: flex;
    justify-content: space-between;

    .pay-content-item-value {
      color: #aaa;
    }
  }
}

.pay-btn-container {
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 25px 40px 20px 0;

  .pay-btn-item {
    cursor: pointer;
  }

  .pay-btn-pay {
    width: 200px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #000;
    color: #fff;
    border-radius: 30px;
    cursor: pointer;
    margin-left: 10px;
    font-size: 18px;
    margin-left: 20px;
  }
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 40px;
}

table td {
  padding: 20px 2px;
  width: 200px;
  border: 1px solid #ccc;
}

table th {
  padding: 20px 2px;
  width: 200px;
  border: none;
}

table tbody tr:nth-child(odd) {
  background: #eee;
}

.price-trigger {
  padding-left: 15px;
  padding-right: 40px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.subscription-price {
  font-size: 20px;
  height: 35px;
  line-height: 35px;
  display: flex;
  align-items: center;
  border-radius: 12px;
  color: #000;
  cursor: pointer;
}

.price-amount {
  font-size: 40px;
}

.price-amount-symbol {
  position: absolute;
  top: -2px;
  left: 10px;
  color: #999;
  font-size: 16px;
  line-height: 32px;
}

.price-unit {
  font-size: 14px;
  color: #999;
  margin-left: 0px;
  height: 2vh
}

.price-arrow {
  font-size: 18px;
  margin-left: 6px;
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.price-dropdown-menu {
  min-width: 160px;

  .el-dropdown-item {
    font-size: 14px;
  }
}

::v-deep .el-dropdown-menu__item:hover {
  background: #ccc;
  color: #fff
}

/* 支付二维码对话框样式 */
.pay-dialog-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: 200px;
}

.pay-dialog-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 20px 0;
}

.pay-dialog-body canvas {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.pay-dialog-body span {
  font-size: 14px;
  color: #666;
  text-align: center;
}

.pay-dialog-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px 0;
  border-top: 1px solid #f0f0f0;
  margin-top: 20px;
  width: 100%;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-left .desc {
  font-size: 12px;
  color: #999;
}

.footer-right {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
}

.footer-right div {
  display: flex;
  align-items: baseline;

  gap: 2px;
}

.footer-right span:first-child {
  color: #666;
  margin-right: 8px;
}

.footer-right span:nth-child(2) {
  color: #ff4d4f;
  font-size: 12px;
}

.footer-right span:last-child {

  color: #ff4d4f;
  font-size: 18px;
  font-weight: 600;
}

/* ::v-deep .el-col-8 {
  padding-left: 0 !important;
  padding-right: 0 !important;
} */

::v-deep .el-dialog__header {
  /* padding: 0 20px 10px; */
}
</style>
