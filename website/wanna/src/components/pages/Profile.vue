<template>
  <layout-basic>
	  <div id="app" class="page">
      <h1>profile</h1>
      <h2>{{this.route}}</h2>

    </div>
  </layout-basic>
</template>

<script>
import router from "../../router"
import LayoutBasic from "../layouts/BottomBar.vue"
export default {
  name: 'Profile',
  components: {
    LayoutBasic,
  },
  data () {
    return {
      route: this.$router.currentRoute.params.username
      
    }
  },
  created: function() {

  },
  mounted: function() {
    console.log(this.$router);
  },
  methods: {
    isMobile() {
      if(/Android|WebOS|iPhone|iPad|Blackberry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else{
        return false
      }
    }
  }
}
</script>
