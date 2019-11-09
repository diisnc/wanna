<template>
  <layout-basic>
    <div id="app">
      <div class="container">
        <div class="row">
          <b-col v-for="product in products" sm="8">
            <div class="card">
              <div class="card-img-caixa">
                <img class="card-img card-img-blur" :src="product.image">
                <img class="card-img card-img-front" :src="product.image" @dblclick="giveliketouch()">
              </div>
              <div class="reaction-area">
                <div class="reaction-left-area">

                    <button v-if="getlike(post_id) === 0" @click="givelike(post_id)" class="icon icon-reaction icon-like-empty"> ‏‏‎ </button>
                    <button v-if="getlike(post_id) === 1" @click="remvlike(post_id)" class="icon icon-reaction icon-like-full"> ‏‏‎ </button>

                    <b>{{product.likes}}</b>

                    <button v-if="getdislike(post_id) === 0" @click="givedislike(post_id)" class="icon icon-reaction icon-dislike-empty"> ‏‏‎ </button>
                    <button v-if="getdislike(post_id) === 1" @click="remvdislike(post_id)" class="icon icon-reaction icon-dislike-full"> ‏‏‎ </button>

                </div>
                <div class="reaction-right-area">
                  <button @click="" class="icon icon-reaction icon-like-empty">comment</button>
                  <button @click="" class="icon icon-reaction icon-like-empty">savepost</button>
                  <button @click="" class="icon icon-reaction icon-like-empty">buy</button>
                  
                </div>
              </div>
              <div class="card-body">
                <h5 class="card-title">{{product.name}}</h5>
                <p class="card-text">{{product.description}}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </b-col>
          <b-col sm="3">
            <div v-if="!isMobile() && this.showbanner==1 && this.window.width>575" class="card card-download-app">
              <b-button class="search-bar btn-mini" @click="hidebanner()"><i class="fas fa-times"></i></b-button>
              <div style="padding:10px">
                <img src="img/banners/dinheiro.png" width="auto" height="auto" alt="Wanna" style="transition: width 1s">
                <a href="" class="btn btn-primary btn-download"><b>Download app</b></a>
              </div>
            </div>
          </b-col>

        </div>
      </div>
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
      route: this.$router.currentRoute.name,
      like: 0,
      dislike: 0,
      likes: 342,
      post_id: 2123,
      products: [
        {
          name: 'Botas fixes',
          description: "Estas botas são mesmo fixes. Acho que as devias comprar ;)",
          image: "https://onpointfresh.com/wp-content/uploads/2016/11/street-style-men-boots-1.jpg",
          likes: 123
        },
        {
          name: 'Calças desporto',
          description: "Estas calças são mesmo fixes e confortáveis. As melhores do mercado.",
          image: "https://cdn.hummel.net/Admin/Public/GetImage.ashx?Width=500&Heigh=500&Compression=85&Crop=5&Image=/Files/Images/Perfion/c4a8bb97-17b9-4c23-a2d7-07ea40747b99.jpg",
          likes: 431
        },
        {
          name: 'Calças desporto',
          description: "Estas calças são mesmo fixes e confortáveis. As melhores do mercado.",
          image: "https://cdn.hummel.net/Admin/Public/GetImage.ashx?Width=500&Heigh=500&Compression=85&Crop=5&Image=/Files/Images/Perfion/c4a8bb97-17b9-4c23-a2d7-07ea40747b99.jpg",
          likes: 431
        },
        {
          name: 'Calças desporto',
          description: "Estas calças são mesmo fixes e confortáveis. As melhores do mercado.",
          image: "https://cdn.hummel.net/Admin/Public/GetImage.ashx?Width=500&Heigh=500&Compression=85&Crop=5&Image=/Files/Images/Perfion/c4a8bb97-17b9-4c23-a2d7-07ea40747b99.jpg",
          likes: 431
        }
      ],
      showbanner: 1,
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
  mounted: function() {
    //console.log(this.$router);
    //console.log(this.products);
  },
  methods: {
    //todos estes métodos são apenas para teste. Trocar depois pelo acesso à BD.
    getlike(post_id){
      return this.like;
    },
    getdislike(post_id){
      return this.dislike;
    },
    givelike(post_id){
      if(this.like==0){
        this.like=1;
        if(this.dislike==1)
          this.likes=this.likes+2;
        else this.likes=this.likes+1;
        this.dislike=0;
      }
    },
    giveliketouch(post_id){
      this.givelike(post_id);
      //inserir coraçao na imagem, como no insta :)
    },
    remvlike(post_id){
      this.like=0;
      this.likes=this.likes-1;
    },
    givedislike(post_id){
      this.dislike=1;
      if(this.like==1)
        this.likes=this.likes-2;
      else this.likes=this.likes-1;
      this.like=0;
    },
    remvdislike(post_id){
      this.dislike=0;
      this.likes=this.likes+1;
    },
    isMobile() {
      if(/Android|WebOS|iPhone|iPad|Blackberry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else{
        return false
      }
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
    hidebanner(){
      this.showbanner=0;
    }
  }
}
</script>

<style>
  .card{
    border-radius:20px !important;
    border: 0px !important;
  }
  .card-download-app{
    background-color: #FFF !important;
    top: 0px !important;
    position: fixed !important;
    margin-top: 90px;
    text-align: center !important;
    width: 330px;
    height: 530px;
    -webkit-box-shadow: 0px 11px 32px -9px rgba(0,0,0,0.3);
    -moz-box-shadow: 0px 11px 32px -9px rgba(0,0,0,0.3);
    box-shadow: 0px 11px 32px -9px rgba(0,0,0,0.3);
  }
  .btn-download{
    margin-top: 5px;
    border-radius:30px !important;
    color: #FFF !important;
    background: rgb(100,49,252);
    background: linear-gradient(90deg, rgba(100,49,252,1) 0%, rgba(58,104,252,1) 100%);
    text-transform: uppercase;
    font-size: 14px !important;
    letter-spacing: 3px;
    text-decoration: none !important;
  }
  .btn-mini{
    position: absolute;
    top: 10px;
    right: 10px;
    width:35px !important;
    height: 35px !important;
    background-color:rgba(0,0,0,0.08) !important;
    border-radius: 30px;
  }
  
  .card-img-caixa{
    position: relative;
    top:0;
    left:0;
  }
  
  .card-img-blur {
    position: relative;
    top:10px;
    left:0;
    border-radius: 20px !important;
    filter: blur(13px);
    opacity: 0.7;
  }

  .card-img-front {
    position: absolute;
    top:0px;
    left:0px;
    width: 100% !important;
    border-radius: 20px !important;
  }

  .card-body{
    padding: 2px 10px 20px 10px !important;
    text-align: left;
  }

  .reaction-area{
    margin-top: 5px !important;
    width:100%;
    text-align:left;
  }
  .reaction-left-area{
    text-align:left;
    width: 50%;
    height: 42px;
    display: inline-block;
  }
  .reaction-right-area{
    text-align:right;
    width: 50%;
    height: 42px;
    display: inline-block;
  }
  .icon-reaction {
    display: inline-block !important;
    background-color: #000 !important;
    background: #000 !important;
    mask-size: cover;
    cursor: pointer;
    margin: 10px !important;
    width: 25px !important;
    height: 22px !important;
  }

  .icon-like-empty {
    mask: url(https://svgur.com/i/G0S.svg);
  }
  .icon-like-empty:hover{
    background-color: #F40056 !important;
  }
  .icon-like-full {
    background-color: #F40056 !important;
    mask: url(https://svgur.com/i/FzP.svg);
  }
  .icon-dislike-empty {
    mask: url(https://svgur.com/i/Fzt.svg);
  }
  .icon-dislike-empty:hover{
    background-color: #4A53FC !important;
  }
  .icon-dislike-full {
    background-color: #4A53FC !important;
    mask: url(https://svgur.com/i/G0c.svg);
  }

</style>
