<template>
  <layout-basic>
    <div id="app">
      <div class="container">
        <b-row class="justify-content-md-center">
          <b-col sm="8">
            <div class="card">
              <!-- USER, TIMESTAMP e OPÇÕES -->
              <div class="user-area">
                <div class="card-op-area">
                  <a :href="product.user"><img class="img-user" :src="product.user_img"></a>
                  <a :href="product.user" class="txt-username"><b>{{product.user}}</b></a>
                  <a class="txt-username">•</a>
                  <a class="txt-username txt-tmstmp">{{moment(product.timestamp, "YYYY-MM-DDThh:mm:ss").locale('pt-pt').fromNow()}}</a>
                
                </div>
                <div class="card-options-area">
                  <b-button class="search-bar btn-mini bg-trans"
                    @mouseover="setmodal(product.id)"
                    @click="showmodal(product.id)">
                    <i class="fas fa-ellipsis-h"></i>
                  </b-button>

                  <modal v-if="shownmodal == product.id" @before-open="this.shownmodal=product.id" name="post_options" width="400px" height="auto">
                    <b-list-group-item class="post-list" href="">Copiar ligação</b-list-group-item>
                    <b-list-group-item class="post-list" href="">Reportar</b-list-group-item>
                  </modal>
                </div>
              </div>
              <!-- FOTOS DO POST -->
              <div class="card-img-caixa">

                <img v-if="product.imgs.length==1" class="card-img card-img-blur" :src="product.imgs[0]">
                <img v-if="product.imgs.length==1" class="card-img card-img-front" :src="product.imgs[0]" @dblclick="giveliketouch()">

                <b-carousel v-if="product.imgs.length>1" id="carousel1"
                  style="text-shadow: 1px 1px 2px #333;"
                  controls
                  indicators
                  :interval="30000"
                  v-model="slide"
                  @sliding-start="onSlideStart"
                  @sliding-end="onSlideEnd">

                  <b-carousel-slide v-for="image in product.imgs" :img-src="image">
                  </b-carousel-slide>

                </b-carousel>
              </div>
              <!-- REAÇÕES AO POST -->
              <div class="reactions-area">
                <div class="reaction-left-area">

                    <button v-if="getlike(post_id) === 0" @click="givelike(post_id)" class="icon icon-reaction icon-like-empty"> ‏‏‎ </button>
                    <button v-if="getlike(post_id) === 1" @click="remvlike(post_id)" class="icon icon-reaction icon-like-full"> ‏‏‎ </button>

                    <b>{{product.likes}}</b>

                    <button v-if="getdislike(post_id) === 0" @click="givedislike(post_id)" class="icon icon-reaction icon-dislike-empty"> ‏‏‎ </button>
                    <button v-if="getdislike(post_id) === 1" @click="remvdislike(post_id)" class="icon icon-reaction icon-dislike-full"> ‏‏‎ </button>

                </div>
                <div class="reaction-right-area">
                  <button v-if="getsave(post_id) === 0" @click="savepost(post_id)" class="icon icon-reaction icon-save-empty"> ‏‏‎ </button>
                  <button v-if="getsave(post_id) === 1" @click="unsavepost(post_id)" class="icon icon-reaction icon-save-full"> ‏‏‎ </button>
                  <button @click="" class="icon icon-reaction icon-buy-empty"> ‏‏‎ </button>
                </div>
              </div>
              <!-- TITULO, MARCA, DESCRIÇÃO, PREÇO e AFINS -->
              <div class="description-area">
                <div class="card-op-area">
                  <div style="display:inline-flex;">
                    <h5 style="margin:0px;">{{product.name}}</h5> 
                    <button 
                      v-b-toggle="product.id"
                      class="toggle-description">
                      <i class="fa fa-sort-down"></i>
                    </button>
                  </div>
                  <p v-if="product.manufacturer" class="details-post"><b>{{product.manufacturer}} ‏‏‎ • ‏‏‎ {{product.size}} ‏‏‎ • ‏‏‎ {{product.color}}</b></p>
                  <p v-else class="details-post"><b>{{product.size}} ‏‏‎ • ‏‏‎ {{product.color}}</b></p>
                </div>
                <div class="card-options-area">
                  <h4 style="color: #4A53FC;"><b>{{product.price.toFixed(2)}}€</b></h4>
                </div>
                
                <b-collapse v-bind:id="product.id" class="mt-2">
                  <div class="card-op-area">
                    <p class="card-text">{{product.description}}</p>
                  </div>
                </b-collapse>
              </div>
              <!-- COMENTÁRIOS -->
              <div class="comment-area">
                <!-- COMENTÁRIO MAIS RECENTE -->
                <div class="my-comment">
                  <a :href="'/'+product.comments[0].user"><img class="img-user" :src="product.comments[0].user_img"></a>
                  <div class="comment">
                    <a :href="'/'+product.comments[0].user" class="txt-username"><b>{{product.comments[0].user}}</b></a>
                    <a class="txt-username">{{product.comments[0].text}}</a>
                    <a class="txt-username">•</a>
                  <a class="txt-username txt-tmstmp">{{moment(product.comments[0].timestamp, "YYYY-MM-DDThh:mm:ss").locale('pt-pt').fromNow()}}</a>
                  </div>
                </div>

                <!-- INSERIR O MEU COMENTARIO -->
                <div class="my-comment">
                  <a :href="current_user_name"><img class="img-user" :src="current_user_img"></a>
                  <b-form-textarea class="comment-input" v-model="text" rows="1" max-rows="4" v-bind:id="'comment_'+product.id" placeholder="Escreve um comentário..." ></b-form-textarea>
                  <button @click="" class="btn icon icon-send"/>
                </div>

                <!-- VER MAIS COMENTARIOS -->
                <div class="view-comments">
                  <!-- BOTÃO PARA MODAL EM WEBSITE -->
                  <b-button class="search-bar bg-trans"
                    v-if="!isMobile()"
                    @mouseover="setmodal('comments_'+product.id)"
                    @click="showmodal('comments_'+product.id)">
                    Ver todos os comentários
                  </b-button>

                  <!-- BOTÃO PARA FULL PAGE EM MOBILE -->
                  <b-button class="search-bar"
                    v-if="isMobile()"
                    @click="$router.push('/comments/'+product.id)">
                    Ver todos os comentários
                  </b-button>

                  <!-- MODAL COM COMENTARIOS NO WEBSITE -->
                  <modal
                    v-if="shownmodal == 'comments_'+product.id"
                    @before-open="this.shownmodal='comments_'+product.id"
                    name="post_options" width="40%" height="auto"
                    scrollable=true>
                  

                    <div style="padding:20px 20px 10px 10px;">
                      <div class="card-op-area" style="margin-bottom: 0px !important">
                        <div style="display:inline-flex;">
                          <h5 style="margin:0px;">{{product.name}}</h5>
                        </div>
                        <p v-if="product.manufacturer" class="details-post"><b>{{product.manufacturer}} ‏‏‎ • ‏‏‎ {{product.size}} ‏‏‎ • ‏‏‎ {{product.color}}</b></p>
                        <p v-else class="details-post"><b>{{product.size}} ‏‏‎ • ‏‏‎ {{product.color}}</b></p>
                        <p class="card-text">{{product.description}}</p>
                      </div>
                      <div class="card-options-area">
                        <h4 style="color: #4A53FC;"><b>{{product.price.toFixed(2)}}€</b></h4>
                      </div>

                      <hr>

                      <div v-for="comment in product.comments" class="my-comment">
                        <a :href="'/'+comment.user"><img class="img-user" :src="comment.user_img"></a>
                        <div class="comment">
                          <a :href="'/'+comment.user" class="txt-username"><b>{{comment.user}}</b></a>
                          <a class="txt-username">{{comment.text}}</a>
                          <a class="txt-username">•</a>
                          <a class="txt-username txt-tmstmp">{{moment(comment.timestamp, "YYYY-MM-DDThh:mm:ss").locale('pt-pt').fromNow()}}</a>
                        </div>
                      </div>

                      <div class="my-comment">
                        <a :href="current_user_name"><img class="img-user" :src="current_user_img"></a>
                        <b-form-textarea class="comment-input" v-model="text" rows="1" max-rows="4" v-bind:id="'comment_'+product.id" placeholder="Escreve um comentário..." ></b-form-textarea>
                        <button class="btn icon">PUBLICAR</button>
                      </div>

                    </div>
                  </modal>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
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
      post_id: 2123,
      current_user_name: 'vitorpeixoto',
      current_user_img: 'https://i.imgur.com/KMlWJNv.jpg',
      page: 0,
      product: 
        {
          id: 104,
          timestamp: '2019-11-10T16:15:22',
          user: 'joao_castro_12',
          user_img: 'https://i.dailymail.co.uk/i/pix/2017/04/20/13/3F6B966D00000578-4428630-image-m-80_1492690622006.jpg',
          name: 'Botas fixes',
          description: "Estas botas são mesmo fixes. Acho que as devias comprar ;)",
          price: 45.90,
          size: '40',
          color: 'Castanho',
          sex: 'Homem',
          manufacturer: 'Timberland',
          imgs: [
            "https://onpointfresh.com/wp-content/uploads/2016/11/street-style-men-boots-1.jpg"
          ],
          likes: 123,
          comments: [
            {
              user: 'rosameireles_',
              user_img: 'https://engineering.unl.edu/images/staff/Kayla_Person-small.jpg',
              timestamp: '2019-11-10T16:28:22',
              text: 'Já comprei ao @joao_castro_12 e fiquei satisfeita com o serviço!'
            },
            {
              user: 'yee',
              user_img: 'https://img.estadao.com.br/thumbs/640/resources/jpg/7/8/1524230513387.jpg',
              timestamp: '2019-11-10T16:23:22',
              text: 'Vai mas é trabalhar gandulo.'
            },
            {
              user: 'tiagomcosta',
              user_img: 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
              timestamp: '2019-11-10T16:18:22',
              text: 'Tenho umas iguais e adoro!'
            },
            {
              user: 'rosameireles_',
              user_img: 'https://engineering.unl.edu/images/staff/Kayla_Person-small.jpg',
              timestamp: '2019-11-10T16:28:22',
              text: 'Já comprei ao @joao_castro_12 e fiquei satisfeita com o serviço!'
            },
            {
              user: 'yee',
              user_img: 'https://img.estadao.com.br/thumbs/640/resources/jpg/7/8/1524230513387.jpg',
              timestamp: '2019-11-10T16:23:22',
              text: 'Vai mas é trabalhar gandulo.'
            },
            {
              user: 'tiagomcosta',
              user_img: 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
              timestamp: '2019-11-10T16:18:22',
              text: 'Tenho umas iguais e adoro!'
            },
            {
              user: 'rosameireles_',
              user_img: 'https://engineering.unl.edu/images/staff/Kayla_Person-small.jpg',
              timestamp: '2019-11-10T16:28:22',
              text: 'Já comprei ao @joao_castro_12 e fiquei satisfeita com o serviço!'
            },
            {
              user: 'yee',
              user_img: 'https://img.estadao.com.br/thumbs/640/resources/jpg/7/8/1524230513387.jpg',
              timestamp: '2019-11-10T16:23:22',
              text: 'Vai mas é trabalhar gandulo.'
            },
            {
              user: 'tiagomcosta',
              user_img: 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
              timestamp: '2019-11-10T16:18:22',
              text: 'Tenho umas iguais e adoro!'
            },
            {
              user: 'rosameireles_',
              user_img: 'https://engineering.unl.edu/images/staff/Kayla_Person-small.jpg',
              timestamp: '2019-11-10T16:28:22',
              text: 'Já comprei ao @joao_castro_12 e fiquei satisfeita com o serviço!'
            },
            {
              user: 'yee',
              user_img: 'https://img.estadao.com.br/thumbs/640/resources/jpg/7/8/1524230513387.jpg',
              timestamp: '2019-11-10T16:23:22',
              text: 'Vai mas é trabalhar gandulo.'
            },
            {
              user: 'tiagomcosta',
              user_img: 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
              timestamp: '2019-11-10T16:18:22',
              text: 'Tenho umas iguais e adoro!'
            },
            {
              user: 'yee',
              user_img: 'https://img.estadao.com.br/thumbs/640/resources/jpg/7/8/1524230513387.jpg',
              timestamp: '2019-11-10T16:23:22',
              text: 'Vai mas é trabalhar gandulo.'
            }
          ]
        },
      showbanner: 1,
      window: {
        width: 0,
        height: 0
      },
      shownmodal: null
    }
  },
  created: function() {
    axios.get('http://infernoo.duckdns.org:8000/v1/post/feed?page='+this.page,{
      headers: {'Authorization': "bearer " + localStorage.getItem('a_token')}
    })
    .then(response => {
      this.products = response.data
    })
    .catch(e => {
      console.log(e)
    })
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  },
  mounted: function() {
  },
  methods: {
    isMobile() {
      if(/Android|WebOS|iPhone|iPad|Blackberry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else{
        return false
      }
    },
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
    },
    showmodal(productid){
      this.$modal.show('post_options');
    },
    setmodal(productid){
      this.shownmodal= productid;
    }
  }
}
</script>

<style>
  .comment{
    width:100%;
    padding: 8px 10px 8px 15px;
    border-radius:20px !important;
    background-color: #EEE !important;
    color: #000 !important;
  }
  .toggle-description{
    padding: 0px 10px 0px 10px;
  }
  .details-post{
    font-size:14px;
    margin:0px !important;
  }
  .carousel-indicators li {
    width: 5px !important;
    height: 5px !important;
    border-radius: 5px !important;
  }
  .carousel#carousel1 {
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0px 11px 32px -9px rgba(0,0,0,0.25);
  }
  .post-list{
    text-align: center !important;
  }
  .v--modal-box {
    border-radius: 20px !important; 
    padding: 0px !important;
  }
  .card-op-area{
    text-align: left;
    width:auto !important;
    margin: 0px 0px 15px 10px;
    display: inline-block;
  }
  .my-comment{
    text-align: left;
    width:auto !important;
    margin: 0px 0px 15px 10px;
    display: flex !important;
  }
  .view-comments{
    text-align: center;
    width:auto !important;
    margin: 0px 0px 0px 10px;
    display: flex !important;
  }
  .card-options-area{
    text-align: right;
    width:auto !important;
    margin: 5px 10px 15px 0px;
    display: inline-block;
    float: right;
  }
  .img-user{
    width: 40px !important;
    min-width: 40px !important;
    height: 40px !important;
    border-radius: 50px !important;
    object-fit: cover;
    margin-right: 10px;
  }
  .txt-username{
    margin: 3px;
    font-size: 15px;
    color: #333 !important;
  }
  .txt-tmstmp{
    color: #666 !important;
    cursor: default;
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
    border-radius: 35px !important;
    z-index: 99 !important;
    margin: 0px !important;
    padding: 0px !important;
  }
  .card-img-caixa{
    position: relative;
    top:0;
    left:0;
  }
  .card-img-blur {
    position: relative;
    top:5px;
    left:0;
    border-radius: 20px !important;
    filter: blur(13px);
    opacity: 0.6;
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
  .reactions-area,
  .description-area,
  .user-area,
  .comment-area{
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
    mask: url('../../../public/icns/like.svg');
    transition: 0.3s !important;
  }
  .icon-like-empty:hover{
    background-color: #F40056 !important;
    transition: 0.3s !important;
  }
  .icon-like-full {
    background-color: #F40056 !important;
    mask: url('../../../public/icns/like-full.svg');
    transition: 0.3s !important;
  }
  .icon-dislike-empty {
    mask: url('../../../public/icns/dislike.svg');
    transition: 0.3s !important;
  }
  .icon-dislike-empty:hover{
    background-color: #4A53FC !important;
    transition: 0.3s !important;
  }
  .icon-dislike-full {
    background-color: #4A53FC !important;
    mask: url('../../../public/icns/dislike-full.svg');
    transition: 0.3s !important;
  }

  .icon-save-empty {
    mask: url('../../../public/icns/save.svg');
    transition: 0.3s !important;
    width: 21px !important;
    height: 23px !important;
  }
  .icon-save-empty:hover{
    background-color: #4A53FC !important;
    transition: 0.3s !important;
  }
  .icon-save-full{
    mask: url('../../../public/icns/save-full.svg');
    background-color: #333 !important;
    width: 21px !important;
    height: 23px !important;
    transition: 0.3s !important;
  }
  .icon-buy-empty {
    mask: url('../../../public/icns/buy.svg');
    transition: 0.3s !important;
    width: 22px !important;
    height: 24px !important;
  }
  .icon-buy-empty:hover{
    background-color: #4A53FC !important;
    transition: 0.3s !important;
  }
  .icon-send {
    mask: url('../../../public/icns/direct.svg');
    transition: 0.3s !important;
    width: 23px !important;
    height: 25px !important;
    margin: 7px !important;
  }
  .comment-input{
    margin: 0px 10px 0px 0px;
    border-radius: 20px !important;
    background-color: #EEE !important;
    border: 0px !important;
    color: #000 !important;
    transition: 0.1s !important;
  }
  .bg-trans{
    background-color: rgba(0,0,0,0) !important;
    text-align: center;
  }
  .bg-trans:hover{
    background-color:rgba(0,0,0,0.08) !important;
    color: #000 !important;
  }
  button:focus{
    outline: 0px !important;
  }
</style>
