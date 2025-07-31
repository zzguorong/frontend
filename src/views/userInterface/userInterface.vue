<template>
  <div class="user-interface-page">
    <!-- 主体 -->
    <div class="main-content">
      <div class="main-left">
        <!-- 用户头像 -->
        <div class="main-card">
          <div class="title">
            <span>{{ userInfo.nickname }}</span>
          </div>
        </div>
        <!-- 我的账户 -->
        <div class="main-card">
          <div class="main-card-title">
            <span>我的账户</span>
          </div>
          <el-form>
            <div class="account-form">
              手机号码
              <el-form-item>
                <el-input v-model="userInfo.phone" disabled />
              </el-form-item>
            </div>
            <div class="account-form">
              微信绑定
              <template v-if="!userInfo.wechat_openid">
                <el-button class="btn-wx-check" type="primary" style="width:fit-content"
                  @click="wechatBindingDialogVisible = true">
                  <span>微信验证</span>
                </el-button>
              </template>
              <template v-else>
                <span>已绑定</span>
              </template>
            </div>
          </el-form>
        </div>

        <!-- 密码管理 -->
        <div class="main-card">
          <div class="password-section">
            <div class="main-card-title">密码管理
              <el-button class="pwd-btn" type="primary" style="width: fit-content" :loading="loading"
                @click="handlePasswordValidation">密码验证</el-button>
            </div>

            <el-form ref="resetPasswordForm" :model="resetPasswordForm" :rules="resetPasswordFormRules">
              <div class="account-form">
                当前密码
                <el-form-item prop="password">
                  <el-input v-model="resetPasswordForm.password" type="password" show-password placeholder="请输入当前密码" />
                </el-form-item>
              </div>
              <div class="account-form">
                新密码
                <el-form-item prop="newPassword">
                  <el-input v-model="resetPasswordForm.newPassword" type="password" show-password placeholder="请输入新密码" />
                </el-form-item>
              </div>
              <div class="account-form">
                重复输入新密码
                <el-form-item prop="confirmNewPassword">
                  <el-input v-model="resetPasswordForm.confirmNewPassword" type="password" show-password
                    placeholder="请再次输入密码" />
                </el-form-item>
              </div>
            </el-form>

            <div class="password-tips">
              <div>1. 密码长度不少于8个字符，最多不超过20个字符。</div>
              <div>
                2.
                密码必须包含至少三类字符类型：大写字母、小写字母、数字、特殊符号。
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 我的订阅计划 -->
      <div class="main-right">
        <!-- 我的订阅计划 -->
        <div class="main-card">
          <div class="main-card-title">
            <span>我的订阅计划</span>
          </div>
          <div class="plan-info">
            <div class="plan-title">当前计划 <el-button class="buy-btn" type="text"
                @click="purchaseVisible = true">购买记录</el-button></div>
            <div class="plan-name">
              <div class="plan-name-title">订阅计划名称 <span>xxxxx</span></div>
              <div class="plan-name-title">到期时间 <span>xxxxx</span></div>
            </div>
            <!-- 权益 -->
            <div class="plan-title">权益</div>
            <div class="plan-rights">

              <div class="plan-rights-list">
                <div class="plan-rights-item"><i class="el-icon-check" style="color: #9A9A9A" /> <span>专人提供技术支持</span>
                </div>
                <div class="plan-rights-item"><i class="el-icon-check" style="color: #9A9A9A" /> <span>本地化部署专用服务器</span>
                </div>
                <div class="plan-rights-item"><i class="el-icon-check" style="color: #9A9A9A" /> <span>GAIA模型支持</span>
                </div>
                <div class="plan-rights-item"><i class="el-icon-check" style="color: #9A9A9A" />
                  <span>服务期内无限图像生成次数</span>
                </div>
                <div class="plan-rights-item"><i class="el-icon-check" style="color: #9A9A9A" />
                  <span>服务期内无限语义分割功能使用次数</span>
                </div>
                <div class="plan-rights-item"><i class="el-icon-check" style="color: #9A9A9A" />
                  <span>服务期内无限语义分割工具包使用次数</span>
                </div>
                <div class="plan-rights-item"><i class="el-icon-check" style="color: #9A9A9A" />
                  <span>服务期内无限PNG下载次数</span>
                </div>
                <div class="plan-rights-item"><i class="el-icon-check" style="color: #9A9A9A" />
                  <span>服务期内无限PSD下载次数</span>
                </div>
                <div class="plan-rights-item"><i class="el-icon-check" style="color: #9A9A9A" />
                  <span>服务器内生图排队优先权</span>
                </div>
              </div>
            </div>

          </div>
          <!-- 使用情况 -->
          <div class="main-card-title">
            <span>使用情况</span>
          </div>
          <div class="plan-info">
            <div class="usage-list">
              <div class="usage-item">总生成图纸数量/张 <span>xx</span></div>
              <div class="usage-item">画廊保存数量/张 <span>xx</span></div>
              <div class="usage-item">画廊收藏数量/张 <span>xx</span></div>
              <div class="usage-item">已注册天数/天 <span>xx</span></div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <!-- 底部 -->
    <div class="footer-bar">
      <span class="agree-word footer-link" @click="handleTermOfservice">服务条款</span>
      <span class="agree-word footer-link" @click="handlePrivacyPolicy">隐私政策</span>
    </div>

    <el-dialog :visible.sync="wechatBindingDialogVisible" title="微信验证" width="400px"
      :before-close="handleWechatBindingDialogClose" :show-close="true" :lock-scroll="false" :destroy-on-close="true"
      @opened="generateWechatLoginQRCode">
      <div class="wechat-binding-dialog-content">
        <div class="wechat-binding-dialog-body">
          <div id="wechat-login-container" />
        </div>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="purchaseVisible" width="70%" :show-close="false" @open="onDialogOpen">
      <template slot="title">
        <div class="purchase-dialog-header">
          <span>购买记录</span>
          <span class="purchase-dialog-back" @click="purchaseVisible = false">返回</span>
        </div>
      </template>
      <el-table :data="tableData" style="width: 100%;  color: #000" height="500" :header-cell-style="{
        color: '#000',
        fontWeight: 'normal',
        background: '#f6f6f6',
      }" :row-style="setRowStyle" class="custom-row-height">
        <el-table-column prop="order_no" label="订单号"> </el-table-column>
        <el-table-column prop="subscriptionName" label="订阅计划名称" width="180">
        </el-table-column>
        <el-table-column prop="moneyAmount" label="金额"> </el-table-column>
        <el-table-column prop="amount" label="数量"> </el-table-column>
        <el-table-column prop="payment_status" label="支付状态"> </el-table-column>
        <el-table-column prop="payment_channel.name" label="支付方式"> </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>

import {
  getUserInfo
} from '@/api/generate';
import { updatePassword } from '@/api/index';
import { generateRandomString } from '@/utils/index';
import {
  getAllOrders, getAllMembershipPlans
} from '@/api/subscription';
export default {
  name: 'UserInterface',
  data() {
    return {
      userInfo: {},
      resetPasswordForm: {
        password: '',
        newPassword: '',
        confirmNewPassword: ''
      },
      resetPasswordFormRules: {
        password: [
          { required: true, message: '请输入当前密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          // 密码长度不少于8个字符，最多不超过20个字符。
          // 密码必须包含至少三类字符类型：大写字母、小写字母、数字、特殊符号: !@#$%^&*+-_=/?。
          { min: 8, max: 20, message: '密码长度必须在8-20位之间', trigger: 'blur' },
          { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*+-_=/?])[A-Za-z\d!@#$%^&*+-_=/?]{8,20}$/, message: '密码必须包含至少三类字符类型：大写字母、小写字母、数字、特殊符号: !@#$%^&*+-_=/?', trigger: 'blur' }
        ],
        confirmNewPassword: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { min: 8, max: 20, message: '密码长度必须在8-20位之间', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.resetPasswordForm.newPassword) {
                callback(new Error('两次输入的密码不一致'));
              } else {
                callback();
              }
            }, trigger: 'blur'
          }
        ]
      },
      loading: false,
      wechatBindingDialogVisible: false,
      purchaseVisible: false,
      tableData: []
    };
  },
  async created() {
    try {
      const data = await getUserInfo();
      this.userInfo = data;
    } catch (error) {
      console.log();
    }
  },
  methods: {
    // 处理密码验证
    handlePasswordValidation() {
      this.$refs.resetPasswordForm.validate(async (valid) => {
        if (valid) {
          try {
            this.loading = true;
            await updatePassword({
              password: this.resetPasswordForm.password,
              new_password: this.resetPasswordForm.newPassword,
              new_password_comfirm: this.resetPasswordForm.confirmNewPassword,
              new_password_confirm: this.resetPasswordForm.confirmNewPassword
            });
            this.$message.success('密码更新成功');
            this.resetPasswordForm = {
              password: '',
              newPassword: '',
              confirmNewPassword: ''
            };
          } catch (error) {
            this.$message.error('密码更新失败，请稍后再试');
          } finally {
            this.loading = false;
          }
        } else {
          this.$message.error('请检查输入的密码信息');
        }
      });
    },
    // 跳转服务条款
    handleTermOfservice() {
      this.$router.push('/termOfservice');
    },
    // 跳转隐私政策
    handlePrivacyPolicy() {
      this.$router.push('/privacyPolicy');
    },
    handleWechatBindingDialogClose() {
      this.wechatBindingDialogVisible = false;
    },
    // 生成微信登录二维码
    async generateWechatLoginQRCode() {
      const state = generateRandomString();
      // 保存state到会话存储，以便后续验证
      sessionStorage.setItem('wechatLoginState', state);
      // 初始化微信登录二维码
      new WxLogin({
        self_redirect: false, // 默认为false(保留当前二维码)  true(当前二维码所在的地方通过iframe 内跳转到 redirect_uri)
        id: 'wechat-login-container', // 容器的id
        appid: 'wxaebb39450f19b3fa', // 应用唯一标识，在微信开放平台提交应用审核通过后获得
        scope: 'snsapi_login', // 应用授权作用域，拥有多个作用域用逗号（,）分隔，网页应用目前仅填写snsapi_login即可
        redirect_uri: encodeURIComponent(
          'https://www.gaiass.com/auth/wechat/callback?wechat_binding=true' // 授权成功后跳转的路径，必须是经过URL编码的
        ), // 扫完码授权成功跳转到的路径
        state: state, // 用于保持请求和回调的状态，授权请求后原样带回给第三方。该参数可用于防止 csrf 攻击（跨站请求伪造攻击），建议第三方带上该参数，可设置为简单的随机数加 session 进行校验
        style: 'black', // 提供"black"、"white"可选，默认为黑色文字描述，
        // stylelite: 1,
        href: 'data:text/css;base64,LmltcG93ZXJCb3ggLnN0YXR1c190eHQge2ZvbnQtc2l6ZTogMjRweH0KLmltcG93ZXJCb3ggLnN0YXR1c190eHQgcCB7Zm9udC1zaXplOiAxOHB4fQouaW1wb3dlckJveCAuc3RhdHVzLnN0YXR1c19mYWlsIHAge2ZvbnQtc2l6ZTogMTZweCB9Ci5pbXBvd2VyQm94IC5zdGF0dXMuc3RhdHVzX2Jyb3dzZXIgcCB7Zm9udC1zaXplOiAxOHB4IH0KLmltcG93ZXJCb3ggLnN0YXR1cyB7cGFkZGluZzogN3B4IDB9Cmg0IHtmb250LXNpemU6IDE4cHh9Ci5pbXBvd2VyQm94IHtwYWRkaW5nLXRvcDogNXB4fQo='
      });
    },
    setRowStyle({ row, rowIndex }) {
      return {
        height: "20px", // 设置行高为20px
      };
    },
    // “弹窗打开 -> 表格显示”
    async onDialogOpen() {
      const res = await getAllOrders();
      // 获取订阅计划
      const { data } = await getAllMembershipPlans();
      // 遍历res.data改数据
      const modifiedData = res.data.map(item => {
        return {
          ...item,
          payment_status: item.payment_status === 'paid' ? '已支付' : (item.payment_status === 'pending'?'未支付':'支付失败')
        };
      });

      this.tableData = modifiedData;
    }
  }
};
</script>

<style lang="scss" scoped>
.user-interface-page {
  min-height: calc(100vh - 180px);
  display: flex;
  flex-direction: column;

  .main-content {
    display: flex;
    flex: 1;
    padding: 30px 0 0 0;
    width: 92%;
    margin: 0 auto;
    gap: 24px;

    .main-left {
      flex: 3;
      min-width: 420px;
    }

    .main-right {
      flex: 1;
      min-width: 340px;
      display: flex;
      flex-direction: column;
    }

    .main-card {
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
      /* padding: 0 0 24px 0; */
      margin-bottom: 0;
      margin-bottom: 30px;

      .title {
        font-size: 21px;
        padding: 18px 24px 20px 24px;
        border-bottom: 1px solid #f0f0f0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .main-card-title {
        font-size: 20px;
        padding: 26px 24px 12px 24px;
        border-bottom: 1px solid #f0f0f0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}

.account-form {
  padding: 0 24px 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  margin-bottom: 32px;

  .btn-wx-check {
    background: #6C6C6C;
    color: #fff;
    border-radius: 40px;
    border: none;
    font-size: 16px;
    height: 38px;
  }
}

::v-deep .el-form {
  padding: 12px 0;
}

::v-deep .el-form-item {
  margin-bottom: 0;
}

.account-form .el-form-item {
  font-size: 18px;
  font-weight: 500;
}

.save-btn {
  background: #000;
  color: #fff;
  border-radius: 10px;
  border: none;
  font-size: 16px;
  height: 44px;
}

.password-section {
  padding: 0 0 12px 0;
  border-top: 1px solid #f0f0f0;
  margin-top: 10px;

  .password-title {
    font-size: 16px;
    font-weight: bold;
    margin: 18px 0 12px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 8px;
  }
}

.password-form .el-form-item {
  margin-bottom: 18px;
}

.password-tips {
  font-size: 12px;
  color: #888;
  margin-top: 8px;
  margin-bottom: 0;
  padding-left: 24px;
  padding-bottom: 24px;

  div {
    margin-bottom: 12px;
  }
}

.plan-btn {
  font-size: 14px;
  color: #1976d2;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 20px;
}

.plan-info {
  padding: 24px 24px 0 24px;
  font-size: 15px;
  color: #222;

  .plan-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    font-weight: 600;

    .buy-btn {
      color: #000;
      font-size: 14px;
      border-bottom: 1px solid #000;
      border-radius: 0;
      padding-bottom: 4px;
      font-weight: 500;
    }
  }

  .plan-name {
    padding: 15px;
    border: 1px #000 solid;
    border-radius: 6px;
    margin: 15px 0 20px 0;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .plan-name-title {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      font-weight: 600;
    }
  }
}

.plan-rights {
  background: #f6f6f6;
  border-radius: 4px;
  padding: 12px 16px;
  margin-top: 10px;
  font-size: 15px;
  border: 1px #ccc solid;
}

.plan-rights-list {
  display: flex;
  flex-direction: column;
  gap: 8px;

  div {
    margin: 2px 0;
    display: flex;
    gap: 10px;
  }
}

.usage-list {
  padding-bottom: 24px;
  font-size: 15px;
  color: #222;

  .usage-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    color: #6C6C6C;
  }
}

.footer-bar {
  height: 48px;
  display: flex;
  align-items: center;
  margin-top: auto;
  gap: 32px;
  justify-content: center;
}

.footer-link {
  color: #aaa;
  font-size: 14px;
  margin-right: 24px;
  cursor: pointer;
}

.logout-title,
.logout-content {
  font-size: 14px;
  color: #000;
  margin-bottom: 10px;
  margin-left: 20px;
}

.dialog-footer {
  font-size: 14px;
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

.pwd-btn {
  background: #000;
  color: #fff;
  border-radius: 40px;
  border: none;
  font-size: 16px;
  height: 38px;

}

.agree-word {
  font-weight: 600;
  border-bottom: 1px solid #000;
  cursor: pointer;
}

/* 微信验证二维码对话框样式 */
.wechat-bind-dialog-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: 200px;
}

.wechat-binding-dialog-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 20px 0;
}

.wechat-binding-dialog-body span {
  font-size: 14px;
  color: #666;
  text-align: center;
}

::v-deep .el-dialog__body {
  padding: 0 20px 30px 20px !important;

}

::v-deep .el-input {
  width: 300px;
}

/* 购买记录弹框 */
.purchase-dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .purchase-dialog-back {
    font-size: 12px;
    color: #000;
    cursor: pointer;
  }
}


::v-deep .custom-row-height .el-table__row {
  height: 20px !important;
}

::v-deep .custom-row-height .el-table__row>td {
  padding: 4px 0 !important;
}

::v-deep .custom-row-height .cell {
  line-height: 20px !important;
  padding: 0 10px !important;
  text-align: center !important;
}

/* 表头顶部边框，保持与行边框一致 */
::v-deep .custom-row-height .el-table__header-wrapper thead th {
  border-top: 1px solid #ebeef5;
  padding: 0 10px !important;
}

::v-deep .custom-row-height .el-table__header-wrapper thead th .cell {
  line-height: 30px !important;
}
</style>
