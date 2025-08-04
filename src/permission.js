import { getToken } from '@/utils/auth'; // get token from cookie
import getPageTitle from '@/utils/get-page-title';
import { Message } from 'element-ui';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import router from './router';
import store from './store';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

// 免登录白名单
const whiteList = [
  '/',
  '/login',
  '/register',
  '/resetPassword',
  '/termOfservice', // 服务条款
  '/privacyPolicy', // 隐私政策
  '/aboutUs', // 关于我们
  '/auth/wechat/callback' // 微信 OAuth 回调（history 模式）
];

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  const hasToken = getToken();
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/generate' });
      NProgress.done();
    } else {
      const hasGetUserInfo = store.getters.name;
      console.log('hasGetUserInfo', hasGetUserInfo);
      if (hasGetUserInfo) {
        next();
      } else {
        try {
          // get user info
          // await store.dispatch("user/getInfo");
          next();
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken');
          Message.error(error || 'Has Error');
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
