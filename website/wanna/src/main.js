// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import VueSession from 'vue-session'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import Popover  from 'vue-js-popover'
import VueMaterial from 'vue-material'
import moment from 'moment'
import vmodal from 'vue-js-modal'

//import mdbDatatable from 'mdbvue';
//import VueApexCharts from 'vue-apexcharts'
//import Carousel3d from 'vue-carousel-3d';
import { MdButton, MdContent, MdTabs } from 'vue-material/dist/components'

import 'vuetify/dist/vuetify.min.css'
import 'jquery/dist/jquery.min.js';
//import 'bulma/css/bulma.css';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


//require('../dist/static/css/index.css')


Vue.use(MdButton);
Vue.use(MdContent);
Vue.use(MdTabs);
Vue.use(VueMaterial);
Vue.use(VueSession);
Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(vmodal);
Vue.prototype.moment = moment
Vue.use(BootstrapVue);
//Vue.use(Carousel3d);
//Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
  	App
  },
  template: '<App/>'
})
