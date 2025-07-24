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
              <el-button class="btn-wx-check" type="primary" style="width: 15%">微信验证</el-button>
            </div>
          </el-form>
        </div>

        <!-- 密码管理 -->
        <div class="main-card">
          <div class="password-section">
            <div class="main-card-title">密码管理
              <el-button class="pwd-btn" type="primary" style="width: 15%" :loading="loading" @click="handlePasswordValidation">密码验证</el-button>
            </div>

            <el-form ref="resetPasswordForm" :model="resetPasswordForm" :rules="resetPasswordFormRules">
              <div class="account-form">
                当前密码
                <el-form-item prop="password">
                  <el-input type="password" v-model="resetPasswordForm.password" show-password placeholder="请输入当前密码" />
                </el-form-item>
              </div>
              <div class="account-form">
                新密码
                <el-form-item prop="newPassword">
                  <el-input type="password" v-model="resetPasswordForm.newPassword" show-password placeholder="请输入新密码" />
                </el-form-item>
              </div>
              <div class="account-form">
                重复输入新密码
                <el-form-item prop="confirmNewPassword">
                  <el-input type="password" v-model="resetPasswordForm.confirmNewPassword" show-password placeholder="请再次输入密码" />
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
            <div class="plan-title">当前计划 <el-button class="buy-btn" type="text">购买记录</el-button></div>
            <div class="plan-name">
              <div class="plan-name-title">订阅计划名称 <span>xxxxx</span></div>
              <div class="plan-name-title">到期时间 <span>xxxxx</span></div>
            </div>
            <!-- 权益 -->
            <div class="plan-title">权益</div>
            <div class="plan-rights">

              <div class="plan-rights-list">
                <div class="plan-rights-item"><i class="el-icon-check" style="color: #9A9A9A"></i> <span>专人提供技术支持</span>
                </div>
                <div class="plan-rights-item"><i class="el-icon-check" style="color: #9A9A9A"></i> <span>本地化部署专用服务器</span>
                </div>
                <div class="plan-rights-item"><i class="el-icon-check" style="color: #9A9A9A"></i> <span>GAIA模型支持</span>
                </div>
                <div class="plan-rights-item"><i class="el-icon-check" style="color: #9A9A9A"></i>
                  <span>服务期内无限图像生成次数</span></div>
                <div class="plan-rights-item"><i class="el-icon-check" style="color: #9A9A9A"></i>
                  <span>服务期内无限语义分割功能使用次数</span></div>
                <div class="plan-rights-item"><i class="el-icon-check" style="color: #9A9A9A"></i>
                  <span>服务期内无限语义分割工具包使用次数</span></div>
                <div class="plan-rights-item"><i class="el-icon-check" style="color: #9A9A9A"></i>
                  <span>服务期内无限JPG下载次数</span></div>
                <div class="plan-rights-item"><i class="el-icon-check" style="color: #9A9A9A"></i>
                  <span>服务期内无限PSD下载次数</span></div>
                <div class="plan-rights-item"><i class="el-icon-check" style="color: #9A9A9A"></i>
                  <span>服务器内生图排队优先权</span></div>
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
  </div>
</template>

<script>

import {
getUserInfo
} from "@/api/generate";
import { updatePassword } from '@/api/index';

export default {
  name: "UserInterface",
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
      loading: false
    };
  },
  async created() {
    try {
      const data = await getUserInfo();
      this.userInfo = data;
    } catch (error) {
      console.log()
    }
  },
  methods: {
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
    }
  }
};
</script>

<style scoped>
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
        font-size: 21px;
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
  padding: 12px 24px 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;

  .btn-wx-check {
    background: #6C6C6C;
    color: #fff;
    border-radius: 40px;
    border: none;
    font-size: 16px;
    height: 38px;
  }
}

.account-form .el-form-item {
  margin-bottom: 24px;
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
</style>
