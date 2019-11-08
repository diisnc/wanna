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
  .body {
    background-color: #FFF !important;
    padding-top: 0px !important;
  }

  html {
    background-color: #FFF !important;
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

  .page{
    padding-top: 65px;
  }

  .form-control:focus{
    background-color: #EEE !important;
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,0) !important;
    -webkit-box-shadow: 0 0 0 0.2rem rgba(0,123,255,0) !important;
  }

  .btn-secondary:hover{
    background-color: #4A53FC !important;
    border-radius: 50px !important;
  }
</style>
