<template>
  <layout-basic>
	  <div id="app">
      <div class="container">
        <div class="row justify-content-md-center">
          <b-col sm="7">
            <div class="card">

              <!-- CABEÇALHO COM INFO DO USER -->
              <div class="prof-header">
                <img class="prof-img-user" :src="user_img">
                <div>
                  <h4 class="user-name"><b>{{user_name}}</b></h4>
                  <p class="user-name"><b><i class="fas fa-at"></i> {{user_username}}</b></p>
                  <p class="user-name"><b><i class="fas fa-map-marker-alt"></i> {{user_location}}</b></p>
                  <p class="user-name"><b>
                    <i v-for="index in user_stars" class="fas fa-star"></i>
                    <i v-for="index in (5-user_stars)"class="far fa-star"></i>
                  </b></p>
                </div>
              </div>

              <!-- POSTS, SEGUIDORES E A SEGUIR -->
              <b-row style="padding-top: 20px"> 
                <b-col>
                  <b class="small-txt-header"> {{ publicacoes | numeral('0.[0]a') }} </b>
                  <br> 
                  <p class="small-txt">PUBLICAÇÕES</p>
                </b-col>
                <b-col>
                  <b class="small-txt-header"> {{ seguidores | numeral('0.[0]a') }} </b>
                  <br> 
                  <p class="small-txt">SEGUIDORES</p>
                </b-col>
                <b-col>
                  <b class="small-txt-header"> {{ a_seguir | numeral('0.[0]a') }} </b>
                  <br> 
                  <p class="small-txt">A SEGUIR</p>
                </b-col>
              </b-row>

            </div>
          </b-col>

          <!-- POSTS DO USER -->
          <b-col sm="10" style="text-align: left !important;">  
            <div class="prof-container prof-post" v-for="product in products">
              <button @mouseover="setmodal(product.id)" @click="showmodal(product.id)">
                <a><img class="prof-img-post" :src="product.imgs[0]"></a>
              </button>

              <modal
                v-if="shownmodal == product.id"
                @before-open="this.shownmodal=product.id"
                name="post" width="40%" height="auto"
                scrollable=true>
                  
                <!-- INSERT HERE POST WIDGET! -->
                    
              </modal>


            </div>
          </b-col>
            
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
  name: 'Profile',
  components: {
    LayoutBasic,
  },
    data () {
    return {
      user_username: this.$router.currentRoute.params.username,
      user_img: 'https://i.imgur.com/KMlWJNv.jpg',
      user_name: 'Vitor Peixoto',
      user_location: 'Braga, Portugal',
      user_stars: 4,
      publicacoes: 4,
      seguidores: 12186,
      a_seguir: 543,
      saved: 0,
      likes: 342,
      post_id: 2123,
      page: 0,
      products: [
        {
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
        },
        {
          id: 2,
          timestamp: '2019-11-06T10:09:42',
          user: 'joanavintageoutlet',
          user_img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
          name: 'Lacy shirt vintage',
          description: "Esta camisa vintage vai assentar que nem uma luva no teu armário.",
          price: 10,
          size: 'M',
          color: 'Branco',
          manufacturer: null,
          sex: 'Mulher',
          imgs: [
            "https://i.imgur.com/hs5b0fc.png",
            "https://i.imgur.com/uSbOYV8.png"
          ],
          likes: 2321,
          comments: [
            {
              user: 'rosameireles_',
              user_img: 'https://engineering.unl.edu/images/staff/Kayla_Person-small.jpg',
              timestamp: '2019-11-07T10:29:23',
              text: 'Muito bonitas as camisolas Joana!'
            },
            {
              user: 'tiagomcosta',
              user_img: 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
              timestamp: '2019-11-06T16:18:22',
              text: 'Meh...'
            }
            
          ]
        },
        {
          id: 3,
          timestamp: '2019-11-02T19:15:42',
          user: 'beavila_shoestore',
          user_img: 'https://i.imgur.com/B7aj5H7.png',
          name: 'Botins festivos',
          description: "Preparada para a época de festivais? No teu outfit não podem faltar estes botins.",
          price: 29.90,
          size: '38',
          color: 'Castanho',
          sex: 'Mulher',
          manufacturer: 'PROF',
          imgs: [
            "https://joanavaz.pt/wp-content/uploads/2017/04/IMG_9317-1024x683.jpg",
            "https://joanavaz.pt/wp-content/uploads/2017/04/IMG_9318-690x455.jpg"
          ],
          likes: 1489,
          comments: [
          {
              user: 'tatianamendess',
              user_img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBPBZloSuY-6XVhbBX7xROuv2n8OZGLmFQwFtSqFBxX87mWyRN&s',
              timestamp: '2019-11-03T16:23:22',
              text: 'Mal posso esperar por as levar ao Alive!'
            },
            {
              user: 'rita_cunhaa',
              user_img: 'https://making-the-web.com/sites/default/files/clipart/157025/happy-person-picture-157025-4275865.jpg',
              timestamp: '2019-11-02T19:28:22',
              text: 'Que giras!!!'
            },
            {
              user: 'rosa_almeida__',
              user_img: 'https://portalovertube.com/wp-content/uploads/2019/02/Amy.jpg',
              timestamp: '2019-11-02T119:18:52',
              text: 'Se fossem mais altas...'
            },
          ]
        },
        {
          id: 4,
          timestamp: '2019-10-20T21:55:12',
          user: 'tiagorodri',
          user_img: 'https://images.unsplash.com/photo-1536548665027-b96d34a005ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
          name: 'Calças desporto',
          description: "Estas calças são mesmo fixes e confortáveis. As melhores do mercado.",
          price: 9.90,
          size: 'L',
          color: 'Preto',
          sex: 'Homem',
          manufacturer: 'Hummel',
          imgs: [
            "https://cdn.hummel.net/Admin/Public/GetImage.ashx?Width=500&Heigh=500&Compression=85&Crop=5&Image=/Files/Images/Perfion/c4a8bb97-17b9-4c23-a2d7-07ea40747b99.jpg"
          ],
          likes: 431,
          comments: [
            {
              user: 'tiagomcosta',
              user_img: 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
              timestamp: '2019-10-22T16:18:22',
              text: 'Se tivesse o fato de treino completo até comprava.'
            }
          ]
        }
      ],
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
    showmodal(productid){
      this.$modal.show('post');
    },
    setmodal(productid){
      this.shownmodal= productid;
    },
    isMobile() {
      if(/Android|WebOS|iPhone|iPad|Blackberry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else{
        return false
      }
    }
  }
}
</script>

<style>
  .small-txt{
    font-size: 13px;
    letter-spacing: 2px;
  }
  .small-txt-header{
    font-size: 20px;
  }
  .prof-header{
    margin:auto !important;
    width: 95% !important;
    text-align: left;
    display: flex;
  }
  .prof-img-user{
    width: 130px !important;
    min-width: 130px !important;
    height: 130px !important;
    border-radius: 20px !important;
    object-fit: cover;
    margin-right: 10px;
    box-shadow: 0px 11px 32px -9px rgba(0,0,0,0.3);
  }
  .prof-img-post{
    border-radius: 20px !important;
    object-fit: cover;
    height: 100% !important;
    box-shadow: 0px 11px 32px -9px rgba(0,0,0,0.3);
  }
  .prof-post{
    display:inline-flex;
    width: 31% !important;
    min-width: 31% !important;
    height: auto !important;
    margin: 1%;
    border-radius: 10% !important;
    object-fit: cover;
  }
  .user-name{
    margin:5px 0px 0px 10px;
  }
  .prof-container {
    position: relative;
    width: 37%;
  }
  .prof-container:after {
    content: "";
    display: block;
    padding-bottom: 100%; 
  }
  .prof-container img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
</style>