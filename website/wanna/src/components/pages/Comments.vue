<template>
  <layout-basic>
    <div id="app">
      <div class="container">
        <div class="row">
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
                <img v-if="product.imgs.length==1" class="card-img card-img-front" :src="product.imgs[0]">

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
                  <button @click="" class="btn icon icon-send"/>
                </div>
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
  name: 'Comments',
  components: {
    LayoutBasic,
  },
  data () {
    return {
      current_user_name: 'vitorpeixoto',
      current_user_img: 'https://i.imgur.com/KMlWJNv.jpg',
      product: {
          id: 1,
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
      }
    }
  },
  created: function() {
  },
  mounted: function() {
    //console.log(this.$router);
    //console.log(this.products);
  },
  methods: {

  }
}
</script>
