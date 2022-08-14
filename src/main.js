import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import elementui from "element-ui";
import 'element-ui/lib/theme-chalk/index.css'
import './style/common.less'
import {serverBaseUrl} from './common/constant'

Vue.use(elementui)

Vue.filter('prefix', function(url) {
  if (url && url.startsWith('http')) {
    return url
  } else {
    url = `${serverBaseUrl}${url}`
    return url
  }
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
