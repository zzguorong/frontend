<template>
  <div class="login-interface-page">
    <!-- 顶部 Logo -->
    <div class="logo-wrapper">
      <!-- 如有正式 LOGO 图片可将 src 替换为真实地址 -->
      <img
        class="logo"
        src="@/assets/images/gaia.png"
        alt="GAIAHub"
        width="300px"
        height="auto"
      >
    </div>
    <!-- 主卡片 -->
    <div v-show="isPhoneLogin" class="login-card">
      <!-- 主体内容 -->
      <div class="content-wrapper">
        <div class="tab-content phone-login">
          <div class="reset-title">重置登录密码</div>
          <div class="reset-desc">请输入注册时使用的手机号来接收验证码</div>
          <el-form ref="phoneCodeForm" :model="phoneCodeForm" class="phone-input-line" :rules="phoneCodeFormRules">
            <!-- 手机号-->
            <el-form-item prop="phone">
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
              @click.native.prevent="handleNextStep"
            >下一步</el-button>
            <div class="back-login-wrapper">
              <span class="back-login" @click="returnLogin">返回登录</span>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 主卡片2 -->
    <div v-show="!isPhoneLogin" class="login-card">
      <!-- 主体内容 -->
      <div class="content-wrapper">
        <div class="tab-content phone-login" style="width: 100%">
          <div class="reset-title">重置登录密码</div>
          <div class="reset-desc">请输入注册时使用的手机号来接收验证码</div>
          <el-form ref="resetPasswordForm" :model="resetPasswordForm" class="phone-input-line" :rules="resetPasswordFormRules">
            <!-- 输入新密码, 确认新密码 -->
            <el-form-item prop="newPassword">
              <el-input
                v-model="resetPasswordForm.newPassword"
                type="password"
                show-password
                maxlength="20"
                placeholder="请输入新密码"
                size="large"
              />
            </el-form-item>
            <el-form-item prop="confirmNewPassword">
              <el-input
                v-model="resetPasswordForm.confirmNewPassword"
                type="password"
                show-password
                maxlength="20"
                placeholder="请确认新密码"
                size="large"
              />
            </el-form-item>
          </el-form>

          <!-- 重置密码按钮 -->
          <el-button
            type="primary"
            size="large"
            :loading="loading"
            class="login-btn-wrapper"
            @click.native.prevent="handleResetPassword"
          >重置密码</el-button>
          <div class="back-login-wrapper">
            <span class="back-login" @click="isPhoneLogin = true">返回</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sendSmsCode, resetPassword } from '@/api/index'

export default {
  name: 'ResetPassword',
  data() {
    return {
      isPhoneLogin: true,
      phoneCodeForm: {
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
        newPassword: '',
        confirmNewPassword: ''
      },
      resetPasswordFormRules: {
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          // 密码长度不少于8个字符，最多不超过20个字符。
          // 密码必须包含至少三类字符类型：大写字母、小写字母、数字、特殊符号。
          { min: 8, max: 20, message: '密码长度必须在8-20位之间', trigger: 'blur' },
          { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/, message: '密码必须包含至少三类字符类型：大写字母、小写字母、数字、特殊符号', trigger: 'blur' }
        ],
        confirmNewPassword: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { min: 8, max: 20, message: '密码长度必须在8-20位之间', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            if (value !== this.resetPasswordForm.newPassword) {
              callback(new Error('两次输入的密码不一致'))
            } else {
              callback()
            }
          }, trigger: 'blur' }
        ]
      },
      loading: false,
      countDown: 0,
      timer: null
    }
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer)
  },
  methods: {
    handleNextStep() {
      // 验证手机号和验证码
      this.$refs.phoneCodeForm.validate((valid) => {
        if (valid) {
          this.isPhoneLogin = false
          this.$refs.resetPasswordForm.resetFields() // 重置密码表单
        } else {
          return false
        }
      })
    },
    handleSend() {
      if (this.countDown > 0) return
      // 发送验证码逻辑
      this.$refs.phoneCodeForm.validateField('phone', (errorMessage) => {
        if (!errorMessage) {
          this.countDown = 60
          this.timer = setInterval(() => {
            if (this.countDown > 0) {
              this.countDown--
            } else {
              clearInterval(this.timer)
            }
          }, 1000)
          sendSmsCode({
            phone: this.phoneCodeForm.phone
          }).then(() => {
            this.$message.success('验证码已发送')
            this.$refs.codeInput.focus()
          }).catch(() => {
            console.error('发送验证码失败')
          })
        }
      })
    },
    handleResetPassword() {
      this.$refs.resetPasswordForm.validate((valid) => {
        if (valid) {
          this.loading = true
          // 调用重置密码 API
          // 假设有一个 resetPassword API
          resetPassword({
            phone: this.phoneCodeForm.phone,
            new_password: this.resetPasswordForm.newPassword,
            new_password_confirm: this.resetPasswordForm.confirmNewPassword,
            code: this.phoneCodeForm.code
          }).then(() => {
            this.$message.success('密码重置成功')
            this.loading = false
            this.$router.push('/login') // 跳转到登录页面
          }).catch(() => {
            this.loading = false
            console.error('重置密码失败')
          })
        } else {
          return false
        }
      })
    },
    // 返回登录页面
    returnLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
/* 页面整体居中灰色背景 */
.login-interface-page {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #efefef;
  padding: 40px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

/* 主卡片 */
.login-card {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 35px 40px 30px;
}
.reset-title {
  font-size: 20px;
  letter-spacing: 2px;
  text-align: center;
  margin-bottom: 20px;
}
.reset-desc {
  font-size: 12px;
  text-align: center;
  margin-bottom: 20px;
}
/* LOGO */
.logo-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 40px 0 20px;
  .logo {
    height: 60px;
    object-fit: contain;
  }
}

/* 内容区域 */
.content-wrapper {
  width: 100%;
  display: flex;
  box-sizing: border-box;
}
.phone-input-line {
  width:320px;
}
.tab-content {
  width: 100%;
}
::v-deep .el-form-item__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.resend-btn {
  width: 130px;
  margin-left: 12px;
  font-size: 12px !important;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-weight: 600;
  cursor: pointer;
}
.back-login-wrapper {
  width: 100%;
  text-align: center;
}
.back-login {
  font-size: 12px;
  color: #000;
  border-bottom: 1px solid #000;
  display: inline-block; /* 仅占文字宽度 */
  line-height: 1; /* 避免下划线与文字出现较大垂直间距 */
  cursor: pointer;
}

.login-btn {
  margin-bottom: 16px;
  height: 35px;
  line-height: 8px;
  border-radius: 8px;
}

.agree-checkbox {
  width: 100%;
  margin-top: 30px;
  text-align: center;
  font-size: 11px;
  .link {
    color: #000;
  }
}

/* 右侧二维码 */
.qr-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: 370px;
  background: #fafafa;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  box-sizing: border-box;
}

.qr-title {
  font-size: 14px;
  margin-top: 13px;
  margin-bottom: 40px;
}

.qr-box {
  margin: 0 auto;
  margin-bottom: 30px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qr-info {
  color: #6b7280;
  .wechat-icon {
    margin-bottom: 4px;
    color: #07c160;
  }
  .qr-success {
    margin-bottom: 10px;
    color: #333;
    font-size: 14px;
  }
  .qr-desc {
    font-size: 11px;
    color: #000;
  }
}
.login-btn-wrapper {
  width: 100%;
  text-align: center;
  background: #000 !important;
  border-color: #000 !important;
  color: #fff;
  border-radius: 8px;
  padding: 15px 0;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  margin: 28px 0 20px 0;
}
</style>
