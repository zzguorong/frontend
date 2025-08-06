<template>
  <div class="login-interface-page">
    <!-- 顶部 Logo -->
    <div class="logo-wrapper">
      <!-- 如有正式 LOGO 图片可将 src 替换为真实地址 -->
      <img
        class="logo"
        src="@/assets/images/dashorard-logo.png"
        alt="GAIAHubs"
        width="300px"
        height="auto"
      >
    </div>
    <!-- 主卡片 -->
    <div class="login-card">
      <!-- 主体内容：左侧表单 / 右侧二维码登录 -->
      <div class="content-wrapper">
        <!-- 左侧表单 -->
        <div class="form-wrapper">
          <el-tabs v-model="activeTab" type="card" class="login-tabs">
            <el-tab-pane label="手机登录" name="phone" />
            <el-tab-pane label="密码登录" name="password" />
          </el-tabs>

          <!-- Tab 对应内容 -->
          <div v-if="activeTab === 'phone'" class="tab-content phone-login">
            <p class="sub-tip">如果您的手机号码未注册，将为您自动注册</p>

            <el-form
              ref="phoneLoginForm"
              :model="phoneLoginForm"
              :rules="phoneLoginFormRules"
            >
              <!-- 手机号 + 区号输入 -->
              <div class="phone-input-line">
                <el-form-item prop="phonePrefix">
                  <el-select
                    v-model="phoneLoginForm.phonePrefix"
                    class="phone-prefix"
                    size="large"
                    popper-class="phone-prefix-select"
                  >
                    <el-option label="+86" value="+86" />
                    <!-- 可扩展其他区号 -->
                  </el-select>
                </el-form-item>
                <el-form-item prop="phone" class="phone-input">
                  <el-input
                    v-model="phoneLoginForm.phone"
                    placeholder="请输入手机号"
                    size="large"
                  />
                </el-form-item>
              </div>

              <!-- 验证码输入 -->
              <p class="code-label">输入验证码</p>
              <div class="code-input-line">
                <input
                  v-for="(_, index) in codeDigits"
                  :key="index"
                  ref="codeDigitInputs"
                  v-model="codeDigits[index]"
                  type="text"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  maxlength="1"
                  class="code-box"
                  @input="handleCodeDigitInput(index, $event)"
                  @keydown.delete="handleCodeDigitDelete(index)"
                  @paste="handleCodeDigitPaste"
                  @focus="codeDigitCurrentIndex = index"
                >

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

                <el-form-item prop="code" class="force-new-line">
                  <el-input
                    v-model="phoneLoginForm.code"
                    placeholder="请输入验证码"
                    size="large"
                    class="code-input"
                  />
                </el-form-item>
              </div>

              <!-- 登录按钮 -->
              <div class="login-btn-wrapper">
                <el-button
                  type="primary"
                  size="large"
                  class="login-btn"
                  :loading="loading"
                  @click.native.prevent="handleLogin"
                >登录</el-button>
              </div>
            </el-form>

            <!-- 协议勾选 -->
            <div class="agree-checkbox-wrapper">
              <el-checkbox v-model="agree" class="agree-checkbox" />
              我已阅读并接受<span
                class="agree-word"
                @click="handleTermOfservice"
              >服务条款</span>和<span
                class="agree-word"
                @click="handlePrivacyPolicy"
              >隐私政策</span>
            </div>
          </div>

          <div v-else class="tab-content password-login">
            <el-form
              ref="passwordLoginForm"
              :model="passwordLoginForm"
              :rules="passwordLoginFormRules"
            >
              <p class="code-label">仅支持手机号登录</p>
              <div class="phone-input-line">
                <el-form-item prop="phonePrefix">
                  <el-select
                    v-model="passwordLoginForm.phonePrefix"
                    class="phone-prefix"
                    size="large"
                    popper-class="phone-prefix-select"
                  >
                    <el-option label="+86" value="+86" />
                    <!-- 可扩展其他区号 -->
                  </el-select>
                </el-form-item>
                <!-- 手机号 + 区号输入 -->
                <el-form-item prop="phone" class="phone-input">
                  <el-input
                    v-model="passwordLoginForm.phone"
                    placeholder="请输入手机号"
                    size="large"
                  />
                </el-form-item>
              </div>
              <p class="code-label">输入密码</p>
              <el-form-item prop="password">
                <el-input
                  v-model="passwordLoginForm.password"
                  type="password"
                  show-password
                  size="large"
                  maxlength="20"
                  placeholder="请输入密码"
                />
              </el-form-item>

              <!-- 登录按钮 -->
              <div class="login-btn-wrapper">
                <el-button
                  type="primary"
                  size="large"
                  :loading="loading"
                  class="login-btn"
                  @click.native.prevent="handleLogin"
                >登录</el-button>
              </div>
            </el-form>

            <!-- 协议勾选 -->
            <div class="agree-checkbox-wrapper" style="margin-top: 15px">
              注册登录即代表已阅读并同意<span
                class="agree-word"
                @click="handleTermOfservice"
              >服务条款</span>和<span
                class="agree-word"
                @click="handlePrivacyPolicy"
              >隐私政策</span>
            </div>
            <div class="forget-password">
              <span @click="handleForgetPassword">忘记密码</span>
              <span @click="handleRegister">立即注册</span>
            </div>
          </div>
        </div>

        <!-- 右侧二维码 -->
        <div class="qr-wrapper">
          <div class="qr-title">扫描二维码使用微信登录</div>
          <div ref="qrBox" class="qr-box">
            <div id="wechat-login-container" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sendSmsCode } from '@/api/index';
import { generateRandomString } from '@/utils/index';
export default {
  name: 'LoginInterface',
  data() {
    return {
      activeTab: 'phone',
      loading: false,
      redirect: null,
      codeDigits: Array(6).fill(''),
      codeDigitCurrentIndex: 0,
      phoneLoginForm: {
        phonePrefix: '+86',
        phone: '',
        code: ''
      },
      phoneLoginFormRules: {
        phonePrefix: [
          { required: true, message: '请选择区号', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          {
            pattern: /^\d{6}$/,
            message: '验证码必须为6位数字',
            trigger: 'blur'
          }
        ]
      },
      passwordLoginForm: {
        phonePrefix: '+86',
        phone: '',
        password: ''
      },
      passwordLoginFormRules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      countDown: 0,
      agree: false,
      timer: null
    };
  },

  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  mounted() {
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
      fast_login: 0,
      redirect_uri: encodeURIComponent(
        'https://www.gaiass.com/auth/wechat/callback'
      ), // 扫完码授权成功跳转到的路径
      state: state, // 用于保持请求和回调的状态，授权请求后原样带回给第三方。该参数可用于防止 csrf 攻击（跨站请求伪造攻击），建议第三方带上该参数，可设置为简单的随机数加 session 进行校验
      style: 'black', // 提供"black"、"white"可选，默认为黑色文字描述，
      // stylelite: 1,
      href: 'data:text/css;base64,LmltcG93ZXJCb3ggLnN0YXR1c190eHQge2ZvbnQtc2l6ZTogMjRweH0KLmltcG93ZXJCb3ggLnN0YXR1c190eHQgcCB7Zm9udC1zaXplOiAxOHB4fQouaW1wb3dlckJveCAuc3RhdHVzLnN0YXR1c19mYWlsIHAge2ZvbnQtc2l6ZTogMTZweCB9Ci5pbXBvd2VyQm94IC5zdGF0dXMuc3RhdHVzX2Jyb3dzZXIgcCB7Zm9udC1zaXplOiAyNHB4IH0KLmltcG93ZXJCb3ggLnN0YXR1cyB7cGFkZGluZzogN3B4IDB9Cmg0IHtmb250LXNpemU6IDIycHh9Ci5pbXBvd2VyQm94IHtwYWRkaW5nLXRvcDogNXB4fQo='
    });
    // 渲染完二维码后缩放到 100×100
    this.$nextTick(() => {
      setTimeout(this.adjustQrIframe, 100);
    });
    window.addEventListener('resize', this.adjustQrIframe);
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer);
    window.removeEventListener('resize', this.adjustQrIframe);
  },
  methods: {
    handleCodeDigitInput(index, event) {
      const value = event.target.value.replace(/\D/g, '');
      this.codeDigits[index] = value;
      this.phoneLoginForm.code = this.codeDigits.join('');

      if (value && index < 5) {
        this.$nextTick(() => {
          this.$refs.codeDigitInputs[index + 1].focus();
        });
      }
    },
    handleCodeDigitDelete(index) {
      if (!this.codeDigits[index] && index > 0) {
        this.$refs.codeDigitInputs[index - 1].focus();
      }
    },
    handleCodeDigitPaste(event) {
      event.preventDefault();
      const pasteData = event.clipboardData.getData('text').replace(/\D/g, '');
      if (pasteData.length === 6) {
        this.codeDigits = pasteData.split('').slice(0, 6);
        this.phoneLoginForm.code = this.codeDigits.join('');
      }
    },
    // 跳转服务条款
    handleTermOfservice() {
      this.$router.push('/termOfservice');
    },
    // 跳转隐私政策
    handlePrivacyPolicy() {
      this.$router.push('/privacyPolicy');
    },
    handleLogin() {
      if (this.activeTab === 'phone') {
        this.$refs.phoneLoginForm.validate((valid) => {
          if (valid) {
            // 判断是否同意协议
            if (!this.agree) {
              this.$message.error('请同意服务条款和隐私政策');
              return false;
            }
            this.phoneLogin();
          } else {
            return false;
          }
        });
      } else {
        this.$refs.passwordLoginForm.validate((valid) => {
          if (valid) {
            this.loginWithPassword();
          } else {
            return false;
          }
        });
      }
    },
    // 手机登录
    phoneLogin() {
      this.$refs.phoneLoginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch('user/phoneLogin', {
              phone:
                this.phoneLoginForm.phonePrefix + this.phoneLoginForm.phone,
              code: this.phoneLoginForm.code
            })
            .then(() => {
              this.$router.push({ path: this.redirect || '/generate' });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    // 密码登录
    loginWithPassword() {
      this.loading = true;

      this.$store
        .dispatch('user/passwordLogin', {
          phone: this.passwordLoginForm.phonePrefix + this.passwordLoginForm.phone,
          password: this.passwordLoginForm.password
        })
        .then(() => {
          console.log(this.redirect);
          this.$router.push({ path: this.redirect || '/generate' });
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    adjustQrIframe() {
      const box = this.$refs.qrBox;
      if (!box) return;
      const iframe = box.querySelector('iframe');
      if (!iframe) return; // 脚本还没插入 iframe

      // 1. 基本尺寸
      const BOX = box.clientWidth; // = box.clientHeight，因为 qr-box 是正方形
      const W0 = 300; // 微信二维码原始宽
      const H0 = 60; // 标题条大约 60px

      // 2. 计算缩放与位移
      const S = BOX / W0; // 缩放系数
      const tx = (BOX - W0 * S) / 2; // 水平居中
      const ty = -H0 * S; // 把标题区推出可视区

      // 3. 一次写入 transform
      iframe.style.width = W0 + 'px';
      iframe.style.height = '450px'; // 原始高即可
      iframe.style.border = 'none';
      iframe.style.pointerEvents = 'none';
      iframe.style.transformOrigin = 'top left';
      iframe.style.transform = `translate(${tx}px, ${ty}px) scale(${S})`;
    },
    handleSend() {
      if (this.countDown > 0) return;

      // 发送验证码逻辑
      this.$refs.phoneLoginForm.validateField('phone', (errorMessage) => {
        if (!errorMessage) {
          this.countDown = 60;
          this.timer = setInterval(() => {
            if (this.countDown > 0) {
              this.countDown--;
            } else {
              clearInterval(this.timer);
            }
          }, 1000);
          // reset code digits
          this.codeDigits = Array(6).fill('');
          this.phoneLoginForm.code = '';
          // 调用发送验证码 API
          sendSmsCode({
            phone: this.phoneLoginForm.phonePrefix + this.phoneLoginForm.phone
          })
            .then((res) => {
              this.$message.success(res.message || '验证码已发送，请注意查收');
              this.$refs.codeDigitInputs[0].focus();
            })
            .catch(() => {
              console.error('发送验证码失败');
            });
        } else {
          return false;
        }
      });
    },
    handleForgetPassword() {
      this.$router.push('/resetPassword');
    },
    handleRegister() {
      this.$router.push('/register');
    }
  }
};
</script>

<style lang="scss" scoped>
/* 页面整体居中灰色背景 */
.login-interface-page {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #efefef;
  height: 100vh;
  padding: 40px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* 主卡片 */
.login-card {
  width: 700px;
  height: 400px;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
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

/* 内容区域：左右 */
.content-wrapper {
  width: 100%;
  display: flex;
  padding-left: 40px;
  box-sizing: border-box;
}

/* 左侧表单 */
.form-wrapper {
  width: 400px;
  padding-right: 40px;
  margin-top: 15px;
}
.tab-content {
  width: 360px;
}

::v-deep .el-form-item {
  margin-bottom: 16px;
}
/* 去除 el-tabs card 类型自带的边框 */
::v-deep .el-tabs--card > .el-tabs__header,
::v-deep .el-tabs--card > .el-tabs__header .el-tabs__nav,
::v-deep .el-tabs--card > .el-tabs__header .el-tabs__item,
::v-deep .el-tabs--card > .el-tabs__content {
  border: none !important;
  box-shadow: none !important;
}

/* 激活状态下，为当前 tab 添加自定义下划线（不占满左右 padding） */
::v-deep .el-tabs__item {
  color: #999;
  position: relative;
  height: 32px;
  margin-top: 10px;
}

::v-deep .el-tabs__item::after {
  content: "";
  position: absolute;
  bottom: 0;
  height: 2px;
  background: transparent;
  // transition: background 0.3s ease;
}
::v-deep .el-tabs__item.is-active::after {
  background: #000;
}

::v-deep .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  color: #000 !important;
}
::v-deep .el-tabs--card > .el-tabs__header .el-tabs__item:hover {
  color: #000;
}
::v-deep .el-tabs--card > .el-tabs__header .el-tabs__item:hover::after {
  background: #000;
}
/* ===== 右侧面板 Tabs 居中 ===== */
::v-deep .el-tabs--card > .el-tabs__header {
  display: flex !important;
  justify-content: center !important; /* 水平居中 */
}
::v-deep .el-tabs--card > .el-tabs__header .el-tabs__nav {
  display: inline-flex !important; /* 根据内容宽度 */
}
/* Tab item 无多余 padding，底线紧贴文字 */
::v-deep .el-tabs__item {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
::v-deep .el-tabs__item::after,
::v-deep .el-tabs__item:hover::after {
  left: 0;
  right: 0;
}

/* 标签间隔 20px */
::v-deep .el-tabs__item:not(:last-child) {
  margin-right: 80px !important;
}

.sub-tip {
  font-size: 10px;
  color: #555;
  margin-bottom: 12px;
}

.phone-input-line {
  display: flex;
  align-items: center;
  // margin-bottom: 24px;

  .phone-prefix {
    width: 70px;
    margin-right: 0;
    /* 去掉 Element UI 输入框右边框 */
    ::v-deep .el-input__inner {
      border-right: none !important;
      border-top-right-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
      border-color: #979797;
      color: #000;
    }
  }
  .phone-input {
    flex: 1;
    ::v-deep .el-input__inner {
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
      border-color: #979797;
      color: #999;
    }
  }
}
::v-deep.phone-style .phone-input[data-v-58a2a4c5] .el-input__inner {
  border-top-left-radius: 5px !important;
  border-bottom-left-radius: 5px !important;
}
.code-label {
  font-size: 13px;
  margin-bottom: 8px;
}

.code-input-line {
  width: 360px;
  height: 42.5px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;

  .code-box {
    width: 30px;
    height: 30px;
    margin-right: 8px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    text-align: center;
    font-size: 18px;
  }
  .force-new-line {
    flex-basis: 100%; /* 让该项占据整行 */
  }
  .code-input {
    display: none;
  }
  .resend-btn {
    margin-left: 12px;
    font-size: 14px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    text-align: center;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    background: #efefef;
    color: #000;
    cursor: pointer;
  }
}

.full-input {
  margin-bottom: 24px;
}

.login-btn {
  width: 100px; /* 固定宽度，避免切换时宽度变化 */
  margin-bottom: 16px;
  height: 35px;
  line-height: 8px;
  border-radius: 8px;
}
.agree-checkbox-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
  text-align: center;
  font-size: 11px;
}
::v-deep .agree-checkbox {
  .el-checkbox__label {
    color: #000;
  }
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
  ::v-deep .impowerBox .title {
    display: none !important;
  }
}

.qr-title {
  font-size: 14px;
  margin-top: 13px;
  margin-bottom: 40px;
}
.qr-box {
  width: 180px;
  height: 150px; /* 裁掉标题灰条 */
  position: relative;
  margin: 0 auto 30px;
}

/* 缩放 iframe 内部二维码尺寸 */
::v-deep .impowerBox .qrcode {
  width: 100px !important;
  height: 100px !important;
}
::v-deep .impowerBox .qrcode img {
  width: 100px !important;
  height: 100px !important;
}

/* 父级样式已限制 160×160，内部二维码自动居中 */
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
  display: flex;
  justify-content: center;
}
.agree-word {
  font-weight: 600;
  border-bottom: 1px solid #000;
  cursor: pointer;
}
::v-deep .el-button--primary {
  background: #000 !important;
  border-color: #000 !important;
  width: 100px;
  margin: 0 auto;
}
::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #000;
  font-size: 11px;
}
::v-deep .el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background: #000;
  border-color: #000;
}
.forget-password {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}
.forget-password span {
  display: inline-block;
  font-size: 11px;
  color: #000;
  border-bottom: 1px solid #000;
  cursor: pointer;
}
</style>
