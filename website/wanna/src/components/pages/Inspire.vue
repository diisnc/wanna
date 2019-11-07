<template>
  <layout-basic>

    <div id="app" class="page">
      <h1>olá mundo</h1>



      
    </div>
  </layout-basic>
</template>

<script>
import router from "../../router"
import LayoutBasic from "../layouts/BottomBar.vue"
export default {
  name: 'Inspire',
  components: {
    LayoutBasic,
  },
  data () {
    return {
      route: this.$router.currentRoute.name
    }
  },
  mounted: function() {
    //console.log(this.$router);
  },
}
</script>
