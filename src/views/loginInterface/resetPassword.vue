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
      />
    </div>
    <!-- 主卡片 -->
    <div class="login-card" v-if="isPhoneLogin">
      <!-- 主体内容 -->
      <div class="content-wrapper">
        <div class="tab-content phone-login">
          <div class="reset-title">重置登录密码</div>
          <div class="reset-desc">请输入注册时使用的手机号来接收验证码</div>
          <!-- 手机号-->
          <div class="phone-input-line">
            <el-input
              v-model="phone"
              placeholder="请输入手机号"
              size="large"
              class="phone-input"
            />
          </div>
          <!-- 验证码输入 -->
          <div class="code-input-line">
            <el-input
              maxlength="6"
              placeholder="请输入验证码"
              size="large"
              class="phone-input"
            />
            <div
              type="text"
              class="resend-btn"
              :disabled="countDown > 0"
              @click="handleSend"
            >
              <template v-if="countDown > 0"
                >重新发送({{ countDown }})</template
              >
              <template v-else>发送验证码</template>
            </div>
          </div>

          <!-- 登录按钮 -->
          <div class="login-btn-wrapper" @click="isPhoneLogin = false">下一步</div>
          <div class="back-login-wrapper">
            <span class="back-login" @click="returnLogin">返回登录</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 主卡片2 -->
    <div class="login-card" v-if="!isPhoneLogin">
      <!-- 主体内容 -->
      <div class="content-wrapper">
        <div class="tab-content phone-login" style="width: 100%">
          <div class="reset-title">重置登录密码</div>
          <div class="reset-desc">请输入注册时使用的手机号来接收验证码</div>
          <!-- 手机号-->
          <div class="phone-input-line">
            <el-input
              v-model="phone"
              placeholder="请输入新密码"
              size="large"
              class="phone-input"
            />
          </div>
          <!-- 验证码输入 -->
          <div class="code-input-line">
            <el-input
              maxlength="6"
              placeholder="请确认新密码"
              size="large"
              class="phone-input"
            />
          </div>

          <!-- 登录按钮 -->
          <div class="login-btn-wrapper">重置密码</div>
          <div class="back-login-wrapper">
            <span class="back-login" @click="isPhoneLogin = true">返回</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginInterface",
  data() {
    return {
      isPhoneLogin: true,
      phone: "",
      password: "",
      countDown: 0,
      agree: true,
      timer: null,
    };
  },
  methods: {
    handleSend() {
      if (this.countDown > 0) return;
      this.countDown = 60;
      this.timer = setInterval(() => {
        if (this.countDown > 0) {
          this.countDown--;
        } else {
          clearInterval(this.timer);
        }
      }, 1000);
    },
    returnLogin() {
      this.$router.push("/login");
    },
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer);
  },
};
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
.phone-input-line,
.code-input-line {
  width:320px;
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}
.tab-content {
  width: 100%;
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
  margin: 50px 0 20px 0;
}
</style>
