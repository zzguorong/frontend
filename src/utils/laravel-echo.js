import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

window.Pusher = Pusher

const echo = new Echo({
  broadcaster: 'reverb',
  key: 'rwe3mvqshrfh204n2isn',            // REVERB_APP_KEY
  wsHost: '47.112.1.202',                   // REVERB_HOST
  wsPort: 8080,                          // REVERB_PORT
  wssPort: 8080,                         // REVERB_PORT (HTTPS)
  forceTLS: false,                       // REVERB_SCHEME=http，所以不强制TLS
  enabledTransports: ['ws', 'wss'],      // 支持的传输协议
  disableStats: true,                    // 禁用统计
  // authEndpoint: '/broadcasting/auth', // 私有频道鉴权接口
  // auth: {
  //   headers: {
  //     Authorization: 'Bearer ' + yourToken, // 如果使用鉴权需要
  //   }
  // }
})

export default echo