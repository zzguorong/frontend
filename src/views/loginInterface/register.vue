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
    <div class="login-card">
      <!-- 主体内容 -->
      <div class="content-wrapper">
        <div class="tab-content phone-login">
          <div class="reset-desc">
            所在地区仅支持手机号注册，拥有GIAI HUB账号，即可使用GAIA
            HUB进行创作。
          </div>
          <el-form ref="registerForm" :model="form" class="phone-input-line" :rules="rules">
            <el-form-item prop="phone">
              <el-input
                v-model="form.phone"
                placeholder="请输入手机号"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="form.password"
                type="password"
                show-password
                placeholder="请输入密码"
              />
            </el-form-item>
            <el-form-item prop="confirmPassword">
              <el-input
                v-model="form.confirmPassword"
                type="password"
                show-password
                placeholder="请再次输入密码"
              />
            </el-form-item>
            <el-form-item class="form-code" prop="code">
              <el-input
                ref="codeInput"
                v-model="form.code"
                placeholder="请输入验证码"
              />
              <div
                type="text"
                class="resend-btn"
                :disabled="countDown > 0"
                @click="handleSend"
              >
                <template
                  v-if="countDown > 0"
                >重新发送({{ countDown }})</template>
                <template v-else>发送验证码</template>
              </div>
            </el-form-item>
          </el-form>
          <div class="register-desc">
            注册即代表已阅读并同意<span class="agree-word">服务条款</span>和<span class="agree-word">隐私政策</span>
          </div>
          <!-- 注册按钮 -->
          <el-button
            type="primary"
            size="large"
            :loading="loading"
            class="login-btn-wrapper"
            @click.native.prevent="handleRegister"
          >注册</el-button>
          <div class="back-login-wrapper">
            <span class="back-login" @click="returnLogin">返回登录</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sendSmsCode, userRegister } from '@/api/index'

export default {
  name: 'Register',
  data() {
    return {
      loading: false,
      form: {
        phone: '',
        password: '',
        confirmPassword: '',
        code: ''
      },
      countDown: 0,
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '密码长度为6-20位', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            if (value !== this.form.password) {
              callback(new Error('两次输入的密码不一致'))
            } else {
              callback()
            }
          }, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '验证码为6位数字', trigger: 'blur' }
        ]
      },
      timer: null
    }
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer)
  },
  methods: {
    handleSend() {
      if (this.countDown > 0) return
      // 发送验证码逻辑
      this.$refs.registerForm.validateField('phone', (errorMessage) => {
        if (!errorMessage) {
          this.countDown = 60
          this.timer = setInterval(() => {
            if (this.countDown > 0) {
              this.countDown--
            } else {
              clearInterval(this.timer)
            }
          }, 1000)
          // reset code
          this.form.code = ''
          // 调用发送验证码 API
          sendSmsCode({
            phone: this.form.phone
          })
            .then((res) => {
              this.$message.success(res.message || '验证码已发送，请注意查收')
              this.$refs.codeInput.focus()
            })
            .catch(() => {
              console.error('发送验证码失败')
            })
        } else {
          return false
        }
      })
    },
    handleRegister() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.loading = true
          userRegister({
            phone: this.form.phone,
            password: this.form.password,
            password_confirm: this.form.confirmPassword,
            code: this.form.code
          })
            .then((response) => {
              this.$message.success('注册成功，请登录')
              this.$router.push('/login')
            })
            .catch((error) => {
              console.error(error.message || '注册失败，请稍后再试')
            })
            .finally(() => {
              this.loading = false
            })
        } else {
          this.$message.error('请填写完整信息')
        }
      })
    },
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
  padding: 50px 40px 30px;
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
  margin: 0 auto;
  margin-bottom: 20px;
  width: 280px;
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
  width: 320px;
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
  margin: 20px 0 20px 0;
}
.register-desc {
  font-size: 12px;
  text-align: center;
  width: 100%;
}
.agree-word {
  font-weight: 600;
  border-bottom: 1px solid #000;
  cursor: pointer;
}
</style>
