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
              <template v-if="!userInfo.phone && userInfo.wechat_openid">
                <el-button
                  class="btn-wx-check"
                  type="primary"
                  style="width:fit-content"
                  @click="mobileBindingDialogVisible = true"
                >
                  <span>绑定手机</span>
                </el-button>
              </template>
              <template v-else>
                <span>{{ userInfo.phone }}</span>
              </template>
            </div>
            <div class="account-form">
              微信绑定
              <template v-if="!userInfo.wechat_openid">
                <el-button
                  class="btn-wx-check"
                  type="primary"
                  style="width:fit-content"
                  @click="wechatBindingDialogVisible = true"
                >
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
        <div v-if="Object.keys(userInfo).length > 0 && userInfo.phone" class="main-card">
          <div v-if="userInfo.password_reset_required" class="password-section">
            <div class="main-card-title" style="border-bottom: none;">密码管理
              <el-button
                class="pwd-btn"
                type="primary"
                style="width: fit-content"
                @click="handleResetPassword"
              >重置密码</el-button>
            </div>
          </div>
          <div v-else class="password-section">
            <div class="main-card-title">密码管理
              <el-button
                class="pwd-btn"
                type="primary"
                style="width: fit-content"
                :loading="loading"
                @click="handlePasswordValidation"
              >密码验证</el-button>
            </div>

            <el-form ref="resetPasswordForm" class="reset-password-form" :model="resetPasswordForm" :rules="resetPasswordFormRules">
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
                  <el-input
                    v-model="resetPasswordForm.confirmNewPassword"
                    type="password"
                    show-password
                    placeholder="请再次输入密码"
                  />
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
            <div class="plan-title">当前计划 <el-button
              class="buy-btn"
              type="text"
              @click="purchaseVisible = true"
            >购买记录</el-button></div>
            <div class="plan-name">
              <div class="plan-name-title">订阅计划名称 <span>{{ membershipPlan.membership_plan }}</span></div>
              <div class="plan-name-title">到期时间 <span>{{ membershipPlan.expired_at ? membershipPlan.expired_at.slice(0, 10) : '' }}</span></div>
            </div>
            <!-- 最终到期⽇期 -->
            <div class="plan-title" style="margin-bottom: 20px;">最终到期⽇期 <span style="font-weight: 600;">{{ endDate ? endDate.slice(0, 10) : endDate }}</span></div>
            <!-- 权益 -->
            <div class="plan-title">权益</div>
            <div class="plan-rights">

              <div class="plan-rights-list">
                <div
                  v-for="(item, index) in selectedFeatures"
                  :key="index"
                  class="plan-rights-item"
                >
                  <i class="el-icon-check" style="color: #9A9A9A" />
                  <span>{{ item }}</span>
                </div>
              </div>
            </div>

          </div>
          <!-- 使用情况 -->
          <!-- <div class="main-card-title">
            <span>使用情况</span>
          </div> -->
          <!-- <div class="plan-info">
            <div class="usage-list">
              <div class="usage-item">总生成图纸数量/张 <span>xx</span></div>
              <div class="usage-item">画廊保存数量/张 <span>xx</span></div>
              <div class="usage-item">画廊收藏数量/张 <span>xx</span></div>
              <div class="usage-item">已注册天数/天 <span>xx</span></div>
            </div>
          </div> -->
        </div>

      </div>
    </div>
    <!-- 底部 -->
    <div class="footer-bar">
      <span class="agree-word footer-link" @click="handleTermOfservice">服务条款</span>
      <span class="agree-word footer-link" @click="handlePrivacyPolicy">隐私政策</span>
    </div>

    <el-dialog
      :visible.sync="wechatBindingDialogVisible"
      title="微信验证"
      width="400px"
      :before-close="handleWechatBindingDialogClose"
      :show-close="true"
      :lock-scroll="false"
      :destroy-on-close="true"
      @opened="generateWechatLoginQRCode"
    >
      <div class="wechat-binding-dialog-content">
        <div class="wechat-binding-dialog-body">
          <div id="wechat-login-container" />
        </div>
      </div>
    </el-dialog>

    <!-- 绑定手机号Dialog -->
    <el-dialog
      :visible.sync="mobileBindingDialogVisible"
      :before-close="handleMobileBindingDialogClose"
      title="绑定手机号"
      width="400px"
      :show-close="true"
      :lock-scroll="false"
      :destroy-on-close="true"
    >
      <el-form ref="phoneCodeForm" class="phone-code-form" :model="phoneCodeForm" :rules="phoneCodeFormRules">
        <el-form-item prop="phonePrefix" class="phone-prefix">
          <el-select
            v-model="phoneCodeForm.phonePrefix"
            class="phone-prefix"
            size="large"
            popper-class="phone-prefix-select"
          >
            <el-option label="+86" value="+86" />
            <!-- 可扩展其他区号 -->
          </el-select>
        </el-form-item>
        <!-- 手机号-->
        <el-form-item prop="phone" class="phone">
          <el-input
            v-model="phoneCodeForm.phone"
            placeholder="请输入手机号"
            size="large"
          />
        </el-form-item>
        <!-- 验证码输入 -->
        <el-form-item prop="code">
          <el-input
            ref="codeInput"
            v-model="phoneCodeForm.code"
            maxlength="6"
            placeholder="请输入验证码"
            size="large"
          />
          <div
            type="text"
            class="resend-btn"
            :disabled="countDown > 0"
            @click="handleSend"
          >
            <template v-if="countDown > 0">重新发送({{ countDown }})</template>
            <template v-else>发送验证码</template>
          </div>
        </el-form-item>
        <!-- 下一步按钮 -->
        <el-button
          type="primary"
          size="large"
          class="login-btn-wrapper"
          @click.native.prevent="handleBindingPhone"
        >绑定</el-button>
      </el-form>
    </el-dialog>

    <el-dialog :visible.sync="purchaseVisible" width="70%" :show-close="false" @open="onDialogOpen">
      <template slot="title">
        <div class="purchase-dialog-header">
          <span>购买记录</span>
          <span class="purchase-dialog-back" @click="purchaseVisible = false">返回</span>
        </div>
      </template>
      <el-table
        :data="tableData"
        style="width: 100%;  color: #000"
        height="500"
        :header-cell-style="{
          color: '#000',
          fontWeight: 'normal',
          background: '#f6f6f6',
        }"
        :row-style="setRowStyle"
        class="custom-row-height"
      >
        <el-table-column prop="order_no" label="订单号" />
        <el-table-column label="订阅计划名称" width="180">
          <template slot-scope="scope">
            {{ scope.row.membership_plan.membership_level. name }}
          </template>
        </el-table-column>
        <el-table-column label="金额">
          <template slot-scope="scope">
            {{ scope.row.currency.code }}&nbsp;{{ scope.row.price }}
          </template>
        </el-table-column>
        <el-table-column prop="payment_status" label="支付状态" />
        <el-table-column prop="payment_channel.name" label="支付方式" />
        <el-table-column prop="paid_at" label="支付时间" />
      </el-table>
    </el-dialog>

    <div
      v-if="hasActiveYearlyPlan"
      class="floating-qr"
      :style="{ cursor: 'move' }"
      @mousedown="startDrag"
    >
      <img src="@/assets/images/yearly-group-qr.png" alt="社群二维码">
      <div class="floating-qr-text">年费会员专属群</div>
    </div>

  </div>
</template>

<script>

import { getUserInfo, updatePassword, sendSmsCode, bindPhone } from '@/api/index';
import {
  getAllOrders,
  getAllUserMembershipPlans,
  getCurrentMembershipPlan,
  getUserMembershipPlanEndDate
} from '@/api/subscription';
import { generateRandomString } from '@/utils/index';
import membershipRights from '@/views/userInterface/membership-rights';
export default {
  name: 'UserInterface',
  data() {
    return {
      userInfo: {},
      phoneCodeForm: {
        phonePrefix: '+86',
        phone: '',
        code: ''
      },
      phoneCodeFormRules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '验证码必须为6位数字', trigger: 'blur' }
        ]
      },
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
      mobileBindingDialogVisible: false,
      purchaseVisible: false,
      tableData: [],
      endDate: '', // 最终到期日期
      membershipPlan: {}, // 当前订阅计划
      allPlans: [], // 所有会员计划信息
      hasActiveYearlyPlan: false, // 是否有未到期的年会员订阅计划
      isDragging: false, // 是否正在拖拽
      dragOffset: { x: 0, y: 0 }, // 拖拽偏移量
      countDown: 0, // 验证码倒计时
      timer: null // 定时器
    };
  },
  computed: {
    selectedFeatures() {
      if (this.membershipPlan.membership_level_id === 1) {
        return membershipRights['1'];
      } else if ([2, 3, 4].includes(this.membershipPlan.membership_level_id)) {
        return membershipRights['2-4'];
      }
      return [];
    }
  },
  async created() {
    try {
      const { data } = await getUserInfo();
      this.userInfo = data;
    } catch (error) {
      console.log('获取用户信息失败:', error);
    }
  },
  async activated() {
    try {
    // 并行发起两个请求
      const [planRes, endDateRes, allPlansRes] = await Promise.all([
        getCurrentMembershipPlan(),
        getUserMembershipPlanEndDate(),
        getAllUserMembershipPlans()
      ]);

      this.membershipPlan = planRes.data;
      this.endDate = endDateRes.data;
      this.allPlans = allPlansRes.data;
      // 检查是否有未到期的年会员订阅计划
      this.hasActiveYearlyPlan = this.allPlans.some(plan => plan.membership_level_id === 4 && new Date(plan.expired_at) > new Date());
    } catch (error) {
      console.error('获取订阅计划或到期时间失败:', error);
    }
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer);
  },
  methods: {
    handleSend() {
      if (this.countDown > 0) return;
      // 发送验证码逻辑
      this.$refs.phoneCodeForm.validateField('phone', (errorMessage) => {
        if (!errorMessage) {
          this.countDown = 60;
          this.timer = setInterval(() => {
            if (this.countDown > 0) {
              this.countDown--;
            } else {
              clearInterval(this.timer);
            }
          }, 1000);
          sendSmsCode({
            phone: this.phoneCodeForm.phonePrefix + this.phoneCodeForm.phone
          }).then(() => {
            this.$message.success('验证码已发送');
            this.$refs.codeInput.focus();
          }).catch(() => {
            console.error('发送验证码失败');
          });
        }
      });
    },
    // 处理绑定手机号
    handleBindingPhone() {
      this.$refs.phoneCodeForm.validate(async(valid) => {
        if (valid) {
          try {
            await bindPhone({
              phone: this.phoneCodeForm.phonePrefix + this.phoneCodeForm.phone,
              code: this.phoneCodeForm.code
            });
            this.$message.success('手机号绑定成功');
            this.mobileBindingDialogVisible = false;
            // 重新获取用户信息
            const { data } = await getUserInfo();
            this.userInfo = data;
          } catch (error) {
            console.error('手机号绑定失败:', error);
          }
        } else {
          this.$message.error('请检查输入的手机号和验证码');
        }
      });
    },
    handleMobileBindingDialogClose() {
      this.mobileBindingDialogVisible = false;
      this.phoneCodeForm = {
        phonePrefix: '+86',
        phone: '',
        code: ''
      };
      this.countDown = 0;
      this.timer && clearInterval(this.timer);
    },
    // 处理重置密码
    handleResetPassword() {
      // 跳转到重置密码页面
      this.$router.push('/resetPassword');
    },
    // 处理密码验证
    handlePasswordValidation() {
      this.$refs.resetPasswordForm.validate(async(valid) => {
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
      // eslint-disable-next-line no-undef
      new WxLogin({
        self_redirect: false, // 默认为false(保留当前二维码)  true(当前二维码所在的地方通过iframe 内跳转到 redirect_uri)
        id: 'wechat-login-container', // 容器的id
        appid: 'wxaebb39450f19b3fa', // 应用唯一标识，在微信开放平台提交应用审核通过后获得
        scope: 'snsapi_login', // 应用授权作用域，拥有多个作用域用逗号（,）分隔，网页应用目前仅填写snsapi_login即可
        redirect_uri: encodeURIComponent(
          'https://www.gaiass.com/auth/wechat/callback?wechat_binding=true' // 授权成功后跳转的路径，必须是经过URL编码的
        ), // 扫完码授权成功跳转到的路径
        fast_login: 0,
        state: state, // 用于保持请求和回调的状态，授权请求后原样带回给第三方。该参数可用于防止 csrf 攻击（跨站请求伪造攻击），建议第三方带上该参数，可设置为简单的随机数加 session 进行校验
        style: 'black', // 提供"black"、"white"可选，默认为黑色文字描述，
        // stylelite: 1,
        href: 'data:text/css;base64,LmltcG93ZXJCb3ggLnN0YXR1c190eHQge2ZvbnQtc2l6ZTogMjRweH0KLmltcG93ZXJCb3ggLnN0YXR1c190eHQgcCB7Zm9udC1zaXplOiAxOHB4fQouaW1wb3dlckJveCAuc3RhdHVzLnN0YXR1c19mYWlsIHAge2ZvbnQtc2l6ZTogMTZweCB9Ci5pbXBvd2VyQm94IC5zdGF0dXMuc3RhdHVzX2Jyb3dzZXIgcCB7Zm9udC1zaXplOiAxOHB4IH0KLmltcG93ZXJCb3ggLnN0YXR1cyB7cGFkZGluZzogN3B4IDB9Cmg0IHtmb250LXNpemU6IDE4cHh9Ci5pbXBvd2VyQm94IHtwYWRkaW5nLXRvcDogNXB4fQo='
      });
    },
    setRowStyle({ row, rowIndex }) {
      return {
        height: '20px' // 设置行高为20px
      };
    },
    // “弹窗打开 -> 表格显示”
    async onDialogOpen() {
      const res = await getAllOrders();

      // 遍历res.data改数据
      const modifiedData = res.data.map(item => {
        return {
          ...item,
          payment_status: item.payment_status === 'paid' ? '已支付' : (item.payment_status === 'pending' ? '未支付' : '支付失败')
        };
      });

      this.tableData = modifiedData;
    },
    startDrag(event) {
      this.isDragging = true;
      this.dragOffset = {
        x: event.clientX - event.currentTarget.offsetLeft,
        y: event.clientY - event.currentTarget.offsetTop
      };
      // 绑定全局监听
      window.addEventListener('mousemove', this.drag);
      window.addEventListener('mouseup', this.stopDrag);
    },
    stopDrag() {
      this.isDragging = false;
      // 移除监听
      window.removeEventListener('mousemove', this.drag);
      window.removeEventListener('mouseup', this.stopDrag);
    },
    drag(event) {
      if (!this.isDragging) return;
      const floatingQr = document.querySelector('.floating-qr');

      const parent = floatingQr.parentElement;
      const parentWidth = parent.clientWidth;
      const parentHeight = parent.clientHeight;
      const qrWidth = floatingQr.offsetWidth;
      const qrHeight = floatingQr.offsetHeight;

      let newLeft = event.clientX - this.dragOffset.x;
      let newTop = event.clientY - this.dragOffset.y;

      // 边界限制
      newLeft = Math.max(0, Math.min(newLeft, parentWidth - qrWidth));
      newTop = Math.max(0, Math.min(newTop, parentHeight - qrHeight));

      floatingQr.style.left = `${newLeft}px`;
      floatingQr.style.top = `${newTop}px`;
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
  padding: 24px 24px 24px 24px;
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
    margin-top: 13px;

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

.reset-password-form {
  padding: 20px 0;

  .el-form-item {
    margin-bottom: 24px;
  }
  ::v-deep .el-input {
    width: 300px;
  }
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

.floating-qr {
  position: absolute; /* 改为 absolute 以支持拖拽 */
      left: calc(100vw - 258px);
  top: 41vh;
  z-index: 9999;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
  padding: 16px 16px 8px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: grab; /* 鼠标样式 */
}

.floating-qr img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 8px;
  border: 1px solid #eee;
}

.floating-qr-text {
  text-align: center;
  color: #333;
  font-size: 14px;
}

/* 手机号绑定表单样式 */
.phone-code-form {
  padding: 20px 0;

  .el-form-item {
    margin-bottom: 24px;
  }

  // 手机区号和手机号一行显示
  .phone-prefix {
    display: inline-block;
    width: 100px;
    margin-right: 12px;
    vertical-align: top;

    ::v-deep .el-input__inner {
      background: #f5f5f5;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      color: #333;
      text-align: center;

      &:focus {
        border-color: #333;
        background: #fff;
      }
    }

    ::v-deep .el-input__suffix {
      right: 8px;
    }
  }

  .phone {
    display: inline-block;
    width: calc(100% - 112px);
    vertical-align: top;

    ::v-deep .el-input__inner {
      background: #f5f5f5;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      color: #333;
      padding: 0 16px;

      &::placeholder {
        color: #999;
        font-size: 16px;
      }

      &:focus {
        border-color: #333;
        background: #fff;
      }
    }
  }

  // 验证码输入框和发送按钮一行显示
  .el-form-item:nth-child(3) {
    position: relative;

    ::v-deep .el-input {
      width: calc(100% - 110px);
      display: inline-block;
      vertical-align: top;

      .el-input__inner {
        background: #f5f5f5;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        color: #333;
        padding: 0 16px;

        &::placeholder {
          color: #999;
          font-size: 16px;
        }

        &:focus {
          border-color: #333;
          background: #fff;
        }
      }
    }

    .resend-btn {
      display: inline-block;
      width: 100px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: #f5f5f5;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      color: #333;
      font-size: 14px;
      cursor: pointer;
      margin-left: 10px;
      vertical-align: top;
      transition: all 0.2s ease;

      &:hover {
        background: #ebebeb;
        border-color: #d0d0d0;
      }

      &[disabled] {
        color: #999;
        cursor: not-allowed;
        background: #f9f9f9;

        &:hover {
          background: #f9f9f9;
          border-color: #e0e0e0;
        }
      }
    }
  }

  // 下一步按钮
  .login-btn-wrapper {
    width: 100%;
    height: 48px;
    background: #000;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    margin-top: 24px;
    transition: all 0.2s ease;

    &:hover {
      background: #333;
    }

    &:active {
      background: #000;
    }
  }
}
</style>
