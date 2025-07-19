<template>
    <div class="callback-container">
      正在处理微信授权...
    </div>
  </template>
  
  <script>
  export default {
    // apiCallback.vue
    created () {
        const { code, state } = this.$route.query      // ← 直接拿到
        this.loginWithCode(code)
    },
    // mounted() {
    //   this.handleWechatCallback()
    // },
    methods: {
      handleWechatCallback() {
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get('code')
        const state = urlParams.get('state')
        console.log('code,state',code,state)
  
        if (code) {
          // 发送 POST 请求给后端
          this.$axios.post('/api/wechat_login', { code })
            .then(res => {
              // 假设后端返回 token
              const token = res.data.token
              localStorage.setItem('token', token)
  
              this.$message.success('登录成功')
              this.$router.push('/') // 跳转首页
            })
            .catch(err => {
              console.error('微信登录失败:', err)
              this.$message.error('授权失败，请重试')
              this.$router.push('/login')
            })
        } else {
          this.$message.error('未获取到 code')
          this.$router.push('/login')
        }
      }
    }
  }
  </script>