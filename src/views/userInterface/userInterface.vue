<template>
  <div class="user-interface-page">
    <!-- 顶部头像与用户名 -->
    <el-row>
      <el-col :span="24">
        <div class="user-header">
          <el-avatar :size="64" icon="el-icon-user-solid" />
          <span class="username">用户名</span>
          <span class="logout" @click="logoutVisible = true">退出登录</span>
        </div></el-col
      >
    </el-row>
    <el-row :gutter="22">
      <el-col :span="12">
        <div class="account-card-container">
          <el-card class="account-card" shadow="hover">
            <div slot="header" class="card-header">
              <span class="card-title">我的账户</span>
              <span class="card-title-btn" @click="accountVisible = true"
                >账户注销</span
              >
            </div>
            <el-form :model="accountForm" label-position="top">
              <el-form-item label="用户名">
                <el-input v-model="accountForm.username" />
              </el-form-item>
              <el-form-item label="电话号码">
                <el-input v-model="accountForm.phone" />
              </el-form-item>
              <el-form-item label="电子邮箱">
                <el-input
                  v-model="accountForm.email"
                  placeholder="输入邮箱地址"
                />
              </el-form-item>
              <el-form-item>
                <div class="save-btn" style="width: 100%; cursor: pointer">
                  更改/保存
                </div>
              </el-form-item>
            </el-form>
          </el-card>
          <div class="account-card-footer">
            <span class="account-card-footer-policy">隐私政策</span
            ><span class="account-card-footer-service">服务条款</span>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <el-card class="sub-card" shadow="hover">
          <div slot="header" class="card-header">
            <span class="card-title">我的订阅</span>
            <span class="card-title-btn">订阅计划</span>
          </div>

          <!-- 订阅计划信息 -->
          <div class="sub-card-header">
            <span class="sub-card-title">当前计划</span>
            <span class="sub-card-title-btn" @click="purchaseVisible = true"
              >购买记录</span
            >
          </div>
          <div class="sub-card-info">
            <div class="sub-card-info-item">
              <span>订阅计划名称</span>
              <span>优惠计划</span>
            </div>
            <div class="sub-card-info-item">
              <span>到期时间</span>
              <span>2025-06-04</span>
            </div>
          </div>
          <!-- 权益 -->
          <div class="sub-card-header">
            <span class="sub-card-title">权益</span>
          </div>
          <div
            class="sub-card-info sub-card-info-right"
            style="background-color: #f6f6f6; color: #000"
          >
            <div class="sub-card-info-item">
              <span class="sub-card-info-item-title">√</span>
              <span>每日赠送3张生成图片</span>
            </div>
            <div class="sub-card-info-item">
              <span class="sub-card-info-item-title">√</span>
              <span>可使用画廊</span>
            </div>
            <div class="sub-card-info-item">
              <span class="sub-card-info-item-title">√</span>
              <span>可使用语义分割</span>
            </div>
            <div class="sub-card-info-item">
              <span class="sub-card-info-item-title">√</span>
              <span>可使用材质固定</span>
            </div>
          </div>
        </el-card>
        <el-card class="sub-card" shadow="hover" style="margin-top: 22px">
          <div slot="header" class="card-header">
            <span class="card-title">使用情况</span>
          </div>
          <div
            class="sub-card-info sub-card-info-bottom"
            style="background-color: #fff; color: #767676"
          >
            <div class="sub-card-info-item">
              <span class="sub-card-info-item-title">总生成图纸数量/张</span>
              <span>25</span>
            </div>
            <div class="sub-card-info-item">
              <span class="sub-card-info-item-title">画廊保存数量/张</span>
              <span>15</span>
            </div>
            <div class="sub-card-info-item">
              <span class="sub-card-info-item-title">画廊收藏数量/张</span>
              <span>10</span>
            </div>
            <div class="sub-card-info-item">
              <span class="sub-card-info-item-title">已注册天数/天</span>
              <span>15</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      title="确认退出登录"
      :visible.sync="logoutVisible"
      width="30%"
      :before-close="handleLogoutClose"
    >
      <div class="logout-title">你确认要退出登录吗</div>
      <div class="logout-content">
        退出登录，您的账户将会从浏览器标签页中退出
      </div>
      <div slot="footer" class="dialog-footer">
        <span style="cursor: pointer" @click="logoutVisible = false">取消</span>
        <span class="logout-confirm" @click="logoutVisible = false"
          >确认退出</span
        >
      </div>
    </el-dialog>
    <el-dialog
      title="确认注销账户"
      :visible.sync="accountVisible"
      width="30%"
      :before-close="handleAccountClose"
    >
      <div class="logout-title">你确认要注销账户吗</div>
      <div class="logout-content">注销账户，您的账户将会从系统中移除</div>
      <div slot="footer" class="dialog-footer">
        <span style="cursor: pointer" @click="accountVisible = false"
          >取消</span
        >
        <span class="logout-confirm" @click="accountVisible = false"
          >确认注销</span
        >
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="purchaseVisible"
      width="50%"
      :before-close="handlePurchaseClose"
      :show-close="false"
    >
      <template slot="title">
        <div class="purchase-dialog-header">
          <span>购买记录</span>
          <span class="purchase-dialog-back" @click="purchaseVisible = false"
            >返回</span
          >
        </div>
      </template>
      <el-table
        :data="tableData"
        style="width: 100%; padding-bottom: 150px; color: #000"
        :header-cell-style="{
          color: '#000',
          fontWeight: 'normal',
          background: '#f6f6f6',
        }"
        :row-style="setRowStyle"
        class="custom-row-height"
      >
        <el-table-column prop="orderCode" label="订单号"> </el-table-column>
        <el-table-column
          prop="subscriptionName"
          label="订阅计划名称"
          width="180"
        >
        </el-table-column>
        <el-table-column prop="moneyAmount" label="金额"> </el-table-column>
        <el-table-column prop="amount" label="数量"> </el-table-column>
        <el-table-column prop="payStatus" label="支付状态"> </el-table-column>
        <el-table-column prop="payType" label="支付方式"> </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "UserInterface",
  data() {
    return {
      accountForm: {
        username: "xxxxxxxx",
        phone: "1885858585",
        email: "",
      },
      logoutVisible: false,
      accountVisible: false,
      purchaseVisible: false,
      tableData: [
        {
          orderCode: "",
          subscriptionName: "基础计划",
          moneyAmount: "￥98",
          amount: 1,
          payStatus: "未完成",
          payType: "微信支付",
        },
        {
          orderCode: "",
          subscriptionName: "进阶计划",
          moneyAmount: "￥198",
          amount: 1,
          payStatus: "已完成",
          payType: "微信支付",
        },
        {
          orderCode: "",
          subscriptionName: "专家计划",
          moneyAmount: "￥98",
          amount: 1,
          payStatus: "已完成",
          payType: "微信支付",
        },
      ],
    };
  },
  methods: {
    handleLogoutClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleAccountClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handlePurchaseClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    setRowStyle({ row, rowIndex }) {
      return {
        height: "20px", // 设置行高为20px
      };
    },
  },
};
</script>

<style scoped>
.user-interface-page {
  width: 50%;
  margin: 0 auto;
  margin-top: 20px;
}
.user-header {
  width: 250px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}
::v-deep.el-avatar {
  width: 50px !important;
  height: 50px !important;
  font-size: 30px !important;
  line-height: 50px !important;
  background: #fff;
  color: #ccc !important;
  border: 1px solid #ccc !important;
}
.username {
  font-size: 20px;
  letter-spacing: 2px;
}
.logout {
  display: inline-block;
  font-size: 12px;
  color: #fff;
  background: #000;
  padding: 5px 10px;
  border-radius: 20px;
  cursor: pointer;
}
::v-deep.el-card {
  border-color: #ccc !important;
  border-radius: 10px !important;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-title {
  font-size: 20px;
}
.card-title-btn {
  font-size: 12px;
  color: #fff;
  cursor: pointer;
  margin-left: 10px;
  border: 1px solid #000;
  padding: 5px 10px;
  border-radius: 20px;
  background: #000;
}
::v-deep.user-interface-page .el-card__header {
  border-bottom: 1px solid #ccc !important;
  padding: 10px 20px;
}
::v-deep.user-interface-page .el-form-item__label {
  display: inline;
  color: #000;
  font-weight: normal !important;
  padding: 0 !important;
  position: absolute;
  top: -28px;
  left: 0px;
  font-size: 12px;
}
::v-deep.user-interface-page .el-input__inner {
  height: 25px !important;
  line-height: 25px !important;
  border-radius: 8px !important;
  border-color: #ccc !important;
  margin-bottom: 15px;
}
::v-deep.user-interface-page .el-form-item {
  position: relative;
}
::v-deep.user-interface-page .el-card__body {
  padding-top: 35px;
}
.save-btn {
  color: #fff;
  font-size: 10px;
  background: #000;
  text-align: center;
  border-radius: 10px;
  height: 25px;
  line-height: 25px;
}
::v-deep.sub-card .el-card__body {
  padding-top: 18px;
}
.sub-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sub-card-title {
  font-size: 16px;
}
.sub-card-title-btn {
  font-size: 12px;
  border-bottom: 1px solid #000;
  cursor: pointer;
}
.sub-card-info {
  background: #666;
  padding: 18px 10px;
  border-radius: 10px;
  color: #fff;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 10px 0;
}
.sub-card-info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sub-card-info-right .sub-card-info-item {
  justify-content: flex-start;
}
.sub-card-info-item .sub-card-info-item-title {
  margin-right: 10px;
}
.sub-card-info-bottom {
  margin: 0;
  padding: 0 10px;
}
.logout-title,
.logout-content {
  font-size: 12px;
  color: #000;
  margin-bottom: 10px;
  margin-left: 20px;
}
.dialog-footer {
  font-size: 12px;
  color: #000;
  margin-bottom: 10px;
}
.logout-confirm {
  color: #fff;
  background: #000;
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  cursor: pointer;
  margin-left: 35px;
}
::v-deep.user-interface-page .el-dialog__body {
  padding: 10px 20px 0px 20px;
}
::v-deep.user-interface-page .el-dialog__title {
  color: #000 !important;
}
::v-deep .custom-row-height .el-table__row {
  height: 20px !important;
}
::v-deep .custom-row-height .el-table__row > td {
  padding: 4px 0 !important;
}
::v-deep .custom-row-height .cell {
  line-height: 20px !important;
  padding: 0 10px !important;
  text-align: center !important;
}
.purchase-dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.purchase-dialog-back {
  font-size: 12px;
  color: #000;
  cursor: pointer;
}

/* 表头顶部边框，保持与行边框一致 */
::v-deep .custom-row-height .el-table__header-wrapper thead th {
  border-top: 1px solid #ebeef5;
  padding: 0 10px !important;
}
::v-deep .custom-row-height .el-table__header-wrapper thead th .cell {
  line-height: 30px !important;
}
.account-card-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height:585px
}
.account-card{
  width: 100%;
}
.account-card-footer {
  color: #aaa;
  font-size: 12px;
}
.account-card-footer-policy {
  margin-right: 25px;
  cursor: pointer;
}
.account-card-footer-service {
  cursor: pointer;
}
</style>
