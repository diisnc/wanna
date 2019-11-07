<template>
  <layout-basic>

    <div id="app">
      <h1>olá mundo</h1>
       <h1>olá mundo</h1>
        <h1>olá mundo</h1>
         <h1>olá mundo</h1>
      <button>olaa</button>
      <b-button block variant="primary">{{this.route}}</b-button>
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
