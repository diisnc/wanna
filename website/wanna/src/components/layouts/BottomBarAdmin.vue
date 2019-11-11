<template>
  <div id="app">

    <!-- EDITAR NO FIM -->
    <div v-if="isMobile()">
      <mobile>
        <div class="mobile-top-bar">
          <h1 class="phone-title">inspire</h1>
        </div>
        <slot/>

        <div class="phone-bar">
          <md-bottom-bar md-type="fixed">
            <div style="margin: 0 auto; width: 100%;">
              <md-bottom-bar-item id="feed"><i class="icon icon-mobile-feed"></i></md-bottom-bar-item>
              <md-bottom-bar-item id="feed"><i class="icon icon-mobile-wishlist"></i></md-bottom-bar-item>
              <md-bottom-bar-item id="feed"><i class="icon icon-mobile-add"></i></md-bottom-bar-item>
              <md-bottom-bar-item id="feed"><i class="icon icon-mobile-outfit"></i></md-bottom-bar-item>
              <md-bottom-bar-item id="feed"><i class="icon icon-mobile-profile"></i></md-bottom-bar-item>
            </div>
          </md-bottom-bar>
        </div>

      </mobile>
    </div>
    
    
    <div v-else>
      <desktop>
        <div class="desktop-bar">
          <div class="left-side-bar">
            <img v-if="window.width>800" src="img/brand/full_logo.png" width="150" height="40" alt="Wanna" style="margin: auto; transition: width 1s">
            <img v-else src="img/brand/logo.png" width="50" height="50" alt="Wanna" style="margin: auto; transition: width 1s; ">
          </div>

          <div class="right-side-bar">
            
            <button v-if="this.$router.currentRoute.name=='Manageposts'" class="icon icon-home icon-active"/>
            <button v-else @click="postsClick" v-else class="icon icon-home"/>

            <button v-if="this.$router.currentRoute.name=='Manageusers'" class="icon icon-profile icon-active"/>
            <button v-else @click="usersClick" class="icon icon-profile"/>
          </div>
        </div>
        <div style="height:0px;"></div>
        <slot/>
      </desktop>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        window: {
          width: 0,
          height: 0
        }
      }
    },
    created: function() {
      window.addEventListener('resize', this.handleResize)
      this.handleResize();
    },
    methods: {
      isMobile() {
        if(/Android|WebOS|iPhone|iPad|Blackberry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          return true
        } else{
          return false
        }
      },
      usersClick() {
        this.$router.push('/manageusers');
      },
      postsClick() {
        this.$router.push('/manageposts');
      },
      handleResize() {
        this.window.width = window.innerWidth;
        this.window.height = window.innerHeight;
      }
    /*
      logout() {
        if (this.$session.has('token')) {
          this.$session.remove('token');
          this.$router.push("/auth");
        }
      },
      jogos() {
        this.$session.set('activeTab',"jogos")
        this.$router.push('/jogos')
      },
      jogo() {
        this.$session.set('activeTab',"jogo")
        if(this.$session.get('js')==1){
          axios.get(process.env.API_URL + "/server/get_jogo/"+this.$session.get('jogoTab')+"/").then(response => {
            if(response.data.convocados)
              this.$router.push('/convocados')
            else this.$router.push('/jogo')
          })
        }
        else this.$router.push('/stats')
      },
      settings(){
        this.$session.set('activeTab',"definicao")
        this.$router.push('/definicao')
      }*/
    }
  }
</script>

<style scoped>
  .phone-top-bar{
    position:fixed;
    width: 100%;
    text-align: left !important;
  }

  .phone-title{
    margin:20px 15px -10px 15px !important;
    font-family: 'Run';
    text-align: left !important;
    background-color: #FFF !important;
  }

  .phone-bar {
    position: fixed;
    z-index: 100;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    background: #FFFFFF;
  }

  .desktop-bar {
    position: fixed;
    z-index: 100;
    width: 100%;
    height: 60px;
    overflow: hidden;
    background: #FFF;
    border-bottom: 1px solid #E9E9E9;
  }
  .left-side-bar {
    margin-left:8%;
    width:26%;
    position: relative;
    display: inline-flex;
    float: left;
    top: 50%;
    transform: translateY(-50%);
  }
  .right-side-bar{
    margin-right:8%;
    min-width:200px;
    width:20.5%;
    position: relative;
    display: inline-flex;
    float: right;
    top: 50%;
    transform: translateY(-50%);
  }

  .icon-home {
    mask: url(https://svgur.com/i/FZX.svg);
    width:22px;
    height: 24.5px;
  }
  .icon-profile {
    mask: url(https://svgur.com/i/FYW.svg);
    width:25px;
    height: 24px;
  }
  .icon-notifs {
    mask: url(https://svgur.com/i/FYn.svg);
    width:21px;
    height: 25.5px;
  }

  .icon-mobile-feed {
    mask: url(https://svgur.com/i/FdS.svg);
    width:18px;
    height: 20.5px;
  }
  .icon-mobile-wishlist {
    mask: url(https://svgur.com/i/FcM.svg);
    width:23px;
    height: 20.5px;
  }
  .icon-mobile-add {
    mask: url(https://i.imgur.com/dTGhAxa.png);
    width:40px;
    height: 40px;
  }
  .icon-mobile-outfit {
    mask: url(https://svgur.com/i/FdG.svg);
    width:27px;
    height: 20.5px;
  }
  .icon-mobile-profile {
    mask: url(https://svgur.com/i/FcB.svg);
    width:21px;
    height: 20px;
  }
  
  .icon {
    display: inline-block !important;
    background: black;
    mask-size: cover;
    cursor: pointer;
    margin:20px;
    transition: 0.3s;
  }

  .icon:hover,
  .icon:focus,
  .icon:active,
  .icon-active {
    background-color: #4A53FC;
  }

  .search-bar{
    width:100%;
    margin:auto;
    border-radius:40px;
    background-color: #EEE;
    border: 0px;
    color: #000;
    transition: 0.1s !important;

  }

 
</style>

