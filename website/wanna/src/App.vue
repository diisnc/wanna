<template>
  <v-app>
    <router-view/>
  </v-app>
</template>


<script>
export default {
  name: 'App'
}
</script>

<style>
  body {
    padding-top: 0px !important;
  }

  html {
    min-height: 100%;
  }

  @font-face {
    font-family: Run;
    src: url(assets/fonts/run.woff) format('woff');
  }

  @font-face {
    font-family: Avenir;
    src: url(assets/fonts/avenir.woff) format('woff');
  }

  #app {
    font-family: 'Avenir', 'Run', Helvetica, Arial, sans-serif;;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }

  .popover {
    margin-top: 17px !important;
    border: 0px !important;
    border-radius: 20px !important;
    opacity: inherit !important;
    -webkit-box-shadow: 0px 15px 20px 2px rgba(0,0,0,0.15) !important;
    display: block !important;
    visibility: visible !important;
  }

  .popover-body {
    padding: 0px !important;
    border: 0px !important;
    border-radius: 10px !important;
    display: block !important;
  }

  .list-group-item {
    cursor: pointer !important;
    border: 0px !important;
    display: block !important;
  }

  .arrow{
    border: 0px !important;
  }
</style>
