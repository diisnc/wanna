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
      route: this.$router.currentRoute.name
      
    }
  } 
}
</script>
