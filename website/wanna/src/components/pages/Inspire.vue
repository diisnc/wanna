<template>
  <layout-basic>
    <div id="app">
      <div class="container">
        <div class="row">
          <b-col v-for="product in products" sm="8">
            <div class="card">
              <div class="card-op-area">
                <a :href="product.user"><img class="img-user" :src="product.user_img"></a>
                <a :href="product.user" class="txt-username"><b>{{product.user}}</b></a>
              </div>
              <div class="card-img-caixa">
                <img class="card-img card-img-blur" :src="product.img">
                <img class="card-img card-img-front" :src="product.img" @dblclick="giveliketouch()">
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
                  <button @click="" class="icon icon-reaction icon-message-empty"> ‏‏‎ </button>
                  <button v-if="getsave(post_id) === 0" @click="savepost(post_id)" class="icon icon-reaction icon-save-empty"> ‏‏‎ </button>
                  <button v-if="getsave(post_id) === 1" @click="unsavepost(post_id)" class="icon icon-reaction icon-save-full"> ‏‏‎ </button>
                  <button @click="" class="icon icon-reaction icon-buy-empty"> ‏‏‎ </button>
                  
                </div>
              </div>
              <div class="card-body">
                <h5 class="card-title">{{product.name}}</h5>
                <p class="card-text">{{product.description}}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </b-col>
          <b-col sm="2" v-if="!isMobile() && this.showbanner==1 && this.window.width>575">
            <div class="card card-download-app">
              <b-button class="search-bar btn-mini" @click="hidebanner()"><i class="fas fa-times"></i></b-button>
              <div style="padding:10px">
                <b-carousel
                  id="carousel-1"
                  controls
                  :interval="20000"
                  v-model="slide"
                  style="text-shadow: 1px 1px 2px #333;"
                  @sliding-start="onSlideStart"
                  @sliding-end="onSlideEnd"
                >
                  <b-carousel-slide img-src="img/banners/wishlist.png"></b-carousel-slide>
                  <b-carousel-slide img-src="img/banners/dinheiro.png"></b-carousel-slide>
                  <b-carousel-slide img-src="img/banners/ambiente.png"></b-carousel-slide>
                </b-carousel>
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
      saved: 0,
      likes: 342,
      post_id: 2123,
      products: [
        {
          user: 'joao_castro_12',
          user_img: 'https://i.dailymail.co.uk/i/pix/2017/04/20/13/3F6B966D00000578-4428630-image-m-80_1492690622006.jpg',
          name: 'Botas fixes',
          description: "Estas botas são mesmo fixes. Acho que as devias comprar ;)",
          img: "https://onpointfresh.com/wp-content/uploads/2016/11/street-style-men-boots-1.jpg",
          likes: 123
        },
        {
          user: 'joanavintageoutlet',
          user_img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
          name: 'Lacy shirt',
          description: "Esta camisa vintage vai assentar que nem uma luva no teu armário.",
          img: "https://i.imgur.com/hs5b0fc.png",
          likes: 2321
        },
        {
          user: 'beavila_shoestore',
          user_img: 'https://i.imgur.com/B7aj5H7.png',
          name: 'Botins festivos',
          description: "Preparada para a época de festivais? No teu outfit não podem faltar estes botins.",
          img: "https://joanavaz.pt/wp-content/uploads/2017/04/IMG_9317-1024x683.jpg",
          likes: 1489
        },
        {
          user: 'tiagorodri',
          user_img: 'https://images.unsplash.com/photo-1536548665027-b96d34a005ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
          name: 'Calças desporto',
          description: "Estas calças são mesmo fixes e confortáveis. As melhores do mercado.",
          img: "https://cdn.hummel.net/Admin/Public/GetImage.ashx?Width=500&Heigh=500&Compression=85&Crop=5&Image=/Files/Images/Perfion/c4a8bb97-17b9-4c23-a2d7-07ea40747b99.jpg",
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
    getsave(post_id){
      return this.saved;
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
    savepost(post_id){
      this.saved=1;
    },
    unsavepost(post_id){
      this.saved=0;
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
  .card-op-area{
    text-align: left;
    margin: 5px 0px 15px 10px;
    cursor: pointer;
  }
  .img-user{
    width: 40px !important;
    height: 40px !important;
    border-radius: 50px !important;
    object-fit: cover;
  }
  .txt-username{
    margin-left: 10px;
    font-size: 15px;
    color: #333 !important;
  }
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
    -webkit-box-shadow: 0px 11px 32px -9px rgba(28,64,222,0.25);
    -moz-box-shadow: 0px 11px 32px -9px rgba(28,64,222,0.25);
    box-shadow: 0px 11px 32px -9px rgba(28,64,222,0.25);
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
    transition: 0.3s;
  }
  .btn-download:hover,
  .btn-download:focus{
    box-shadow: 0 0.2em 1em -0.3em rgba(100,49,252,0.9);
    transform: translateY(-0.2em);
    transition: 0.3s;
  }
  .btn-mini{
    position: absolute;
    top: 10px;
    right: 10px;
    width:35px !important;
    height: 35px !important;
    background-color:rgba(0,0,0,0.08) !important;
    border-radius: 30px;
    z-index: 999 !important;
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
    background-color: #333 !important;
    background: #333 !important;
    mask-size: cover;
    cursor: pointer;
    margin: 10px !important;
    width: 25px !important;
    height: 22px !important;
    transition: 0.3s !important;
  }

  .icon-like-empty {
    mask: url(https://svgur.com/i/G0S.svg);
    transition: 0.3s !important;
  }
  .icon-like-empty:hover{
    background-color: #F40056 !important;
    transition: 0.3s !important;
  }
  .icon-like-full {
    background-color: #F40056 !important;
    mask: url(https://svgur.com/i/FzP.svg);
    transition: 0.3s !important;
  }
  .icon-dislike-empty {
    mask: url(https://svgur.com/i/Fzt.svg);
    transition: 0.3s !important;
  }
  .icon-dislike-empty:hover{
    background-color: #4A53FC !important;
    transition: 0.3s !important;
  }
  .icon-dislike-full {
    background-color: #4A53FC !important;
    mask: url(https://svgur.com/i/G0c.svg);
    transition: 0.3s !important;
  }

  .icon-message-empty {
    mask: url(https://svgur.com/i/G2U.svg);
    transition: 0.3s !important;
    width: 23px !important;
    height: 23px !important;
  }
  .icon-message-empty:hover{
    background-color: #4A53FC !important;
    transition: 0.3s !important;
  }

  .icon-save-empty {
    mask: url(https://svgur.com/i/G1w.svg);
    transition: 0.3s !important;
    width: 21px !important;
    height: 23px !important;
  }
  .icon-save-empty:hover{
    background-color: #4A53FC !important;
    transition: 0.3s !important;
  }
  .icon-save-full{
    mask: url(https://svgur.com/i/G28.svg);
    background-color: #333 !important;
    width: 21px !important;
    height: 23px !important;
    transition: 0.3s !important;
  }

  .icon-buy-empty {
    mask: url(https://svgur.com/i/G1D.svg);
    transition: 0.3s !important;
    width: 22px !important;
    height: 24px !important;
  }
  .icon-buy-empty:hover{
    background-color: #4A53FC !important;
    transition: 0.3s !important;
  }

</style>
