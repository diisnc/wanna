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

  .md-theme-default :not(input):not(textarea)::selection {
    background-color: rgba(100,49,252,1) !important;
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
    border-radius: 20px !important;
    border: 0px !important;
    margin-top: 18px !important;
    opacity: inherit !important;
    -webkit-box-shadow: 0px 11px 32px -9px rgba(28,64,222,0.4) !important;
    box-shadow: 0px 11px 32px -9px rgba(28,64,222,0.4) !important;
    display: block !important;
    visibility: visible !important;
  }
  .popover-body {
    padding: 0px !important;
    display: block !important;
  }

  .list-group-item {
    border-color: #EEE !important;
    cursor: pointer !important;
    display: block !important;
    border-right: 0px !important;
    border-left: 0px !important;
    color: #000 !important;
  }
  .list-group-item:first-child{
    border-top: 0px !important;
    border-top-left-radius: 20px !important;
    border-top-right-radius: 20px !important;
  }
  .list-group-item:last-child{
    border-bottom: 0px !important;
    border-bottom-left-radius: 20px !important;
    border-bottom-right-radius: 20px !important;
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
