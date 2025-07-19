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
                    <svg-icon icon-class="check" class="check-icon"></svg-icon
                    >GAIA模型支持
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon"></svg-icon
                    >当日3次图像生成次数
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon"></svg-icon
                    >当日3次语义分割功能使用次数
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon"></svg-icon
                    >当日3次语义分割工具包使用次数
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon"></svg-icon
                    >当日3次JPG下载次数
                  </li>
                </ul>
              </div>
            </div>
          </el-col>
          <!-- GAIA_PLUS -->
          <el-col :span="8">
            <div class="subscription-interface-card">
              <div
                class="subscription-interface-card-title"
                style="background: #9a9a9a"
              >
                GAIA_PLUS
              </div>
              <div class="subscription-text">GAIA_PLUS</div>
              <div class="subscription-description">
                为进阶人士和进阶人士打造
              </div>
              <!-- 下拉选择价格周期 -->
              <el-dropdown
                trigger="click"
                @command="handlePlusPriceChange"
                class="price-dropdown"
              >
                <div class="subscription-price price-trigger">
                  <span class="price-amount"
                    ><span class="price-amount-symbol">￥</span
                    ><span class="price-amount-number">{{
                      plusPriceDisplay.amount
                    }}</span></span
                  >
                  <span class="price-unit"
                    >RMB&nbsp;/{{ plusPriceDisplay.unit }}</span
                  >
                  <i class="el-icon-arrow-down price-arrow"></i>
                </div>
                <el-dropdown-menu slot="dropdown" class="price-dropdown-menu">
                  <el-dropdown-item
                    v-for="item in plusPriceOptions"
                    :key="item.unit"
                    :command="item.unit"
                  >
                    {{ item.label }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <div class="subscription-detail">
                专为中小团队项目周期优化，服务期内畅享稳定服务、高清输出与参数保留功能。适配方案迭代、阶段呈现与成果整合等全流程，助力团队高效推进设计进度。
              </div>

              <div
                class="subscription-btn"
                style="background: #9a9a9a"
                @click="payVisible = true"
              >
                订阅计划
              </div>
              <div class="subscription-detail-list">
                <ul>
                  <li>
                    <svg-icon icon-class="check" class="check-icon"></svg-icon
                    >GAIA模型支持
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon"></svg-icon
                    >服务期内无限图像生成次数
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon"></svg-icon
                    >服务期内无限语义分割功能使用次数
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon"></svg-icon
                    >服务期内无限语义分割工具包使用次数
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon"></svg-icon
                    >服务期内无限JPG下载次数
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon"></svg-icon
                    >服务期内无限PSD下载次数
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon"></svg-icon
                    >生图排队优先权
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon"></svg-icon
                    >专属用户培训计划
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon"></svg-icon
                    >专属技术咨询支持
                  </li>
                </ul>
              </div>
            </div>
          </el-col>
          <!-- GAIA_Business -->
          <el-col :span="8">
            <div class="subscription-interface-card">
              <div
                class="subscription-interface-card-title"
                style="background: #000"
              >
                GAIA_Business
              </div>
              <div class="subscription-text" style="color: #000">
                GAIA_Business
              </div>
              <div class="subscription-description" style="color: #000">
                为专家人士和专家人士打造
              </div>
              <div class="subscription-price" style="font-size: 25px">￥???</div>
              <div class="subscription-detail">
                专为专业事务所和大型机构打造，支持接口接入、成员管理、私有化部署与品牌定制。提供专属技术支持与持续更新服务，满足高级图像生成与系统对接需求。
              </div>
              <div
                class="subscription-btn"
                style="background: #000"
                @click="toAboutUs"
              >
                咨询客服
              </div>
              <div class="subscription-detail-list">
                <ul>
                  <li>
                    <svg-icon icon-class="check" class="check-icon"></svg-icon
                    >专人提供企业AI技术培训辅导
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon"></svg-icon
                    >专人提供技术支持
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon"></svg-icon
                    >本地化部署专用服务器
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon"></svg-icon
                    >GAIA模型支持
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon"></svg-icon
                    >服务期内无限图像生成次数
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon"></svg-icon
                    >服务期内无限语义分割功能使用次数
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon"></svg-icon
                    >服务期内无限语义分割工具包使用次数
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon"></svg-icon
                    >服务期内无限JPG下载次数
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon"></svg-icon
                    >服务期内无限PSD下载次数
                  </li>
                  <li>
                    <svg-icon icon-class="check" class="check-icon"></svg-icon
                    >服务器内生图排队优先权
                  </li>
                </ul>
              </div>
            </div></el-col
          >
        </el-row>
      </div>

      <!-- 会员权益 -->
      <div class="subscription-compare-content" v-if="!payVisible">
        <div class="subscription-interface-compare">会员权益对比</div>
        <div
          class="subscription-compare-container"
          style="width: 90%; margin: 0 auto"
        >
          <el-row>
            <el-col :span="4"
              ><div class="subscription-compare-title" style="background: #000">
                GAIA
              </div></el-col
            >
            <el-col :span="4"
              ><div class="subscription-compare-title" style="background: #000">
                GAIA PLUS/日
              </div></el-col
            >
            <el-col :span="4"
              ><div class="subscription-compare-title" style="background: #000">
                GAIA PLUS/周
              </div></el-col
            >
            <el-col :span="4"
              ><div class="subscription-compare-title" style="background: #000">
                GAIA PLUS/月
              </div></el-col
            >
            <el-col :span="4"
              ><div class="subscription-compare-title" style="background: #000">
                GAIA PLUS/年
              </div></el-col
            >
            <el-col :span="4"
              ><div class="subscription-compare-title" style="background: #000">
                GAIA Business
              </div></el-col
            >
          </el-row>
        </div>
        <div class="subscription-compare-content-item">
          <div class="item-title">会员权益</div>
          <div class="item-word">
            <span class="item-word-title">生成次数</span>
            <span class="item-word-item">3次免费生成</span
            ><span class="item-word-item">当周无限</span
            ><span class="item-word-item">当月无限</span
            ><span class="item-word-item">无限</span
            ><span class="item-word-item">无限</span>
          </div>
          <div class="item-word">
            <span class="item-word-title">排队优先权</span>
            <span class="item-word-item">/</span
            ><span class="item-word-item">/</span
            ><span class="item-word-item">√</span
            ><span class="item-word-item">√</span
            ><span class="item-word-item">√</span>
          </div>
          <div class="item-word">
            <span class="item-word-title">GAIA模型</span>
            <span class="item-word-item">√</span
            ><span class="item-word-item">√</span
            ><span class="item-word-item">√</span
            ><span class="item-word-item">√</span
            ><span class="item-word-item">√</span>
          </div>
          <div class="item-word">
            <span class="item-word-title">语义分割功能</span>
            <span class="item-word-item">3次</span
            ><span class="item-word-item">当周无限</span
            ><span class="item-word-item">当月无限</span
            ><span class="item-word-item">当年无限</span
            ><span class="item-word-item">无限</span>
          </div>
          <div class="item-word">
            <span class="item-word-title">语义分割工具包</span>
            <span class="item-word-item">3次</span
            ><span class="item-word-item">当周无限</span
            ><span class="item-word-item">当月无限</span
            ><span class="item-word-item">当年无限</span
            ><span class="item-word-item">无限</span>
          </div>
          <div class="item-word">
            <span class="item-word-title">JPG下载</span>
            <span class="item-word-item">3次</span
            ><span class="item-word-item">当周无限</span
            ><span class="item-word-item">当月无限</span
            ><span class="item-word-item">当年无限</span
            ><span class="item-word-item">无限</span>
          </div>
          <div class="item-word">
            <span class="item-word-title">PSD下载</span>
            <span class="item-word-item">/</span
            ><span class="item-word-item">当周无限</span
            ><span class="item-word-item">当月无限</span
            ><span class="item-word-item">当年无限</span
            ><span class="item-word-item">无限</span>
          </div>
        </div>
        <div class="subscription-compare-content-item">
          <div class="item-title">支持服务</div>
          <div class="item-word">
            <span class="item-word-title">用户培训计划</span>
            <span class="item-word-item">/</span
            ><span class="item-word-item">/</span
            ><span class="item-word-item">/</span
            ><span class="item-word-item">/</span
            ><span class="item-word-item">√</span
            ><span class="item-word-item">√</span>
          </div>
          <div class="item-word">
            <span class="item-word-title">技术咨询</span>
            <span class="item-word-item">/</span
            ><span class="item-word-item">/</span
            ><span class="item-word-item">/</span
            ><span class="item-word-item">/</span
            ><span class="item-word-item">√</span
            ><span class="item-word-item">√</span>
          </div>
        </div>
      </div>
      <!-- 生成次数 -->
      <div v-if="payVisible">
        <div class="subscription-interface-compare">订阅计划对比</div>

        <table>
          <!-- 表头：第一列为空，用于放置字段名称 -->
          <thead>
            <tr>
              <th style="border: none"></th>
              <th class="table-style">
                <div class="table-theme" style="background: #cecece">
                  基础计划
                </div>
              </th>
              <th class="table-style">
                <div class="table-theme" style="background: #9a9a9a">
                  进阶计划
                </div>
              </th>
              <th class="table-style">
                <div class="table-theme" style="background: #000">专家计划</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>生成次数</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>安全性</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>高级功能</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>高级功能</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>高级功能</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>高级功能</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>高级功能</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>高级功能</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="subscription-contact-customer"><span>联系专属客服</span></div>
    </div>
    <el-dialog
      :visible.sync="payVisible"
      width="28%"
      :before-close="handlePayClose"
      :show-close="false"
      :lock-scroll="false"
    >
      <div class="pay-dialog-container">
        <div class="plan-container">
          <div class="pay-dialog-plan">
            <div>当前订阅计划</div>
            <div class="plan-content">
              <div><span>订阅计划名称</span><span>优惠计划</span></div>
              <div><span>到期时间</span><span>2025.06.04</span></div>
            </div>
          </div>
          <div class="pay-dialog-plan">
            <div>切换到订阅计划</div>
            <div class="plan-content">
              <div><span>订阅计划名称</span><span>优惠计划</span></div>
              <div><span>到期时间</span><span>2025.06.04</span></div>
            </div>
          </div>
        </div>
        <div class="pay-content">
          <div class="pay-content-item">
            <span class="pay-content-item-title">数量</span
            ><span class="pay-content-item-value">1</span>
          </div>
          <div class="pay-content-item">
            <span class="pay-content-item-title">生效时间</span
            ><span class="pay-content-item-value">2025-06-01-2025-06-01</span>
          </div>
          <div class="pay-content-item">
            <span class="pay-content-item-title">付款方式</span
            ><span class="pay-content-item-value">微信支付</span>
          </div>
        </div>
        <div class="pay-content" style="margin-top: 25px">
          <div class="pay-content-item">
            <span class="pay-content-item-title">应付款</span
            ><span
              class="pay-content-item-value"
              style="color: #000; font-size: 20px"
              >￥570</span
            >
          </div>
        </div>
        <div class="pay-btn-container">
          <div class="pay-btn-item" @click="payVisible = false">返回</div>
          <div class="pay-btn-pay">支付</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "SubscriptionInterface",
  data() {
    return {
      payVisible: false,
      plusPriceOptions: [
        { unit: "周", amount: 49, label: "￥49 RMB / 周" },
        { unit: "月", amount: 129, label: "￥129 RMB / 月" },
        { unit: "年", amount: 999, label: "￥999 RMB / 年" },
      ],
      plusPriceDisplay: { unit: "月", amount: 129 },
    };
  },
  methods: {
    toGenerate(){
      this.$router.push("/generate");
    },
    toAboutUs(){
      this.$router.push("/aboutus");
    },
    handlePayClose() {
      this.payVisible = false;
    },
    handlePlusPriceChange(unit) {
      const found = this.plusPriceOptions.find((o) => o.unit === unit);
      if (found) {
        this.plusPriceDisplay = { unit: found.unit, amount: found.amount };
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.subscription-interface-page {
  width: 80%;
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
  padding: 30px;
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

.price-amount-number{
  display: inline-block;
  width: 70px;
  text-align: right;
  font-size: 32px;
}
.price-trigger:hover {
  background: #000;
  .price-amount-number {
    color: #fff;
  }
  .price-arrow{
    color:#fff;
  }
}
.subscription-btn {
  font-size: 20px;
  color: #fff;
  background: #cecece;
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
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}
.item-word {
  font-size: 14px;
  padding: 8px 0 3px 0;
  border-bottom: 1px solid #ccc;
  display: flex;
  gap: 60px;
  .item-word-item {
    width: 300px;
    text-align: center;
    font-size: 12px;
  }
}
.item-word-title {
  display: inline-block;
  width: 400px;
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
  height:35px;
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
}
.price-unit {
  font-size: 14px;
  color: #999;
  margin-left: 0px;
  height:15px
}
.price-arrow {
  font-size: 18px;
  margin-left: 6px;
  position: absolute;
  bottom:10px;
  right:10px;
}
.price-dropdown-menu {
  min-width: 160px;
  .el-dropdown-item {
    font-size: 14px;
  }
}
::v-deep .el-dropdown-menu__item:hover{
 background: #ccc;
 color:#fff
}
</style>
