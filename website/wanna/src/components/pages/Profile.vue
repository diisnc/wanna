<template>
  <layout-basic>
	  <div id="app">
      <div class="container">

        <b-row class="justify-content-md-center">
          <b-col >

            <div class="prof-header">
              <img class="prof-img-user" :src="user_img">
              <h4 class="user-name"><b>{{username}}</b></h4>
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
  name: 'Profile',
  components: {
    LayoutBasic,
  },
  data () {
    return {
      username: this.$router.currentRoute.params.username,
      user_img: 'https://i.imgur.com/KMlWJNv.jpg',
      products: [
        {
          id: 1,
          timestamp: '2019-11-10T16:15:22',
          user: 'vitorpeixoto',
          user_img: 'https://i.imgur.com/KMlWJNv.jpg',
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
            }
          ]
        },
        {
          id: 2,
          timestamp: '2019-11-06T10:09:42',
          user: 'vitorpeixoto',
          user_img: 'https://i.imgur.com/KMlWJNv.jpg',
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
          user: 'vitorpeixoto',
          user_img: 'https://i.imgur.com/KMlWJNv.jpg',
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
          user: 'vitorpeixoto',
          user_img: 'https://i.imgur.com/KMlWJNv.jpg',
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
      
    }
  },
  created: function() {

  },
  mounted: function() {
    console.log(this.$router);
  },
  methods: {
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
  
  .prof-header{
    margin:auto !important;
    width: 95% !important;
    border: 2px solid #FFEEEE !important;
    text-align: left;
  }
  .prof-img-user{
    width: 100px !important;
    min-width: 100px !important;
    height: 100px !important;
    border-radius: 20px !important;
    object-fit: cover;
    margin-right: 10px;
  }
  .user-name{
    margin:10px 0px 0px 10px;
  }
</style>
