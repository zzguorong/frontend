<template>
  <div class="wx-callback">
    <p>正在登录，请稍候…</p>
  </div>
</template>

<script>
import { bindWechat } from '@/api/index';

export default {
  name: 'WechatCallback',
  created() {
    console.log('完整URL:', window.location.href);
    console.log('路由查询参数:', this.$route.query);

    // 从路由查询参数获取code和state（通过中间页面传递）
    const { code, state, wechat_binding } = this.$route.query;

    // 验证wechatLoginState
    const storedState = sessionStorage.getItem('wechatLoginState');
    if (state !== storedState) {
      console.error('状态验证失败，可能是CSRF攻击');
      this.$message.error('微信登录失败，状态验证失败');
      setTimeout(() => {
        if (wechat_binding) {
          this.$router.replace('/userInterface/userInterface');
        } else {
          this.$router.replace('/login');
        }
      }, 1000);
      return;
    } else {
      // clear the state from sessionStorage
      sessionStorage.removeItem('wechatLoginState');
    }

    if (!code) {
      console.error('未获取到微信授权码');
      this.$message.error('微信登录失败，未获取到授权码');
      setTimeout(() => {
        if (wechat_binding) {
          this.$router.replace('/userInterface/userInterface');
        } else {
          this.$router.replace('/login');
        }
      }, 1000);
      return;
    }

    if (wechat_binding) {
      console.log('微信绑定状态:', wechat_binding);
      bindWechat({ code })
        .then(() => {
          this.$message.success('微信绑定成功');
          setTimeout(() => {
            this.$router.replace('/userInterface/userInterface');
          }, 1000);
        })
        .catch((error) => {
          console.error('微信绑定失败:', error);
          this.$message.error('微信绑定失败，请稍后重试');
          setTimeout(() => {
            this.$router.replace('/userInterface/userInterface');
          }, 1000);
        });
    } else {
      this.$store.dispatch('user/wechatLogin', { code })
        .then(() => {
          this.$message.success('登录成功');
          setTimeout(() => {
            this.$router.replace('/generate');
          }, 1000);
        })
        .catch((error) => {
          console.error('微信登录失败:', error);
          this.$message.error('微信登录失败，请稍后重试');
          setTimeout(() => {
            this.$router.replace('/login');
          }, 1000);
        });
    }
  }
};
</script>

<style scoped>
.wx-callback {
  display:flex;
  align-items:center;
  justify-content:center;
  height:100vh;
  font-size:16px;
}
</style>
