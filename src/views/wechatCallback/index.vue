<template>
  <div class="wx-callback">
    <p>正在登录，请稍候…</p>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'WechatCallback',
  created () {
    console.log('完整URL:', window.location.href)
    console.log('路由查询参数:', this.$route.query)
    
    // 从路由查询参数获取code和state（通过中间页面传递）
    const { code, state } = this.$route.query

    console.log('获取到的 code,state:', code, state)
    
    if (!code) {
      console.error('未获取到微信授权码')
      this.$message.error('微信登录失败，未获取到授权码')
      setTimeout(() => {
        this.$router.replace('/loginInterface')
      }, 2000)
      return
    }
    request.post('/api/wechat_login', { code, state })
      .then(() => {
        this.$message.success('登录成功')
        this.$router.replace('/')
      })
      .catch(() => {
        this.$message.error('微信登录失败')
        this.$router.replace('/loginInterface')
      })
  }
}
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
